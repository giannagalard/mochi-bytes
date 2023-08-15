import React, { useState, useEffect } from "react";
import {
  deleteRecipe,
  fetchAllRecipes,
  lastPage,
  nextPage,
  previousPage,
} from "../firebase/firebase";
import { Loading } from "../components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Edit, Remove } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Box } from "@mui/material";

import { Snackbar, Alert } from "@mui/material";
import { Link } from "react-router-dom";

export default function Recipes() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState("");
  const theme = useTheme();

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        await fetchAllRecipes().then((result) => {
          setRows(
            result.map((recipe) => {
              return { name: recipe.data.name, id: recipe.data.id };
            })
          );
        });
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        if (dir === "+") {
          await nextPage(rows[rows.length - 1].name).then((result) => {
            setRows(
              result.map((recipe) => {
                return { name: recipe.data.name, id: recipe.data.id };
              })
            );
          });
        } else if (dir === "-") {
          await previousPage(rows[0].name).then((result) => {
            setRows(
              result.map((recipe) => {
                return { name: recipe.data.name, id: recipe.data.id };
              })
            );
          });
        } else if (dir === "++") {
          await lastPage().then((result) => {
            setRows(
              result.map((recipe) => {
                return { name: recipe.data.name, id: recipe.data.id };
              })
            );
          });
        } else if (dir === "--") {
          await fetchAllRecipes().then((result) => {
            console.log(result);
            setRows(
              result.map((recipe) => {
                return { name: recipe.data.name, id: recipe.data.id };
              })
            );
          });
        }
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessful(false);
    setError(false);
  };

  const handleNext = () => {
    setPage(page + 1);
    setDir("+");
  };

  const handlePrev = () => {
    setPage(page - 1);
    setDir("-");
  };

  const handleLast = () => {
    setPage();
    setDir("++");
  };

  const handleFirst = () => {
    setPage(0);
    setDir("--");
  };

  const handleDelete = (id) => {
    try {
      deleteRecipe(id);
      setSuccessful(true);
      setTimeout(() => {
        window.location.reload(false);
      }, 500);
    } catch (e) {
      setError(true);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableBody>
          {rows
            .slice(0, rows.length === 11 ? rows.length - 1 : rows.length)
            .map((row, ind) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  <IconButton LinkComponent={Link} to={`/edit/${row.id}`}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(row.id)}>
                    <Remove />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <Box sx={{ flexShrink: 0, ml: 2.5 }}>
              <IconButton
                onClick={handleFirst}
                disabled={page === 0}
                aria-label="first page"
              >
                {theme.direction === "rtl" ? (
                  <LastPageIcon />
                ) : (
                  <FirstPageIcon />
                )}
              </IconButton>
              <IconButton
                onClick={handlePrev}
                disabled={page === 0}
                aria-label="previous page"
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
              </IconButton>
              <IconButton
                disabled={rows.length !== 11}
                onClick={handleNext}
                aria-label="next page"
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </IconButton>
              <IconButton onClick={handleLast} aria-label="last page">
                {theme.direction === "rtl" ? (
                  <FirstPageIcon />
                ) : (
                  <LastPageIcon />
                )}
              </IconButton>
            </Box>
          </TableRow>
        </TableFooter>
      </Table>
      {successful && (
        <Snackbar
          open={successful}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Recipe has been created!"
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Recipe has been removed!
          </Alert>
        </Snackbar>
      )}
      {error && (
        <Snackbar
          severity="error"
          open={error}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Error has occurred!"
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Oopsie woopsie UwU we made a fucky wucky!
          </Alert>
        </Snackbar>
      )}
    </TableContainer>
  );
}

import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { Filter, MemoizedRecipesCards } from "../components";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  fetchAllRecipes,
  lastPage,
  nextPage,
  previousPage,
} from "../firebase/firebase";

export default function Recipes() {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [dir, setDir] = useState("");
  const theme = useTheme();
  const [pages, setPages] = useState(localStorage.getItem("count"));

  const changeCats = (e, cat) => {
    const newCats = [...categories];
    switch (e.target.checked) {
      case true:
        newCats.push(cat);
        setCategories(newCats);
        break;
      case false:
        const newNew = newCats.filter((cate) => cate !== cat);
        setCategories(newNew);
        break;
      default:
        console.log("error");
        break;
    }
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        await fetchAllRecipes(categories).then((result) => {
          setRows(result.slice(0, 10));
          setLoading(false);
        });
      } catch (e) {
        setLoading(false);
      }
    })();
  }, [categories]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        if (dir === "+") {
          await nextPage(rows[rows.length - 1].name, categories).then(
            (result) => {
              setRows(result.slice(0, 10));
              setLoading(false);
            }
          );
        } else if (dir === "-") {
          await previousPage(rows[0].name, categories).then((result) => {
            setRows(result.slice(0, 10));
            setLoading(false);
          });
        } else if (dir === "++") {
          await lastPage(categories).then((result) => {
            setRows(result.slice(0, 10));
            setLoading(false);
          });
        } else if (dir === "--") {
          await fetchAllRecipes(categories).then((result) => {
            setRows(result.slice(0, 10));
            setLoading(false);
          });
        }
      } catch (e) {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleNext = () => {
    setPage(page + 1);
    setDir("+");
  };

  const handlePrev = () => {
    setPage(page - 1);
    setDir("-");
  };

  const handleLast = () => {
    setPage(Math.ceil(pages / 10));
    setDir("++");
  };

  const handleFirst = () => {
    setPage(1);
    setDir("--");
  };

  const pagination = (
    <Box
      sx={{
        flexShrink: 0,
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <IconButton
        onClick={handleFirst}
        disabled={page === 1}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handlePrev}
        disabled={page === 1}
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
      <IconButton
        disabled={rows.length === 0 || rows.length !== 11}
        onClick={handleLast}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );

  return (
    <Grid sx={{ height: { xs: "auto", md: "90vh" } }} container>
      <Grid
        item
        xs={2}
        sx={{
          height: "100%",
          pt: 2,
          pb: 2,
          pl: 2,
          display: { xs: " none", md: "flex" },
        }}
      >
        <Filter
          categories={categories}
          changeCats={changeCats}
          setRows={setRows}
          setLoading={setLoading}
        />
      </Grid>
      <Grid
        sx={{
          borderRadius: "10px",
          p: 2,
          position: "relative",
        }}
        item
        xs={12}
        md={10}
      >
        <MemoizedRecipesCards
          loading={loading}
          pagination={pagination}
          recipes={rows}
          page="recipesPage"
        />
      </Grid>
    </Grid>
  );
}

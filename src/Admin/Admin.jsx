import React, { useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button } from "@mui/material";
import Add from "./Add";
import { alpha } from "@mui/material/styles";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "../firebase/firebase";
import Recipes from "./Recipes";

export default function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    onAuthStateChanged(auth, (user) => {
      if (!user || !user.email === process.env.REACT_APP_EMAIL) {
        if (isMounted) {
          navigate("/");
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [navigate]);
  return (
    <Box sx={{ padding: "20px" }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Add Recipe</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Add />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>All Recipes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Recipes />
        </AccordionDetails>
      </Accordion>
      <Box sx={{ mt: 3 }}>
        <Button
          sx={{
            background: alpha("#FF7892", 0.6),
            "&:hover": {
              backgroundColor: alpha("#FF7892", 0.8),
            },
            fontFamily: "'Acme', sans-serif",
          }}
          variant="contained"
          onClick={signOut}
        >
          Sign Out
        </Button>
      </Box>
    </Box>
  );
}

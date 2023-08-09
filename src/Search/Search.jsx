import React from "react";
import { useLocation } from "react-router-dom";
import { RecipesCards } from "../components";
import { Box, Typography } from "@mui/material";

export default function Search() {
  const { state } = useLocation();
  return (
    <Box padding={4}>
      <Typography
        sx={{
          textDecoration: "underline",
          textDecorationColor: "#D5BDAF",
          mb: "15px",
        }}
        variant="h3"
      >
        Search Results
      </Typography>
      {state?.length ? (
        <RecipesCards recipes={state} />
      ) : (
        <Typography variant="h5">
          No Search Results. Try a different recipe name!
        </Typography>
      )}
    </Box>
  );
}

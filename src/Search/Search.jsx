import React from "react";
import { useLocation } from "react-router-dom";
import { MemoizedRecipesCards } from "../components";
import { Box, Typography } from "@mui/material";

export default function Search() {
  const { state } = useLocation();
  return (
    <Box padding={3}>
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
        <MemoizedRecipesCards recipes={state} />
      ) : (
        <Typography variant="h5">
          No Search Results. Try a different recipe name!
        </Typography>
      )}
    </Box>
  );
}

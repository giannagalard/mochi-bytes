import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { fetchRecipes } from "../firebase/firebase";
import { Loading } from "../components";
import RecipesCards from "../components/RecipesCards";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        await fetchRecipes().then((result) => setRecipes(result));
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    })();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Box padding={4}>
      <Typography
        sx={{
          textDecoration: "underline",
          textDecorationColor: "#D5BDAF",
          mb: "15px",
        }}
        variant="h3"
      >
        Latest Recipes
      </Typography>
      <RecipesCards recipes={recipes} />
    </Box>
  );
}

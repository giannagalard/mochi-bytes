import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { fetchRecipes } from "../firebase/firebase";
import { Loading } from "../components";
import { MemoizedRecipesCards } from "../components";
import { Link } from "react-router-dom";

function Home() {
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
    <Box padding={3}>
      <Typography
        component={Link}
        to="/recipes"
        sx={{
          textDecoration: "underline",
          textDecorationColor: "#FF335C",
          mb: 5,
          fontFamily: "'Acme', sans-serif",
          color: "#FF7892",
          "&:hover": {
            color: "#FF335C",
          },
        }}
        variant="h3"
      >
        Latest Recipes {">"}
      </Typography>
      <MemoizedRecipesCards recipes={recipes.slice(0, 5)} page="home" />
    </Box>
  );
}

export default React.memo(Home);

import React, { useState, useEffect } from "react";
import { Typography, Box, styled } from "@mui/material";
import { fetchLatestRecipes } from "../firebase/firebase";
import { Loading } from "../components";
import { MemoizedRecipesCards } from "../components";
import { Link } from "react-router-dom";

const HeaderText = styled(Typography)(({ theme }) => ({
  textDecoration: "underline",
  textDecorationColor: "#FF335C",
  fontFamily: "'Acme', sans-serif",
  color: "#FF7892",
  "&:hover": {
    color: "#FF335C",
  },
}));

function Home() {
  const [latestRecipes, setLatestRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        await fetchLatestRecipes().then((result) => setLatestRecipes(result));
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
      <HeaderText component={Link} to="/recipes" variant="h3">
        Latest Recipes {">"}
      </HeaderText>
      <MemoizedRecipesCards recipes={latestRecipes} page="recipes" />
      <HeaderText component={Link} to="/recipes" variant="h3">
        Categories {">"}
      </HeaderText>
      <MemoizedRecipesCards page="categories" />
    </Box>
  );
}

export default React.memo(Home);

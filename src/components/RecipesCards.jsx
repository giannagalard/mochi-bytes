import React from "react";
import { styled, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const Image = styled("img")(({ theme }) => ({
  height: "20rem",
  width: "90%",
  borderRadius: "5px",
}));

export default function RecipesCards(props) {
  const { recipes } = props;
  return (
    <Grid spacing={3} container>
      {recipes.slice(0, 4)?.map((recipe, ind) => {
        const r = recipe.data;
        return (
          <Grid key={ind} item xs={12} sm={6} md={3}>
            <Link to={`/recipe/${r.id}`}>
              <Image
                sx={{
                  width: { xs: "100%", md: "90%" },
                  height: {
                    xs: "18rem",
                    sm: "15rem",
                    md: "15rem",
                    lg: "20rem",
                  },
                }}
                src={r.image}
                alt={r.name}
                target="_blank"
              />
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
}

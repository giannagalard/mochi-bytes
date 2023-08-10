import React from "react";
import { styled, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Image = styled("img")(({ theme }) => ({
  borderRadius: "10px",
}));

export default function RecipesCards(props) {
  const { recipes, page } = props;
  return (
    <Grid
      sx={{ display: "flex", mt: 2, gap: { xs: "20px", sm: "0" } }}
      container
    >
      {recipes?.map((recipe, ind) => {
        const r = recipe.data;
        return (
          <Grid key={ind} item xs={5} sm={2} md={2}>
            <Link to={`/recipe/${r.id}`}>
              <Image
                sx={{
                  width: { xs: "100%", sm: "90%", md: "90%" },
                  height: {
                    xs: "13rem",
                    sm: "9rem",
                    md: "15rem",
                    lg: "15rem",
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
      {page && (
        <Grid
          sx={{
            background: "#FFDAE1",
            borderRadius: "10px",
          }}
          item
          xs={5}
          sm={2}
          md={2}
        >
          <Link
            to="/recipes"
            style={{
              textDecoration: "none",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography sx={{ color: "#FF7892" }}>View More</Typography>
          </Link>
        </Grid>
      )}
    </Grid>
  );
}

export const MemoizedRecipes = React.memo(RecipesCards);

import React from "react";
import { styled, Grid, Typography, Skeleton, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Image = styled("img")(({ theme }) => ({
  borderRadius: "10px",
}));

const skeletons = [];

for (let i = 0; i < 10; i++) {
  skeletons.push(
    <Grid key={i} item xs={5} sm={2} md={2}>
      <Skeleton variant="rounded" height="100%" />
    </Grid>
  );
}

export default function RecipesCards(props) {
  const { recipes, page, loading } = props;
  return (
    <Grid
      sx={{
        display: "flex",
        gap: {
          xs: "20px",
          sm: page === "recipesPage" && "10px",
          md: page === "recipesPage" && "10px",
          lg: page === "recipesPage" && "20px",
        },
        background: page === "recipesPage" && "#FFDAE1",
        height: page === "recipesPage" && "100%",
        borderRadius: page === "recipesPage" && "10px",
        boxSizing: "border-box",
        p: page === "recipesPage" && 1,
        justifyContent: "space-between",
      }}
      container
    >
      {!loading
        ? recipes?.map((recipe, ind) => {
            const r = recipe?.data;
            return (
              <Grid key={ind} item xs={5} sm={2} md={2}>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/recipe/${r?.id}`}
                >
                  <Image
                    sx={{
                      width: {
                        xs: "100%",
                        sm: page === "recipesPage" ? "100%" : "90%",
                        md: page === "recipesPage" ? "100%" : "90%",
                      },
                      height: {
                        xs: "13rem",
                        sm: "11rem",
                        md: "13rem",
                        lg: "15rem",
                      },
                    }}
                    src={r?.image}
                    alt={r?.name}
                    target="_blank"
                  />
                  <Box>
                    <Typography
                      sx={{ color: "#FF6D8F" }}
                      textAlign="center"
                      variant="body1"
                    >
                      {r?.name}
                    </Typography>
                  </Box>
                </Link>
              </Grid>
            );
          })
        : skeletons}
      {page === "recipes" && (
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
            <Typography sx={{ color: "#FF7892" }}>View All</Typography>
          </Link>
        </Grid>
      )}
      {!loading && recipes?.length === 0 && (
        <Typography variant="h4" sx={{ p: 1 }}>
          No Recipes Found
        </Typography>
      )}
      {props.pagination}
    </Grid>
  );
}

export const MemoizedRecipes = React.memo(RecipesCards);

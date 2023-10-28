import React, { useState, useEffect } from "react";
import { fetchRecipe } from "../firebase/firebase";
import {
  FormGroup,
  Box,
  FormControlLabel,
  Stack,
  Grid,
  Checkbox,
  Typography,
} from "@mui/material";
import { Loading } from "../components";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import { styled } from "@mui/material/styles";

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  paddingLeft: theme.spacing(1),
  color: theme.palette.text.secondary,
  flexGrow: 1,
}));

export default function Recipe() {
  let { recipeId } = useParams();
  const [recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        await fetchRecipe(recipeId).then((result) => {
          setRecipe(result.data);
          setLoading(false);
        });
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    })();
  }, [recipeId]);

  return loading ? (
    <Loading />
  ) : !error ? (
    <Box sx={{ m: 3, "& > :not(styled)": { mb: 4 } }}>
      <Grid container>
        <Grid
          sx={{ backgroundColor: "#FFDAE1", borderRadius: "10px" }}
          item
          xs={12}
          sm={6}
          md={3}
          order={{ xs: "2", md: "1" }}
          p={1}
        >
          <Stack
            spacing={{ xs: 1, sm: 2 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
            textAlign="left"
          >
            <FormGroup>
              {recipe.ingredients.map((i, index) => {
                return (
                  <Item key={index}>
                    <FormControlLabel control={<Checkbox />} label={i} />
                  </Item>
                );
              })}
            </FormGroup>
          </Stack>
        </Grid>
        <Grid
          sx={{ p: 1 }}
          item
          xs={12}
          sm={6}
          md={6}
          order={{ xs: "1", md: "2" }}
        >
          <Grid spacing={1} container>
            <Grid item xs={12} sm={6} md={6}>
              <img
                style={{
                  aspectRatio: "1/1",
                  width: "100%",
                  borderRadius: "10px",
                }}
                src={recipe.image}
                alt={recipe.name}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Box
                sx={{
                  backgroundColor: "#FFDAE1",
                  borderRadius: "10px",
                  height: "100%",
                }}
              >
                <Box p={1}>
                  <Typography variant="h4" sx={{ color: "#FF7892" }}>
                    {recipe.name}
                  </Typography>
                  <Typography>{recipe.description}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid m={1} container>
            <Grid item xs={6}>
              <Typography sx={{ color: "#FF7892" }} variant="h5">
                Prep Time
              </Typography>
              <Typography>{recipe.details.prepTime}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ color: "#FF7892" }} variant="h5">
                Cook Time
              </Typography>
              <Typography>{recipe.details.cookTime}</Typography>
            </Grid>
          </Grid>
          <Box>
            <Stack
              direction="row"
              useFlexGap
              flexWrap="wrap"
              textAlign="left"
              sx={{ backgroundColor: "#FFDAE1", borderRadius: "5px" }}
              p={1}
            >
              {recipe.directions.map((d, index) => {
                return (
                  <Item p={1} key={index}>
                    <Typography>
                      {index + 1}. {d}
                    </Typography>
                  </Item>
                );
              })}
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={3} order={{ xs: "3", md: "3" }}>
          <Typography variant="h5">Similar Recipes</Typography>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <NotFound />
  );
}

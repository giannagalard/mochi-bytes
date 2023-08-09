import React, { useState, useEffect } from "react";
import { fetchRecipe } from "../firebase/firebase";
import { Typography, Box, Chip, Stack } from "@mui/material";
import { Loading } from "../components";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound/NotFound";

export default function Recipe() {
  let { recipeId } = useParams();
  const [recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        await fetchRecipe(recipeId).then((result) => setRecipe(result.data));
        setLoading(false);
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
      <Stack direction="row" spacing={1}>
        {recipe?.category?.map((cat) => {
          return <Chip label={cat} variant="outlined" />;
        })}
      </Stack>
      <Box>
        <Typography
          sx={{ textDecoration: "underline", textDecorationColor: "#D5BDAF" }}
          variant="h2"
        >
          {recipe?.name}
        </Typography>
        <Typography variant="body1">{recipe?.description}</Typography>
      </Box>
      <Stack direction="row" spacing={4}>
        <Stack>
          <Typography
            sx={{
              textDecoration: "underline",
              textDecorationColor: "#D5BDAF",
              fontWeight: "bold",
            }}
            variant="body1"
          >
            Cook Time
          </Typography>
          <Typography variant="body2">{recipe?.details?.cookTime}</Typography>
        </Stack>
        <Stack>
          <Typography
            sx={{
              textDecoration: "underline",
              textDecorationColor: "#D5BDAF",
              fontWeight: "bold",
            }}
            variant="body1"
          >
            Prep Time
          </Typography>
          <Typography variant="body2">{recipe?.details?.prepTime}</Typography>
        </Stack>
        <Stack>
          <Typography
            sx={{
              textDecoration: "underline",
              textDecorationColor: "#D5BDAF",
              fontWeight: "bold",
            }}
            variant="body1"
          >
            Total Time
          </Typography>
          <Typography variant="body2">{recipe?.details?.totalTime}</Typography>
        </Stack>
      </Stack>
      <Stack direction={{ xs: "column", md: "row" }} spacing={20}>
        <Stack>
          <Typography
            sx={{
              textDecoration: "underline",
              textDecorationColor: "#D5BDAF",
              fontWeight: "bold",
            }}
            variant="h6"
          >
            Ingredients
          </Typography>
          {recipe?.ingredients?.map((ing) => {
            return <Typography variant="body2">{ing}</Typography>;
          })}
        </Stack>
        <Stack>
          <Typography
            sx={{
              textDecoration: "underline",
              textDecorationColor: "#D5BDAF",
              fontWeight: "bold",
            }}
            variant="h6"
          >
            Directions
          </Typography>
          {recipe?.directions?.map((dir, index) => {
            return (
              <Stack direction="row" spacing={4} sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    textDecoration: "underline",
                    textDecorationColor: "#D5BDAF",
                    fontWeight: "bold",
                  }}
                  variant="body2"
                >
                  Step {index + 1}
                </Typography>
                <Typography variant="body2">{dir}</Typography>
              </Stack>
            );
          })}
        </Stack>
      </Stack>
      <Stack>
        <Typography
          sx={{
            textDecoration: "underline",
            textDecorationColor: "#D5BDAF",
            fontWeight: "bold",
          }}
          variant="h6"
        >
          Notes:
        </Typography>
        {recipe?.notes?.length === 0 ? (
          <Typography variant="body1">No notes.</Typography>
        ) : (
          <Box>
            {recipe?.notes?.map((note) => {
              return <Typography>{note}</Typography>;
            })}
          </Box>
        )}
      </Stack>
    </Box>
  ) : (
    <NotFound />
  );
}

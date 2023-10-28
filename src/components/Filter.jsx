import {
  Box,
  Button,
  Typography,
  alpha,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React from "react";
import { fetchAllRecipes } from "../firebase/firebase";

const meals = ["Breakfast", "Lunch", "Dinner", "Dessert", "Snacks"];

const proteins = ["Beef", "Chicken", "Fish", "Vegetarian"];

const cookingMethod = ["Sheet Pan", "Instant Pot", "Crock Pot", "One Pan"];

const drinks = ["Coffee & Espresso", "Juices", "Mocktails", "Smoothies", "Tea"];

const CatCheckBox = (props) => {
  return (
    <FormControlLabel
      control={<Checkbox onChange={(e) => props.changeCats(e, props.text)} />}
      label={props.text}
    />
  );
};

export default function Filter(props) {
  const FilterCats = () => {
    (async () => {
      try {
        await fetchAllRecipes(props.categories).then((result) => {
          props.setRows(result.slice(0, 10));
        });
        props.setLoading(false);
      } catch (e) {
        props.setLoading(false);
      }
    })();
  };
  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        width: "100%",
        background: "#FFDAE1",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        pt: 1,
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          height: "85%",
          width: "90%",
          p: 0,
        }}
      >
        <Box
          sx={{
            mt: 1,
            height: "100%",
            width: "100%",
            overflowY: "scroll",
            borderRadius: "10px",
            background: alpha("#FF7892", 0.6),
            pl: 2,
            pt: 2,
            pb: 2,
            boxSizing: "border-box",
          }}
        >
          <Typography sx={{ textDecoration: "underline" }} variant="body1">
            Meals
          </Typography>
          <FormGroup>
            {meals.map((m, i) => {
              return (
                <CatCheckBox key={i} changeCats={props.changeCats} text={m} />
              );
            })}
          </FormGroup>
          <Typography sx={{ textDecoration: "underline" }} variant="body1">
            Proteins
          </Typography>
          <FormGroup>
            {proteins.map((m, i) => {
              return (
                <CatCheckBox changeCats={props.changeCats} key={i} text={m} />
              );
            })}
          </FormGroup>
          <Typography sx={{ textDecoration: "underline" }} variant="body1">
            Cooking Method
          </Typography>
          <FormGroup>
            {cookingMethod.map((m, i) => {
              return (
                <CatCheckBox changeCats={props.changeCats} key={i} text={m} />
              );
            })}
          </FormGroup>
          <Typography sx={{ textDecoration: "underline" }} variant="body1">
            Drinks
          </Typography>
          <FormGroup>
            {drinks.map((m, i) => {
              return (
                <CatCheckBox changeCats={props.changeCats} key={i} text={m} />
              );
            })}
          </FormGroup>
        </Box>
      </Box>
      <Box
        sx={{
          position: "absolute",
          height: "10%",
          bottom: 0,
        }}
      >
        <Button
          variant="contained"
          sx={{
            background: alpha("#FF7892", 0.6),
            "&:hover": {
              backgroundColor: alpha("#FF7892", 0.8),
            },
            fontFamily: "'Acme', sans-serif",
          }}
          onClick={FilterCats}
        >
          Update Filter
        </Button>
      </Box>
    </Box>
  );
}

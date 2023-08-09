import React, { useState } from "react";
import { FormControl, TextField, Button, Snackbar, Alert } from "@mui/material";
import { AddRecipe } from "../firebase/firebase";

export default function Add() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [cookTime, setCookTime] = useState(0);
  const [prepTime, setPrepTime] = useState(0);
  const [ingredients, setIngredients] = useState("");
  const [directions, setDirections] = useState("");
  const [category, setCategory] = useState("");
  const [protein, setProtein] = useState("");
  const [notes, setNotes] = useState("");

  const [successful, setSuccessful] = useState(false);
  const [error, setError] = useState(false);

  const SubmitData = async () => {
    const strCookTime = `${cookTime}min`;
    const strPrepTime = `${prepTime}min`;
    const strTotalTime = `${cookTime + prepTime}min`;
    const data = {
      data: {
        name,
        name_lower: name.toLowerCase(),
        description,
        protein,
        image: imgUrl,
        details: {
          cookTime: strCookTime,
          prepTime: strPrepTime,
          totalTime: strTotalTime,
        },
        ingredients: ingredients.split(",").map((ing) => ing.trim()),
        directions: directions.split(",").map((dir) => dir.trim()),
        category: category.split(",").map((cat) => cat.trim()),
        notes: notes.length ? notes.split(",").map((note) => note.trim()) : [],
      },
    };

    try {
      await AddRecipe(data).then((result) => setSuccessful(true));
    } catch (e) {
      setError(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessful(false);
    setError(false);
  };

  return (
    <FormControl fullWidth>
      <FormControl
        sx={{
          "& > :not(style)": { m: 1, width: "50%" },
          display: "flex",
          flexDirection: "row",
        }}
        fullWidth
      >
        <TextField
          id="filled-basic"
          onChange={(e) => setName(e.target.value)}
          label="Name"
          variant="filled"
        />
        <TextField
          id="filled-basic"
          onChange={(e) => setProtein(e.target.value)}
          label="Protein"
          variant="filled"
        />
      </FormControl>
      <FormControl
        sx={{
          "& > :not(style)": { m: 1 },
        }}
      >
        <TextField
          id="filled-basic"
          onChange={(e) => setImgUrl(e.target.value)}
          label="Image URL"
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="Description"
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          variant="filled"
        />
      </FormControl>
      <FormControl
        sx={{
          "& > :not(style)": { m: 1, width: "50%" },
          display: "flex",
          flexDirection: "row",
        }}
      >
        <TextField
          id="filled-basic"
          onChange={(e) => setCookTime(e.target.value)}
          label="Cook Time"
          variant="filled"
        />
        <TextField
          id="filled-basic"
          onChange={(e) => setPrepTime(e.target.value)}
          label="Prep Time"
          variant="filled"
        />
      </FormControl>
      <FormControl
        sx={{
          "& > :not(style)": { m: 1 },
        }}
      >
        <TextField
          id="filled-multiline-static"
          label="Category"
          placeholder="Enter category in comma separated list"
          onChange={(e) => setCategory(e.target.value)}
          multiline
          rows={4}
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="Ingredients"
          placeholder="Enter ingredients in comma separated list"
          onChange={(e) => setIngredients(e.target.value)}
          multiline
          rows={4}
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="Directions"
          placeholder="Enter directions in comma separated list"
          onChange={(e) => setDirections(e.target.value)}
          multiline
          rows={4}
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="Notes*"
          placeholder="Enter notes in comma separated list"
          onChange={(e) => setNotes(e.target.value)}
          multiline
          rows={4}
          variant="filled"
        />
      </FormControl>
      <Button onClick={SubmitData} variant="contained">
        Add
      </Button>
      {successful && (
        <Snackbar
          open={successful}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Recipe has been created!"
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Recipe has been created!
          </Alert>
        </Snackbar>
      )}
      {error && (
        <Snackbar
          severity="error"
          open={error}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Error has occurred!"
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Oopsie woopsie UwU we made a fucky wucky!
          </Alert>
        </Snackbar>
      )}
    </FormControl>
  );
}

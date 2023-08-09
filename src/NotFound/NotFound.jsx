import { Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Box sx={{ textAlign: "center", mt: 6 }}>
      <Typography variant="h1">Oopsie!</Typography>
      <Typography variant="h2">This page doesn't exist!</Typography>
      <Button LinkComponent={Link} to="/" sx={{ mt: 5 }} variant="contained">
        Home
      </Button>
    </Box>
  );
}

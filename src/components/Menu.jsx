import * as React from "react";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";

import { alpha } from "@mui/material/styles";

export default function PositionedMenu(props) {
  const { text } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = () => {
    setAnchorEl(!open);
  };

  return (
    <React.Fragment>
      <Box>
        <Button
          sx={{
            background: alpha("#FF7892", 0.6),
            "&:hover": {
              backgroundColor: alpha("#FF7892", 0.8),
            },
            fontFamily: "'Acme', sans-serif",
          }}
          variant="contained"
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          {text}
        </Button>
        {open && (
          <Box
            sx={{
              position: "absolute",
              left: 0,
              top: "60px",
              width: "100vw",
              height: "500px",
              background: alpha("#FF7892", 0.8),

              "&::before": {
                filter: "blur(8px)",
              },
            }}
          >
            <Typography variant="h1">Hello</Typography>
          </Box>
        )}
      </Box>
    </React.Fragment>
  );
}

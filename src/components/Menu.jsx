import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Grid, Typography } from "@mui/material";

import { alpha } from "@mui/material/styles";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  background: "rgba( 255, 255, 255, 0.25 )",
  boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
  backdropFilter: "blur( 18px )",
  WebkitBackdropFilter: "blur( 18px )",
  borderRadius: "10px",
  border: "1px solid rgba( 255, 255, 255, 0.18 )",
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogContent-dividers": {
    background: "#FFDAE1",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
    background: "#f4acb7",
  },
  "& .MuiTypography-h6": {
    background: "#f4acb7",
  },
}));

const ButtonsLink = styled(Button)(({ theme }) => ({
  color: "#f72585",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.2)",
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "#f72585",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function PositionedMenu(props) {
  const { text } = props;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
          onClick={handleClickOpen}
        >
          {text}
        </Button>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
            sx={{ color: "#ff006e" }}
          >
            Mochi's Bytes Menu
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Grid spacing={2} container>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    p: 3,
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ color: "#ff006e", textDecoration: "underline" }}
                    variant="h5"
                  >
                    Meals
                  </Typography>
                  <ButtonsLink>Breakfast</ButtonsLink>
                  <ButtonsLink>Lunch</ButtonsLink>
                  <ButtonsLink>Dinner</ButtonsLink>
                  <ButtonsLink>Desserts</ButtonsLink>
                  <ButtonsLink>Snacks</ButtonsLink>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    p: 3,
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ color: "#ff006e", textDecoration: "underline" }}
                    variant="h5"
                  >
                    Protein
                  </Typography>
                  <ButtonsLink>Beef</ButtonsLink>
                  <ButtonsLink>Chicken</ButtonsLink>
                  <ButtonsLink>Fish</ButtonsLink>
                  <ButtonsLink>Vegan</ButtonsLink>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    p: 3,
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ color: "#ff006e", textDecoration: "underline" }}
                    variant="h5"
                  >
                    Cooking Method
                  </Typography>
                  <ButtonsLink>Sheet Pan</ButtonsLink>
                  <ButtonsLink>Instant Pot</ButtonsLink>
                  <ButtonsLink>Crock Pot</ButtonsLink>
                  <ButtonsLink>One Pan</ButtonsLink>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    p: 3,
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ color: "#ff006e", textDecoration: "underline" }}
                    variant="h5"
                  >
                    Drinks
                  </Typography>
                  <ButtonsLink>Coffee and Espresso</ButtonsLink>
                  <ButtonsLink>Juices</ButtonsLink>
                  <ButtonsLink>Mocktails</ButtonsLink>
                  <ButtonsLink>Smoothies</ButtonsLink>
                  <ButtonsLink>Tea</ButtonsLink>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button sx={{ color: "#f72585" }} autoFocus onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </Box>
    </React.Fragment>
  );
}

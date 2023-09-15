import { onAuthStateChanged } from "firebase/auth";
import React, { useState, Fragment, useEffect } from "react";
import { loginWithGoogle } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { Box, Alert, Button } from "@mui/material";
import { auth } from "../firebase/firebase";

export default function Login() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const authGoogle = async () => {
    setLoading(true);
    await loginWithGoogle()
      .then((user) => {
        setErrors({});
        navigate("/admin");
      })
      .catch((error) => {
        if ("auth/account-exists-with-different-credential" === error.code) {
          setErrors({
            ...errors,
            exists: "Account already exists with different credential",
          });
        } else if ("auth/user-not-found" === error.code) {
          setErrors({
            ...errors,
            exists: "User not found",
          });
        }
      });
    setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (isMounted) {
          setLoading(true);
          navigate("/admin");
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  return (
    <Fragment>
      <Box sx={{ height: { xs: "80vh", sm: "80vh", md: "90vh", lg: "90vh" } }}>
        <Box sx={{ pt: 5 }} component="form">
          <Button
            sx={{ mt: 2 }}
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={authGoogle}
          >
            Sign in with Google
          </Button>
          {Object.keys(errors).length > 0 ? (
            <Alert sx={{ mt: 2 }} severity="error">
              {errors.exists ? errors.exists : undefined}
              {errors.email ? errors.email : undefined}
              {errors.password ? errors.password : undefined}
            </Alert>
          ) : undefined}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          ></Box>
        </Box>
      </Box>
    </Fragment>
  );
}

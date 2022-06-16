// Import React
import * as React from "react";
import { useState } from "react";
// Import Material UI components
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Typography from "@mui/material/Typography";
import { InputLabel, FormControl } from "@mui/material";
import Divider from "@mui/material/Divider";

// Import React Router DOM functions
import { useNavigate } from "react-router-dom";

// Import api request functions
import { signupPost } from "../api/api";

export const Signup = () => {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [pwError, setPwError] = useState("");
  const [confirmPwError, setConfirmPwError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEmailError("");
    setPwError("");
    setConfirmPwError("");
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    // FORM VALIDATION
    if (!data.get("email")) {
      setEmailError("Please Enter Email ID");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.get("email"))
    ) {
      setEmailError("Invalid email address");
    } else if (data.get("password").length < 6) {
      setPwError("Password too short.");
    } else if (data.get("password") !== data.get("confirmPassword")) {
      setConfirmPwError("This field does not match with the password.");
    } else {
      try {
        const response = await signupPost({
          name: data.get("name"),
          username: data.get("username"),
          password: data.get("password"),
          email: data.get("email"),
          type: data.get("type")
        });
        
        navigate("/signup", { replace: true });
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <Box
      sx={{
        marginTop: 8,
        marginBottom: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 5,
          borderRadius: 3,
          borderLeft: "80px solid #30574E",
          width: "370px",
        }}
      >
        <Typography
          component="h1"
          variant="h3"
          color="primary"
          fontWeight="bold"
        >
          SIGN UP
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <FormControl variant="standard" fullWidth>
            <InputLabel
              shrink
              htmlFor="name"
              sx={{ color: "#000", fontWeight: 500, fontSize: 22 }}
            >
              Name
            </InputLabel>
            <TextField
              sx={{ mt: 3 }}
              required
              margin="normal"
              fullWidth
              id="name"
              name="name"
              autoFocus
              variant="filled"
              hiddenLabel
            />
          </FormControl>
          <FormControl variant="standard" fullWidth sx={{ mt: 3 }}>
            <InputLabel
              shrink
              htmlFor="username"
              sx={{ color: "#000", fontWeight: 500, fontSize: 22 }}
            >
              Username
            </InputLabel>
            <TextField
              sx={{ mt: 3 }}
              required
              margin="normal"
              fullWidth
              id="username"
              name="username"
              autoFocus
              variant="filled"
              hiddenLabel
            />
          </FormControl>
          <FormControl variant="standard" fullWidth sx={{ mt: 3 }}>
            <InputLabel
              shrink
              htmlFor="email"
              sx={{ color: "#000", fontWeight: 500, fontSize: 22 }}
            >
              Email
            </InputLabel>
            <TextField
              sx={{ mt: 3 }}
              required
              margin="normal"
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              variant="filled"
              hiddenLabel
              error={emailError === "" ? false : true}
              helperText={emailError === "" ? "" : emailError}
            />
          </FormControl>
          <FormControl variant="standard" fullWidth sx={{ mt: 3 }}>
            <InputLabel
              shrink
              htmlFor="password"
              sx={{ color: "#000", fontWeight: 500, fontSize: 22 }}
            >
              Password
            </InputLabel>
            <TextField
              sx={{ mt: 3 }}
              margin="normal"
              required
              fullWidth
              name="password"
              type="password"
              id="password"
              autoComplete="new-password"
              variant="filled"
              hiddenLabel
              error={pwError === "" ? false : true}
              helperText={pwError === "" ? "" : pwError}
            />
          </FormControl>
          <FormControl variant="standard" fullWidth sx={{ mt: 3 }}>
            <InputLabel
              shrink
              htmlFor="confirmPassword"
              sx={{ color: "#000", fontWeight: 500, fontSize: 22 }}
            >
              Confirm Password
            </InputLabel>
            <TextField
              sx={{ mt: 3 }}
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              variant="filled"
              hiddenLabel
              error={confirmPwError === "" ? false : true}
              helperText={confirmPwError === "" ? "" : confirmPwError}
            />
          </FormControl>
          <FormControl variant="standard" fullWidth sx={{ mt: 3 }}>
          <InputLabel
              shrink
              htmlFor="type"
              sx={{ color: "#000", fontWeight: 500, fontSize: 22 }}
            >Type of Account
            </InputLabel>
            <RadioGroup
              row
              name="type"
              sx={{ mt: 3 }}
            >
              <FormControlLabel
                value="TEACHER"
                control={<Radio />}
                label="Teacher"
              />
              <FormControlLabel
                value="STUDENT"
                control={<Radio />}
                label="Student"
              />
            </RadioGroup>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2, fontSize: "20px", fontWeight: 600 }}
          >
            SIGN UP
          </Button>

          <Divider>
            <Typography>OR</Typography>
          </Divider>
          <Typography sx={{ mt: 1 }}>Already Registered?</Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 1, fontSize: "20px", fontWeight: 600 }}
            onClick={() => navigate("/login")}
          >
            LOG IN
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

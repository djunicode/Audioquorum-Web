// Import React
import * as React from "react";

// Import Material UI components
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { InputLabel, FormControl } from "@mui/material";
import Divider from "@mui/material/Divider";

// Import React Router DOM functions
import {useNavigate} from "react-router-dom";

export const Signup = () => {

  const navigate = useNavigate();
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
        <Box component="form" noValidate sx={{ mt: 1 }}>
        <FormControl variant="standard" fullWidth>
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
            />
          </FormControl>
          <FormControl variant="standard" fullWidth sx={{ mt: 3 }}>
            <InputLabel
              shrink
              htmlFor="password"
              sx={{ color: "#000", fontWeight: 500, fontSize: 22 }}
            >
              Confirm Password
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
            />
          </FormControl>
          <FormControl variant="standard" fullWidth sx={{ mt: 3 }}>
            <InputLabel
              shrink
              htmlFor="confirmPassword"
              sx={{ color: "#000", fontWeight: 500, fontSize: 22 }}
            >
              Password
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
            />
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 5, mb: 2, fontSize: "20px", fontWeight: 600 }}
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


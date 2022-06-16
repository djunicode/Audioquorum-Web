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

// Import Api requests
import {loginPost} from "../api/api";

export const Login = (props) => {

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    
      const response = await loginPost({
        username: data.get('username'),
        password: data.get('password'),
      });
      

      if (response.token) {
        localStorage.setItem("token", response.token);
        navigate("/dashboard", {replace: true})
        props.setLoggedIn(true);
      } else {
        console.log(response);
      }
      
      
    
     };
  
  return (
    <Box
      sx={{
        marginTop: 8,
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
          LOG IN
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
              autoComplete="current-password"
              variant="filled"
              hiddenLabel
            />
          </FormControl>

          <Typography>
            <Link
              href="#"
              variant="body2"
              sx={{ textDecoration: "none" }}
              color="text.primary"
            >
              Forgot password?
            </Link>
          </Typography>

          <Grid container justifyContent="flex-end">
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              labelPlacement="start"
            />
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2, fontSize: "20px", fontWeight: 600 }}

          >
            LOG IN
          </Button>

          <Divider>
            <Typography>OR</Typography>
          </Divider>
          <Typography sx={{ mt: 1 }}>New to Audioquorum?</Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 1, fontSize: "20px", fontWeight: 600 }}
            onClick={() => navigate("/signup")}
          >
            SIGN UP
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

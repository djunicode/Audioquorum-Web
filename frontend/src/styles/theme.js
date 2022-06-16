import * as React from "react";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#30574E",
    },
    secondary: {
      main: "#D5E2DF",
    },
    root: {
      "& .MuiFilledInput-root": {
        background: "#D5E2DF"
      }
    }
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
});

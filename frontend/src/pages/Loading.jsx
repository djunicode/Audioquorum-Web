import React from "react";

// Import MUI Components
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";

// Import Background Image

import { Typography } from "@mui/material";

function Loading() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Grid
        item
        className="loadingBox"
        sx={{
            minWidth: "50vw",
            minHeight: "50vh",
            marginTop: "10%"
        }}
      >
        <Grid
          spacing={2}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            height: "75%",
            pt: "15%",
            px: "5%",
          }}
          className="loadingText"
        >
          <Grid item xs={12}>
            <Typography
              variant="h4"
              color="primary"
              fontWeight="700"
              textAlign="center"
            >
              Please wait,
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              color="primary"
              fontWeight="700"
              textAlign="center"
            >
              until we get things ready for you !
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Loading;

import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: "default",
  color: "#f04c64",
  fontWeight: "medium",
};

export default function ProductHowItWorks() {
  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        bgcolor: "#ededed",
        overflow: "hidden",
      }}
    >
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography 
          variant="h4" 
          align="center" 
          component="h2" 
          sx={{ mb: 8 }}
        >
          <b>Comment ça marche ?</b>
        </Typography>
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>1.</Box>
                <Typography variant="h6" align="center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  ex arcu, luctus eu felis sit amet, facilisis tristique nisl.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>2.</Box>
                <Typography variant="h6" align="center">
                  Praesent iaculis sit amet libero nec tempor.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3.</Box>
                <Typography variant="h6" align="center">
                  Donec congue augue at nisi hendrerit rutrum.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
      </Container>
    </Box>
  );
}

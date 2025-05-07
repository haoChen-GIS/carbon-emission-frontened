// App.jsx
import React from "react";
import { Box, Grid, Typography, Button, Container } from "@mui/material";

function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "#42494b",
          color: " #fff",
          py: 8,
          // backgroundImage: "url('/images/header.jpg')",
          backgroundSize: "cover",
        }}
      >
        <Container
          sx={{
            alignItems: "center",
            textAlign: "center",
            position: "relative",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Global Carbon Emissions
          </Typography>
          <Box>
            <Button
              variant="outlined"
              color="inherit"
              sx={{ position: "absolute", top: 50, right: 40 }}
            >
              Explore the Map
            </Button>
          </Box>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ bgcolor: "#f4f4f4", py: 8 }}>
        <Container>
          <Typography variant="h5" gutterBottom>
            How Climate TRACE Works
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1">
                Most human economic activities release greenhouse gases into the
                Earth's atmosphere. We use satellites and other remote sensing
                technologies to spot these emissions activities.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/images/login.jpg"
                alt="Power Plant"
                sx={{ width: "100%", borderRadius: 2 }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default HomePage;

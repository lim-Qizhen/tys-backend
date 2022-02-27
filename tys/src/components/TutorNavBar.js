import React from "react";
import { AppBar, Container, Toolbar, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const TutorNavbar = () => {
  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: "black" }}>
        <Container>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Link
                to="/tutor"
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="contained"
                  style={{ backgroundColor: "white", color: "black" }}
                >
                  HOME
                </Button>
              </Link>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  marginLeft: "10px",
                }}
              >
                PROFILE
              </Button>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  marginLeft: "10px",
                }}
              >
                LOGOUT
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default TutorNavbar;

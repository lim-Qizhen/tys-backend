//log out function remove the accesss token and do the authorisation thing
//prepare profile page (must retrieve the user profile)

import React from "react";
import { AppBar, Container, Toolbar, Box, Button } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/UserReducer";

const StudentNavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(userActions.logout());
    history.push("/");
  };
  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: "black" }}>
        <Container>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Link to="/student" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "white", color: "black" }}
                >
                  HOME
                </Button>
              </Link>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Link
                to="/student_consultations"
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="contained"
                  style={{ backgroundColor: "white", color: "black" }}
                >
                  CONSULTS
                </Button>
              </Link>
              <Link to="/student_profile" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    marginLeft: "10px",
                  }}
                >
                  {user.f_name}
                </Button>
              </Link>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  marginLeft: "10px",
                }}
                onClick={handleLogout}
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

export default StudentNavBar;

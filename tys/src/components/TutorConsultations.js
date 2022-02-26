import React from "react";
import TutorNavBar from "./TutorNavBar";
import { Box, Button } from "@mui/material";

const TutorConsultations = () => {
  return (
    <>
      <TutorNavBar />
      <Box
        className="upcoming"
        sx={{
          p: 2,
          border: "1px solid grey",
          marginTop: "50px",
          borderRadius: "10px",
          width: "600px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <p style={{ textDecoration: "underline", fontWeight: "bold" }}>
          Upcoming Consultations
        </p>
        <ul>
          <li>
            27th August 11am
            <span style={{ float: "right" }}>
              <Button variant="outlined" size="small">
                START
              </Button>
            </span>
          </li>
        </ul>
      </Box>
      <Box
        className="past"
        sx={{
          p: 2,
          border: "1px solid grey",
          marginTop: "50px",
          borderRadius: "10px",
          width: "600px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <p style={{ textDecoration: "underline", fontWeight: "bold" }}>
          Past Consultations
        </p>
        <ul>
          <li>
            27th August 11am
            <span style={{ float: "right", fontSize: "small" }}>
              <a href="">REVIEW</a>
            </span>
          </li>
        </ul>
      </Box>
    </>
  );
};

export default TutorConsultations;

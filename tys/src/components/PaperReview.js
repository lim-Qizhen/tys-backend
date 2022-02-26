//must retrieve the accuracy of the questions to display the right or wrong

import React, { useState, useEffect } from "react";
import StudentNavBar from "./StudentNavBar";
import {
  Grid,
  Button,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { useParams, useHistory, Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const PaperReview = () => {
  const params = useParams();
  const user = useSelector((state) => state.user);
  const history = useHistory();
  if (user.accessToken === "") {
    history.push("/");
  }
  console.log(params); //params.paper = paper_id
  //retrieve the score
  const [result, setResult] = useState();
  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/students/paper/score/${user.username}/${params.paper}/`
      )
      .then((res) => {
        console.log(res.data[0].results);
        setResult(res.data[0].results);
      });
  });
  const resultDisplay = (Math.round(result * 10000) / 100).toFixed(2);
  console.log(resultDisplay);
  //retrieve the questions for review
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/students/review_papers/${user.username}/${params.paper}/`
      )
      .then((res) => {
        setQuestions(res.data);
      });
  }, []);
  console.log(questions[0]);
  const displayQuestions = questions.map((question, index) => {
    return (
      <li style={{ marginBottom: "10px" }}>
        <br />
        <img
          src={question.question_img}
          alt={`question ${index + 1}`}
          style={{ width: "60%", marginBottom: "20px" }}
        />
        <br />
        Your answer:{" "}
        <span style={{ textDecoration: "underline" }}>
          {question.student_answer}
        </span>{" "}
        Correct answer:{" "}
        <span style={{ textDecoration: "underline" }}>{question.answer}</span>{" "}
        {question.accuracy ? (
          <DoneIcon style={{ color: "green" }} />
        ) : (
          <CloseIcon style={{ color: "red" }} />
        )}
        <br />
        <Accordion sx={{ boxShadow: 0 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Solution</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <img
              src={question.solution}
              style={{ width: "60%", marginBottom: "20px" }}
            />
          </AccordionDetails>
        </Accordion>
      </li>
    );
  });
  return (
    <>
      <StudentNavBar />
      <div
        style={{
          textAlign: "center",
          margin: "50px",
          fontWeight: "bold",
          display: "sticky",
        }}
      >
        {params.paper.split("_")[0]} {params.paper.split("_")[1]}{" "}
        {params.paper.split("_")[2]}
        <p style={{ fontWeight: "normal" }}>Score: {resultDisplay}%</p>
      </div>
      <div className="questions">
        <ol
          style={{
            backgroundColor: "white",
            marginLeft: "20px",
            marginRight: "20px",
            padding: "50px",
          }}
        >
          {displayQuestions}
        </ol>
      </div>
      <Grid container justifyContent="center" sx={{ marginBottom: "20px" }}>
        <Link to="/student_booking" style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            style={{ color: "black", borderColor: "black" }}
          >
            Book Consultation
          </Button>
        </Link>
      </Grid>
    </>
  );
};

export default PaperReview;

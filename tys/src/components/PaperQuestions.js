import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  Grid,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import StudentNavBar from "./StudentNavBar";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const PaperQuestions = () => {
  const user = useSelector((state) => state.user);
  const params = useParams();
  const history = useHistory();
  if (user.accessToken === "") {
    history.push("/");
  }
  //get the paper questions ordered by question number
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/papers/${params.paper}/`).then((res) => {
      console.log(res.data);
      setQuestions(res.data);
    });
  }, []);

  //print the questions and save the solutions
  const [answers, setAnswers] = useState([]);
  const printQuestions = questions.map((question, index) => {
    return (
      <li style={{ marginBottom: "10px" }}>
        <br />
        <img
          src={`${question.question_img}`}
          alt={`question ${index + 1}`}
          style={{ width: "60%", marginBottom: "20px" }}
        />
        <RadioGroup
          row
          onChange={(e) => {
            e.preventDefault();
            const currentAnswers = [...answers];
            currentAnswers[index] = e.target.value;
            setAnswers(currentAnswers);
            console.log(answers);
          }}
        >
          <FormControlLabel
            value="A"
            control={<Radio size="small" />}
            label="A"
          />
          <FormControlLabel
            value="B"
            control={<Radio size="small" />}
            label="B"
          />
          <FormControlLabel
            value="C"
            control={<Radio size="small" />}
            label="C"
          />
          <FormControlLabel
            value="D"
            control={<Radio size="small" />}
            label="D"
          />
        </RadioGroup>
      </li>
    );
  });
  console.log(questions);
  const handleSubmit = async (e) => {
    e.preventDefault();
    history.push(`/student/${params.paper}/review`);
    //get the right answers
    const solutions = [];
    questions.map((question) => {
      solutions.push(question.answer);
    });
    //marking
    const marking = [];
    for (let i = 0; i < solutions.length; i++) {
      marking.push(solutions[i] === answers[i]);
    }
    const accuracy =
      marking.filter((element) => element === true).length / marking.length;
    console.log(accuracy);
    //update review database
    const updateForReview = async (
      username,
      paper_id,
      question_number,
      question_img,
      answer,
      student_answer,
      accuracy,
      solution
    ) => {
      await axios.post("http://localhost:8000/students/papers/review/", {
        username: username,
        paper_id: paper_id,
        question_number: question_number,
        question_img: question_img,
        answer: answer,
        student_answer: student_answer,
        accuracy: accuracy,
        solution: solution,
      });
    };
    questions.map((question, index) => {
      updateForReview(
        user.username,
        question.paper_id,
        question.question_number,
        question.question_img,
        question.answer,
        answers[index],
        marking[index],
        question.solution
      );
    });
    //update the students papers table
    const update = await axios.put(
      `http://127.0.0.1:8000/students/papers/submit/${user.username}/${params.paper}/`,
      {
        results: accuracy,
      }
    );
  };
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
      </div>

      <div className="questions">
        <ol
          style={{
            paddingTop: "0",
            backgroundColor: "white",
            marginLeft: "20px",
            marginRight: "20px",
            padding: "50px",
          }}
        >
          {printQuestions}
        </ol>
      </div>
      <Grid container justifyContent="center" sx={{ marginBottom: "20px" }}>
        <Button
          variant="outlined"
          color="inherit"
          onClick={handleSubmit}
          disabled={answers.length < questions.length}
        >
          Submit
        </Button>
      </Grid>
    </>
  );
};

export default PaperQuestions;

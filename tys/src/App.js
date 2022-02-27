import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Booking from "./components/Booking";
import PaperQuestions from "./components/PaperQuestions";
import PaperReview from "./components/PaperReview";
import PaperStart from "./components/PaperStart";
import Public from "./components/Public";
import StudentConsultations from "./components/StudentConsultations";
import StudentHome from "./components/StudentHome";
import StudentRegister from "./components/StudentRegister";
import TutorConsultations from "./components/TutorConsultations";
import TutorRegister from "./components/TutorRegister";
import StudentProfile from "./components/StudentProfile";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user);
  return (
    <div style={{ minWidth: "600px" }}>
      <BrowserRouter>
        <Route exact path="/" component={Public} />
        <Route exact path="/student" component={StudentHome} />
        <Route exact path="/student_register" component={StudentRegister} />
        <Route exact path="/tutor" component={TutorConsultations} />
        <Route exact path="/tutor/register" component={TutorRegister} />
        <Route exact path="/student_profile" component={StudentProfile} />
        <Route exact path="/student/:paper" component={PaperStart} />
        <Route
          exact
          path="/student/:paper/questions"
          component={PaperQuestions}
        />
        <Route exact path="/student/:paper/review" component={PaperReview} />
        <Route
          exact
          path="/student_consultations"
          component={StudentConsultations}
        />
        <Route exact path="/student_booking" component={Booking} />
      </BrowserRouter>
    </div>
  );
}

export default App;

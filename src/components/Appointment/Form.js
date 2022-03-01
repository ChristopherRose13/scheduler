
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import React, { useState } from 'react';

export default function (props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const cancel = function () {
    setStudent("");
    setInterviewer("");

    props.onCancel();
  }

  const save = function () {
    props.onSave(student, interviewer)
  }


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={e => { e.preventDefault(); }}>
          <input
            className="appointment__create-input text--semi-bold"
            name="student"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}

          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          onChange={setInterviewer}
          value={interviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={save}>Save</Button>
        </section>
      </section>
    </main>
  )
}


import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import React from "react";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE = "ERROR_DELETE"


export default function Appointment (props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  function save(name, interviewer) {
    
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then((res) => {
      transition(SHOW);
    }).catch(
      (err) => transition(ERROR_SAVE)
    )
    
  }

    function deleteInterview() {
      transition(DELETE, true);
      props.cancelInterview(props.id)
      .then((res) => transition(EMPTY))
      .catch((err) => transition(ERROR_DELETE, true))
      
    }

    function edit(){
      transition(EDIT)
    }


  return (
    <article className="appointment"><Header time={props.time}/>
    {/* {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>} */}
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onDelete={()=> {transition(CONFIRM)}}
      onEdit={edit}
      />
    )}
    {mode === CREATE && 
    <Form 
    interviewers={props.interviewers} 
    onCancel={back}
    onSave={save}
    
    />}
    {mode === EDIT && 
    <Form 
    interviewers={props.interviewers}
    student={props.interview.student}
    interviewer={props.interview.interviewer.id}
    onCancel={()=>back()}
    onSave={save}
    />}
    {mode === SAVING && <Status message={"Saving"}/>}
    {mode === DELETE && <Status message={"Deleting"}/>}
    {mode === CONFIRM && <Confirm onConfirm={deleteInterview} onCancel={()=>back()}/>}
    {mode === ERROR_DELETE && <Error message={"could not delete appointment"}onClose={()=> back()}/>}
    {mode === ERROR_SAVE && <Error message={"Could not save appointment"} onClose={()=> back()}/>}

    </article>
  )
}


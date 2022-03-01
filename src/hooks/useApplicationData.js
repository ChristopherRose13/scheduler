import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      // console.log(all[0]); // first
      // console.log(all[1]); // second
      // console.log(all[2]); // third

      const [days, appointments, interviewers] = all;
      console.log(days)
      setState(prev => ({ ...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data }));
      console.log("axios interviewers: ", interviewers.data)
    });
  }, [])

  const setDay = day => setState({ ...state, day });

  function findDay(day) {
    const daysOfWeek = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4,
    };
    return daysOfWeek[day];
  }

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment, ).then(
      (res) => {

        const dayOfWeek = findDay(state.day);
        let day = {
          ...state.days[dayOfWeek],
          spots: state.days[dayOfWeek],
        };

        if (!state.appointments[id].interview) {
          day = {
            ...state.days[dayOfWeek],
            spots: state.days[dayOfWeek].spots - 1,
          };
        } else {
          day = {
            ...state.days[dayOfWeek],
            spots: state.days[dayOfWeek].spots,
          };
        }

        let days = state.days;
        days[dayOfWeek] = day;
        
        setState({
          ...state,
          appointments
        });
      }
    )
  }

  function cancelInterview(id) {
    console.log(id);
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`http://localhost:8001/api/appointments/${id}`, {appointment}).then(
      (res) => {
        //calculate num spots

        const dayOfWeek = findDay(state.day);

        const day = {
          ...state.days[dayOfWeek],
          spots: state.days[dayOfWeek].spots + 1,
        };
    
        let days = state.days;
        days[dayOfWeek] = day;
        
        setState({
          ...state,
          appointments
        })
        
      }
    )
  }

  return {cancelInterview, bookInterview, setDay, state}
}
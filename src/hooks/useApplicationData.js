import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

//on start up to get data from servers
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

      const [days, appointments, interviewers] = all;
      setState(prev => ({ ...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data }));
    });
  }, [])

  const setDay = day => setState({ ...state, day });

  //used for calculating number of available spots - makes string day into an index for the array
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

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment,).then(
      (res) => {

        //updates the number of spots remaining for the day
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

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`http://localhost:8001/api/appointments/${id}`, { appointment }).then(
      (res) => {
        //calculate num spots remaining for day after db has been updated
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

  return { cancelInterview, bookInterview, setDay, state }
}
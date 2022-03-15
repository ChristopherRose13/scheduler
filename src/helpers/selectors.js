//returns the appoints when user selects a day
export function getAppointmentsForDay(state, day) {
  const apps = [];
  const daysApps = [];
  const matchedDays = state.days.filter(period => period.name === day);
  for (const day of matchedDays) {

    apps.push(...day.appointments)
  }

  for (const app of apps) {

    if (state.appointments[app]) {
      daysApps.push(state.appointments[app])
    }
  }

  return daysApps;
}

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }

  let formattedInterview = {};
  formattedInterview["student"] = interview.student
  formattedInterview["interviewer"] = state.interviewers[interview.interviewer]

  return formattedInterview;
}

//list interviewers for the user to choose from when creating new interview
export function getInterviewersForDay(state, day) {

  const interviewers = [];
  const matchedDay = state.days.find(period => day === period.name);

  if (!matchedDay) {
    return []
  }

  for (const id of matchedDay.interviewers) {

    if (state.interviewers[id]) {
      interviewers.push(state.interviewers[id])
    }
  }

  return interviewers;
}
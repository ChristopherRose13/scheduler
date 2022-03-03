import React from "react";
import DayListItem from "./DayListItems";

export default function DayList(props) {
  const { days } = props;
  let formatDays = days.map((day) => {
    return <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.value}
      setDay={props.onChange}
    />
  })
  return (
    <ul>{formatDays}</ul>
  );
}
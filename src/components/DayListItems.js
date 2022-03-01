import React from "react";
import "./DayListItems.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const DayListItemClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full" : props.spots === 0
  })
  let {spots} = props;

  return (
    <li onClick={() => props.setDay(props.name)} className={DayListItemClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}

const formatSpots = function (spots) {

  if (!spots) {
    return "no spots remaining";
  } 
  
  if (spots === 1){
    return `1 spot remaining`;
  }

  return `${spots} spots remaining`;
}
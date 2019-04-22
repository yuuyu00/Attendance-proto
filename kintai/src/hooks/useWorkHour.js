export default (startTime, endTime) => {
  let notContainOvertimeHour =
    (new Date(endTime).getTime() - new Date(startTime).getTime()) /
      (1000 * 60 * 60) -
    1;

  let WorkHour = 0;
  if (notContainOvertimeHour > 9.75) {
    if (notContainOvertimeHour < 10.3) {
      WorkHour = 9.75;
    } else {
      WorkHour = notContainOvertimeHour - 0.5;
    }
  } else {
    if (notContainOvertimeHour < 8.25) {
      WorkHour = 7.75;
    } else {
      WorkHour = notContainOvertimeHour;
    }
  }

  return WorkHour;
};

const filterGamesWithTimeRange = (result) => {
  const response = {
    Live: [],
    Finished: {},
    "Not Started": {},
  };
  const liveStatus = [
    "Quarter 1",
    "Quarter 2",
    "Quarter 3",
    "Q4 : Quarter 4",
    "Over Time",
    "Break Time",
    "Halftime",
    "LIVE",
  ];
  const finshedStatus = ["Game Finished", "After Over Time", "Game Awarded"];
  const notStarted = ["Not Started"];
  let today = new Date();
  let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  let tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
  let today_date = today.toISOString().split("T")[0];
  let yesterday_date = yesterday.toISOString().split("T")[0];
  let tomorrow_date = tomorrow.toISOString().split("T")[0];
  let from = new Date(new Date().setDate(new Date().getDate() - 10));
  let to = new Date(new Date().setDate(new Date().getDate() + 10));
  today = matchDayOfWeek(today);
  yesterday = matchDayOfWeek(yesterday);
  tomorrow = matchDayOfWeek(tomorrow);
  let resultCounter = 0;

  const res = classifyData(
    result,
    response,
    from,
    to,
    liveStatus,
    finshedStatus,
    notStarted,
    today,
    yesterday,
    tomorrow,
    today_date,
    yesterday_date,
    tomorrow_date,
    resultCounter
  );
  result.response = res.response;
  result.results = res.resultCounter;
  return result;
};

const matchDayOfWeek = (date) => {
  var weekdays = new Array(7);
  weekdays[0] = "Sunday";
  weekdays[1] = "Monday";
  weekdays[2] = "Tuesday";
  weekdays[3] = "Wednesday";
  weekdays[4] = "Thursday";
  weekdays[5] = "Friday";
  weekdays[6] = "Saturday";
  return weekdays[date.getUTCDay()];
};

const classifyData = (
  result,
  response,
  from,
  to,
  liveStatus,
  finshedStatus,
  notStarted,
  today,
  yesterday,
  tomorrow,
  today_date,
  yesterday_date,
  tomorrow_date,
  resultCounter
) => {
  for (let i = 0; i < result.response.length; i++) {
    if (
      new Date(result.response[i].date) >= from &&
      new Date(result.response[i].date) <= to
    ) {
      resultCounter++;
      const dayofWeek = matchDayOfWeek(new Date(result.response[i].date));
      if (liveStatus.includes(result.response[i].status.long)) {
        response["Live"].push(result.response[i]);
      } else if (finshedStatus.includes(result.response[i].status.long)) {
        if (dayofWeek in response["Finished"]) {
          if (
            dayofWeek == today &&
            new Date(result.response[i].date).toISOString().split("T")[0] ==
              today_date
          ) {
            if ("Today" in response["Finished"])
              response["Finished"]["Today"].push([result.response[i]]);
            else response["Finished"]["Today"] = [result.response[i]];
          } else if (
            dayofWeek == yesterday &&
            new Date(
              new Date(result.response[i].date).setDate(
                new Date().getDate() - 1
              )
            )
              .toISOString()
              .split("T")[0] === yesterday_date
          ) {
            if ("Yesterday" in response["Finished"])
              response["Finished"]["Yesterday"].push(result.response[i]);
            else response["Finished"]["Yesterday"] = [result.response[i]];
          } else response["Finished"][dayofWeek].push(result.response[i]);
        } else {
          if (
            dayofWeek == today &&
            new Date(result.response[i].date).toISOString().split("T")[0] ==
              today_date
          ) {
            if ("Today" in response["Finished"])
              response["Finished"]["Today"].push([result.response[i]]);
            else response["Finished"]["Today"] = [result.response[i]];
          } else if (
            dayofWeek == yesterday &&
            new Date(
              new Date(result.response[i].date).setDate(
                new Date().getDate() - 1
              )
            )
              .toISOString()
              .split("T")[0] === yesterday_date
          ) {
            if ("Yesterday" in response["Finished"])
              response["Finished"]["Yesterday"].push(result.response[i]);
            else response["Finished"]["Yesterday"] = [result.response[i]];
          } else response["Finished"][dayofWeek] = [result.response[i]];
        }
      } else if (notStarted.includes(result.response[i].status.long)) {
        if (dayofWeek in response["Not Started"]) {
          if (
            dayofWeek == today &&
            new Date(result.response[i].date).toISOString().split("T")[0] ==
              today_date
          ) {
            if ("Today" in response["Not Started"])
              response["Not Started"]["Today"].push([result.response[i]]);
            else response["Not Started"]["Today"] = [result.response[i]];
          } else if (
            dayofWeek == tomorrow &&
            new Date(
              new Date(result.response[i].date).setDate(
                new Date().getDate() + 1
              )
            )
              .toISOString()
              .split("T")[0] === tomorrow_date
          ) {
            if ("Tommorrow" in response["Not Started"])
              response["Not Started"]["Tommorrow"].push(result.response[i]);
            else response["Not Started"]["Tommorrow"] = [result.response[i]];
          } else {
            response["Not Started"][dayofWeek].push(result.response[i]);
          }
        } else {
          if (
            dayofWeek == today &&
            new Date(result.response[i].date).toISOString().split("T")[0] ==
              today_date
          ) {
            if ("Today" in response["Not Started"])
              response["Not Started"]["Today"].push([result.response[i]]);
            else response["Not Started"]["Today"] = [result.response[i]];
          } else if (
            dayofWeek == tomorrow &&
            new Date(
              new Date(result.response[i].date).setDate(
                new Date().getDate() + 1
              )
            )
              .toISOString()
              .split("T")[0] === tomorrow_date
          ) {
            if ("Tommorrow" in response["Not Started"])
              response["Not Started"]["Tommorrow"].push(result.response[i]);
            else response["Not Started"]["Tommorrow"] = [result.response[i]];
          } else {
            response["Not Started"][dayofWeek] = [result.response[i]];
          }
        }
      }
    }
  }
  return { response, resultCounter };
};
module.exports = {
  filterGamesWithTimeRange,
};

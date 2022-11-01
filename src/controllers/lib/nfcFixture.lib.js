const filterGamesWithTimeRange = (result) => {
  const response = {
    Live: [],
    Finished: {},
    "Not Started": {},
  };
  const liveStatus = [
    "Round 1",
    "Round 2",
    "Round 3",
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
    tomorrow_date
  );
  result = res;
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
  tomorrow_date
) => {
  for (let i = 0; i < result.length; i++) {
    if (new Date(result[i].date) >= from && new Date(result[i].date) <= to) {
      const dayofWeek = matchDayOfWeek(new Date(result[i].date));
      if (liveStatus.includes(result[i].status.long)) {
        response["Live"].push(result[i]);
      } else if (finshedStatus.includes(result[i].status.long)) {
        if (dayofWeek in response["Finished"]) {
          if (
            dayofWeek == today &&
            new Date(result[i].date).toISOString().split("T")[0] == today_date
          ) {
            if ("Today" in response["Finished"])
              response["Finished"]["Today"].push([result[i]]);
            else response["Finished"]["Today"] = [result[i]];
          } else if (
            dayofWeek == yesterday &&
            new Date(new Date(result[i].date).setDate(new Date().getDate() - 1))
              .toISOString()
              .split("T")[0] === yesterday_date
          ) {
            if ("Yesterday" in response["Finished"])
              response["Finished"]["Yesterday"].push(result[i]);
            else response["Finished"]["Yesterday"] = [result[i]];
          } else response["Finished"][dayofWeek].push(result[i]);
        } else {
          if (
            dayofWeek == today &&
            new Date(result[i].date).toISOString().split("T")[0] == today_date
          ) {
            if ("Today" in response["Finished"])
              response["Finished"]["Today"].push([result[i]]);
            else response["Finished"]["Today"] = [result[i]];
          } else if (
            dayofWeek == yesterday &&
            new Date(new Date(result[i].date).setDate(new Date().getDate() - 1))
              .toISOString()
              .split("T")[0] === yesterday_date
          ) {
            if ("Yesterday" in response["Finished"])
              response["Finished"]["Yesterday"].push(result[i]);
            else response["Finished"]["Yesterday"] = [result[i]];
          } else response["Finished"][dayofWeek] = [result[i]];
        }
      } else if (notStarted.includes(result[i].status.long)) {
        if (dayofWeek in response["Not Started"]) {
          if (
            dayofWeek == today &&
            new Date(result[i].date).toISOString().split("T")[0] == today_date
          ) {
            if ("Today" in response["Not Started"])
              response["Not Started"]["Today"].push([result[i]]);
            else response["Not Started"]["Today"] = [result[i]];
          } else if (
            dayofWeek == tomorrow &&
            new Date(new Date(result[i].date).setDate(new Date().getDate() + 1))
              .toISOString()
              .split("T")[0] === tomorrow_date
          ) {
            if ("Tommorrow" in response["Not Started"])
              response["Not Started"]["Tommorrow"].push(result[i]);
            else response["Not Started"]["Tommorrow"] = [result[i]];
          } else {
            response["Not Started"][dayofWeek].push(result[i]);
          }
        } else {
          if (
            dayofWeek == today &&
            new Date(result[i].date).toISOString().split("T")[0] == today_date
          ) {
            if ("Today" in response["Not Started"])
              response["Not Started"]["Today"].push([result[i]]);
            else response["Not Started"]["Today"] = [result[i]];
          } else if (
            dayofWeek == tomorrow &&
            new Date(new Date(result[i].date).setDate(new Date().getDate() + 1))
              .toISOString()
              .split("T")[0] === tomorrow_date
          ) {
            if ("Tommorrow" in response["Not Started"])
              response["Not Started"]["Tommorrow"].push(result[i]);
            else response["Not Started"]["Tommorrow"] = [result[i]];
          } else {
            response["Not Started"][dayofWeek] = [result[i]];
          }
        }
      }
    }
  }
  return response;
};
module.exports = {
  filterGamesWithTimeRange,
};

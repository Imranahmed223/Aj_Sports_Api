const categorizeMatches = async (result) => {
  const response = {
    Live: [],
    Finished: {},
    "Not Started": {},
  };
  const liveStatus = [
    "First Half",
    "Kick Off",
    "Halftime",
    "Second Half, 2nd Half Started",
    "Extra Time",
    "Penalty In Progress",
    "Break Time (in Extra Time)",
    "LIVE",
  ];
  const finshedStatus = [
    "Match Finished",
    "Match Finished After Extra Time",
    "Match Finished After Penalty",
  ];
  const notStarted = ["Not Started", "Time To Be Defined"];
  let today = new Date();
  let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  let tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
  let today_date = today.toISOString().split("T")[0];
  let yesterday_date = yesterday.toISOString().split("T")[0];
  let tomorrow_date = tomorrow.toISOString().split("T")[0];
  today = matchDayOfWeek(today);
  yesterday = matchDayOfWeek(yesterday);
  tomorrow = matchDayOfWeek(tomorrow);
  const newResult = classifyData(
    result,
    response,
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
  result.response = newResult;
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
  for (let i = 0; i < result.response.length; i++) {
    const dayofWeek = matchDayOfWeek(new Date(result.response[i].fixture.date));
    if (liveStatus.includes(result.response[i].fixture.status.long)) {
      response["Live"].push(result.response[i]);
    } else if (finshedStatus.includes(result.response[i].fixture.status.long)) {
      if (dayofWeek in response["Finished"]) {
        if (
          dayofWeek == today &&
          new Date(result.response[i].fixture.date)
            .toISOString()
            .split("T")[0] == today_date
        ) {
          if ("Today" in response["Finished"])
            response["Finished"]["Today"].push([result.response[i]]);
          else response["Finished"]["Today"] = [result.response[i]];
        } else if (
          dayofWeek == yesterday &&
          new Date(
            new Date(result.response[i].fixture.date).setDate(
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
          new Date(result.response[i].fixture.date)
            .toISOString()
            .split("T")[0] == today_date
        ) {
          if ("Today" in response["Finished"])
            response["Finished"]["Today"].push([result.response[i]]);
          else response["Finished"]["Today"] = [result.response[i]];
        } else if (
          dayofWeek == yesterday &&
          new Date(
            new Date(result.response[i].fixture.date).setDate(
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
    } else if (notStarted.includes(result.response[i].fixture.status.long)) {
      if (dayofWeek in response["Not Started"]) {
        if (
          dayofWeek == today &&
          new Date(result.response[i].fixture.date)
            .toISOString()
            .split("T")[0] == today_date
        ) {
          if ("Today" in response["Not Started"])
            response["Not Started"]["Today"].push([result.response[i]]);
          else response["Not Started"]["Today"] = [result.response[i]];
        } else if (
          dayofWeek == tomorrow &&
          new Date(
            new Date(result.response[i].fixture.date).setDate(
              new Date().getDate() + 1
            )
          )
            .toISOString()
            .split("T")[0] === tomorrow_date
        ) {
          if ("Tommorrow" in response["Not Started"])
            response["Not Started"]["Tommorrow"].push(result.response[i]);
          else response["Not Started"]["Tommorrow"] = [result.response[i]];
        } else response["Not Started"][dayofWeek].push(result.response[i]);
      } else {
        if (
          dayofWeek == today &&
          new Date(result.response[i].fixture.date)
            .toISOString()
            .split("T")[0] == today_date
        ) {
          if ("Today" in response["Not Started"])
            response["Not Started"]["Today"].push([result.response[i]]);
          else response["Not Started"]["Today"] = [result.response[i]];
        } else if (
          dayofWeek == tomorrow &&
          new Date(
            new Date(result.response[i].fixture.date).setDate(
              new Date().getDate() + 1
            )
          )
            .toISOString()
            .split("T")[0] === tomorrow_date
        ) {
          if ("Tommorrow" in response["Not Started"])
            response["Not Started"]["Tommorrow"].push(result.response[i]);
          else response["Not Started"]["Tommorrow"] = [result.response[i]];
        } else response["Not Started"][dayofWeek] = [result.response[i]];
      }
    }
  }
  return response;
};
module.exports = {
  categorizeMatches,
};

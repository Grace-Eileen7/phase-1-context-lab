/* Your Code Here */
// Create a single employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}

// Create multiple employee records
function createEmployeeRecords(arrays) {
  return arrays.map(createEmployeeRecord);
}

// Add a time in event using `this`
function createTimeInEvent(dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date,
  });
  return this;
}

// Add a time out event using `this`
function createTimeOutEvent(dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date,
  });
  return this;
}

// Compute hours worked on a date using `this`
function hoursWorkedOnDate(date) {
  const inEvent = this.timeInEvents.find((e) => e.date === date);
  const outEvent = this.timeOutEvents.find((e) => e.date === date);
  return (outEvent.hour - inEvent.hour) / 100;
}

// Compute wages earned on a date using `this`
function wagesEarnedOnDate(date) {
  return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // 👈 keeps context inside reduce

  return payable;
};

// Find employee by first name
function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find((record) => record.firstName === firstName);
}

// Calculate total payroll
function calculatePayroll(employees) {
  return employees.reduce((total, employee) => {
    return total + allWagesFor.call(employee);
  }, 0);
}

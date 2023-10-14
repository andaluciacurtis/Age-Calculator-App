const enterButton = document.querySelector(".arrow-button");

const dayResult = document.querySelector(".day-result");
const monthResult = document.querySelector(".month-result");
const yearResult = document.querySelector(".year-result");

const dayInputContainer = document.querySelector(".day-container");
const monthInputContainer = document.querySelector(".month-container");
const yearInputContainer = document.querySelector(".year-container");

enterButton.addEventListener("click", ()=>{
  resetAll();
  calculateAge();
});

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;
const currentDay = currentDate.getDate();

function calculateAge() {
  let dayInput = dayInputContainer.querySelector(".day-input").value;
  let monthInput = monthInputContainer.querySelector(".month-input").value;
  let yearInput = yearInputContainer.querySelector(".year-input").value;
  
  if (checkDate(dayInput, monthInput, yearInput)) {
    resetErrors();

    let daysAlive = 0;
    let monthsAlive = 0;
    let yearsAlive = 0;

    // calculating years
    yearsAlive = currentYear - yearInput;

    //calculating months
    if (currentMonth >= monthInput) {
      monthsAlive = currentMonth - monthInput;
    } else {
      monthsAlive = 12 - (monthInput - currentMonth);
      yearsAlive--;
    }

    //calculating days
    if (dayInput < currentDay) {
      daysAlive = currentDay - dayInput;
    } else { //dayInput > currentDay
      let lastMonth = currentMonth - 1;
      monthsAlive--;

      if (lastMonth == 4 || lastMonth == 6 || lastMonth == 9 || lastMonth == 11) {
        daysAlive = (30 - dayInput) + currentDay;
      } else if (lastMonth == 2) {
        isLeapYear =  ((currentYear % 4 == 0) && (currentYear % 100 != 0)) || (currentYear % 400 == 0);
        isLeapYear ? daysAlive = (29 - dayInput) + currentDay : daysAlive = (28 - dayInput) + currentDay;
      } else { //31 days
        daysAlive = (31 - dayInput) + currentDay
      }
    }
    
    yearResult.innerHTML = yearsAlive;
    monthResult.innerHTML = monthsAlive;
    dayResult.innerHTML = daysAlive;
  }
}

function checkDate(day, month, year) {
  let isValid = true;

  // checks if any fields are empty
  if (day === "") {
    returnError(dayInputContainer, "This field is required");
    isValid = false;
  }
  
  if (month === "") {
    returnError(monthInputContainer, "This field is required");
    isValid = false;
  }

  if (year === "") {
    returnError(yearInputContainer, "This field is required");
    isValid = false;
  }

  // checks if the year is a leap year
  // leap years are either multiples of 400, of multiples of 4 and not of 100
  let isLeapYear =  ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);

  // checks if month if valid
  if (month > 12) {
    returnError(monthInputContainer, "Must be a valid month.");
    isValid = false;
  }

  // checks if day is valid
  if (day > 31 || 
    ((month == 4 || month == 6 || month == 9 || month == 11) && day > 30) || 
    (month == 2 && ((isLeapYear && day > 29) || (!isLeapYear && day > 28)))) {
      returnError(dayInputContainer, "Must be a valid day.");
      isValid = false;
  }

  // checking to see if the input date is greater than today's date
  if (year > currentYear || (year == currentYear && (month > currentMonth || (month == currentMonth && day > currentDay)))) {
      returnError(yearInputContainer, "Must be in the past.");
      isValid = false;
  }

  return isValid;
}

function returnError(field, errorMessage) {
  errorText = field.querySelector(".error");
  errorText.innerHTML = errorMessage;

  // changing the field's title and input box to red
  field.querySelector("h2").style.color = "hsl(0, 100%, 67%)";
  field.querySelector("input").style.border = "1px solid hsl(0, 100%, 67%)";
}

// RESET FUNCTIONS
function resetAll() {
  resetErrors();
  dayResult.innerHTML = "--";
  monthResult.innerHTML = "--";
  yearResult.innerHTML = "--";
}

function resetErrors() {
  containers = [dayInputContainer, monthInputContainer, yearInputContainer];

  containers.forEach(function(container) {
    container.querySelector("h2").style.color = "hsl(0, 1%, 44%)";
    container.querySelector("input").style.border = "1px solid hsl(0, 0%, 94%)";
    container.querySelector(".error").innerHTML = "";
  })
}
const enterButton = document.querySelector(".arrow-button");

const dayResult = document.querySelector(".day-result");
const monthResult = document.querySelector(".month-result");
const yearResult = document.querySelector(".year-result");

const dayInputContainer = document.querySelector(".day-container");
const monthInputContainer = document.querySelector(".month-container");
const yearInputContainer = document.querySelector(".year-container");

enterButton.addEventListener("click", ()=>{
  reset();
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
    console.log("yeah that works");

    yearResult.innerHTML = currentYear - yearInput;
  }
}

function reset() {
  errorText = document.querySelectorAll(".error");
  errorText.forEach(function(section) {
    section.innerHTML = "";
  })
}

function checkDate(day, month, year) {
  let isValid = true;

  // checks if the year is a leap year
  // leap years are either multiples of 400, of multiples of 4 and not of 100
  let isLeapYear = ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);

  // checks if month if valid
  if (month < 1 || month > 12) {
    errorText = monthInputContainer.querySelector(".error");
    errorText.innerHTML = "Must be a valid month.";
    isValid = false;
  }

  // checks if day is valid
  if (day > 31 || 
    ((month == 4 || month == 6 || month == 9 || month == 11) && day > 30) || 
    (month == 2 && ((isLeapYear && day > 29) || (!isLeapYear && day > 28)))) {
    errorText = dayInputContainer.querySelector(".error");
    errorText.innerHTML = "Must be a valid day.";
    isValid = false;
  }

  // checking to see if the input date is greater than today's date
  if (year > currentYear || (year == currentYear && (month > currentMonth || (month == currentMonth && day > currentDay)))) {
    errorText = yearInputContainer.querySelector(".error");
    errorText.innerHTML = "Must be in the past."
    isValid = false;
  }

  return isValid;
}
const enterButton = document.querySelector(".arrow-button");

enterButton.addEventListener("click", calculateAge);



const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;
const currentDay = currentDate.getDate();

function calculateAge() {
  let dayInput = document.querySelector(".day-input").value;
  let monthInput = document.querySelector(".month-input").value;
  let yearInput = document.querySelector(".year-input").value;
  
  if (checkDate(dayInput, monthInput, yearInput)) {
    console.log("yeah that works");
  } else {
    console.log("no");
  }
}

function checkDate(day, month, year) {
  // checking to see if the input date is greater than today's date
  if (year > currentYear || (year == currentYear && (month > currentMonth || (month == currentMonth && day > currentDay)))) {
    return false;
  }

  return true;
}
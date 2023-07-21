console.log("hello");
const seconds = document.getElementById("seconds");
const minutess = document.getElementById("minutes");
const hourss = document.getElementsByClassName("hours");
const reset = document.getElementById("reset");

let second = 55;
let minutes = 59;
let hours = 0;

console.log(hourss[0]);

let timer;
function Timer() {
  timer = setInterval(function () {
    if (second >= 60) {
      minutes += 1;
      second = 0;
    }
    if (minutes >= 60) {
      hours += 1;
      minutes = 0;
    }
    setTime();
    second += 1;
  }, 1000);
}

const stopTimer = () => {
  clearInterval(timer);
};
const startTimer = () => {
  clearInterval(timer);
  Timer();
};
const restartTimer = () => {
  second = 0;
  minutes = 0;
  hours = 0;
  setTime();
};
const setTime = () => {
  seconds.innerHTML = second <= 10 ? "0" + second : second;
  minutess.innerHTML = minutes <= 10 ? "0" + minutes : minutes;
  hourss[0].innerHTML = hours <= 10 ? "0" + hours : hours;
};

const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const four = document.getElementById("four");
const number = document.getElementsByClassName("number");

const arr = [];
let newArr = [];

const createNum = (number) => {
  newArr.push(number);
};
const createRandomNum = () => {
  const num = Math.floor(Math.random() * 4) + 1;
  arr.push(num);
  alert(num);
};

const checkNumber = () => {
  newArr.map((item, i) => {
    console.log(arr[i], item);
    if (item !== arr[i]) {
      console.log("lose");
    }
    console.log(arr.length, i + 1);
    if (i + 1 === arr.length) {
      createRandomNum();
      newArr = [];
    }
  });
};
createRandomNum();
one.addEventListener("click", function (e) {
  console.log();
  createNum(1);
  checkNumber();
});
two.addEventListener("click", function (e) {
  console.log();
  createNum(2);
  checkNumber();
});
three.addEventListener("click", function (e) {
  console.log();
  createNum(3);
  checkNumber();
});
four.addEventListener("click", function (e) {
  console.log();
  createNum(4);
  checkNumber();
});

const one = document.getElementById("green");
const two = document.getElementById("red");
const three = document.getElementById("yellow");
const four = document.getElementById("blue");
const number = document.getElementsByClassName("number");
const notification = document.getElementsByClassName("notification");
const level = document.getElementById("level-title");
let Started = false;

const blue = new Audio("./sounds/blue.mp3");
const green = new Audio("./sounds/green.mp3");
const red = new Audio("./sounds/red.mp3");
const yellow = new Audio("./sounds/yellow.mp3");
const wrong = new Audio("./sounds/wrong.mp3");

let arr = [];
let newArr = [];
if (newArr.length > 0) {
}

document.addEventListener("keydown", function (event) {
  document.body.style.backgroundColor = "#011F3F";
  // Run your JavaScript function here
  if (!Started) {
    console.log("Key pressed:", event.key);
    createRandomNum();
    Started = true;
    console.log(Started);
    newArr = [];
    level.innerHTML = "Game Started";
  }
});

const createNum = (number) => {
  newArr.push(number);
};
const createRandomNum = () => {
  const num = Math.floor(Math.random() * 4) + 1;
  arr.push(num);
  if (num === 1) {
    // one.classList.add("pressed");
    setTimeout(function () {
      one.classList.add("pressed");
      green.play();
    }, 500);
    setTimeout(function () {
      one.classList.remove("pressed");
    }, 700);
  }
  if (num === 2) {
    // two.classList.add("pressed");
    setTimeout(function () {
      red.play();
      two.classList.add("pressed");
    }, 500);
    setTimeout(function () {
      two.classList.remove("pressed");
    }, 700);
  }
  if (num === 3) {
    // three.classList.add("pressed");
    setTimeout(function () {
      yellow.play();
      three.classList.add("pressed");
    }, 500);
    setTimeout(function () {
      three.classList.remove("pressed");
    }, 700);
  }
  if (num === 4) {
    // four.classList.add("pressed");
    setTimeout(function () {
      blue.play();
      four.classList.add("pressed");
    }, 500);
    setTimeout(function () {
      four.classList.remove("pressed");
    }, 700);
  }
};
const checkNumber = () => {
  console.log(arr);
  console.log(newArr);
  newArr.map((item, i) => {
    console.log(arr[i], item);
    if (item !== arr[i]) {
      console.log("lose");
      Started = false;
      level.innerHTML =
        "Haar Gaye na bhai sahab! agli baar dhyaan se dabana, press any key to Restart";
      arr = [];
      newArr = [];
      document.body.style.backgroundColor = "red";
      wrong.play();
    } else if (i + 1 === arr.length) {
      createRandomNum();
      newArr = [];
      level.innerHTML = `Level ${i + 1}`;
    }
  });
};
// console.log(Started);
// if (Started === true) {
one.addEventListener("click", function (e) {
  green.play();
  console.log();
  createNum(1);
  checkNumber();
  one.classList.add("pressed");
  setTimeout(function () {
    one.classList.remove("pressed");
  }, 100);
});
two.addEventListener("click", function (e) {
  red.play();
  console.log();
  createNum(2);
  checkNumber();
  two.classList.add("pressed");
  setTimeout(function () {
    two.classList.remove("pressed");
  }, 100);
});
three.addEventListener("click", function (e) {
  yellow.play();
  console.log();
  createNum(3);
  checkNumber();
  three.classList.add("pressed");
  setTimeout(function () {
    three.classList.remove("pressed");
  }, 100);
});
four.addEventListener("click", function (e) {
  blue.play();
  console.log();
  createNum(4);
  checkNumber();
  four.classList.add("pressed");
  setTimeout(function () {
    four.classList.remove("pressed");
  }, 100);
});
// }

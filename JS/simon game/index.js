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

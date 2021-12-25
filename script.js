  // Final constent varibales for the circles
const NUM_OF_SHAPES = 100;
const MIN_RADIUS = 10,
 MAX_RADIUS = 80;

// Final constent varibales for the rectangles
const MAX_WIDTH = 100,
 MAX_HEIGHT = 80,
 MIN_WIDTH = 10,
 MIN_HEIGHT = 8;

// helper functions

// the funcsion below generate a random number between two given numbers
const getRandomNumber = (min, max) => {
 let rndNumber = Math.random() * (max - min) + min;
 if (rndNumber % 1 >= 0.5) {
 rndNumber = Math.ceil(rndNumber);
 } else {
 rndNumber = Math.floor(rndNumber);
 }
 return rndNumber;
};

// the function below generate random numbers between 0 to 255 for the shapes color
const getColorCode = () => {
 let redValue, greenValue, blueValue;
 redValue = getRandomNumber(0, 255);
 greenValue = getRandomNumber(0, 255);
 blueValue = getRandomNumber(0, 255);

 return `rgb(${redValue},${greenValue},${blueValue} )`;
};

const drawCircle = (canvas) => {
 let xCoordinate, yCoordinate, radius;
 const ctx = canvas.getContext("2d");

 radius = getRandomNumber(MIN_RADIUS, MAX_RADIUS);
 xCoordinate = getRandomNumber(MAX_RADIUS, MAX_RADIUS * 9);
 yCoordinate = getRandomNumber(MAX_RADIUS, MAX_RADIUS * 9);

 ctx.beginPath();
 ctx.arc(xCoordinate, yCoordinate, radius, 0, 2 * Math.PI);
 circleWidth = getRandomNumber(1, 10);
 ctx.strokeStyle = getColorCode();

 ctx.stroke();
};

const drawRectangle = (canvasRec) => {
 let recWidth, recHeight, xCoordinate, yCoordinate;
 const ctx = canvasRec.getContext("2d");

 xCoordinate = getRandomNumber(MAX_WIDTH, MAX_WIDTH * 6);
 yCoordinate = getRandomNumber(MAX_HEIGHT, MAX_HEIGHT * 8);
 recWidth = getRandomNumber(MIN_WIDTH, MAX_WIDTH);
 recHeight = getRandomNumber(MIN_HEIGHT, MAX_HEIGHT);

 ctx.beginPath();
 ctx.rect(xCoordinate, yCoordinate, recWidth, recHeight);
 circleWidth = getRandomNumber(1, 10);
 ctx.strokeStyle = getColorCode();

 ctx.stroke();
};

if (window.location.pathname === "/index.html") {
 // #1: one circle

 const circleButton = document.getElementById("drawCircle");

 const canvasForCircle = document.getElementById("circle-canvas");

 circleButton.addEventListener("click", function () {
 const ctxCircle = canvasForCircle.getContext("2d");
 ctxCircle.clearRect(0, 0, canvasForCircle.width, canvasForCircle.height);
 drawCircle(canvasForCircle);
 });

 // #2: 100 circles

 const hundredCirclesButton = document.getElementById("drawHundredCircles");

 const hundredCirclesCanvas = document.getElementById("hundredCircles-canvas");

 hundredCirclesButton.addEventListener("click", function () {
 const ctx = hundredCirclesCanvas.getContext("2d");
 ctx.clearRect(
 0,
 0,
 hundredCirclesCanvas.width,
 hundredCirclesCanvas.height
 );
 for (let i = 0; i < NUM_OF_SHAPES; i++) {
 drawCircle(hundredCirclesCanvas);
 }
 });

 // #3: one rectangle

 const rectangleButton = document.getElementById("drawRectangle");
 const rectangleCanvas = document.getElementById("rectangle-canvas");

 rectangleButton.addEventListener("click", function () {
 const ctxRectangle = rectangleCanvas.getContext("2d");
 ctxRectangle.clearRect(0, 0, rectangleCanvas.width, rectangleCanvas.height);
 drawRectangle(rectangleCanvas);
 });

 // #4: 100 rectangles

 const hundredRectanglesButton = document.getElementById(
 "drawHundredRectangles"
 );
 const hundredRectanglesCanvas = document.getElementById(
 "hundredRectangles-canvas"
 );

 hundredRectanglesButton.addEventListener("click", function () {
 let numOfrectangles = +prompt("Please enter a number of rectangles:");
 const ctxRectangle = hundredRectanglesCanvas.getContext("2d");
 ctxRectangle.clearRect(
 0,
 0,
 hundredRectanglesCanvas.width,
 hundredRectanglesCanvas.height
 );
 for (let i = 0; i < numOfrectangles; i++) {
 drawRectangle(hundredRectanglesCanvas);
 }
 });
}

// script for the from rectangle
if (window.location.pathname === "/formForRectangle.html") {
 // 5: Form canvas

 const validation = (element) => {
 if (element.value === "" || element.value === "none" || element.value < 0) {
 getErrorMessage(element, false);
 return false;
 }
 return true;
 };
 const getErrorMessage = (element, valid) => {
 error = document.getElementById(`error-${element.id}`);
 if (!valid) {
 error.removeAttribute("hidden");
 if (element.value < 0) {
 error.innerHTML = `<strong>Error!</strong> ${element.name} must be bigger then zero.`;
 } else {
 error.innerHTML = `<strong>Error!</strong> ${element.name} is required.`;
 }
 element.style.borderColor = "red";
 error.style.color = "red";
 } else {
 element.style.borderColor = "black";
 error.setAttribute("hidden", true);
 element.style.backgroundColor = "#fff";
 }
 };
 const formBtn = document.getElementById("formBtn");
 const formElement = document.getElementById("form");
 const userCanvas = document.getElementById("myCanvas");

 let rectXCoordinate, rectYCoordinate, rectWidth, rectHeight, rectColor;

 formBtn.addEventListener("click", function () {
 let isvalid = true;
 for (element of formElement) {
 if (element.id !== "formBtn") {
 switch (element.id) {
 case "xAxios":
 validation(element)
 ? (rectXCoordinate = +element.value)
 : (isvalid = false);
 break;
 case "yAxios":
 validation(element)
 ? (rectYCoordinate = +element.value)
 : (isvalid = false);
 break;
 case "rectHeight":
 validation(element)
 ? (rectHeight = +element.value)
 : (isvalid = false);
 break;
 case "rectWidth":
 validation(element)
 ? (rectWidth = +element.value)
 : (isvalid = false);
 break;
 case "rectcolor":
 validation(element)
 ? (rectColor = element.value)
 : (isvalid = false);
 break;
 }

 element.addEventListener("focus", function (e) {
 e.preventDefault();
 getErrorMessage(e.target, true);
 });
 if (element.type === "select-one") {
 element.value = "none";
 } else {
 element.value = "";
 }
 }
 }

 if (isvalid) {
 if (
 rectXCoordinate + rectWidth >= userCanvas.width ||
 rectXCoordinate > userCanvas.width
 ) {
 rectXCoordinate = userCanvas.width - rectWidth;
 }

 if (
 rectYCoordinate + rectHeight >= userCanvas.height ||
 rectYCoordinate > userCanvas.height
 ) {
 rectYCoordinate = userCanvas.height - rectHeight;
 console.log(rectYCoordinate);
 }
 const userCanvasCtx = userCanvas.getContext("2d");
 userCanvasCtx.clearRect(0, 0, userCanvas.width, userCanvas.height);
 userCanvasCtx.beginPath();
 userCanvasCtx.rect(
 rectXCoordinate,
 rectYCoordinate,
 rectWidth,
 rectHeight
 );
 userCanvasCtx.strokeStyle = rectColor;
 userCanvasCtx.stroke();
 }
 });
}

  function rectangle() {
'use strict';
var area;
var width = document.getElementById('width').value;
var height = document.getElementById('height').value;
var total = width * height;
document.getElementById('area').value = total;
return false;
}          

function init() {
   'use strict';
   var rectangleForm = document.getElementById('rectangleForm');
   rectangleForm.onsubmit = rectangle;
}

window.onload = init;
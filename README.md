# formrectangle

html 

<!DOCTYPE html>
<html lang="en">

<head>
 <meta charset="UTF-8">
 <meta http-equiv="X-UA-Compatible" content="IE=edge">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css"
 integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn" crossorigin="anonymous">
 <link rel="stylesheet" href="style.css">
 <title> - Canvas With Form</title>
</head>

<body>
 <nav>
 <ul class="nav nav-tabs">
 <li class="nav-item">
 <a class="nav-link" href="index.html">Home</a>
 </li>
 <li class="nav-item">
 <a class="nav-link active" href="formForRectangle.html">Form canvas</a>
 </li>
 </li>
 </ul>
 </nav>

 <div class="container">
 <h1>: Rectangle with a form</h1>
 <form class="rectangleForm" id="form">
 <div class="form-row">
 <div class="form-group col-md-5">
 <label for="xAxios">X Axios Coordinate</label>
 <input type="number" name="X Axios Coordinate" id="xAxios" class="form-control"
 placeholder="Please enter a value for the X axis">
 <span id="error-xAxios" hidden></span>
 </div>
 <div class="form-group col-md-5">
 <label for="yAxios">Y Axios Coordinate</label>
 <input type="number" name="Y Axios Coordinate" id="yAxios" class="form-control"
 placeholder="Please enter a value for the Y axis">
 <span id="error-yAxios" hidden></span>
 </div>
 </div>
 <div class="form-row">
 <div class="form-group col-md-5">
 <label for="rectHeight">Rectangle height</label>
 <input type="number" name="Rectangle height" id="rectHeight" class="form-control"
 placeholder="Please enter width value">
 <span id="error-rectHeight" hidden></span>
 </div>
 <div class="form-group col-md-5">
 <label for="rectWidth">Rectangle width</label>
 <input type="number" name="Rectangle width" id="rectWidth" class="form-control"
 placeholder="Please enter height value">
 <span id="error-rectWidth" hidden></span>
 </div>
 </div>
 <div class="form-row">
 <div class="form-group col-md-5">
 <label for="rectcolor">Rectangle color</label>
 <select name="Rectangle color" id="rectcolor" class="form-control">
 <option selected disabled value="none">Choose the rectangle color...</option>
 <option value="#be4bdb">Grape</option>
 <option value="#748ffc">Indigo</option>
 <option value="#15aabf">Cyan</option>
 <option value="#f59f00">Yellow</option>
 <option value="#e8590c">Orange</option>
 <option value="#fa5252">Red</option>
 <option value="#000">Black</option>
 <option value="#adb5bd">Gray</option>
 <option value="#b197fc">Violet</option>
 <option value="#f783ac">Pink</option>
 </select>
 <span id="error-rectcolor" hidden></span>
 </div>
 </div>
 <div class="form-row">
 <button type="button" class="btn btn-info" id="formBtn">Draw</button>
 </div>
 </form>

 <div class="row row-canvas">
 <canvas id="myCanvas" width="1000" height="450"></canvas>
 </div>
 </div>

  <form id="rectangleForm" method="post">
<h1>Calculate the area of a rectangle:</h1>
<div>
    <label for="width">Width</label> 
    <input type="text" name="width" id="width" value="1.00" />
</div>
<div>
    <label for="height">Height</label>
    <input type="text" name="height" id="height" value="1.00"/>
</div>
<div>
    <label for="area">Area</label>
    <input type="text" name="area" id="area" value="0.00" />
</div>
<div>
    <input type="submit" value="Calculate" id="submit" />
    </div>

 <script src="script.js"></script>

 </body>
 </html>



// script for the from rectangle
if (window.location.pathname === "/formForRectangle.html") {
 //  Form canvas

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
'calculer la surface du rectangle';
var area;
var width = document.getElementById('width').value;
var height = document.getElementById('height').value;
var total = width * height;
document.getElementById('area').value = total;
return false;
}          

function init() {
   var rectangleForm = document.getElementById('rectangleForm');
   rectangleForm.onsubmit = rectangle;
}

window.onload = init;

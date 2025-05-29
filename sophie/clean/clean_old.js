// requires p5 js

var oldmouse;
var tool_active = false;
var spng;
var brushSize = 80;
function setup() {
  let img = createImg(
    "https://kleensco.com/wp-content/uploads/2021/04/GFG331.png",
    "spange"
  );
  img.style("width",brushSize+"px");

  spng = createDiv();
  img.parent(spng);
  spng.style("position","fixed");
  spng.style("pointer-events","none");
  spng.style("z-index","1000");
  spng.id("cursor");

  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.style("mix-blend-mode", "multiply");
  canvas.style("z-index", "10");
  canvas.style("pointer-events","none");
  canvas.style("position", "fixed");
  canvas.parent(document.body);
  background(255, 255, 255, 0);
}

function draw() {
  spng.style("left", mouseX - brushSize / 2 + "px");
  spng.style("top", mouseY - brushSize / 2 + "px");
  if (tool_active) {
    mark(mouseX, mouseY);
    oldmouse = [mouseX, mouseY];
  }
  if (frameCount % 50 == 0) {
    background(color(0, 0, 0, 1));
  }
}
function mark(x, y) {
  strokeWeight(brushSize * 0.5);
  stroke(255);
  line(oldmouse[0], oldmouse[1], x, y);
}

function mousePressed() {
  oldmouse = [mouseX, mouseY];
  tool_active = true;
}

function mouseReleased() {
  tool_active = false;
}

function windowResized() {
  loadPixels();
  px = pixels;
  resizeCanvas(windowWidth, windowHeight);
  background(255);

  for (var i = 0; i < px.length; i++) {
    pixels[i] = px[i];
  }
  updatePixels();
}
// var script = document.createElement('script');script.type = 'text/javascript';script.src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js";document.head.appendChild(script);
var brushSize = 80;

var pos;
var tool_active = false;
var spng;

const s = (sk) => {
  sk.setup = () => {
    let img = sk.createImg(
      "../assets/spange.png",
      "spange"
    );
    img.style("width", brushSize + "px");

    spng = sk.createDiv();
    img.parent(spng);
    spng.style("position", "fixed");
    spng.style("z-index", "100000");
    spng.style("cursor", "grab");
    spng.id("cursor");

    pos = [brushSize, brushSize];
    spng.style("left", pos[0] - brushSize / 2 + "px");
    spng.style("top", pos[1] - brushSize / 2 + "px");

    spng.elt.addEventListener("mousedown", function (e) {
      e.preventDefault();
      spng.style("cursor", "grabbing");
      tool_active = true;
    });
    var canvas = sk.createCanvas(sk.windowWidth, sk.windowHeight);

    var main = document.getElementsByTagName("main")[0];
    main.style.mixBlendMode = "multiply";
    main.style.zIndex = "10";
    main.style.pointerEvents = "none";
    main.style.position = "fixed";
    main.style.left = "0";
    main.style.top = "0";
    sk.background(255);
  };

  sk.draw = () => {
    if (tool_active) {
      var x =
        sk.mouseX < 0
          ? 0
          : sk.mouseX > sk.windowWidth
            ? sk.windowWidth
            : sk.mouseX;
      var y =
        sk.mouseY < 0
          ? 0
          : sk.mouseY > sk.windowHeight
            ? sk.windowHeight
            : sk.mouseY;

      spng.style("left", x - brushSize / 2 + "px");
      spng.style("top", y - brushSize / 2 + "px");

      mark(x, y);
      pos = [x, y];
    }
    if (sk.frameCount % 150 == 0) {
      // sk.background(0, 1);
      sk.strokeWeight(0);
      sk.fill(0, 3);
      sk.rect(0, 0, sk.windowWidth, sk.windowHeight);
    }
  };
  function mark(x, y) {
    sk.strokeWeight(brushSize * 0.5);
    sk.stroke(255);
    sk.line(pos[0], pos[1], x, y);
  }

  sk.mouseReleased = () => {
    spng.style("cursor", "grab");
    tool_active = false;
  };

  sk.windowResized = () => {
    sk.loadPixels();
    var px = sk.pixels;
    sk.resizeCanvas(sk.windowWidth, sk.windowHeight);
    sk.background(255);

    for (var i = 0; i < px.length; i++) {
      sk.pixels[i] = px[i];
    }
    sk.updatePixels();
  };
};
let main = new p5(s);

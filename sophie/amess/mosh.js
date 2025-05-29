let vid, data, moshed;
var start_effect_sec;
var fps;
var end_effect_sec;

function preload() {
  vid = createVideo(
    "https://cdn.glitch.com/49760264-2e6b-484d-9841-f4f99284d5a1%2Fgoth%20club.mp4?v=1597795799241",
    vidLoad
  );
  data = loadBytes(
    "https://cdn.glitch.com/49760264-2e6b-484d-9841-f4f99284d5a1%2Fdatamoshing_input.avi?v=1597868334167"
  );
}
/* global createCanvas, mouseIsPressed, fill, mouseX, mouseY, ellipse */
function setup() {
  createCanvas(window.outerWidth, window.outerHeight);
  window.onresize = function() {
    resizeCanvas(window.outerWidth, window.outerHeight);
  };

  vid.hide();
  noStroke();
  fill(0);
}

function draw() {
  background(255);
  if (mouseIsPressed) {
    // stroke(0);
    // line(mouseX, mouseY, pmouseX, pmouseY);
    // noStroke();

    test();
  }
  vid.loadPixels();
  // const stepSize = round(constrain(mouseX / 8, 6, 32));
  const stepSize = 3;

  for (let y = 0; y < 360; y += stepSize) {
    for (let x = 0; x < 640; x += stepSize) {
      const i = y * 640 + x;
      const darkness = (255 - vid.pixels[i * 4]) / 255;
      const radius = stepSize * darkness;
      ellipse(x, y, radius, radius);
    }
  }
}
function vidLoad() {
  vid.loop();
  vid.volume(0);
}
function toByteArray(hexString) {
  var result = [];
  for (var i = 0; i < hexString.length; i += 2) {
    result.push(parseInt(hexString.substr(i, 2), 16));
  }
  return result;
}

// # 0x30306463 which is ASCII 00dc signals the end of a frame. '0x' is a common way to say that a number is in hexidecimal format.
function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function test() {
  // console.log(data.bytes);
  // mosh(data.bytes);
  // var f = split_bytes(data.bytes,toByteArray("30306463"));
  // console.log(f)
  // console.log(data.bytes);

}
function split_bytes(arr, delim) {
  var chunk = delim.length;
  var result = [];
  var start = 0;
  for (var i = 0; i < arr.length; i++) {
    var tidbit = arr.slice(i, i + chunk);
    if (arraysEqual(tidbit, delim)) {
      var fin = i + chunk;
      result.push(arr.slice(start, i));
      start = fin;
    }
  }

  result.push(arr.slice(start));
  return result;
}

function bytewrite(bytes, towrite, start) {
  for (var i = 0; i < towrite.length; i++) {
    bytes[start + i] = towrite[i];
  }
  return bytes;
}

function mosh(bytes) {
  var start_sec = 0;
  var start_effect_sec = 0;
  var end_effect_sec = 10;
  var end_sec = 60;
  var repeat_p_frames = 15;
  var output_width = 480;
  var fps = 24;

  frames = split_bytes(bytes, toByteArray("30306463"));
  var out_file = bytes;
  // # 0x0001B0 signals the beginning of an i-frame. Additional info: 0x0001B6 signals a p-frame
  var iframe = toByteArray("0001B0");

  // # We want at least one i-frame before the glitching starts
  var i_frame_yet = false;
  var starti = 0;
  console.log(frames.length)
  for (var index =0;index< frames.length;index++) {
    var frame = frames[index];

    if (
      i_frame_yet == false ||
      index < start_effect_sec * fps ||
      index > end_effect_sec * fps
    ) {
      // 		# the split above removed the end of frame signal so we put it back in
      out_file = bytewrite(out_file, frame + toByteArray("30306463"), starti);
      starti = starti + (frame.length + toByteArray("30306463").length);
      var sliced = new Int32Array(frame.slice(5, 8));
      // 		# found an i-frame, let the glitching begin
      if (arraysEqual(sliced,iframe)) {
        i_frame_yet = true;
        console.log("iframe alert")
      } else {
                // console.log(sliced)
                        // console.log(iframe)


        // 		# while we're moshing we're repeating p-frames and multiplying i-frames
        if (!arraysEqual(sliced,iframe)) {
          // # this repeats the p-frame x times
          for (var i in repeat_p_frames) {
            out_file = bytewrite(
              out_file,
              frame + toByteArray("30306463"),
              starti
            );
            starti = starti + (frame.length + toByteArray("30306463").length);
          }
        }
      }
    }
  }

  var saveByteArray = (function() {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function(stuff, name) {
      var buf = stuff.buffer;
      var blob = new Blob([stuff], { type: "video/x-msvideo" }),
        url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = name;
      a.click();
      window.URL.revokeObjectURL(url);
    };
  })();
  // saveByteArray(out_file, "hell.avi");
  
  moshed = createVideo("hell.avi", vfunction => {
    moshed.loop();
  });
  // console.log("saved");
}

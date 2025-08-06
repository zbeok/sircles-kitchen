const anagram = (sk) => {
  var textSize = 20;
  var t = 0;
  var secondary_t=0;
  var state = 0;
  var anim_length = 100;
  var anagram_pair = ["graphic design is my passion", "my ass is poggers pinch in aid"];
  var lines = [];
  var coords = [];
  var offset = [0,0];
  sk.setup = () => {
    sk.createCanvas(window.innerWidth, window.innerHeight);
    sk.fill(0);
    sk.stroke(0);
    sk.textFont("Courier New");
    sk.textSize(textSize*1.5);
    sk.new_anim();
  };
  sk.draw = () => {
    sk.clear();
      // sk.text(state,50,100);
    if (state%2==0) {
      secondary_t++;
      if (secondary_t>anim_length) {
        secondary_t=0;
        state=(state+1)%4;
      }
    } else if (state==1) {
      t++;
      if (t>anim_length) {
        state=(state+1)%4;
      }
    } else {
      t--;
      if (t<0) {
        state=(state+1)%4;
      }
      
    }
    for (var i in coords) {
      let [b,a] = coords[i];
      let x = b[0]+(a[0]-b[0])*t/anim_length;
      let y = b[1]+(a[1]-b[1])*t/anim_length;
      sk.text(anagram_pair[0][i], x+offset[0], y+offset[1]);
    }
    
  };
  sk.sanitize = (text) => {
    var result = "";
    for (var i = 0; i < text.length; i++) {
      if (!text[i].match(/^[ 0-9a-z]+$/)) continue;
      result+=text[i];
    }
    return result;
  }
  sk.validate_anagram = (before,after) => {
    if (after.length*textSize>sk.width && coords.length>0) {
      alert("text too long. can't do multiline yet");
      return null;
    }
    var result = [];
    let map = {};
    for (var i = 0; i < after.length; i++) {
      let c = after[i];
      if (!map[c]) {
        
        map[c] = [];
      }
      map[c].push(i);
    }
    for (var i = 0; i < before.length; i++) {
      let c = before[i];
      if (c==" ") {
        result.push(i);
        continue;
      }
      if (!map[c] || map[c].length==0){
        alert("that's not an anagram. skill issue");
        return null;
      }
      var j = map[c].pop();
      result.push(j);
    }
    return result;
  }
  sk.new_anim = () => {
    // get values
    var before = document.getElementById("before").value;
    before = sk.sanitize(before);
    var after = document.getElementById("after").value;
    after = sk.sanitize(after);
    var mapping = sk.validate_anagram(before,after);
    if (!mapping) return;
    anagram_pair = [before,after];
    coords = [];
    var line = 0;
    for (var i = 0; i < anagram_pair[0].length; i++) {
      // If you know the initial position of the letter
      let c = anagram_pair[0][i];
      // you can get the initial coordinates
      let b = [0+i*textSize, 0];
      // and you can get the destination position
      let j = mapping[i];
      // and you can get the destination coordinates
      let a = [j*textSize, line*textSize*5];
      coords.push([b,a]);
    }
    lines=[coords.length];
    offset = [sk.width/2-anagram_pair[0].length/2*textSize,sk.height/2-textSize*(lines.length-1)*3];
  };
  // sk.windowResized = () => {};
  // sk.deviceTurned = () => {
  //   sk.windowResized();
  // };
};

var main = new p5(anagram, "anagram");

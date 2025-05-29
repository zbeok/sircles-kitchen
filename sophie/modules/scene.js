const s = (sk) => {
  var plants = [];
  var mouse={x:0,y:0};
  var follow_rate=.1;
  sk.setup = () => {
    sk.createCanvas(window.innerWidth, window.innerHeight);
    sk.init();
    mouse={x:sk.mouseX,y:sk.mouseY}
  };
  sk.init = () => {
    plants = [];

    var num_plants = sk.min(window.innerWidth / 10, 100);
    for (var i = 0; i < num_plants; i++) {
      plants.push(new Plant(sk, null, 180 - i * (180 / num_plants)));
      // plants.push(new Plant(sk,i*window.innerWidth/num_plants,0));
    }
  };
  // annoying address bar shit
  sk.windowResized = () => {
    if (window.innerWidth - sk.width != 0) {
      sk.resizeCanvas(window.innerWidth, window.innerHeight);
      sk.init();
    }
  };
  sk.deviceTurned = () => {
    sk.windowResized();
  };
  sk.bg = (fract) => {
    if (fract == null) fract = 1;
    var grad = 1;
    var c2 = sk.color(220, 220, 220, 50);
    var c1 = sk.color(0, 0, 0, 250);
    sk.strokeWeight(grad);
    for (var y = 0; y < sk.height + 1; y = y + grad) {
      var t = (y / sk.height) * fract;
      t = t < 0 ? (t = 0) : t;
      sk.stroke(sk.lerpColor(c1, c2, (y / sk.height) * fract));
      sk.line(0, sk.height - y, sk.width, sk.height - y);
    }
  };
  sk.fireflies=(num)=>{
    
    for (var i=0;i<num;i++) {
      var smudge = {x:(sk.noise(sk.frameCount/600+200*i))*sk.width*2-sk.width/2,
                   y:(sk.noise(sk.frameCount/600+100*i))*sk.height*2-sk.height/2,
                   }
      sk.point(smudge.x,smudge.y)
    }
  }
  sk.draw = () => {
    sk.clear();
    var speed={x:sk.mouseX-mouse.x,
               y:sk.mouseY-mouse.y};
    sk.fireflies(10);
    for (var i in plants) {
      plants[i].animate();
      // plants[i].wind(speed_d.x)
      plants[i].wind(mouse)
      plants[i].display();
    }
    sk.stroke(255)
    sk.strokeWeight(5);
      mouse={
        x:mouse.x+speed.x*follow_rate,
        y:mouse.y+speed.y*follow_rate
      }
  };
};

var main = new p5(s, "container");

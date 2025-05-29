class Dawn {
  constructor(tgt) {
    this.tgt = tgt;
    this.span=0.14;
    this.make_sun();
    var dawn = this;
    window.setInterval(function(){dawn.make_sun()}, 60*1000);
  }
  get_time_factor() {
    var now = new Date(),
      then = new Date(now.getFullYear(),now.getMonth(),now.getDate(),
        0,0,0),
      diff = now.getTime() - then.getTime();
    return diff / (24 * 60 * 60 * 1000);
  }
  
  time_to_sun(x) {
    // var r = -1 * Math.pow(1.3 * (2 * x - 1), 4) + 1;
    // var g = -1 * Math.pow(1.2 * (2 * x - 1), 2) + 1;
    // var b = -1 * Math.pow(0.8 * (2 * x - 1), 6) + 0.7;
    var r = -1 * Math.pow(1.2 * (2 * x - 1.1), 4) + 1;
    var g = -1 * Math.pow(1.3 * (2 * x - .99), 4) + 1;
    var b = -1 * Math.pow(0.7 * (2 * x - 1), 6) + 0.7;
    if (r<0) r=0;
    if (g<0) g=0;
    return this.rgba(Math.round(255 * r), 
                     Math.round(255 * g), 
                     Math.round(255 * b));
  }

  make_sun() {
    var x = this.get_time_factor();
    this.setBG(this.time_to_sun(x-this.span), this.time_to_sun(x + this.span));
    // this.setsBG([this.time_to_sun(x-this.span), 
    //          this.time_to_sun(x), 
    //          this.time_to_sun(x + this.span)]);
  }

  rgba(r, g, b, a) {
    if (a == null) a = 255;
    if (g == null) return "rgba(" + r + "," + r + "," + r + "," + a + ")";
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  }
  setsBG(l) {
    var s = l[0]+""
    for (var i in l){
      s+=","+l[i]
    }
    this.tgt.style.background = "linear-gradient(" + s + ")";
  }
  setBG(c1, c2) {
    this.tgt.style.background = "linear-gradient(" + c1 + "," + c2 + ")";
  }
}
window.addEventListener("load", function(){
  var tgts = document.getElementsByClassName("dawnify");
  for (var i in tgts){
    new Dawn(tgts[0]);
  }
});
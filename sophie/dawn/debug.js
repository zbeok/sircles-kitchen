class Dawn {
  constructor(tgt) {
    document.getElementById("range").value = this.get_time_factor() * 100;
    this.eq = "exponential";
    this.tgt = tgt;
    this.span = 0.2; // .14
    this.make_sun();
    var dawn = this;
  }
  get_time_factor(time=null) {
  
    var now = time? time : new Date();
    var then = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0
      ),
      diff = now.getTime() - then.getTime();
    var x = document.getElementById("range").value / 100;
    var nd = new Date(then.getTime() + x * (24 * 60 * 60 * 1000));
    document.getElementById("time").innerHTML = nd;
    return diff / (24 * 60 * 60 * 1000);
  }
  exponential(x) {
    // var r = -1 * Math.pow(1.3 * (2 * x - 1), 4) + 1;
    // var g = -1 * Math.pow(1.2 * (2 * x - 1), 2) + 1;
    // var b = -1 * Math.pow(0.8 * (2 * x - 1), 6) + 0.7;
    var r = -1 * Math.pow(1.2 * (2 * x - 1.1), 4) + 1;
    var g = -1 * Math.pow(1.3 * (2 * x - 0.99), 4) + 1;
    var b = -1 * Math.pow(0.7 * (2 * x - 1), 6) + 0.7;
    if (r < 0) r = 0;
    if (g < 0) g = 0;
    return this.rgba(
      Math.round(255 * r),
      Math.round(255 * g),
      Math.round(255 * b)
    );
  }
  ellipse(w, h, t) {
    return (
      (w * h) /
      Math.sqrt(h * Math.cos(t) * Math.cos(t) + w * Math.sin(t) * Math.sin(t))
    );
  }
  polar(x) {
    var t = x * Math.PI * 2;
    var b = this.ellipse(0.4, 1, t); //*(Math.cos(t)/1+1)
    var g = Math.sin(t / 2);
    var rd = t + 2.8;
    var r = (r = this.ellipse(1, 1, rd) * (Math.cos(rd) + 1));
    // if (r<0) r=0;
    // if (g<0) g=0;
    return this.rgba(
      Math.round(255 * r),
      Math.round(255 * g),
      Math.round(255 * b)
    );
  }

  time_to_sun(x) {
    switch (this.eq) {
      case "polar":
        return this.polar(x);
      case "exponential":
        return this.exponential(x);
      default:
        return this.polar(x);
    }
  }
  make_sun() {
    var x = this.get_time_factor();
    x = document.getElementById("range").value / 100;
    document.getElementById("debug").innerHTML =
      "adjust time slider above to play with dawn colors" +
      "<br>" +
      "current equation: " +
      this.eq +
      "<br>" +
      "x = " +
      x +
      "<br>" +
      "theta = " +
      x * Math.PI * 2 +
      "<br>" +
      this.time_to_sun(x);
    x = x % 1;

    // this.setBG(this.time_to_sun(x-this.span), this.time_to_sun(x + this.span));
    this.setBG([
      this.time_to_sun(x - this.span),
      this.time_to_sun(x),
      this.time_to_sun(x + this.span),
    ]);
    this.temporal();
  }

  rgba(r, g, b, a) {
    if (a == null) a = 255;
    if (g == null) return "rgba(" + r + ", " + r + ", " + r + ", " + a + ")";
    return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
  }
  setsBG(c1, c2) {
    this.tgt.style.background = "linear-gradient(" + c1 + "," + c2 + ")";
  }
  setBG(l) {
    var s = l[0] + "";
    for (var i in l) {
      s += "," + l[i];
    }
    this.tgt.style.background = "linear-gradient(" + s + ")";
  }
  toggle_equation() {
    if (this.eq == "polar") this.eq = "exponential";
    else if (this.eq == "exponential") this.eq = "polar";
    this.make_sun();
  }
  static async get_temporal() {
    let rawResponse = await fetch("http://ip-api.com/json/");
    let location = await rawResponse.json();
    rawResponse = await fetch(
      "https://api.sunrise-sunset.org/json?lat=" +
        location["lat"] +
        "&lng=" +
        location["lon"] +
        "&date=today&formatted=0&tzid=" +
        location["timezone"]
    );
    let info = await rawResponse.json();
    var sunrise = new Date(info["results"]["sunrise"]);
    var sunset = new Date(info["results"]["sunset"]);
    return [sunrise, sunset];
  }
  async temporal(){
    var thres = await Dawn.get_temporal();
    console.log(thres);
    var sunrise = this.get_time_factor(thres[0]);
    var sunset = this.get_time_factor(thres[1]);
    var now = this.get_time_factor();
    var day_hour = (sunset-sunrise)/12;
    var day_minute = day_hour/60;
    // now = .1;
    // now = (sunset-sunrise)/2+sunrise+day_minute;
    // now = .9;
    var night_hour = (1-sunset+sunrise)/12;
    var night_minute = night_hour/60;
    var hour, minute;
    if (now > sunrise &&  now < sunset) {
      //day
      hour =Math.floor((now-sunrise)/day_hour);
      minute = Math.floor(((now-sunrise)-hour*day_hour)/day_minute);
      hour+=6; // add half-night buffer
      console.log(now,sunrise,day_hour,hour,day_minute,minute);
    } else if (now< sunrise){
      //after midnight
      hour =Math.floor(now/night_hour);
      minute = Math.floor((now-hour*night_hour)/night_minute);
    } else {
      //before midnight
      hour =Math.floor((now-sunset)/night_hour);
      minute = Math.floor(((now-sunset)-hour*night_hour)/night_minute);
      hour+=6+12; // add half-night and day buffer
    }
    document.getElementById("time").innerHTML +=
      "<p>time:" + hour +":"+String(minute).padStart(2, '0');+"</p>";
    return [hour,minute];
  }
}

var dawns = [];

window.addEventListener("load", function () {
  var tgts = document.getElementsByClassName("dawnify");
  for (var i in tgts) {
    dawns.push(new Dawn(tgts[0]));
  }
});

class Clock {
  constructor() {
    console.log("construct");
  }
  static get_time_factor(datetime = "") {
    var now = datetime ? new Date(datetime) : new Date();
    var then = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0
      ),
      diff = now.getTime() - then.getTime();
    return diff / (24 * 60 * 60 * 1000);
  }

  static get_location() {
   return fetch("https://ipapi.co/json/").then(response => {return response.json()});
  }

  static get_sunset_sunrise() {
    return Clock.get_location().then((location) => {
       return fetch(
        "https://api.sunrise-sunset.org/json?lat=" +
          location["latitude"] +
          "&lng=" +
          location["longitude"] +
          "&date=today&formatted=0&tzid=" +
          location["timezone"]
      );
    }).then(response => {return response.json()}).then(object => {return object["results"]});
  }
  static render(tgt) {
    var now = Clock.now;
    tgt.innerHTML =
      now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0");
  }
  static setup() {
    var rate = 60*1000*10;
    Clock.refresh_clocks();
    window.setInterval(Clock.refresh_clocks(), rate);
    
  }
  static refresh_clocks() {
      var tgts = document.getElementsByClassName("normal-clock");
    console.log("refresh clock", tgts);
      Clock.now = new Date();
      for (var i=0;i<tgts.length;i++) {
        Clock.render(tgts[i]);
      }
  }
}
window.addEventListener("load", function () {
  Clock.setup();
});

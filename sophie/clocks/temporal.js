class TemporalClock extends Clock {
  static async get_temporal() {
    let info = await TemporalClock.get_sunset_sunrise();
    var sunrise = info["sunrise"];
    var sunset = info["sunset"];
    TemporalClock.sunrise = TemporalClock.get_time_factor(sunrise);
    TemporalClock.sunset = TemporalClock.get_time_factor(sunset);
    var delta = TemporalClock.sunset - TemporalClock.sunrise;
    TemporalClock.day_hour = delta / 12;
    TemporalClock.day_minute = TemporalClock.day_hour / 60;
    TemporalClock.night_hour = (1 - delta) / 12;
    TemporalClock.night_minute = TemporalClock.night_hour / 60;
  }
  static calculate_temporal(now) {
    now = TemporalClock.get_time_factor(now);
    var hour, minute;
    if (now > TemporalClock.sunrise && now < TemporalClock.sunset) {
      //day
      hour = Math.floor((now - TemporalClock.sunrise) / TemporalClock.day_hour);
      minute = Math.floor(
        (now - TemporalClock.sunrise - hour * TemporalClock.day_hour) / TemporalClock.day_minute
      );
      hour += 6; // add half-night buffer
    } else if (now < TemporalClock.sunrise) {
      //after midnight
      hour = Math.floor(now / TemporalClock.night_hour);
      minute = Math.floor((now - hour * TemporalClock.night_hour) / TemporalClock.night_minute);
    } else {
      //before midnight
      hour = Math.floor((now - TemporalClock.sunset) / TemporalClock.night_hour);
      minute = Math.floor(
        (now - TemporalClock.sunset - hour * TemporalClock.night_hour) / TemporalClock.night_minute
      );
      hour += 6 + 12; // add half-night and day buffer
    }
    return { hour: hour, minute: minute };
  }

  static render(tgt) {
    var now = TemporalClock.now;
    tgt.innerHTML =
      now["hour"] + ":" + String(now["minute"]).padStart(2, "0");
  }
  
  static async setup() {
    await TemporalClock.get_temporal();
    var rate = 60*1000*10;
    TemporalClock.refresh_clocks();
    window.setInterval(TemporalClock.refresh_clocks(), rate);
    
  }
  static refresh_clocks() {
      var tgts = document.getElementsByClassName("temporal-clock");
      console.log("refresh tclock", tgts);
      TemporalClock.now = TemporalClock.calculate_temporal(new Date());
      for (var i=0;i<tgts.length;i++) {
        TemporalClock.render(tgts[i]);
      }
  }
}
window.addEventListener("load", function () {
  TemporalClock.setup();
});

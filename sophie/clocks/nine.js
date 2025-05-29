class NineClock extends Clock {
  static async get_temporal() {
    let info = await NineClock.get_sunset_sunrise();
    var sunrise = info["sunrise"];
    var sunset = info["sunset"];
    NineClock.sunrise = NineClock.get_time_factor(sunrise);
    NineClock.sunset = NineClock.get_time_factor(sunset);
    var delta = NineClock.sunset - NineClock.sunrise;
    NineClock.day_hour = delta / 9;
    NineClock.day_minute = NineClock.day_hour / 60;
    NineClock.night_hour = (1 - delta) / 9;
    NineClock.night_minute = NineClock.night_hour / 60;
  }
  static calculate_temporal(now) {
    now = NineClock.get_time_factor(now);
    var hour, minute;
    if (now > NineClock.sunrise && now < NineClock.sunset) {
      //day
      hour = Math.floor((now - NineClock.sunrise) / NineClock.day_hour);
      minute = Math.floor(
        (now - NineClock.sunrise - hour * NineClock.day_hour) / NineClock.day_minute
      );
      hour += 4; // add half-night buffer
      minute += 30; // add half-night buffer
    } else if (now < NineClock.sunrise) {
      //after midnight
      hour = Math.floor(now / NineClock.night_hour);
      minute = Math.floor((now - hour * NineClock.night_hour) / NineClock.night_minute);
    } else {
      //before midnight
      hour = Math.floor((now - NineClock.sunset) / NineClock.night_hour);
      minute = Math.floor(
        (now - NineClock.sunset - hour * NineClock.night_hour) / NineClock.night_minute
      );
      hour += 4+9; // add half-night buffer and day buffer
      minute += 30; // add half-night buffer
    }
    return { hour: hour, minute: minute };
  }

  static render(tgt) {
    var now = NineClock.now;
    var descriptor = ["early","mid", "late"];
    var period = ["night","dawn","morning", "afternoon","twilight", "evening"];
    var i_d=now["hour"]%3;
    var i_p=Math.floor(now["hour"]/3);
    tgt.innerHTML = descriptor[i_d]+ " "+ period[i_p];
    //+now["hour"];
  }
  
  static async setup() {
    await NineClock.get_temporal();
    var rate = 60*1000*10;
    NineClock.refresh_clocks();
    window.setInterval(NineClock.refresh_clocks(), rate);
    
  }
  static refresh_clocks() {
      var tgts = document.getElementsByClassName("nine-clock");
      console.log("refresh 9clock", tgts);
      NineClock.now = NineClock.calculate_temporal(new Date());
      for (var i=0;i<tgts.length;i++) {
        NineClock.render(tgts[i]);
      }
  }
}
window.addEventListener("load", function () {
  NineClock.setup();
});

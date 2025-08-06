var siteList = [
  "https://longdogechallenge.com/",
  "https://checkboxrace.com/",
  "https://onesquareminesweeper.com/",
  "https://heeeeeeeey.com/",
  "https://corndog.io/",
  "https://mondrianandme.com/",
  "https://puginarug.com",
  "https://checkboxolympics.com/",
  "https://alwaysjudgeabookbyitscover.com",
  "https://thatsthefinger.com/",
  "https://cant-not-tweet-this.com/",
  "https://eelslap.com/",
  "https://www.staggeringbeauty.com/",
  "https://burymewithmymoney.com/",
  "https://smashthewalls.com/",
  "https://jacksonpollock.org/",
  "https://endless.horse/",
  "https://www.trypap.com/",
  "https://www.republiquedesmangues.fr/",
  "https://www.movenowthinklater.com/",
  "https://www.partridgegetslucky.com/",
  "https://www.rrrgggbbb.com/",
  "https://www.koalastothemax.com/",
  "https://www.everydayim.com/",
  "https://randomcolour.com/",
  "https://cat-bounce.com/",
  "https://chrismckenzie.com/",
  "https://thezen.zone/",
  "https://hasthelargehadroncolliderdestroyedtheworldyet.com/",
  "https://ninjaflex.com/",
  "https://ihasabucket.com/",
  "https://corndogoncorndog.com/",
  "https://www.hackertyper.com/",
  "https://pointerpointer.com",
  "https://imaninja.com/",
  "https://drawing.garden/",
  "https://www.ismycomputeron.com/",
  "https://www.nullingthevoid.com/",
  "https://www.muchbetterthanthis.com/",
  "https://www.yesnoif.com/",
  "https://lacquerlacquer.com",
  "https://potatoortomato.com/",
  "https://iamawesome.com/",
  "https://strobe.cool/",
  "https://thisisnotajumpscare.com/",
  "https://doughnutkitten.com/",
  "https://crouton.net/",
  "https://corgiorgy.com/",
  "https://www.wutdafuk.com/",
  "https://unicodesnowmanforyou.com/",
  "https://chillestmonkey.com/",
  "https://scroll-o-meter.club/",
  "https://www.crossdivisions.com/",
  "https://tencents.info/",
  "https://boringboringboring.com/",
  "https://www.patience-is-a-virtue.org/",
  "https://pixelsfighting.com/",
  "https://isitwhite.com/",
  "https://existentialcrisis.com/",
  "https://onemillionlols.com/",
  "https://www.omfgdogs.com/",
  "https://oct82.com/",
  "https://chihuahuaspin.com/",
  "https://popcat.click/",
  "https://www.blankwindows.com/",
  "https://tunnelsnakes.com/",
  "https://www.trashloop.com/",
  "https://www.ascii-middle-finger.com/",
  "https://spaceis.cool/",
  "https://www.donothingfor2minutes.com/",
  "https://buildshruggie.com/",
  "https://buzzybuzz.biz/",
  "https://yeahlemons.com/",
  "https://wowenwilsonquiz.com",
  "https://thepigeon.org/",
  "https://notdayoftheweek.com/",
  "https://www.amialright.com/",
  "https://nooooooooooooooo.com/",
  "https://greatbignothing.com/",
  "https://zoomquilt.org/",
  "https://dadlaughbutton.com/",
  "https://www.bouncingdvdlogo.com/",
  "https://remoji.com/",
  "https://papertoilet.com/",
  "https://loopedforinfinity.com/",
  "http://salmonofcapistrano.com/"
];

var sites = {
  420: "https://zbeok.github.io/nicenicenice",
  666: "https://crouton.net"
};

for (var i = 0; i < siteList.length; i++) {
  sites[i] = siteList[i];
}
var i = 0;
var door_open = false;
var anim_time = 100;
var anim_state = false;
window.onload = function () {
};

function render_open() {
  if (door_open == true || anim_state == true) return;
  setTimeout(function () {
    $("#door").attr(
      "src",
      "assets/door-ajar.png"
    );

    setTimeout(function () {
      anim_state = false;

      $("#door").css("transform", "scaleX(-1)");
      $("#door").css("left", "-112.5%");
    }, anim_time);
  }, anim_time);
  $("#door").attr(
    "src",
    "assets/door-open.png"
  );
  door_open = true;
  anim_state = true;
}

function render_close() {
  if (door_open == false) return;
  setTimeout(function () {
    $("#door").attr(
      "src",
      "assets/door-ajar.png"
    );
    setTimeout(function () {
      $("#door").attr(
        "src",
        "assets/door.png"
      );
      anim_state = false;
    }, anim_time);
  }, anim_time);
  $("#door").css("transform", "scaleX(1)");
  $("#door").css("left", "-12.5%");
  door_open = false;
  anim_state = true;
}

function process_door() {
  console.log("*click*");
  if (door_open) {
    //close door
    render_close();
    return;
  }
  //open door
  gen_site();
  document.getElementById("dest").addEventListener("load", render_open);
  setTimeout(render_open, 2000);
}

function gen_site() {
  var cpy = {};
  Object.assign(cpy, sites);
  delete cpy[i];
  i = Object.keys(cpy)[Math.floor(Math.random() * Object.keys(cpy).length)];
  document.getElementById("dest").src = sites[i];
  console.log(sites[i]);
}

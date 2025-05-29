class PopUp {
  constructor(popups) {
    this.status = false;
    this.popups = popups;
    var popup = this;
    for (var key in popups){
      $("#"+key).click(function (){popup.up(key,popups[key])});
    }
  }
  up(key,txt) {
    $("#popup").html("");
    var header = document.createElement("h1");
    $(header).html(key).appendTo($("#popup"));
    var lines = txt.split(/\r?\n/);
    for (var i in lines) {
      if (lines[i].length == 0) {
        var desc = document.createElement("br");
        $(desc).appendTo($("#popup"));
      } else {
        var desc = document.createElement("p");
        $(desc).html(lines[i]).appendTo($("#popup"));
        $("#popup").css("opacity", 1).css("pointer-events", "initial");
      }
    }
    var fill = document.createElement("div");
    $(fill)
      .addClass("fill")
      .css("position", "absolute")
      .css("top", "0")
      .css("left", "0")
      .css("width", "100%")
      .css("height", "100%")
      .css("z-index", "99")
      .appendTo($(document.body));
    var popup = this;
    $(fill).click(function () {
      popup.down();
    });
  }
  down() {
    $("#popup").css("opacity", 0).css("pointer-events", "none");
    $(".fill").remove();
  }
}

export default function (popups){
  return new PopUp(popups);
};

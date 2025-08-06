import PopUp from "../modules/popup.js";

var congrats_noise = new Audio('https://cdn.glitch.global/49760264-2e6b-484d-9841-f4f99284d5a1/nintendogs%20jingle.mp3?v=1705345619870');
class JuneBug {
  constructor(script, popups, sequences) {
    this.popup = new PopUp(popups);
    this.popups = popups;
    this.script = script;
    this.sequences = sequences;
    this.history = [];
    this.path = new Path();
    // TODO
    // window.location.hash = "new value#something";
    // text1.concat(" ", text2);
    var that = this;
    this.question = $("<h3>", { id: "junebug-question" });
    $("#junebug").append(this.question);

    this.text = $("<p>", { id: "junebug-text" });
    $("#junebug").append(this.text);

    this.options = $("<div>", { id: "junebug-options", class: "nav" });
    $("#junebug").append(this.options);

    this.top = $("<button>", { id: "junebug-top" })
      .text("<<")
      .click(function () {
        that.render();
      });

    this.back = $("<button>", { id: "junebug-back" })
      .text("<")
      .click(function () {
        that.on_back();
      });

    this.about = $("<button>", { id: "junebug-about" })
      .text("about")
      .click(function () {
        that.popup.up("about", popups["about"]);
      });

    this.export = $("<button>", { id: "junebug-export" })
      .text("done")
      .click(function () {
        that.exporting();
      });

    this.report = $("<button>", { id: "junebug-report" })
      .text("this didn't help")
      .click(function () {
        that.popup.up("still feel bad?", popups["report"]);
      });


    this.nav = $("<div>", { id: "junebug-menu" })
      .append(this.top)
      .append(this.back)
      .append(this.about)
      .append(this.export)
      .append(this.report);
    $("#junebug").append(this.nav);

    this.render();
  }
  on_back() {
    if (this.history.length <= 1) {
      return;
    }
    var curr_index = this.history.pop();
    curr_index = this.history.pop();
    this.path.pop(2);
    this.render(curr_index);
  }
  render(key = "0.1") {
    this.back.display = this.history.length <= 0 ? "none" : "initial";
    this.history.push(key);
    this.path.push(key);
    if (key in this.sequences) this.render_sequence(key);
    else if (key in this.script) this.render_scene(key);
  }
  render_scene(key = "0.1") {
    var scene = this.script[key];
    this.question.text(scene.q);
    this.text.text(scene.p ? scene.p : "");
    this.options.text("");
    for (var a in scene.a) {
      this.options.append(this.make_option(a, scene.a[a]));
    }
  }
  make_option(text, next = null) {
    var option;
    var that = this;
    if (next == null || next == "") {
      option = document.createElement("p");
    } else {
      option = document.createElement("a");
      option.onclick = function () {
        that.path.update(history[history.length - 1], text);
        history[history.length - 1] = [history[history.length - 1], text];
        if (next in that.script || next in that.sequences) that.render(next);
      };
    }
    option.className = "navbit";
    option.innerHTML = text;
    if (text.search(/sophie/i) >= 0) {
      option.className += " sophie";
    }
    return option;
  }
  render_sequence(key) {
    console.log(key);
    var seq = this.sequences[key];
    if (seq == null) seq = this.script["error"];
    this.question.text(key);
    this.options.text("");
    var i = 0;
    var that = this;
    this.options.click(function () {
      if (i < seq.length) {
        var option = $("<a>", { class: "navbit" }).html(seq[i]);
        that.options.append(option);
        i++;
      } else {
        var option = $("<a>", { class: "navbit" }).html("fin.");
        that.options.append(option);
        that.options.off("click");
      }
    });
    return;
  }
  input_sequence(key, text) {
    // var p = document.createElement("p");
    // p.innerHTML = this.sequences[key][text];
    // var input = document.createElement("input");
    // var option = $("<div>", { class: "navbit" })
    // .append(p).append(input);
    // return option;
  }
  exporting() {
    var res = "below is the path you took.<br /> thank you for playing!<br /> <br />  <b>start</b>";
    for (var i in this.history) {
      var scene = this.history[i];
      if (typeof scene == "string") {
        if (scene in this.script) {
          res += "<br />" + this.script[scene].q;
        } else if (scene in this.sequences) {
          res += "<br />" + scene;
        }
      } else {
        res += "<br />" + this.script[scene[0]].q + ": " + scene[1];
      }
    }
    res += "<br /><b>end</b> :3";
    this.popup.up("DONE?", res);
    congrats_noise.play();
    return res;
  }
}

class Path {
  constructor() {
    this.history = window.location.hash.split("#");
    console.log(this.history)
  }
  pop(num = 1) {
    if (this.history.length <= 1) {
      return;
    }
    var scene;
    console.log(this.history)
    for (var i in num) {
      scene = this.history.pop();
    }
    var hashstring = this.history[0];
    for (var i = 1; i < this.history.length; i++) {
      hashstring += "#" + this.history[i];
    }
    window.location.hash = hashstring;
    console.log(hashstring, this.history)
    return scene;
  }
  push(key, value = "") {
    this.history.push([key, value])
    window.location.hash += "#" + key;
  }
  update(key, value = "") {
    this.history[history.length - 1] = [key, value];
  }
  export() {
    return this.history;
  }
  length() {
    return this.history.length();
  }
}
export default function (script, popups, sequences) {
  return new JuneBug(script, popups, sequences)
}
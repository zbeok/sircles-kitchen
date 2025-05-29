
var bg;
var snapRadius=100;
function resize(){
  bg=document.getElementById("bg");
  var w_ratio = bg.offsetWidth/bg.naturalWidth;
  // var h_ratio = bg.bg.offsetHeight/bg.naturalHeight;
  resize_clothes(w_ratio);
}
window.onload = resize;

function resize_clothes(ratio) {
  var clothes = document.getElementsByClassName("drag");
  for (var i = 0; i < clothes.length; i++) {
    var w = clothes[i].naturalWidth; 
    var h = clothes[i].naturalHeight;
    clothes[i].style.width = w * ratio + "px";
    dragobject.snap(clothes[i])
  }
}
window.onresize = resize;

// thanks to dynamic drive but also i, sophie, had to make my own tweaks as well//
/***********************************************
 * Drag and Drop Script: (c) Dynamic Drive (http://www.dynamicdrive.com)
 * Please keep this notice intact
 * Visit http://www.dynamicdrive.com/ for this script and 100s more.
 ***********************************************/
var dragobject = {
  z: 0,
  x: 0,
  y: 0,
  offsetx: null,
  offsety: null,
  targetobj: null,
  dragapproved: 0,
  initialize: function () {
    document.onmousedown = this.drag;
    document.ontouchstart = this.dragt;
    document.onmouseup = this.mouseUp;
    document.ontouchend = this.mouseUp;
    
    window.addEventListener("resize", this.resize);
  },
  dragt: function(e){
    var evtobj=e.targetTouches[0]
    var el = e.targetTouches[0].target;
    if (this.targetobj.classList.contains("drag")) {
      
      this.dragapproved = 1;
      if (isNaN(parseInt(this.targetobj.style.left))) {
        this.targetobj.style.left = 0;
      }
      if (isNaN(parseInt(this.targetobj.style.top))) {
        this.targetobj.style.top = 0;
      }
      this.offsetx = parseInt(this.targetobj.style.left);
      this.offsety = parseInt(this.targetobj.style.top);
      this.x = evtobj.clientX;
      this.y = evtobj.clientY;
      if (evtobj.preventDefault) evtobj.preventDefault();
      document.ontouchmove = dragobject.moveit;
      this.targetobj.style.zIndex=dragobject.z;
      dragobject.z+=1;
      
    }
  },
  drag: function (e) {
    var evtobj = window.event ? window.event : e;
    

    this.targetobj = window.event ? event.srcElement : e.target;
    if (this.targetobj.classList.contains("drag")) {
    // if (this.targetobj.className == "drag") {
      
      this.dragapproved = 1;
      if (isNaN(parseInt(this.targetobj.style.left))) {
        this.targetobj.style.left = 0;
      }
      if (isNaN(parseInt(this.targetobj.style.top))) {
        this.targetobj.style.top = 0;
      }
      this.offsetx = parseInt(this.targetobj.style.left);
      this.offsety = parseInt(this.targetobj.style.top);
      this.x = evtobj.clientX;
      this.y = evtobj.clientY;
      if (evtobj.preventDefault) evtobj.preventDefault();
      document.onmousemove = dragobject.moveit;
      this.targetobj.style.zIndex=dragobject.z;
      dragobject.z+=1;
      
    }
  },
  moveit: function (e) {
    var evtobj = window.event ? window.event : e;
    if (e.type=="touchmove") {
      
      window.scrollTo(0, 0);
      e.preventDefault();
      e.stopPropagation();
      evtobj=e.targetTouches[0];
    }
    if (this.dragapproved == 1) {
      this.targetobj.style.left = this.offsetx + evtobj.clientX - this.x + "px";
      this.targetobj.style.top = this.offsety + evtobj.clientY - this.y + "px";
      return false;
    }
  },
  mouseUp: function(e){
    this.dragapproved = 0;
    this.targetobj = window.event ? event.srcElement : e.target;
    if (this.targetobj.classList.contains("drag")) {
      dragobject.snap(this.targetobj);
    }
  },
  snap: function(elem){
    var x = parseInt(elem.style.left) || 0;
    var y = parseInt(elem.style.top) || 0;
    var ratio = bg.offsetWidth/bg.naturalWidth;
    var pre_x=elem.getAttribute("left")*ratio;
    var pre_y=elem.getAttribute("top")*ratio;
    var dist_pre = Math.sqrt((pre_x-x)*(pre_x-x)+(pre_y-y)*(pre_y-y));
    var tgt_x=elem.getAttribute("tgtx")*ratio;
    var tgt_y=elem.getAttribute("tgty")*ratio;
    var dist_tgt = Math.sqrt((tgt_x-x)*(tgt_x-x)+(tgt_y-y)*(tgt_y-y));
    // console.log("shirt id'd",dist,snapRadius*ratio);
    // console.log(x,y,tgt_x,tgt_y);
    if( dist_tgt < snapRadius*ratio ){
      elem.style.left = tgt_x + "px";
      elem.style.top = tgt_y + "px";
    }
    else {
    // if( (x==0 && y==0) || dist_pre < snapRadius*ratio ){
      elem.style.left = pre_x + "px";
      elem.style.top = pre_y + "px";
    }
  },
};

dragobject.initialize();

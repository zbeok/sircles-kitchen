
function rgba(r,g,b,a){
  if (a==null) a=255;
  if (g==null) return "rgba("+r+","+r+","+r+","+a+")"
  return "rgba("+r+","+g+","+b+","+a+")"
}

window.onload=()=>{
  init();
}
function get_time_factor(){
var now = new Date(),
    then = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,0,0),
    diff = now.getTime() - then.getTime();
    var x= document.getElementById("range").value/100;
    var nd=new Date(then.getTime()+x*(24*60*60*1000))
    document.getElementById("time").innerHTML=nd;
  
  return diff/(24*60*60*1000)
}
function time_to_sun(x){
  ////// original colors that looked nice
  // var r=-1*Math.pow(2*(2*x-1),4)+1;
  // var g=-1*(2*x-1)*(2*x-1)+1;
  // var b=Math.pow(2*x-1,4)+.6;
  var r=-1*Math.pow(1.3*(2*x-1),4)+1;
  var g=-1*Math.pow(1.2*(2*x-1),2)+1;
  var b=-1*Math.pow(.8*(2*x-1),6)+.7;
  return rgba(255*r,255*g,255*b);
}
function make_sun(){
  var x = get_time_factor();
  x= document.getElementById("range").value/100;
  document.getElementById("debug").innerHTML=x;
  setBG(
    time_to_sun(x-.05),
    time_to_sun(x+.05),
  );
}
function init(){
  document.getElementById("range").value=get_time_factor()*100;
  
  make_sun();
}
function setBG(c1,c2){
  
  document.body.style.background="linear-gradient("+c1+","+c2+")";  

  
}
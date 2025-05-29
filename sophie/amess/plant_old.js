// standalone plant prototype with ideal proportions
let pts_num=5,
  pts = [],
  len = 50,
  base = {x:0,y:0},
  leaf_w = 10;
  leaf_l = 30;
  sway=10,
    speed=50,
    offset=0;

function setup() {
  createCanvas(400, 400);
  base={x:width/2,y:0};
  offset=random(400);
  for (var i=0;i<pts_num;i++){
    pts.push({x:base.x,y:height-(base.y+len*i)})
  }
}
function period(){
  return frameCount*speed/1000;
}
function animate(){
  for (var i=0;i<pts_num;i++){
    pts[i].x=base.x+sin(offset-period()+pts[i].y*20)*sway;
  }
}
function leaf(pt,tgt,w){
  var l=dist(pt.x,pt.y,tgt.x,tgt.y);
  var angle =atan2(pt.x-tgt.x,pt.y-tgt.y)
  push();
  translate(pt.x,pt.y);
  rotate(angle)
  strokeWeight(2);
  fill(0);
  beginShape();
  vertex(0, 0);
  curveVertex(0, 0);
  curveVertex(w,l/2)
  vertex(0, l);
  curveVertex(-w,l/2)
  curveVertex(0, 0);
  vertex(0, 0);
  endShape();
  pop()
}
function display(){
  strokeWeight(2);
  noFill();
  beginShape();
  curveVertex(pts[0].x,pts[0].y)
  for (var i=0;i<pts_num;i++){
    curveVertex(pts[i].x,pts[i].y)
  }
  curveVertex(pts[pts_num-1].x,pts[pts_num-1].y)
  endShape();
  var tgt=base;
  for (var i=1;i<pts_num;i++){
    tgt = {x:pts[i].x+leaf_l,y:pts[i].y+leaf_l};
    if( i%2==0){
      tgt.x=pts[i].x-leaf_l;
    }
    leaf(pts[i],tgt,leaf_w);
  }
  if( (pts_num-1)%2==0){
    tgt.x=pts[pts_num-1].x+leaf_l;
  }
  leaf(pts[pts_num-1],tgt,leaf_w);
  
}
function draw() {
  background(220);
  animate();
  display();
}
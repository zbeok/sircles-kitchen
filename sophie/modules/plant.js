class Plant{
  constructor(s,x,z){
    //////// base stats //////////
    // len=5; the number of leafnodes
    // seg_length= 50; how long in px each stem-piece is
    // base = {x:s.width/2, y:0}; position of the root
    // leaf_w = 10; how wide each leaf is (half)
    // leaf_l = 30; how long each leaf is 
    // sway = 10; severity of wiggle
    // speed = 50; speed of wiggle
    // lag = .1; how much and fast mouse affects
    // stroke = 0; color of leaf
    // flowerc = color(255,50,255) color of flower
    this.len=s.round(s.random(1,7));
    this.seg_length= s.randomGaussian(s.height/3/this.len,10);
    this.base = {x:x==null? s.random(s.width):x,y:0};
    this.leaf_l = s.randomGaussian(30,3);
    this.leaf_w = s.randomGaussian(10,1.4);
    this.sway=10;
    this.speed=s.randomGaussian(50,10);
    this.lag=s.random(.01,.5);
    this.stroke=z==null? s.round(s.random(255)):z;
    s.colorMode(s.HSB, 255);
    this.flowerc=s.color(s.random(0,255),50,255);
    s.colorMode(s.RGB, 255);
    
    this.s = s;
    this.pts = [];
    this.offset=s.random(2);
    this.mouse2={x:0,y:0}
    for (var i=0;i<this.len;i++){
      this.pts.push({x:this.base.x,y:s.height-(this.base.y+this.seg_length*i)})
    }
    this.flowerEnabled=(this.s.height-this.pts[this.len-1].y>s.randomGaussian(s.height/2,s.height/6));
  }
  period(){
    return this.s.frameCount*this.speed/1000;
  }
  animate(){
    for (var i=0;i<this.len;i++){
      this.pts[i].x=this.base.x+this.s.sin(this.offset-this.period()+i*20)*this.sway;
    }
  }
  
  wind(mouse){
    var speed2={x:mouse.x-this.mouse2.x,
               y:mouse.y-this.mouse2.y};
    this.mouse2 = {
      x: this.mouse2.x + speed2.x * this.lag,
      y: this.mouse2.y + speed2.y * this.lag,
    }
    var speed_d={x:mouse.x-this.mouse2.x,
                 y:mouse.y-this.mouse2.y}
    // this.s.strokeWeight(10);
    // this.s.stroke(this.flowerc)
    // this.s.point(this.mouse2.x,this.mouse2.y)
    for (var i=0;i<this.len;i++){
      var y = (this.s.height- this.pts[i].y)
    var dist=this.s.dist(mouse.x,mouse.y,this.pts[i].x,this.pts[i].y)
    var dist_factor = (this.s.width-dist)/this.s.width
      var factor = y*speed_d.x*dist_factor*dist_factor/this.s.width;
      this.pts[i].x+=factor;
    }
  }
  
  flower(){
    //flower
    this.s.fill(this.s.color(
      this.s.red(this.flowerc),
      this.s.blue(this.flowerc),
      this.s.green(this.flowerc),
      255
    ))
    this.s.strokeWeight(5)
    this.s.stroke(255,255,255,50);
    this.s.circle(this.pts[this.len-1].x,this.pts[this.len-1].y-this.leaf_l/2-5,this.leaf_l);

  }
  stem(){
    
    // stem
    this.s.strokeWeight(2);
    this.s.stroke(this.stroke)
    this.s.noFill();
    this.s.beginShape();
    this.s.curveVertex(this.pts[0].x,this.pts[0].y)
    for (var i=0;i<this.len;i++){
      this.s.curveVertex(this.pts[i].x,this.pts[i].y)
    }
    this.s.curveVertex(this.pts[this.len-1].x,this.pts[this.len-1].y)
    this.s.endShape();
  }
  leaves(){
    
    // leaves on stalk
    var tgt=this.base;
    for (var i=1;i<this.len;i++){
      tgt = {x:this.pts[i].x+this.leaf_l,y:this.pts[i].y+this.leaf_l};
      if( i%2==0){
        tgt.x=this.pts[i].x-this.leaf_l;
      }
      this.leaf(this.pts[i],tgt,this.leaf_w);
    }
    // add final leaf
    if( (this.len-1)%2==0){
      tgt.x=this.pts[this.len-1].x+this.leaf_l;
    } else {
      tgt.x=this.pts[this.len-1].x-this.leaf_l;
    }
    this.leaf(this.pts[this.len-1],tgt,this.leaf_w);

  }
  leaf(pt,tgt,w){
    var l=this.s.dist(pt.x,pt.y,tgt.x,tgt.y);
    var angle =this.s.atan2(pt.x-tgt.x,pt.y-tgt.y)
    
    this.s.strokeWeight(2);
    this.s.fill(this.stroke);
    
    this.s.push();
    this.s.translate(pt.x,pt.y);
    this.s.rotate(angle)
    
    this.s.beginShape();
    this.s.vertex(0, 0);
    this.s.curveVertex(0, 0);
    this.s.curveVertex(w,l/2)
    this.s.vertex(0, l);
    this.s.curveVertex(-w,l/2)
    this.s.curveVertex(0, 0);
    this.s.vertex(0, 0);
    this.s.endShape();
    
    this.s.pop()
  }
  display(){
    if (this.flowerEnabled)
      this.flower()
    this.stem()
    this.leaves()
  }
}
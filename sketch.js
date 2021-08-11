let button;

//player1 and 2
let p1YPos = 300; let p1XPos = 30;
let p2YPos = 300; let p2XPos = 970;

let p1right, p1left, p1up, p1down;
let p2right, p2left, p2up, p2down;

//sounds and images
let pisngsound;
let bckimage, bckimage2;

//ball
let xPos = 500; let yPos = 300;
let xSpeed, ySpeed; 
let xDirection, yDirection;

let ballright, ballleft, balltop, ballbottom;
let ballArrayx = [2,-2]; let ballArrayy = [-2,2];

let state = "white"

//scores
let score1 = 0; let score2 = 0;

function preload(){
   pingsound = loadSound('pong.wav');
   bckimage = loadImage('fireice.jpg');
   bckimage2 = loadImage('fireice.jpg');

}
// let backgroundArray = [bckimage, bckimage2]; //for changing the background, use button for this

function setup() {
   createCanvas(1000, 600); 
   background(0);
   image(bckimage, 0, 0, 1000, 600);
   rectMode(CENTER); textAlign(CENTER);
   noStroke();

   xSpeed = 2; ySpeed = 2;
   xDirection = ballArrayx[randNumGenerator(ballArrayx.length)];
   yDirection = ballArrayy[randNumGenerator(ballArrayy.length)];
}

function randNumGenerator(integer){
   let randNum = Math.random();
   let num = randNum * integer;
   let rng = Math.floor(num);
   return rng;
}
 
function draw() {
   background(0);
   image(bckimage, 0, 0, 1000, 600);

   //score
      //dotted line
   fill(255, 255, 255);
   strokeWeight(3);
   rect(500 , 0 , 4 ,50); rect(500, 75, 4, 50); rect(500, 150, 4, 50); rect(500, 225, 4, 50); rect(500, 300, 4, 50); //center 
   rect(500, 375, 4, 50); rect(500, 450, 4, 50); rect(500, 525, 4, 50); rect(500, 600, 4, 50); rect(500, 675, 4, 50); // dashed line

      //score line 1
   fill(255, 255, 255); strokeWeight(6); textFont('Impact'); textSize(50); text(score1, 442, 300);
      //score line 2
   textSize(50);text(score2, 560, 300);

   //p2 paddle is red right
   strokeWeight(3); fill(220, 43, 43); rect(p2XPos, p2YPos, 10, 100);
   //p1 paddle is blue left
   fill(65, 95, 225); rect(p1XPos, p1YPos, 10, 100);
   
   //Text
   strokeWeight(5); fill(65, 105, 225); textSize(35); text("P1", 55, 50); //p1
   fill(220, 43, 43); textSize(35); text("P2", 945, 575); //p2
   
   //ball states
   if(state == 'white'){
      fill(255,255, 255);
   }
   if(state == "red"){
      fill(220, 43, 43);
   }
   if(state == "blue"){
      fill(65, 95, 225);
   }
   stroke(0); strokeWeight(5); ellipse(xPos, yPos, 20, 20);
   
   //player movement
   if(keyIsDown(87)){
      p1YPos -= 9;
   }
   if(keyIsDown(83)){
      p1YPos += 9;
   }
   if(keyIsDown(UP_ARROW)){
      p2YPos -= 9;
   }
   if(keyIsDown(DOWN_ARROW)){
      p2YPos += 9;
   }

   //player collilsions
   p1right=p1XPos+20; p1left=p1XPos-20; p1bottom=p1YPos+55; p1top=p1YPos-55; //player1 hitboxes
    
   p2right=p2XPos+20; p2left=p2XPos-20; p2bottom=p2YPos+55; p2top=p2YPos-55; //player2 hitboxes

   ballright=xPos+12; ballleft=xPos-12; ballbottom=yPos+12; balltop=yPos-12; //ball hitbboxes

   if(p1YPos < 50){
      p1YPos = 50;
   }
   if(p1YPos > 550){
      p1YPos = 550;
   }
   if(p2YPos < 50){
      p2YPos = 50;
   }
   if(p2YPos > 550){
      p2YPos = 550;
   }

   //ball movement/ball collisions
   xPos += xSpeed * xDirection; yPos += ySpeed * yDirection;

   if(yPos > 585 || yPos < 15){
      yDirection*=-1;
   }
   if(xPos < p1right && xPos > p1left && yPos > p1top && yPos < p1bottom){
      xDirection *= -1.05;
      // yDirection*=1;
      pingsound.play();
      state = "blue"
   }
   if(xPos < p2right && xPos > p2left && yPos > p2top && yPos < p2bottom){
      xDirection *= -1.05;
      // yDirection*=1;
      pingsound.play();
      state = "red"
   }
   //scores
   if(xPos < -5){
      fill(220, 43, 43);
      text("P2 Scored!", 500, 200);
   }
   if(xPos > 1005){
      fill(65, 95, 225);
      text("P1 Scored!", 500, 400);
   }
   if(xPos < -300){
      score2 = score2 + 1;
      xPos = 500; yPos = 300;
      xSpeed = 2; ySpeed = 2;
      xDirection = ballArrayx[randNumGenerator(ballArrayx.length)];
      yDirection = ballArrayy[randNumGenerator(ballArrayy.length)];
      state = "white"
   }
   else if(xPos > 1300){
      score1 = score1 + 1;
      xPos = 500; yPos = 300;
      xSpeed = 2; ySpeed = 2;
      xDirection = ballArrayx[randNumGenerator(ballArrayx.length)];
      yDirection = ballArrayy[randNumGenerator(ballArrayy.length)];
      state = "white"
   }    
   else if(score1 == 10){
      xPos=500; yPos=300;
      xSpeed=0; ySpeed=0;
      fill(65, 95, 225); textSize(40); text("P1 Wins!", 500, 500); 
   }
   else if(score2 == 10){
      xPos=500; yPos=300;
      xSpeed=0; ySpeed=0;
      fill(220, 43, 43); textSize(40); text("P2 Wins!", 500, 500); 
   }
}

function keyIsPressed(){
   if(keyPressed(13)){
      draw();
   }
}
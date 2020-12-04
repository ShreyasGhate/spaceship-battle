var gameState="intro";
var score;
var ship,shipImg;
var background,backgroundImg;
var bullet,bulletImg,bulletGroup;
var ship1,ship1Img,ship2,ship2Img,ship3,ship3Img,ship4,ship4Img,ship1Group,ship2Group,ship3Group,ship4Group;

var blast,blast1,blast2,blast3, blastImg,blastGroup;
var gameover,gameoverImg,restart,restartImg;
var start,startImg;
var start1,start1Img;

function preload(){
  
  backgroundImg = loadImage("2020-12-03 (3).png");
  shipImg = loadImage("our ship.png");
  bulletImg = loadImage("bullet image.png");
  
  
  ship1Img = loadImage("enemy space ship 1.png");
  ship2Img = loadImage("enemy space ship 2.png");
  ship3Img = loadImage("spceship.png");
  ship4Img = loadImage("enemy space ship 4.png");
  
  blastImg = loadImage("blast image.png");
  
  gameoverImg = loadImage("gameover image.png");
  restartImg =loadImage("restart-icon.png");
  startImg = loadImage("play button 1.png");
  start1Img = loadImage("start text.png");
  
  }

function setup() {
  createCanvas(500,600);
  
  background = createSprite(300,600);
  background.addImage(backgroundImg);
  background.scale=1;
  background.velocityY=1.5;
  
  ship = createSprite(240,550,20,20);
  ship.addImage(shipImg);
  ship.scale = 0.07;
  
  
  
  bulletGroup = new Group();
  
  ship1Group = new Group();
  ship2Group = new Group();
  ship3Group = new Group();
  ship4Group = new Group();
  blastGroup = new Group();
  
  score = 0;
  
  gameover = createSprite(250,140);
  gameover.addImage(gameoverImg);
  gameover.scale = 0.8;
  gameover.visible   = false;
  
  restart = createSprite(250,370);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;
  
  start = createSprite(260,190);
  start.addImage(startImg);
  start.scale = 0.2;
  start.visible = false;
  
  start1 = createSprite(250,380);
  start1.addImage(start1Img);
  start1.scale = 0.2;
  start1.visible = false;
  
}


function draw() {

  if(gameState==="intro") {
    start1.visible = true;
    start.visible = true;
  }
  
  if(gameState==="intro" && mousePressedOver(start)) {
    gameState="play";
  }
  
  if(background.y>400) {
    background.y= 300;
  }
  
  if(gameState==="play") {
    start1.visible = false;
    start.visible = false;
  }
  
  if(gameState==="play" && ship.x>=10 && keyDown("left_arrow")) {
    ship.x += -(7 + 2*score/5);
  }
  
  if(gameState==="play" && ship.x<=490 && keyDown("right_arrow")) {
    ship.x += (7 + 2*score/5);
  }
  
  if(gameState==="play" && ship.y>=20 && keyDown("up_arrow")) {
    ship.y += -(7 + 2*score/5);
  }
  
  if(gameState==="play" && ship.y<=570 && keyDown("down_arrow")) {
    ship.y += (7 + 2*score/5);
  }
  
  if(gameState==="play" && keyDown("space")) {
    CreateBullet();
  }
  
  var select_ships = Math.round(random(1,4));

  if ( gameState==="play" && World.frameCount % 80 == 0) {
    if (select_ships == 1) {
      CreateS1();
    } else if (select_ships == 2) {
      CreateS2();
    } else if (select_ships == 3) {
      CreateS3();
    } else {
      CreateS4();
    }
  }
  
  if(gameState==="play" && bulletGroup.isTouching(ship1Group)) {
    Blast();
    ship1Group.destroyEach();
    bulletGroup.destroyEach();
    score+=1;
  }
  
  if(gameState==="play" && bulletGroup.isTouching(ship2Group)) {
    Blast1();
    ship2Group.destroyEach();
    bulletGroup.destroyEach();
    score+=1;
  }
  
  if(gameState==="play" && bulletGroup.isTouching(ship3Group)) {
    Blast2();
   ship3Group.destroyEach();
    bulletGroup.destroyEach();
    score+=1;
  }
  
  if(gameState==="play" && bulletGroup.isTouching(ship4Group)) {
    Blast3();
   ship4Group.destroyEach();
    bulletGroup.destroyEach();
    score+=1;
  }
  
  if(gameState ==="end") {
    ship1Group.destroyEach();
    ship2Group.destroyEach();
    ship3Group.destroyEach();
    ship4Group.destroyEach();
    gameover.visible = true;
    restart.visible = true;
    ship.x= 240;
    ship.y =550;
    
  }
  
    if(gameState==="play" && ship1Group.isTouching(ship)) {
      gameState="end";
    }
    
    if(gameState==="play" && ship2Group.isTouching(ship)) {
      gameState="end";
    }
    
    if(gameState==="play" && ship3Group.isTouching(ship)) {
      gameState="end";
    }
    
    if(gameState==="play" && ship4Group.isTouching(ship)) {
      gameState="end";
    }
  
  if(gameState==="end" && mousePressedOver(restart)) {
    reset();
  }
  
  drawSprites();
  
  stroke("yellow");
  textSize(18);
  fill("yellow");
  text("score : " + score,400,50);
  
}

function CreateBullet() {
  bullet = createSprite(240,590,10,10);
  bullet.addImage(bulletImg);
  bullet.y=ship.y;
  bullet.x = ship.x;
  bullet.velocityY=-(5 + 3*score/5);
  bullet.scale=0.08;
  bullet.lifetime = 110;
  bulletGroup.add(bullet);
}

function CreateS1() {
  ship1= createSprite(Math.round(random(30,470)),-30,50,50);
  ship1.addImage(ship1Img);
  ship1.scale = 0.12;
  ship1.velocityY=(5 + 3*score/5);
  ship1.lifetime=140;
  ship1Group.add(ship1);
}

function CreateS2() {
  ship2= createSprite(Math.round(random(30,470)),-30,50,50);
  ship2.addImage(ship2Img);
  ship2.scale = 0.13;
  ship2.velocityY=(5 + 3*score/5);
  ship2.lifetime=140;
  ship2Group.add(ship2);
}

function CreateS3() {
  ship3= createSprite(Math.round(random(30,470)),-30,50,50);
  ship3.addImage(ship3Img);
  ship3.scale = 0.14;
  ship3.velocityY=(5 + 3*score/5);
  ship3.lifetime=140;
  ship3Group.add(ship3);
}

function CreateS4() {
  ship4= createSprite(Math.round(random(30,470)),-30,50,50);
  ship4.addImage(ship4Img);
  ship4.scale = 0.13;
  ship4.velocityY=(5 + 3*score/5);
  ship4.lifetime=140;
  ship4Group.add(ship4);
}

function Blast()  {
  blast = createSprite(200,200,10,10);
  blast.addImage(blastImg);
  blast.scale = 0.13;
  blast.velocityY=(5 + 3*score/10);
  blast.lifetime = ship1.lifetime;
  blast.x= ship1.x;
  blast.y = ship1.y;
  blastGroup.add(blast);
  
}

function Blast1()  {
  blast1 = createSprite(200,200,10,10);
  blast1.addImage(blastImg);
  blast1.scale = 0.13;
  blast1.velocityY=(5+ 3*score/5);
  blast1.lifetime = ship2.lifetime;
  blast1.x= ship2.x;
  blast1.y = ship2.y;
  blastGroup.add(blast1);
  
}

function Blast2()  {
  blast2 = createSprite(200,200,10,10);
  blast2.addImage(blastImg);
  blast2.scale = 0.13;
  blast2.velocityY=(5+ 3*score/5);
  blast2.lifetime = ship3.lifetime;
  blast2.x= ship3.x;
  blast2.y = ship3.y;
  blastGroup.add(blast2);
  
}

function Blast3()  {
  blast3 = createSprite(200,200,10,10);
  blast3.addImage(blastImg);
  blast3.scale = 0.13;
  blast3.velocityY=(5 + 3*score/5);
  blast3.lifetime = ship4.lifetime;
  blast3.x= ship4.x;
  blast3.y = ship4.y;
  blastGroup.add(blast3);
  
}

function reset() {
  gameover.visible = false;
  restart.visible = false;
  start.visible = true;
  start1.visible = true;
  score = 0;
  gameState="intro";
}

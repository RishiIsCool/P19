var rocketship, rocketshipImg;
var star, starGroup, starImg;
var space, spaceImg;
var meteor, meteorGroup, meteorImg;
var stars = 0;
var score = 0;
var END = 0;
var PLAY = 1;
var gameState = PLAY;
var gameOver,gameOverImg, restart

function preload() {
  rocketshipImg = loadImage("rocketship.png")
  starImg = loadImage("star.png")
  spaceImg = loadImage("space.png")
  meteorImg = loadImage("meteor.png")
  gameOverImg = loadImage("gameOver.png")
}

function setup() {
  createCanvas(600, 600)

  space = createSprite(300, 300)
  space.addImage(spaceImg);
  space.scale = 0.45;
  space.velocityY = -2;

  rocketship = createSprite(300, 500)
  rocketship.addImage(rocketshipImg)
  rocketship.scale = 0.20;

  gameOver = createSprite(300,300)
  gameOver.addImage(gameOverImg)
  gameOver.visible = false;

  meteorGroup = new Group()
  starGroup = new Group()
} 

function draw() {

  background(0)
 
  if (space.y < 165) {
    space.y = height / 2;
  }
  if (gameState===PLAY) {
    score = World.frameCount
    if (keyDown(RIGHT_ARROW)) {
      rocketship.x = rocketship.x + 5;
    }
  
    if (keyDown(LEFT_ARROW)) {
      rocketship.x = rocketship.x - 5;
    }
  

    if (World.frameCount % 180 == 0) {
      randomMeteor();
    }
  
    if (World.frameCount % 250 == 0) {
      randomStar();
    }
    if (starGroup.collide(rocketship)) {
      stars = stars + 1;
      starGroup.destroyEach();
    }
  }

  if (gameState===END ) {
    meteorGroup.destroyEach();
    starGroup.destroyEach();
    score = 0;
    stars = 0;
    gameOver.visible = true;
    
  }

  if (meteorGroup.collide(rocketship)) {
    gameState = END
  } 



  drawSprites();
  textSize(25);
  fill("white");
  text("Score: "+score,50,50)
  text("Stars: "+stars,50,75)
}

function randomMeteor() {
  meteor = createSprite(Math.round(random(150, 450)),0)
  meteor.addImage(meteorImg);
  meteor.velocityY = 2;
  meteor.scale = 0.15;
  meteor.lifetime = 300;

  meteorGroup.add(meteor)
}

function randomStar() {
  star = createSprite(Math.round(random(150,450)), 0)
  star.addImage(starImg);
  star.scale = 0.05;
  star.velocityY = 2;
  star.lifetime = 300;

  starGroup.add(star)
}
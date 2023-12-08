//declarando as variáveis
var trex, trexRunning
var edges
var ground, groundAnimation
var invisibleGround
var clouds, cloudImg
var cactos, cactosImg1,cactosImg2,cactosImg3,cactosImg4,cactosImg5,cactosImg6
var score = 0
const PLAY = 0
const END = 1
var gameState = PLAY
var cloundsgroup
var cactosgroup
var trexColided
var gameOver
var gameOverImg
var restartImg
var restart
var jump
var checkpoint
var die
var isDied = false
var highscore = 0
//var => variaveis com escopo global - idade
//let => variaveis de escopo local - idade
//const => constantes - data de nascimento

//preload carrega as mídias do jogo
function preload(){
  trexRunning = loadAnimation("./images/trex3.png","./images/trex4.png")
  trexColided = loadAnimation("./images/trex_collided.png")
  groundAnimation = loadImage("./images/ground2.png")
  cloudImg = loadImage ("./images/cloud.png")
  cactosImg1 = loadImage ("./images/obstacle1.png") 
  cactosImg2 = loadImage ("./images/obstacle2.png") 
  cactosImg3 = loadImage ("./images/obstacle3.png")
  cactosImg4 = loadImage ("./images/obstacle4.png")
  cactosImg5 = loadImage ("./images/obstacle5.png") 
  cactosImg6 = loadImage ("./images/obstacle6.png") 
  gameOverImg = loadImage("./images/gameOver.png")
  restartImg = loadImage("./images/restart.png")
  jump = loadSound("./sounds/jump.mp3")
  die = loadSound("./sounds/die.mp3")
  checkpoint = loadSound("./sounds/checkPoint.mp3")
}


//setup faz a configuração
function setup(){
  //                600         200
  createCanvas(windowWidth,windowHeight);

  //sprite trex
  trex = createSprite(50,height-30,30,50)
  trex.addAnimation("running",trexRunning)  
  trex.addAnimation("colided",trexColided)
  trex.scale = 0.5

 trex.debug = false
  trex.setCollider("rectangle",-5,0,45,90,20)
  //sprite Solo
  ground = createSprite(width/2,height-15,width,10)
  ground.addImage(groundAnimation) 
 

  // criando solo invisivel
  invisibleGround = createSprite(width/2,height-10,width,1)
  invisibleGround.visible = false

  //criando bordas
  edges = createEdgeSprites()

  cloundsgroup = new Group()
  cactosgroup = new Group()

  gameOver = createSprite(width/2,height-115)
  gameOver.addImage(gameOverImg)
  gameOver.visible = false
  restart = createSprite(width/2, height-75)
  restart.addImage(restartImg)
  restart.scale = 0.6
  restart.visible = false
}

//draw faz o movimento, a ação do jogo
function draw(){
  background("darkgray");

  if(trex.isTouching (cactosgroup)){
    //  trex.velocityY = -10
    //  jump.play()
   gameState = END
      if(!isDied){
        die.play()
        isDied = true
      }
    


  }

  if(gameState == PLAY){
    score += Math.round(getFrameRate()/60) 
     //pulo do trex
    if((keyDown("space") || keyDown("up")) && trex.y >= height-40){
      trex.velocityY = -10
      jump.play()
    }
    if(score%100 == 0 && score != 0){
      checkpoint.play()
    }
     //gravidade
     trex.velocityY += 0.5
    if ( keyDown("Down") ) {
      trex.velocityY = 10
    }
    if(ground.x < 0){
      ground.x = ground.width/2 
    }
    createClouds()
    createCactos()

    ground.velocityX = -(2+3*score/100)

  } else if (gameState == END){
        gameEnd()
        if(score >= highscore){
          highscore = score
      
        }
        if(mousePressedOver(restart)){
          restartGame()

    }


  }
  //console.log(frameCount)
  //colisão do trex com o solo
  trex.collide(invisibleGround)
  //criando textos
  textSize(20)
  fill ("black")
  text("score: "+score,width/2-70,height-185)
  text("highscore: "+highscore,width/2+45,height-185)
  
  
  //gerando números aleatórios
  // var numero = random(1,10)
  // numero = Math.round(numero)
  //versão simplificada
  var numero = Math.round(random(1,10))
  //round() arredonda para o maior
  //1,5 => 2 
  //1,2 => 2
  //floor()
  //1,5 => 1
  //1,9 => 1
  //console.log(numero)
  //coordenadas do mouse na tela
  text("X: "+mouseX+" / Y: "+mouseY,mouseX,mouseY)
  drawSprites();
}

//função para gerar nuvens

function createClouds() {
  if(frameCount%45==0)  {
    var clouds = createSprite (width,random(height-175,height-82),10,10)
      clouds.velocityX = -(5+3*score/100)
      clouds.addImage(cloudImg)
      clouds.scale = random(0.2,1.2)
      clouds.depth = trex.depth -1
      clouds.lifetime = width/(clouds.velocityX*-1)
          cloundsgroup.add(clouds)
  }
}
 
//função para fazer cactos

function createCactos() {
  if(frameCount%85==0)  {
    var cactos = createSprite (width,height-30,10,10)
    cactos.velocityX = -(5+3*score/100)
    var randyCacto = Math.round(random (1,6))
      switch (randyCacto) {
        case 1: 
        cactos.addImage(cactosImg1)
        cactos.scale =0.6
           break;
        case 2:
           cactos.addImage(cactosImg2) 
           cactos.scale =0.7
           break;
        case 3 : 
          cactos.addImage(cactosImg3)
          cactos.scale =0.6
           break;
        case 4:
          cactos.addImage(cactosImg4)
          cactos.scale =0.5
           break;
        case 5: 
          cactos.addImage(cactosImg5)
          cactos.scale =0.6
           break;
        case 6:
          cactos.addImage(cactosImg6)
          cactos.scale =0.5
           break;         
      }
       cactos.lifetime = width/(cactos.velocityX*-1)

          cactosgroup.add(cactos)
  }
}

function gameEnd(){
  ground.velocityX = 0
  trex.velocityY = 0
  cloundsgroup.setVelocityXEach(0)
  cactosgroup.setVelocityXEach(0)
  trex.changeAnimation("colided")
  cloundsgroup.setLifetimeEach(-1)
  cactosgroup.setLifetimeEach(-1)
  gameOver.visible = true 
  restart.visible =  true
}

function restartGame(){
  gameState = PLAY
  cactosgroup.destroyEach()
  cloundsgroup.destroyEach()
  trex.changeAnimation("running")
  gameOver.visible = false
  restart.visible = false
  score = 0
}
//declarando as variáveis
var trex, trexRunning
var edges
var ground, groundAnimation
var invisibleGround

//preload carrega as mídias do jogo
function preload(){
  trexRunning = loadAnimation("./images/trex3.png","./images/trex4.png")
  groundAnimation = loadImage("./images/ground2.png")
}


//setup faz a configuração
function setup(){
  createCanvas(600,200);

  //sprite trex
  trex = createSprite(50,170,30,50)
  trex.addAnimation("running",trexRunning)  
  trex.scale = 0.5

  
  //sprite Solo
  ground = createSprite(300,185,600,10)
  ground.addImage(groundAnimation) 
  ground.velocityX = -2

  // criando solo invisivel
  invisibleGround = createSprite(300,190,600,1)
  invisibleGround.visible = false

  //criando bordas
  edges = createEdgeSprites()

}

//draw faz o movimento, a ação do jogo
function draw(){
  background("lightgray");

  //pulo do trex
  if((keyDown("space") || keyDown("up")) && trex.y >= 160){
    trex.velocityY = -10 
  }
  //gravidade
  trex.velocityY += 0.5

  // console.log(trex.y)

  //colisão do trex com o solo
  trex.collide(invisibleGround)

  if(ground.x < 0){
    ground.x = ground.width/2
  }
 
  //coordenadas do mouse na tela
  text("X: "+mouseX+" / Y: "+mouseY,mouseX,mouseY)
  drawSprites();

}

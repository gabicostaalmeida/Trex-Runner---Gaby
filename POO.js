//criar objetos

var musica = {
    nome: "THE DRIVER",
    cantores:["taylor swift","sabrina Carpenter"],
    estilo:["rock","pop", "country", "metal", "k-pop"],
    banda:"QUEEN",
    instrumental:"guitarra",
    compositor:"Maneskim",
    duracao: 3.08
}

var ball={
    x:100,
    y:100,
    w:50,
    h:50,
    color:"red"
}

function setup(){
    createCanvas(400,400)

    console.log(musica)
}

function draw(){
    background(189)

    fill(ball.color)
    noStroke()
    ellipse(ball.x,ball.y,ball.w,ball.h)
    ball.x += 1

}
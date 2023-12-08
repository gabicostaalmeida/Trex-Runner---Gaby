
var golden;
var box
var saturno

function setup(){
    createCanvas(400,400)

    golden = new Cachorro("grande",4,2,"médio","Golden") //instanciando a classe cachorro
    golden.display() // exibindo o método
    saturno = new Planetas("saturno",5.68,60,10,"gasoso")
    // box = new Box(200,200,50,50,5)
}

function draw (){
    background(255)
//     box.display()
//     box.velocity()
       saturno.display()

 }
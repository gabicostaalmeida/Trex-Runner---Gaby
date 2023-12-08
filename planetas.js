class Planetas{
    constructor(name,massa,raio,gravidade,tipo){
        this.name = name
        this.massa = massa
        this.raio = raio
        this.gravidade = gravidade
        this.tipo = tipo
        }
    display(){
        console.log(this.name,this.massa,this.raio,this.gravidade,this.tipo)
    }
}
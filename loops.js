marks = [12,36,15,75,82,25,92,31,45]


for(var i = 0; i < marks.length;i++){
    if(marks[i] >= 45){
        console.log(marks[i])
    }
}

notas = [5,8,3,9]
media  = 0
//se media >= 7 --Aprovado
//se media >5 e <7 -- recuperação
//se media < 5 -- reprovado

var soma = 0 

for(var i = 0; i < notas.length;i++){
    soma += notas[i]
}
console.log(soma)

media = soma / notas.length
console.log(media)

if (media >= 7){
    console.log ("aprovado")
} else if(media >5 && media < 7 ){
    console.log("recuperação")
} else { 
    console.log("reprovado")
}

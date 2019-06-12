export function numberToReal(numero,cents) {

    typeof numero !== "number" ? numero = Number.parseFloat(numero) : null

    if(cents){
        numero = numero * 1 / 100
    }
    
    var numero = numero.toFixed(2).split('.');
    numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
}
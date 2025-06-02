function pagar() {
    let res = document.getElementById('res')
    let num = document.getElementById('num')

    if(num.value.length == 0){
        res.innerHTML = 'CPF ou Número Inválido!'
    }else {
        location.href = 'Pagar/pagar.html'
    }
}
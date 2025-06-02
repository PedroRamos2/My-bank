function Entrar() {
    const cpf = document.getElementById('cpf').value.trim();
    const senha = document.getElementById('senhainput').value.trim();
    const mensagemErro = document.getElementById('mensagemErro');
    const senhaErro = document.getElementById('senhaErro')

    mensagemErro.style.display = 'none'
    senhaErro.style.display = 'none'

    //Usar isso mas para frente para criar uma area de cadastro e ficar cadastrado cpf e senha
    //let MeuCpf = '565.822.338-58'
    //let MinhaSenha = 'pedro081'

    if (cpf === '' || senha === '') {
        mensagemErro.style.display = 'block';
        return;
    } 

    if (cpf === '565.822.338-58' && senha === 'pedro081') {
        location.href = '../Home/home.html'
    }else {
        senhaErro.style.display = 'block'
    }

}


// Função para formatar valor em reais
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Função para obter o saldo atual do localStorage
function obterSaldo() {
    const saldoSalvo = localStorage.getItem('saldoConta');
    return saldoSalvo ? parseFloat(saldoSalvo) : 800.00; // Saldo inicial se não existir
}

// Função para atualizar o saldo na tela
function atualizarSaldo() {
    const saldoAtual = obterSaldo();
    document.getElementById("saldo").innerText = formatarMoeda(saldoAtual);
}

// Função para salvar novo saldo
function salvarSaldo(novoSaldo) {
    localStorage.setItem('saldoConta', novoSaldo.toString());
    atualizarSaldo();
}

//Botão do Pix
function pix() {
    location.href = '../Pix/pix.html'
}

//Botão do cartão
function cartao() {
    location.href = '../Cartao/cartao.html'
}

//Botão do histórico
function historico(){
    location.href = '../Historico/his.html'
}

// Função para depositar dinheiro
function depositar() {
    const deposito = parseFloat(document.getElementById("deposito").value);
    const message = document.getElementById("message");

    if (isNaN(deposito) || deposito <= 0) {
        message.innerText = "Por favor, insira um valor válido para depósito.";
        return;
    }

    const saldoAtual = obterSaldo();
    const novoSaldo = saldoAtual + deposito;
    salvarSaldo(novoSaldo);
    
    // Salvar no histórico
    const transacao = {
        data: new Date().toLocaleDateString(),
        hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        valor: deposito,
        tipo: 'Depósito'
    };
    
    const historico = JSON.parse(localStorage.getItem('historicoTransacoes') || '[]');
    historico.push(transacao);
    localStorage.setItem('historicoTransacoes', JSON.stringify(historico));

    message.innerText = `Você depositou ${formatarMoeda(deposito)} com sucesso!`;
    document.getElementById("deposito").value = ''; // Limpa o campo de entrada
}

// Atualizar saldo quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    atualizarSaldo();
});

// Atualizar saldo a cada 2 segundos para manter sincronizado
setInterval(atualizarSaldo, 2000);

// Check if user is logged in
document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (!usuarioLogado) {
        window.location.href = '../login/login.html';
        return;
    }

    document.getElementById('nomeUsuario').textContent = usuarioLogado.nomeCompleto;
});

// Logout function
function logout() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = '../login/login.html';
}

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
    document.getElementById('valorDoSaldo').textContent = formatarMoeda(saldoAtual);
}

// Função para salvar novo saldo
function salvarSaldo(novoSaldo) {
    localStorage.setItem('saldoConta', novoSaldo.toString());
    atualizarSaldo();
}

// Função para obter o histórico atual
function obterHistorico() {
    const historico = localStorage.getItem('historicoTransacoes');
    return historico ? JSON.parse(historico) : [];
}

// Função para salvar no histórico
function salvarNoHistorico(valor, tipo) {
    const historico = obterHistorico();
    const transacao = {
        data: new Date().toLocaleDateString(),
        hora: new Date().toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit'
        }),
        valor: valor,
        tipo: tipo
    };
    historico.push(transacao);
    localStorage.setItem('historicoTransacoes', JSON.stringify(historico));
}

// Função para realizar o pagamento
function realizarPagamento() {
    const valorInput = document.getElementById('valorPagamento');
    const valor = parseFloat(valorInput.value);
    
    if (isNaN(valor) || valor <= 0) {
        alert('Por favor, insira um valor válido');
        return;
    }

    const saldoAtual = obterSaldo();
    
    if (valor > saldoAtual) {
        alert('Saldo insuficiente para realizar o pagamento');
        return;
    }

    const novoSaldo = saldoAtual - valor;
    salvarSaldo(novoSaldo);
    salvarNoHistorico(valor, 'Pagamento');
    
    alert('Pagamento realizado com sucesso!');
    window.location.href = '../../Paginas/home.html';
}

// Atualizar saldo quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    atualizarSaldo();
});

// Atualizar saldo a cada 2 segundos para manter sincronizado
setInterval(atualizarSaldo, 2000);

function toggleSaldo() {
    const saldoElement = document.getElementById('valorDoSaldo');
    const toggleBtn = document.getElementById('toggleSaldo');
    const img = toggleBtn.querySelector('img');
    
    if (saldoElement.style.visibility === 'hidden') {
        saldoElement.style.visibility = 'visible';
        img.style.opacity = '1';
    } else {
        saldoElement.style.visibility = 'hidden';
        img.style.opacity = '0.5';
    }
} 
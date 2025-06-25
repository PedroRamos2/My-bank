let transacoes = []

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
    document.getElementById('saldoAtual').textContent = formatarMoeda(saldoAtual);
}

// Função para limpar o histórico
function limparHistorico() {
    if (confirm('Tem certeza que deseja limpar todo o histórico?')) {
        localStorage.setItem('historicoTransacoes', '[]');
        carregarTransacoes(); // Atualiza a exibição
    }
}

// Função para carregar e exibir as transações
function carregarTransacoes() {
    const transacoesLista = document.getElementById('transacoes-lista');
    const historico = JSON.parse(localStorage.getItem('historicoTransacoes') || '[]');

    if (historico.length === 0) {
        transacoesLista.innerHTML = '<p class="sem-transacoes">Nenhuma transação realizada ainda.</p>';
        return;
    }

    // Inverte o array para mostrar as transações mais recentes primeiro
    const transacoesOrdenadas = [...historico].reverse();

    const transacoesHTML = transacoesOrdenadas.map(transacao => {
        // Define a classe do valor baseado no tipo de transação
        const valorClass = transacao.tipo === 'Depósito' ? 'valor-deposito' : 'valor-pagamento';
        
        return `
            <div class="transacao">
                <div class="transacao-info">
                    <span class="data">${transacao.data} às ${transacao.hora}</span>
                    <span class="tipo">${transacao.tipo}</span>
                </div>
                <span class="${valorClass}">${formatarMoeda(transacao.valor)}</span>
            </div>
        `;
    }).join('');

    transacoesLista.innerHTML = transacoesHTML;
}

function toggleSaldo() {
    const saldoElement = document.getElementById('saldoAtual');
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

// Inicializar a página
document.addEventListener('DOMContentLoaded', () => {
    carregarTransacoes();
    atualizarSaldo();
});

// Atualizar saldo a cada 2 segundos para manter sincronizado
setInterval(atualizarSaldo, 2000);
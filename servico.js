//
// servicos.js
// JavaScript para a Página de Solicitação de Serviços (carrinho.html)
//

// Dados fixos (Preço e Prazo) para cada serviço, conforme requisito
const DADOS_SERVICOS = {
    'CONSULTORIA': { preco: 2500.00, prazoDias: 9, nome: 'Consultoria em Segurança' },
    'SUPORTE': { preco: 999.00, prazoDias: 30, nome: 'Suporte Remoto 24/7' },
    'DESENVOLVIMENTO': { preco: 15000.00, prazoDias: 60, nome: 'Desenvolvimento de APP' },
    'CLOUD': { preco: 5000.00, prazoDias: 15, nome: 'Migração para Cloud' }
};

// Função para formatar a data como DD/MM/AAAA
function formatarData(data) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês é 0-base
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

// Requisito: Preencher Preço, Prazo e Data Prevista automaticamente
function atualizarDadosServico() {
    const servicoSelecionado = document.getElementById('servico').value;
    const precoElemento = document.getElementById('preco-previsto');
    const prazoElemento = document.getElementById('prazo-atendimento');
    const dataPrevistaElemento = document.getElementById('data-prevista');
    
    if (servicoSelecionado && DADOS_SERVICOS[servicoSelecionado]) {
        const dados = DADOS_SERVICOS[servicoSelecionado];
        
        // 1. Preço
        precoElemento.textContent = `R$ ${dados.preco.toFixed(2).replace('.', ',')}`;
        
        // 2. Prazo de Atendimento
        prazoElemento.textContent = `${dados.prazoDias} dias`;
        
        // 3. Data Prevista de Atendimento (Requisito: Data Atual + Prazo)
        const dataAtual = new Date();
        const dataPrevista = new Date(dataAtual);
        dataPrevista.setDate(dataPrevista.getDate() + dados.prazoDias);

        dataPrevistaElemento.textContent = formatarData(dataPrevista);

    } else {
        // Valores padrão quando nenhum serviço é selecionado
        precoElemento.textContent = 'Selecione um serviço';
        prazoElemento.textContent = 'Selecione um serviço';
        dataPrevistaElemento.textContent = 'Calculado automaticamente';
    }
}

// Requisito: Botão Excluir que remove a linha correspondente da tabela
function excluirSolicitacao(botao) {
    const linha = botao.closest('tr'); // Encontra o elemento <tr> mais próximo do botão
    if (linha) {
        if (confirm(`Tem certeza que deseja excluir a solicitação ${linha.dataset.numSolicitacao}?`)) {
            linha.remove();
        }
    }
}

// Requisito: Botão para incluir a solicitação na tabela
function incluirSolicitacao() {
    const servicoSelect = document.getElementById('servico');
    const servicoID = servicoSelect.value;
    const msgValidacao = document.getElementById('mensagem-validacao');
    
    if (!servicoID) {
        msgValidacao.textContent = 'Por favor, selecione um Serviço de TI para incluir.';
        msgValidacao.style.backgroundColor = '#fdeded';
        msgValidacao.style.color = '#e74c3c';
        msgValidacao.style.display = 'block';
        return;
    }
    
    const dados = DADOS_SERVICOS[servicoID];
    const tabelaBody = document.getElementById('lista-solicitacoes-body');

    // Gera um novo número de solicitação (simplificado para demonstração)
    const proximoNum = tabelaBody.rows.length + 1;
    const numSolicitacao = `#202500${proximoNum}`;
    
    // Data do Pedido (Data Atual)
    const dataPedido = formatarData(new Date());
    
    // Data Prevista (já calculada na atualização)
    const dataPrevista = document.getElementById('data-prevista').textContent;

    // Cria a nova linha (<tr>)
    const novaLinha = document.createElement('tr');
    novaLinha.setAttribute('data-num-solicitacao', proximoNum);
    
    novaLinha.innerHTML = `
        <td>${dataPedido}</td>
        <td>${numSolicitacao}</td>
        <td>${dados.nome}</td>
        <td>EM ELABORAÇÃO</td>
        <td>R$ ${dados.preco.toFixed(2).replace('.', ',')}</td>
        <td>${dataPrevista}</td>
        <td><button onclick="excluirSolicitacao(this)">Excluir</button></td>
    `;
    
    // Adiciona a nova linha ao final da tabela
    tabelaBody.appendChild(novaLinha);
    
    // Feedback de sucesso
    msgValidacao.textContent = `Solicitação ${numSolicitacao} de ${dados.nome} incluída com sucesso!`;
    msgValidacao.style.backgroundColor = '#e8f8f5';
    msgValidacao.style.color = '#2ecc71';
    msgValidacao.style.display = 'block';

    // Limpa a seleção após a inclusão
    servicoSelect.value = '';
    // Atualiza os campos dinâmicos para o estado inicial
    atualizarDadosServico();
}

// Chamada inicial para preencher os valores padrão ao carregar a página
document.addEventListener('DOMContentLoaded', atualizarDadosServico);
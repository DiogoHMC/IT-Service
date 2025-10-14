//
// login.js
// JavaScript para a Página de Login (login.html)
//

// Requisito: O login deve ser preenchido, e ter formato de e-mail válido. A senha deve ser preenchida.
function validarLogin(login, senha) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Validação 1: Login preenchido e formato de e-mail
    if (!login) {
        return "O campo Login (E-mail) deve ser preenchido.";
    }
    if (!emailRegex.test(login)) {
        return "O campo Login deve ter formato de e-mail válido.";
    }
    
    // Validação 2: Senha preenchida
    if (!senha) {
        return "O campo Senha deve ser preenchido.";
    }
    
    return "OK";
}

// O clique do botão Limpar deve limpar os campos e setar o foco para o campo de Login
function limparCamposLogin() {
    document.getElementById('login').value = '';
    document.getElementById('senha').value = '';
    
    // Limpar mensagem de validação
    const msgValidacao = document.getElementById('mensagem-validacao');
    msgValidacao.textContent = '';
    msgValidacao.style.display = 'none';
    
    // Setar o foco para o campo de Login
    document.getElementById('login').focus(); 
}

// O clique do botão Realizar Login deve realizar as validações
function realizarLogin() {
    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;
    const msgValidacao = document.getElementById('mensagem-validacao');
    
    const resultado = validarLogin(login, senha);
    
    msgValidacao.style.display = 'block';

    if (resultado !== "OK") {
        // Mostrar mensagem pertinente caso alguma validação não passe
        msgValidacao.textContent = 'Erro de Validação: ' + resultado;
        msgValidacao.style.backgroundColor = '#fdeded';
        msgValidacao.style.color = '#e74c3c';
    } else {
        // Mostrar mensagem "Validação realizada com sucesso"
        msgValidacao.textContent = "Validação realizada com sucesso. Redirecionando...";
        msgValidacao.style.backgroundColor = '#e8f8f5';
        msgValidacao.style.color = '#2ecc71';
        
        // Se isto ocorrer, deve haver navegação para a página de conteúdo (index.html)
        setTimeout(() => {
            window.location.href = "index.html"; 
        }, 1000); 
    }
}
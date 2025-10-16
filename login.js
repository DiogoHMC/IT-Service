//
// login.js
// JavaScript para a Página de Login (login.html)
//

function validarLogin(login, senha) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!login) return "O campo Login (E-mail) deve ser preenchido.";
    if (!emailRegex.test(login)) return "O campo Login deve ter formato de e-mail válido.";
    if (!senha) return "O campo Senha deve ser preenchido.";
    
    return "OK";
}

function limparCamposLogin() {
    document.getElementById('login').value = '';
    document.getElementById('senha').value = '';
    const msgValidacao = document.getElementById('mensagem-validacao');
    msgValidacao.textContent = '';
    msgValidacao.style.display = 'none';
    document.getElementById('login').focus(); 
}

// O clique do botão Realizar Login: AGORA SALVA O STATUS DE LOGIN
function realizarLogin() {
    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;
    const msgValidacao = document.getElementById('mensagem-validacao');
    
    const resultado = validarLogin(login, senha);
    
    msgValidacao.style.display = 'block';

    if (resultado !== "OK") {
        msgValidacao.textContent = 'Erro de Validação: ' + resultado;
        msgValidacao.style.backgroundColor = '#fdeded';
        msgValidacao.style.color = '#e74c3c';
    } else {
        msgValidacao.textContent = "Validação realizada com sucesso. Redirecionando...";
        msgValidacao.style.backgroundColor = '#e8f8f5';
        msgValidacao.style.color = '#2ecc71';
        
        // *** IMPLEMENTAÇÃO FINAL DO REQUISITO: Simular login bem-sucedido ***
        localStorage.setItem('usuarioLogado', 'true'); 
        
        setTimeout(() => {
            window.location.href = "index.html"; 
        }, 1000); 
    }
}
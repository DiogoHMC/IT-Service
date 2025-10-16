//
// troca-senha.js
// JavaScript para a Página de Troca de Senha (troca-senha.html)
//

// Regex para validação de senha complexa (min 6 chars, 1 maiúscula, 1 número, 1 especial)
const SENHA_COMPLEXA_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;<>,.?/|\\-]).{6,}$/;

function validarTrocaSenha(login, novaSenha, confirmaNovaSenha) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!login || !emailRegex.test(login.trim())) {
        return "O campo Login (E-mail) deve ser preenchido em um formato válido.";
    }

    // Validação da Senha Complexa (NOVA REGRA)
    if (!SENHA_COMPLEXA_REGEX.test(novaSenha)) {
        return "A nova senha deve ter no mínimo 6 caracteres, 1 letra maiúscula, 1 número e 1 caractere especial.";
    }

    if (novaSenha !== confirmaNovaSenha) {
        return "A Confirmação da Nova Senha não confere com a Nova Senha digitada.";
    }

    return "OK";
}

function limparCamposTrocaSenha() {
    document.getElementById('login').value = '';
    document.getElementById('novaSenha').value = '';
    document.getElementById('confirmaNovaSenha').value = '';
    
    const msgValidacao = document.getElementById('mensagem-validacao');
    msgValidacao.textContent = '';
    msgValidacao.style.display = 'none';
    
    document.getElementById('login').focus(); 
}

function realizarTrocaSenha() {
    const login = document.getElementById('login').value;
    const novaSenha = document.getElementById('novaSenha').value;
    const confirmaNovaSenha = document.getElementById('confirmaNovaSenha').value;
    const msgValidacao = document.getElementById('mensagem-validacao');
    
    const resultado = validarTrocaSenha(login, novaSenha, confirmaNovaSenha);
    
    msgValidacao.style.display = 'block';

    if (resultado !== "OK") {
        msgValidacao.textContent = 'Erro ao Trocar Senha: ' + resultado;
        msgValidacao.style.backgroundColor = '#fdeded';
        msgValidacao.style.color = '#e74c3c';
    } else {
        msgValidacao.textContent = "Senha trocada com sucesso! Redirecionando para o Login...";
        msgValidacao.style.backgroundColor = '#e8f8f5';
        msgValidacao.style.color = '#2ecc71';
        
        // Simulação de sucesso (o ideal é limpar o localStorage se a senha fosse alterada de fato)
        // Para a simulação, apenas redirecionamos.
        setTimeout(() => {
            window.location.href = "login.html"; 
        }, 2000); 
    }
}
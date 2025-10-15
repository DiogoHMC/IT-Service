//
// troca-senha.js
// JavaScript para a Página de Troca / Recuperação de Senha (troca-senha.html)
//

// Função de validação de campo
function validarEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        return "O campo E-mail deve ser preenchido.";
    }
    if (!emailRegex.test(email.trim())) {
        return "O campo E-mail deve ter um formato válido.";
    }
    
    return "OK";
}

// Ação de enviar o link de redefinição
function enviarLinkRedefinicao() {
    const email = document.getElementById('email').value;
    const msgValidacao = document.getElementById('mensagem-validacao');
    
    const resultado = validarEmail(email);
    
    msgValidacao.style.display = 'block';

    if (resultado !== "OK") {
        // Mostrar mensagem de erro
        msgValidacao.textContent = 'Erro de Validação: ' + resultado;
        msgValidacao.style.backgroundColor = '#fdeded';
        msgValidacao.style.color = '#e74c3c';
    } else {
        // Simular sucesso no envio do link
        msgValidacao.textContent = `Link de redefinição enviado com sucesso para ${email}. Verifique sua caixa de entrada.`;
        msgValidacao.style.backgroundColor = '#e8f8f5';
        msgValidacao.style.color = '#2ecc71';
        
        // Desabilitar botão para evitar reenvio
        document.getElementById('btnEnviar').disabled = true;
        
        // Opcional: Redirecionar para o login após alguns segundos
        setTimeout(() => {
            window.location.href = "login.html"; 
        }, 5000); 
    }
}
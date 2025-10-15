//
// cadastro.js
// JavaScript para a Página de Cadastro (cadastro.html)
//

// Função de validação de todos os campos
function validarCadastro(dados) {
    const { nome, documento, telefone, email, senha, confirmaSenha } = dados;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cpfCnpjRegex = /^(\d{3}\.?\d{3}\.?\d{3}-?\d{2}|\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})$/;
    const telefoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/; // (XX) XXXX-XXXX ou (XX) XXXXX-XXXX

    // 1. Validação do Nome
    if (nome.length < 5) {
        return "O Nome Completo deve ter no mínimo 5 caracteres.";
    }
    
    // 2. Validação do Documento (CPF/CNPJ)
    if (!documento || !cpfCnpjRegex.test(documento.trim())) {
        return "O campo CPF ou CNPJ deve ser preenchido em um formato válido.";
    }
    
    // 3. Validação do Telefone
    if (!telefone || !telefoneRegex.test(telefone.trim())) {
        return "O Telefone deve ser preenchido no formato (XX) XXXXX-XXXX.";
    }

    // 4. Validação do E-mail
    if (!email || !emailRegex.test(email.trim())) {
        return "O E-mail deve ser preenchido em um formato válido (será seu login).";
    }

    // 5. Validação da Senha
    if (senha.length < 6) {
        return "A senha deve ter no mínimo 6 caracteres.";
    }

    // 6. Validação da Confirmação de Senha
    if (senha !== confirmaSenha) {
        return "A Confirmação de Senha não confere com a Senha digitada.";
    }

    return "OK"; // Todas as validações passaram
}

// Ação de limpeza de campos
function limparCamposCadastro() {
    document.getElementById('nome').value = '';
    document.getElementById('documento').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('email').value = '';
    document.getElementById('senha').value = '';
    document.getElementById('confirmaSenha').value = '';
    
    const msgValidacao = document.getElementById('mensagem-validacao');
    msgValidacao.textContent = '';
    msgValidacao.style.display = 'none';
    
    document.getElementById('nome').focus(); 
}

// Ação de cadastro ao clicar no botão
function realizarCadastro() {
    const dados = {
        nome: document.getElementById('nome').value.trim(),
        documento: document.getElementById('documento').value.trim(),
        telefone: document.getElementById('telefone').value.trim(),
        email: document.getElementById('email').value.trim(),
        senha: document.getElementById('senha').value,
        confirmaSenha: document.getElementById('confirmaSenha').value
    };
    
    const msgValidacao = document.getElementById('mensagem-validacao');
    const resultado = validarCadastro(dados);
    
    msgValidacao.style.display = 'block';

    if (resultado !== "OK") {
        // Mostrar mensagem de erro
        msgValidacao.textContent = 'Erro de Cadastro: ' + resultado;
        msgValidacao.style.backgroundColor = '#fdeded';
        msgValidacao.style.color = '#e74c3c';
    } else {
        // Mostrar mensagem de sucesso e redirecionar
        msgValidacao.textContent = "Cadastro realizado com sucesso! Redirecionando para o Login...";
        msgValidacao.style.backgroundColor = '#e8f8f5';
        msgValidacao.style.color = '#2ecc71';
        
        // Redireciona para a página de login após o cadastro
        setTimeout(() => {
            window.location.href = "login.html"; 
        }, 2000); 
    }
}
//
// cadastro.js
// JavaScript para a Página de Cadastro (cadastro.html)
//

// Regex para validação de senha complexa (min 6 chars, 1 maiúscula, 1 número, 1 especial)
const SENHA_COMPLEXA_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;<>,.?/|\\-]).{6,}$/;

// Função de validação de todos os campos
function validarCadastro(dados) {
    const { nome, documento, telefone, email, senha, confirmaSenha, dataNascimento, estadoCivil, escolaridade } = dados;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Regex adaptada para aceitar com ou sem pontos/hífens
    const cpfCnpjRegex = /^(\d{3}\.?\d{3}\.?\d{3}-?\d{2}|\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})$/; 
    const telefoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/; 

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

    // 4. Validação da Data de Nascimento (Novo Campo)
    if (!dataNascimento) {
        return "A Data de Nascimento é obrigatória.";
    }
    // Opcional: Validação de idade mínima (exemplo)
    const dataNasc = new Date(dataNascimento);
    const hoje = new Date();
    if (hoje.getFullYear() - dataNasc.getFullYear() < 18) {
        return "É necessário ter pelo menos 18 anos para se cadastrar.";
    }

    // 5. Validação do Estado Civil (Novo Campo)
    if (!estadoCivil) {
        return "O Estado Civil é obrigatório.";
    }

    // 6. Validação da Escolaridade (Novo Campo)
    if (!escolaridade) {
        return "A Escolaridade é obrigatória.";
    }

    // 7. Validação do E-mail
    if (!email || !emailRegex.test(email.trim())) {
        return "O E-mail deve ser preenchido em um formato válido (será seu login).";
    }

    // 8. Validação da Senha Complexa (NOVA REGRA)
    if (!SENHA_COMPLEXA_REGEX.test(senha)) {
        return "A senha deve ter no mínimo 6 caracteres, 1 letra maiúscula, 1 número e 1 caractere especial.";
    }

    // 9. Validação da Confirmação de Senha
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
    // Novos campos
    document.getElementById('dataNascimento').value = '';
    document.getElementById('escolaridade').value = ''; // Limpa o select
    
    // Limpa os radio buttons (garante que 'Solteiro' volte a ser o padrão)
    const radios = document.getElementsByName('estadoCivil');
    radios.forEach(radio => {
        if (radio.value === 'Solteiro') {
            radio.checked = true;
        } else {
            radio.checked = false;
        }
    });

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
        confirmaSenha: document.getElementById('confirmaSenha').value,
        // Novos campos
        dataNascimento: document.getElementById('dataNascimento').value,
        estadoCivil: document.querySelector('input[name="estadoCivil"]:checked')?.value,
        escolaridade: document.getElementById('escolaridade').value,
    };
    
    const msgValidacao = document.getElementById('mensagem-validacao');
    const resultado = validarCadastro(dados);
    
    msgValidacao.style.display = 'block';

    if (resultado !== "OK") {
        msgValidacao.textContent = 'Erro de Cadastro: ' + resultado;
        msgValidacao.style.backgroundColor = '#fdeded';
        msgValidacao.style.color = '#e74c3c';
    } else {
        msgValidacao.textContent = "Cadastro realizado com sucesso! Redirecionando para o Login...";
        msgValidacao.style.backgroundColor = '#e8f8f5';
        msgValidacao.style.color = '#2ecc71';
        
        // Simulação de armazenamento (opcional: pode ser removido se não for um requisito)
        localStorage.setItem('usuarioCadastrado', JSON.stringify({ email: dados.email, senha: dados.senha }));
        
        // Redireciona para a página de login após o cadastro
        setTimeout(() => {
            window.location.href = "login.html"; 
        }, 2000); 
    }
}
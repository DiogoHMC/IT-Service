//
// script.js
// JavaScript para a Página de Conteúdo (index.html) - Inclui Lógica Condicional de Login
//

document.addEventListener('DOMContentLoaded', function() {
    console.log("Página de Apresentação carregada.");
    
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    
    // Elementos no Header do index.html
    const linkServicos = document.getElementById('linkServicos');
    const loginSeparador = document.getElementById('login-separador');
    const linkLogin = document.querySelector('.header-links a[href="login.html"]'); // Seleciona o link de login
    
    if (usuarioLogado === 'true') {
        // Se o usuário está logado
        
        // 1. Exibir o link de Solicitação de Serviços e o separador
        if (linkServicos) linkServicos.style.display = 'inline';
        if (loginSeparador) loginSeparador.style.display = 'inline';
        
        // 2. Mudar o link de "Login de Clientes" para "Sair"
        if (linkLogin) {
            linkLogin.textContent = 'Sair (Logout)';
            linkLogin.href = '#'; 
            // Adiciona a função de logout no clique
            linkLogin.onclick = function() {
                localStorage.removeItem('usuarioLogado'); // Limpa o status
                window.location.href = "index.html"; // Recarrega a página (agora deslogada)
            };
        }
        
    } else {
        // Se o usuário NÃO está logado, garante que os links estão ocultos
        if (linkServicos) linkServicos.style.display = 'none';
        if (loginSeparador) loginSeparador.style.display = 'none';
    }
});
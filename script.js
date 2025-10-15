//
// script.js
// JavaScript para a Página de Conteúdo (index.html)
//
console.log("Página de Apresentação carregada. Nenhuma funcionalidade JS complexa necessária para esta página.");

// Exemplo de código trivial
let paginaPrincipalCarregada = true; 
console.log("Variável 'paginaPrincipalCarregada' = " + paginaPrincipalCarregada);

document.addEventListener('DOMContentLoaded', function() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    
    if (usuarioLogado === 'true') {
        // Exibir o link de Solicitação de Serviços e o separador
        document.getElementById('linkServicos').style.display = 'inline';
        document.getElementById('login-separador').style.display = 'inline';
    }
});
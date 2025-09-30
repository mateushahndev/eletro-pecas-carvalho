const produtos = {
    'arranque-bosch': {
        nome: 'Arranque Bosch',
        marca: 'Bosch',
        preco: 'R$ 299,99',
        descricao: 'Arranque original Bosch para caminhões, com garantia de 12 meses e alto desempenho.',
        imagem: 'arranque.png',
        especificacoes: [
            'Tensão: 12V',
            'Potência: 2.5kW',
            'Garantia: 12 meses',
            'Aplicação: Caminhões pesados'
        ]
    },
    'alternador-bosch': {
        nome: 'Alternador Bosch',
        marca: 'Bosch',
        preco: 'R$ 499,99',
        descricao: 'Alternador original Bosch com alta eficiência e durabilidade.',
        imagem: 'alternador.png',
        especificacoes: [
            'Tensão: 14V',
            'Corrente: 120A',
            'Garantia: 12 meses',
            'Aplicação: Caminhões e ônibus'
        ]
    },
    'carburador-bosch': {
        nome: 'Carburador Bosch',
        marca: 'Bosch',
        preco: 'R$ 199,99',
        descricao: 'Carburador original Bosch para motores a combustão.',
        imagem: 'carburador.png',
        especificacoes: [
            'Tipo: Eletrônico',
            'Vazão: 200cm³/min',
            'Garantia: 6 meses',
            'Aplicação: Motores médios'
        ]
    }
};

function carregarProduto() {
    const urlParams = new URLSearchParams(window.location.search);
    const produtoId = urlParams.get('id');
    
    const produtoContainer = document.getElementById('produto-container');
    
    if (!produtoId || !produtos[produtoId]) {
        produtoContainer.innerHTML = `
            <div class="erro">
                <i class="fas fa-exclamation-triangle"></i>
                <h2>Produto não encontrado</h2>
                <a href="/produtos">Voltar para o catálogo</a>
            </div>
        `;
        return;
    }
    
    const produto = produtos[produtoId];
    
    document.title = `${produto.nome} - Eletro Peças Carvalho`;
    
    produtoContainer.innerHTML = `
        <section class="produto-detalhe">
            <div class="produto-imagem">
                <img src="./images/${produto.imagem}" alt="${produto.nome}" loading="lazy">
            </div>
            
            <div class="produto-info">
                <h1>${produto.nome}</h1>
                <span class="marca">Marca: ${produto.marca}</span>
                <p class="preco">${produto.preco}</p>
                
                <div class="descricao">
                    <h3>Descrição</h3>
                    <p>${produto.descricao}</p>
                </div>
                
                <div class="especificacoes">
                    <h3>Especificações</h3>
                    <ul>
                        ${produto.especificacoes.map(spec => `<li>${spec}</li>`).join('')}
                    </ul>
                </div>
                
                <a href="https://wa.me/5511999999999?text=Olá! Gostaria de comprar: ${produto.nome}" 
                   class="btn-whatsapp" target="_blank">
                   <i class="fab fa-whatsapp"></i> Comprar via WhatsApp
                </a>
            </div>
        </section>
    `;
}

document.addEventListener('DOMContentLoaded', carregarProduto);
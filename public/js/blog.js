class BlogManager {
    constructor() {
        this.articles = [];
        this.filteredArticles = [];
        this.currentCategory = 'all';
        this.searchTerm = '';
        
        this.DOM = {
            container: document.getElementById('articlesContainer'),
            search: document.getElementById('blogSearch'),
            filters: document.querySelectorAll('.filter-btn'),
            title: document.querySelector('.blog h1')
        };
        
        this.init();
    }
    
    init() {
        this.loadArticles();
        this.setupEventListeners();
        this.renderArticles();
    }
    
    loadArticles() {
    this.articles = [
        {
            id: 'manutencao-preventiva',
            title: 'Manutenção Preventiva: Guia Completo para Caminhões',
            excerpt: 'Aprenda como a manutenção preventiva pode economizar até 40% nos custos da sua frota...',
            category: 'maintenance',  
            image: 'manutencao.jpg',
            date: '2024-01-15',
            readTime: '5 min de leitura'
        },
        {
            id: 'pecas-bosch-vs-paralelas',
            title: 'Peças Bosch vs Paralelas: Análise Completa',
            excerpt: 'Descubra as diferenças reais entre peças originais e paralelas...',
            category: 'parts',
            image: 'manutencao.jpg',
            date: '2024-01-10', 
            readTime: '7 min de leitura'
        },
        {
            id: 'dicas-economia-combustivel',
            title: '10 Dicas para Economizar Combustível na Estrada',
            excerpt: 'Técnicas comprovadas para reduzir o consumo de combustível...',
            category: 'tips',
            image: 'manutencao.jpg',
            date: '2024-01-05',
            readTime: '4 min de leitura'
        },
        {
            id: 'sinais-alternador-defeito',
            title: '7 Sinais de que seu Alternador está com Defeito',
            excerpt: 'Aprenda a identificar os sinais de problemas no alternador...',
            category: 'diagnostic',
            image: 'manutencao.jpg',
            date: '2023-12-20',
            readTime: '6 min de leitura'
        }
    ];
    
    this.filteredArticles = [...this.articles];
}
    
    setupEventListeners() {
        // Pesquisa
        if (this.DOM.search) {
            this.DOM.search.addEventListener('input', (e) => {
                this.searchTerm = e.target.value.toLowerCase();
                this.filterArticles();
            });
        }
        
        // Filtros de categoria
        if (this.DOM.filters) {
            this.DOM.filters.forEach(btn => {
                btn.addEventListener('click', () => {
                    this.DOM.filters.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.currentCategory = btn.dataset.category;
                    this.filterArticles();
                });
            });
        }
    }
    
    filterArticles() {
        this.filteredArticles = this.articles.filter(article => {
            const matchesCategory = this.currentCategory === 'all' || 
                                  article.category === this.currentCategory;
            
            const matchesSearch = !this.searchTerm || 
                                article.title.toLowerCase().includes(this.searchTerm) ||
                                article.excerpt.toLowerCase().includes(this.searchTerm) ||
                                article.content.toLowerCase().includes(this.searchTerm);
            
            return matchesCategory && matchesSearch;
        });
        
        this.renderArticles();
    }
    
    renderArticles() {
        if (!this.DOM.container) return;
        
        if (this.filteredArticles.length === 0) {
            this.DOM.container.innerHTML = `
                <div class="no-articles">
                    <i class="fas fa-search fa-2x"></i>
                    <h3>Nenhum artigo encontrado</h3>
                    <p>Tente alterar sua pesquisa ou filtros</p>
                </div>
            `;
            return;
        }
        
        this.DOM.container.innerHTML = this.filteredArticles.map(article => `
            <article class="article-card" data-category="${article.category}">
                <div class="article-image">
                    <img width="100%" src="./images/${article.image}" alt="${article.title}" loading="lazy">
                </div>
                <div class="article-content">
                    <h3 class="article-title">${article.title}</h3>
                    <p class="article-excerpt">${article.excerpt}</p>
                    <div class="article-meta">
                        <span><i class="fas fa-calendar"></i> ${this.formatDate(article.date)}</span>
                        <span><i class="fas fa-clock"></i> ${article.readTime}</span>
                    </div>
                    <a href="/blog/${article.id}" class="read-more">
                        Ler artigo completo <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </article>
        `).join('');
        
        // Atualiza contador
        if (this.DOM.title) {
            const count = this.filteredArticles.length;
            const total = this.articles.length;
            this.DOM.title.textContent = `Blog ${count !== total ? `(${count}/${total})` : ''}`;
        }
    }
    
    getCategoryName(category) {
        const categories = {
            'maintenance': 'Manutenção',
            'parts': 'Peças', 
            'tips': 'Dicas',
            'diagnostic': 'Diagnóstico'
        };
        return categories[category] || category;
    }
    
    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('pt-BR');
    }
    
    // Método para carregar artigo individual
    loadArticle(articleId) {
        const article = this.articles.find(a => a.id === articleId);
        if (article && document.getElementById('article-container')) {
            this.renderArticle(article);
        }
    }
    
    renderArticle(article) {
        document.getElementById('article-container').innerHTML = `
            <article class="article-full">
                <header class="article-header">
                    <span class="article-category">${this.getCategoryName(article.category)}</span>
                    <h1>${article.title}</h1>
                    <div class="article-meta">
                        <span><i class="fas fa-calendar"></i> ${this.formatDate(article.date)}</span>
                        <span><i class="fas fa-clock"></i> ${article.readTime}</span>
                    </div>
                </header>
                
                <div class="article-image-full">
                    <img src="./images/${article.image}" alt="${article.title}">
                </div>
                
                <div class="article-content-full">
                    ${article.content}
                </div>
                
                <footer class="article-footer">
                    <a href="/blog" class="back-to-blog">
                        <i class="fas fa-arrow-left"></i> Voltar para o blog
                    </a>
                </footer>
            </article>
        `;
        
        document.title = `${article.title} - Blog Eletro Peças Carvalho`;
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    const blogManager = new BlogManager();
    window.blogManager = blogManager;
    
    // Verifica se é página de artigo individual
    const pathParts = window.location.pathname.split('/');
    const articleId = pathParts[pathParts.length - 1];
    
    if (articleId && articleId !== 'blog') {
        blogManager.loadArticle(articleId);
    }
});
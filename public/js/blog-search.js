// blog-search.js - Funcionalidade específica da barra de pesquisa do blog
class BlogSearch {
    constructor() {
        this.searchInput = document.getElementById('blogSearch');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.articlesContainer = document.getElementById('articlesContainer');
        this.blogTitle = document.querySelector('.blog-hero h1');
        
        this.currentCategory = 'all';
        this.searchTerm = '';
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Pesquisa em tempo real
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value.toLowerCase();
                this.filterArticles();
            });
        }
        
        // Filtros de categoria
        if (this.filterButtons) {
            this.filterButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    this.filterButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.currentCategory = btn.dataset.category;
                    this.filterArticles();
                });
            });
        }
    }
    
    filterArticles() {
        // Esta função será chamada quando o BlogManager estiver pronto
        if (window.blogManager && window.blogManager.articles) {
            const filtered = window.blogManager.articles.filter(article => {
                const matchesCategory = this.currentCategory === 'all' || 
                                      article.category === this.currentCategory;
                
                const matchesSearch = !this.searchTerm || 
                                    article.title.toLowerCase().includes(this.searchTerm) ||
                                    article.excerpt.toLowerCase().includes(this.searchTerm);
                
                return matchesCategory && matchesSearch;
            });
            
            this.renderArticles(filtered);
        }
    }
    
    renderArticles(articles) {
        if (!this.articlesContainer) return;
        
        if (articles.length === 0) {
            this.articlesContainer.innerHTML = `
                <div class="no-articles">
                    <i class="fas fa-search fa-2x"></i>
                    <h3>Nenhum artigo encontrado</h3>
                    <p>Tente alterar sua pesquisa ou filtros</p>
                </div>
            `;
            return;
        }
        
        this.articlesContainer.innerHTML = articles.map(article => `
            <article class="article-card" data-category="${article.category}">
                <div class="article-image">
                    <img width="100%" src="/images/${article.image}" alt="${article.title}" loading="lazy">
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
        if (this.blogTitle) {
            const count = articles.length;
            const total = window.blogManager.articles.length;
            this.blogTitle.textContent = `Blog & Dicas Técnicas ${count !== total ? `(${count}/${total})` : ''}`;
        }
    }
    
    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('pt-BR');
    }
}

// Aguarda o BlogManager estar disponível
function initBlogSearch() {
    if (window.blogManager) {
        new BlogSearch();
    } else {
        // Tenta novamente após um tempo
        setTimeout(initBlogSearch, 100);
    }
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initBlogSearch);
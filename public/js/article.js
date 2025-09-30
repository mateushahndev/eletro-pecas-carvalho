class ArticleManager {
    constructor() {
        this.article = null;
        this.relatedArticles = [];
        
        this.DOM = {
            container: document.getElementById('article-container'),
            relatedContainer: document.getElementById('related-articles')
        };
        
        this.init();
    }
    
    init() {
        this.loadArticle();
        this.setupEventListeners();
    }
    
    loadArticle() {
        // Extrai o ID do artigo da URL
        const pathParts = window.location.pathname.split('/');
        const articleId = pathParts[pathParts.length - 1];
        
        if (!articleId || articleId === 'blog') {
            this.showError('Artigo não encontrado');
            return;
        }
        
        // Busca o artigo na "base de dados"
        this.article = this.getArticleById(articleId);
        
        if (!this.article) {
            this.showError('Artigo não encontrado');
            return;
        }
        
        this.renderArticle();
        this.loadRelatedArticles();
        this.updatePageMetadata();
    }
    
    getArticleById(articleId) {
        // "Base de dados" de artigos ( mesma do blog.js)
        const articles = [
            {
                id: 'manutencao-preventiva',
                title: 'Manutenção Preventiva: Guia Completo para Caminhões',
                excerpt: 'Aprenda como a manutenção preventiva pode economizar até 40% nos custos da sua frota e evitar quebras inesperadas.',
                category: 'manutencao',
                image: 'manutencao.jpg',
                date: '2024-01-15',
                readTime: '5 min de leitura',
                content: `
                    <h2>Introdução à Manutenção Preventiva</h2>
                    <p>A manutenção preventiva é essencial para garantir a longevidade e confiabilidade da sua frota de caminhões. Estudos mostrem que empresas que implementam programas de manutenção preventiva consistentes economizam até 40% nos custos de manutenção no longo prazo.</p>
                    
                    <h2>Benefícios da Manutenção Preventiva</h2>
                    <ul>
                        <li>Redução de custos com reparos emergenciais</li>
                        <li>Aumento da vida útil dos componentes</li>
                        <li>Melhoria na segurança do motorista</li>
                        <li>Redução do tempo de inatividade</li>
                    </ul>
                    
                    <h2>Componentes Críticos para Monitorar</h2>
                    <p>Alguns componentes exigem atenção especial na manutenção preventiva de caminhões:</p>
                    
                    <h3>Sistema de Freios</h3>
                    <p>Verifique regularmente pastilhas, discos e fluidos. A substituição preventiva evita falhas catastróficas.</p>
                    
                    <h3>Sistema Elétrico</h3>
                    <p>Alternadores e arranques Bosch devem ser testados a cada 50.000 km para garantir desempenho ideal.</p>
                    
                    <h3>Pneus e Suspensão</h3>
                    <p>Alinhamento e balanceamento regulares previnem desgaste irregular e melhoram a economia de combustível.</p>
                    
                    <h2>Cronograma Recomendado</h2>
                    <p>Siga este cronograma básico para manutenção preventiva:</p>
                    <ul>
                        <li><strong>Diário:</strong> Verificação de fluidos, pneus e luzes</li>
                        <li><strong>Semanal:</strong> Inspeção de freios e sistema elétrico</li>
                        <li><strong>Mensal:</strong> Alinhamento e balanceamento</li>
                        <li><strong>Anual:</strong> Revisão completa do motor</li>
                    </ul>
                    
                    <h2>Conclusão</h2>
                    <p>Investir em manutenção preventiva não é um custo, mas sim um investimento na confiabilidade e eficiência da sua operação. Peças originais Bosch garantem a qualidade e durabilidade necessárias para um programa de manutenção bem-sucedido.</p>
                `
            },
            {
                id: 'pecas-bosch-vs-paralelas',
                title: 'Peças Bosch vs Paralelas: Análise Completa',
                excerpt: 'Descubra as diferenças reais entre peças originais e paralelas no longo prazo.',
                category: 'pecas',
                image: 'manutencao.jpg',
                date: '2024-01-10',
                readTime: '7 min de leitura',
                content: `Conteúdo completo do artigo sobre peças Bosch vs paralelas...`
            },
            {
                id: 'dicas-economia-combustivel',
                title: '10 Dicas para Economizar Combustível na Estrada',
                excerpt: 'Técnicas comprovadas para reduzir o consumo de combustível.',
                category: 'dicas',
                image: 'manutencao.jpg',
                date: '2024-01-05',
                readTime: '4 min de leitura',
                content: `Conteúdo completo sobre economia de combustível...`
            },
            {
                id: 'sinais-alternador-defeito',
                title: '7 Sinais de que seu Alternador está com Defeito',
                excerpt: 'Aprenda a identificar os sinais de problemas no alternador...',
                category: 'diagnostico',
                image: 'manutencao.jpg',
                date: '2023-12-20',
                readTime: '6 min de leitura',
                content: `Conteúdo completo do artigo sobre sinais de alternador com defeito`
            }
        ];
        
        return articles.find(article => article.id === articleId);
    }
    
    renderArticle() {
        if (!this.article || !this.DOM.container) return;
        
        this.DOM.container.innerHTML = `
            <article class="article-full">
                <section class="article-header">                    
                    <h1>${this.article.title}</h1>
                    
                    <div class="article-meta">
                        <span><i class="fas fa-calendar"></i> ${this.formatDate(this.article.date)}</span>
                        <span><i class="fas fa-clock"></i> ${this.article.readTime}</span>
                    </div>
                </section>
                
                <div class="article-image-full">
                    <img src="../images/${this.article.image}" alt="${this.article.title}" loading="lazy">
                </div>
                
                <div class="article-content-full">
                    ${this.article.content}
                </div>
                
                <section class="article-footer">                    
                    <div class="article-share">
                        <span>Compartilhar:</span>
                        <a href="#" class="share-btn" data-platform="whatsapp">
                            <i class="fab fa-whatsapp"></i>
                        </a>
                        <a href="#" class="share-btn" data-platform="facebook">
                            <i class="fab fa-facebook"></i>
                        </a>
                        <a href="#" class="share-btn" data-platform="linkedin">
                            <i class="fab fa-linkedin"></i>
                        </a>
                    </div>
                    
                    <a href="/blog" class="back-to-blog">
                        <i class="fas fa-arrow-left"></i> Voltar para o blog
                    </a>
                </section>
            </article>
        `;
    }
    
    loadRelatedArticles() {
        if (!this.article || !this.DOM.relatedContainer) return;
        
        // Simula artigos relacionados ( mesma categoria)
        this.relatedArticles = this.getRelatedArticles(this.article.category, this.article.id);
        
        if (this.relatedArticles.length > 0) {
            this.DOM.relatedContainer.innerHTML = `
                <h3>Artigos Relacionados</h3>
                <div class="related-articles-grid">
                    ${this.relatedArticles.map(article => `
                        <div class="related-article">
                            <img src="../images/${article.image}" alt="${article.title}">
                            <div class="related-content">
                                <span class="related-category">${this.getCategoryName(article.category)}</span>
                                <h4>${article.title}</h4>
                                <a href="/blog/${article.id}" class="read-more">Ler artigo</a>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }
    
    getRelatedArticles(category, excludeId) {
        const allArticles = this.getArticleById('dummy') ? [] : []; // Pega todos os artigos
        return allArticles
            .filter(article => article.category === category && article.id !== excludeId)
            .slice(0, 3); // Limita a 3 artigos
    }
    
    setupEventListeners() {
        // Compartilhamento
        document.addEventListener('click', (e) => {
            if (e.target.closest('.share-btn')) {
                e.preventDefault();
                this.shareArticle(e.target.closest('.share-btn').dataset.platform);
            }
        });
        
        // Navegação suave para links internos
        document.addEventListener('click', (e) => {
            if (e.target.closest('a[href^="/"]')) {
                e.preventDefault();
                const href = e.target.closest('a').getAttribute('href');
                window.location.href = href;
            }
        });
    }
    
    shareArticle(platform) {
        const title = encodeURIComponent(this.article.title);
        const url = encodeURIComponent(window.location.href);
        
        const shareUrls = {
            whatsapp: `https://wa.me/?text=${title} ${url}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        };
        
        if (shareUrls[platform]) {
            window.open(shareUrls[platform], '_blank');
        }
    }
    
    updatePageMetadata() {
        // Atualiza título da página
        document.title = `${this.article.title} - Blog Eletro Peças Carvalho`;
        
        // Atualiza meta tags para SEO
        this.updateMetaTag('description', this.article.excerpt);
        this.updateMetaTag('og:title', this.article.title);
        this.updateMetaTag('og:description', this.article.excerpt);
        this.updateMetaTag('og:image', `../images/${this.article.image}`);
    }
    
    updateMetaTag(name, content) {
        let tag = document.querySelector(`meta[name="${name}"]`) || 
                 document.querySelector(`meta[property="${name}"]`);
        
        if (tag) {
            tag.setAttribute('content', content);
        }
    }
    
    getCategoryName(category) {
        const categories = {
            'manutencao': 'Manutenção',
            'pecas': 'Peças',
            'dicas': 'Dicas',
            'diagnostico': 'Diagnóstico'
        };
        return categories[category] || category;
    }
    
    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('pt-BR');
    }
    
    getRandomViews() {
        return Math.floor(Math.random() * 1000) + 100; // 100-1099 visualizações
    }
    
    showError(message) {
        if (this.DOM.container) {
            this.DOM.container.innerHTML = `
                <div class="article-error">
                    <i class="fas fa-exclamation-triangle fa-3x"></i>
                    <h2>${message}</h2>
                    <p>O artigo solicitado não foi encontrado ou não existe mais.</p>
                    <a href="/blog" class="back-to-blog">Voltar para o blog</a>
                </div>
            `;
        }
    }
}

// Inicializa quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new ArticleManager();
});
// Botão "Voltar Para o Topo do Footer" 
const btnTop = document.getElementById("btn-top")

if (btnTop) {
    btnTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    })
}

// Controle do menu hamburguer - VERSÃO CORRIGIDA
class MobileMenu {
    constructor() {
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.navList = document.querySelector('.nav-list');
        this.navLinks = document.querySelectorAll('.nav-list li'); // ← CORRIGIDO
        this.body = document.body;
        this.init();
    }
    
    init() {
        this.mobileMenu.addEventListener('click', () => {
            this.toggleMenu();
        });
        
        // Fecha menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });
        
        // Fecha menu ao redimensionar para desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1000) {
                this.closeMenu();
            }
        });
    }
    
    // ADICIONA ANIMAÇÃO DOS LINKS - FUNÇÃO NOVA
    animateLinks() {
        this.navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    }
    
    toggleMenu() {
        this.navList.classList.toggle('active');
        this.body.classList.toggle('menu-open');
        this.mobileMenu.classList.toggle('active');
        this.animateLinks(); // ← CHAMA A ANIMAÇÃO
        
        // Foca na barra de pesquisa quando abre o menu
        if (this.navList.classList.contains('active')) {
            setTimeout(() => {
                const searchInput = document.getElementById('mobileSearch');
                if (searchInput) {
                    searchInput.focus();
                }
            }, 500);
        }
    }
    
    closeMenu() {
        this.navList.classList.remove('active');
        this.body.classList.remove('menu-open');
        this.mobileMenu.classList.remove('active');
        
        // Remove animação dos links
        this.navLinks.forEach(link => {
            link.style.animation = '';
        });
        
        // Esconde resultados da busca
        const resultsContainer = document.getElementById('searchResults');
        if (resultsContainer) {
            resultsContainer.style.display = 'none';
        }
    }
}

// SISTEMA DE BUSCA MOBILE
class MobileSearch {
    constructor() {
        this.searchInput = document.getElementById('mobileSearch');
        this.resultsContainer = document.getElementById('searchResults');
        
        // Base de dados de busca
        this.produtos = {
            'arranque-bosch': { 
                nome: 'Arranque Bosch', 
                tipo: 'produto',
                descricao: 'Peça original Bosch'
            },
            'alternador-bosch': { 
                nome: 'Alternador Bosch', 
                tipo: 'produto',
                descricao: 'Peça original Bosch'
            },
            'carburador-bosch': { 
                nome: 'Carburador Bosch', 
                tipo: 'produto',
                descricao: 'Peça original Bosch'
            }
        };
        
        this.paginas = {
            '/produtos': { 
                nome: 'Produtos', 
                tipo: 'pagina',
                descricao: 'Catálogo completo'
            },
            '/sobre': { 
                nome: 'Sobre Nós', 
                tipo: 'pagina',
                descricao: 'Conheça nossa empresa'
            },
            '/contato': { 
                nome: 'Contato', 
                tipo: 'pagina',
                descricao: 'Fale conosco'
            },
            '/': { 
                nome: 'Início', 
                tipo: 'pagina',
                descricao: 'Página inicial'
            }
        };
        
        if (this.searchInput && this.resultsContainer) {
            this.init();
        }
    }
    
    init() {
        this.searchInput.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });
        
        this.searchInput.addEventListener('focus', () => {
            this.showRecentSearches();
        });
        
        this.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideResults();
                this.searchInput.blur();
            }
        });
        
        // Fecha resultados ao clicar fora
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.mobile-search-container')) {
                this.hideResults();
            }
        });
    }
    
    handleSearch(query) {
        const searchTerm = query.toLowerCase().trim();
        
        if (searchTerm.length === 0) {
            this.showRecentSearches();
            return;
        }
        
        if (searchTerm.length < 2) {
            this.hideResults();
            return;
        }
        
        const results = this.searchItems(searchTerm);
        this.displayResults(results, searchTerm);
    }
    
    searchItems(term) {
        const results = [];
        
        // Busca produtos
        Object.entries(this.produtos).forEach(([id, produto]) => {
            if (produto.nome.toLowerCase().includes(term)) {
                results.push({
                    ...produto,
                    id,
                    url: `/produto?id=${id}`,
                    categoria: 'produto'
                });
            }
        });
        
        // Busca páginas
        Object.entries(this.paginas).forEach(([url, pagina]) => {
            if (pagina.nome.toLowerCase().includes(term) || url.toLowerCase().includes(term)) {
                results.push({
                    ...pagina,
                    url,
                    categoria: 'pagina'
                });
            }
        });
        
        // Ordena por relevância (produtos primeiro)
        return results.sort((a, b) => {
            if (a.categoria === 'produto' && b.categoria !== 'produto') return -1;
            if (a.categoria !== 'produto' && b.categoria === 'produto') return 1;
            return 0;
        });
    }
    
    displayResults(results, searchTerm) {
        if (results.length === 0) {
            this.resultsContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>Nenhum resultado para "${searchTerm}"</p>
                    <small>Tente "arranque", "alternador" ou "sobre"</small>
                </div>
            `;
        } else {
            let html = '';
            
            // Agrupa por categoria
            const produtos = results.filter(r => r.categoria === 'produto');
            const paginas = results.filter(r => r.categoria === 'pagina');
            
            if (produtos.length > 0) {
                html += `<div class="search-result-category">Produtos</div>`;
                produtos.forEach(item => {
                    html += `
                        <div class="search-result-item product" data-url="${item.url}">
                            <i class="fas fa-cog"></i>
                            <div>
                                <strong>${item.nome}</strong>
                                <div style="font-size: 0.8rem; color: #666;">${item.descricao}</div>
                            </div>
                        </div>
                    `;
                });
            }
            
            if (paginas.length > 0) {
                html += `<div class="search-result-category">Páginas</div>`;
                paginas.forEach(item => {
                    html += `
                        <div class="search-result-item page" data-url="${item.url}">
                            <i class="fas fa-file-alt"></i>
                            <div>
                                <strong>${item.nome}</strong>
                                <div style="font-size: 0.8rem; color: #666;">${item.descricao}</div>
                            </div>
                        </div>
                    `;
                });
            }
            
            this.resultsContainer.innerHTML = html;
        }
        
        this.showResults();
        this.addResultClickEvents();
    }
    
    showRecentSearches() {
        // Pode implementar histórico de buscas aqui depois
        this.hideResults();
    }
    
    showResults() {
        this.resultsContainer.style.display = 'block';
    }
    
    hideResults() {
        this.resultsContainer.style.display = 'none';
    }
    
    addResultClickEvents() {
        const resultItems = this.resultsContainer.querySelectorAll('.search-result-item');
        
        resultItems.forEach(item => {
            item.addEventListener('click', () => {
                const url = item.getAttribute('data-url');
                this.navigateTo(url);
            });
        });
    }
    
    navigateTo(url) {
        // Fecha o menu mobile
        const navList = document.querySelector('.nav-list');
        const body = document.body;
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (navList) navList.classList.remove('active');
        if (body) body.classList.remove('menu-open');
        if (mobileMenu) mobileMenu.classList.remove('active');
        
        // Limpa a busca
        this.searchInput.value = '';
        this.hideResults();
        
        // Navega para a página
        window.location.href = url;
    }
}

// Função para BLOQUEAR modo paisagem no mobile
function showLandscapeWarning() {
    const isLandscape = window.matchMedia("(orientation: landscape)").matches;
    const isMobile = window.innerWidth < 1000;
    
    let warning = document.getElementById('landscape-warning');

    if (isLandscape && isMobile) {
        if (!warning) {
            warning = document.createElement('div');
            warning.id = 'landscape-warning';
            warning.innerHTML = `
                <div style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: #000;
                    color: white;
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    text-align: center;
                    padding: 20px;
                ">
                    <div>
                        <div style="font-size: 48px; margin-bottom: 20px;">🔄</div>
                        <p><strong>Gire o dispositivo para o modo retrato</strong></p>
                        <p style="font-size: 14px; margin-top: 20px; opacity: 0.8;">O site não funciona em modo paisagem</p>
                    </div>
                </div>
            `;
            document.body.appendChild(warning);
        }
        
        // BLOQUEIA TUDO - não deixa fazer nada
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        
    } else {
        if (warning) {
            warning.remove();
        }
        // LIBERA TUDO
        document.body.style.overflow = '';
        document.body.style.height = '';
        document.body.style.position = '';
        document.body.style.width = '';
    }
}

// Tentativa de bloquear orientação (funciona em alguns navegadores)
function lockOrientation() {
    if (window.innerWidth < 1000) {
        if (screen.orientation && screen.orientation.lock) {
            screen.orientation.lock('portrait').catch(function(error) {
                console.log('Orientation lock não suportado: ', error);
            });
        }
    }
}

// Inicializar tudo quando DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa menu mobile
    new MobileMenu();
    
    // Inicializa busca mobile
    new MobileSearch();
    
    // Sistema de orientação
    lockOrientation();
    showLandscapeWarning();
    
    console.log('Sistemas inicializados: Menu Mobile + Busca');
});

// Monitorar eventos de orientação e resize
window.addEventListener('orientationchange', function() {
    showLandscapeWarning();
    setTimeout(lockOrientation, 100);
});

window.addEventListener('resize', function() {
    showLandscapeWarning();
});

// Disparar também quando a visibilidade da página muda
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        setTimeout(showLandscapeWarning, 300);
    }
});

// Bloquear qualquer rotação do teclado no mobile
window.addEventListener('keydown', function(e) {
    const isLandscape = window.matchMedia("(orientation: landscape)").matches;
    const isMobile = window.innerWidth < 1000;
    
    if ((e.key === ' ' || e.key === 'Spacebar') && isLandscape && isMobile) {
        e.preventDefault();
    }
});

// DEBUG - Mostra se está funcionando
console.log('Script carregado - tudo ok!');
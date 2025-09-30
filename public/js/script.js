// Botão "Voltar Para o Topo do Footer" 
const btnTop = document.getElementById("btn-top")

btnTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})

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
    }
    
    closeMenu() {
        this.navList.classList.remove('active');
        this.body.classList.remove('menu-open');
        this.mobileMenu.classList.remove('active');
        
        // Remove animação dos links
        this.navLinks.forEach(link => {
            link.style.animation = '';
        });
    }
}

// Inicializa quando o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    new MobileMenu();
    console.log('Menu mobile inicializado!');
});

// DEBUG - Mostra se está funcionando
console.log('Script carregado - tudo ok!');

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

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    lockOrientation();
    showLandscapeWarning();
    
    // Monitorar TUDO que pode mudar orientação
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
});

// Bloquear qualquer rotação do teclado no mobile
window.addEventListener('keydown', function(e) {
    if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
    }
});
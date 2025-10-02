const imagens = ["./images/arranque.png", "./images/alternador.png", "./images/carburador.png"];
let index = 0;
const img = document.querySelector(".img-peca1");

setInterval(() => {
    img.classList.add("fade");

    setTimeout(() => {
        index = (index + 1) % imagens.length;
        img.src = imagens[index];
        img.classList.remove("fade");
    }, 1000);
}, 4000);

console.log('home.js carregado!');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado - iniciando swipe...');
    
    const images = document.querySelectorAll('.swipe-image');
    const indicators = document.querySelectorAll('.swipe-indicators .indicator');
    let currentIndex = 0;

    function showImage(index) {
        console.log('Mudando para imagem:', index);
        
        // Remove active da atual
        images[currentIndex].classList.remove('active');
        indicators[currentIndex].classList.remove('active');
        
        // Adiciona active na nova
        currentIndex = index;
        images[currentIndex].classList.add('active');
        indicators[currentIndex].classList.add('active');
    }

    function nextImage() {
        showImage((currentIndex + 1) % images.length);
    }

    function prevImage() {
        showImage((currentIndex - 1 + images.length) % images.length);
    }

    // Swipe no mobile
    const container = document.querySelector('.image-swipe-container');
    let touchStartX = 0;

    container.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        console.log('Touch start:', touchStartX);
    });

    container.addEventListener('touchend', function(e) {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        
        console.log('Touch end - Diff:', diff);
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextImage(); // Swipe esquerda → próxima imagem
            } else {
                prevImage(); // Swipe direita → imagem anterior
            }
        }
    });

    // Clique nas bolinhas
    indicators.forEach(function(indicator, index) {
        indicator.addEventListener('click', function() {
            console.log('Clicou na bolinha:', index);
            showImage(index);
        });
    });

    console.log('Swipe manual configurado! Imagens:', images.length);
});
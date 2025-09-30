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


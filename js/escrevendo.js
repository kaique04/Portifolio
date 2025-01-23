const text = ["Meu nome é Kaique, tenho 21 anos e sou apaixonado por tecnologia e desenvolvimento web. Atualmente, estou cursando Sistemas de Informação nas Faculdades Integradas Rio Branco. Aqui, você encontrará alguns dos projetos que desenvolvi, combinando criatividade e habilidades técnicas para entregar soluções funcionais e inovadoras"];
let index = 0;
let isDeleting = false;
let textIndex = 0;
let speed = 100; // Velocidade padrão

const typeWrite = () => {
    const typewrite = document.querySelector("#typewrite");
    const currentText = text[textIndex];

    if (!isDeleting && index <= currentText.length) {
        typewrite.textContent = currentText.substring(0, index);
        index++;
        speed = 100; // Velocidade de digitação
    } else if (isDeleting && index >= 0) {
        typewrite.textContent = currentText.substring(0, index);
        index--;
        speed = 50; // Velocidade ao apagar
    }

    if (index > currentText.length) {
        isDeleting = true;
    }

    if (index === 0 && isDeleting) {
        isDeleting = false;
        textIndex = (textIndex + 1) % text.length; // Alterna entre os textos
    }

    setTimeout(typeWrite, speed);
};

window.addEventListener("load", typeWrite);

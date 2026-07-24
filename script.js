function atualizarHorario() {

    const agora = new Date();


    const dataBrasil = agora.toLocaleDateString("en-US", {
    timeZone: "America/Sao_Paulo",
    month: "long",
    day: "numeric",
    year: "numeric"
});

const dataFilipinas = agora.toLocaleDateString("en-US", {
    timeZone: "Asia/Manila",
    month: "long",
    day: "numeric",
    year: "numeric"
});



   const horaBrasil = agora.toLocaleTimeString("en-US", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
});

    const horaFilipinas = agora.toLocaleTimeString("en-PH", {
        timeZone: "Asia/Manila",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
        
    });

    document.getElementById("horaBrasil").textContent = "🕒 " + horaBrasil;
    document.getElementById("horaFilipinas").textContent = "🕒 " + horaFilipinas;

    document.getElementById("dataBrasil").textContent = "📅 " + dataBrasil;
    document.getElementById("dataFilipinas").textContent = "📅 " + dataFilipinas;

}

atualizarHorario();

setInterval(atualizarHorario, 1000);


async function atualizarClima() {

   // Assaí - Paraná
const brasil = await fetch("https://api.open-meteo.com/v1/forecast?latitude=-23.373&longitude=-50.845&current=temperature_2m,weather_code");

// Valenzuela - Philippines
const filipinas = await fetch("https://api.open-meteo.com/v1/forecast?latitude=14.700&longitude=120.983&current=temperature_2m,weather_code");

    const dadosBrasil = await brasil.json();
    const dadosFilipinas = await filipinas.json();

    document.getElementById("climaBrasil").textContent =
        traduzirClima(dadosBrasil.current.weather_code) +
        " • " +
        dadosBrasil.current.temperature_2m +
        "°C";

    document.getElementById("climaFilipinas").textContent =
        traduzirClima(dadosFilipinas.current.weather_code) +
        " • " +
        dadosFilipinas.current.temperature_2m +
        "°C";
}


function traduzirClima(codigo){

    switch(codigo){

        case 0:
            return "☀️ Clear Sky";

        case 1:
        case 2:
        case 3:
            return "🌤️ Partly Cloudy";

        case 45:
        case 48:
            return "🌫️ Fog";

        case 51:
        case 53:
        case 55:
            return "🌦️ Drizzle";

        case 61:
        case 63:
        case 65:
            return "🌧️ Rain";

        case 71:
        case 73:
        case 75:
            return "❄️ Snow";

        case 95:
            return "⛈️ Thunderstorm";

        default:
            return "🌍 Unknown";
    }

}


atualizarClima();

setInterval(atualizarClima, 120000);


/*const slider = document.querySelector(".slider");

const P = document.getElementById("P");
const B = document.getElementById("B");

const largura = slider.clientWidth;
const tamanho = P.offsetWidth;
const centro = largura / 2 - tamanho / 2;

let posP = -tamanho / 2;
let posB = largura - tamanho / 2;

P.style.left = posP + "px";
B.style.left = posB + "px";

let ativo = null;

P.addEventListener("mousedown", () => ativo = "P");
B.addEventListener("mousedown", () => ativo = "B");

document.addEventListener("mouseup", () => ativo = null);

document.addEventListener("mousemove", (e)=>{

    if(!ativo) return;

    const rect = slider.getBoundingClientRect();

    let x = e.clientX - rect.left - tamanho/2;



    if (ativo === "P") {

        const espaco = 6;

        posP = Math.max(
            -tamanho / 2,
            Math.min(
            x,
            Math.min(centro - espaco/2, posB - tamanho - espaco)
        )
    );

    P.style.left = posP + "px";
}



    if (ativo === "B") {

        const espaco = 6;

        posB = Math.min(
            largura - tamanho / 2,
            Math.max(
            x,
            Math.max(centro + espaco/2, posP + tamanho + espaco)
        )
    );

    B.style.left = posB + "px";
}



    verificarEncontro();

});


let conectado = false;

function verificarEncontro(){

    if(conectado) return;

    const espaco = -2;

    if (Math.abs((posB - posP) - (tamanho + espaco)) <= 2) {
    conectado = true;
    alert("Connected!");
}
  

}*/


const slider = document.querySelector(".slider");

const P = document.getElementById("P");
const B = document.getElementById("B");
const encontro = document.getElementById("encontro");
const fecharEncontro = document.getElementById("fecharEncontro");
const mensagemMusica = document.getElementById("mensagemMusica");
const fecharMensagem = document.getElementById("fecharMensagem");

const tamanho = P.offsetWidth;

// distância entre as bolinhas quando encostarem
const espaco = 2;

// posições iniciais
let posP = 0;
let posB = slider.offsetWidth - tamanho;

P.style.left = posP + "px";
B.style.left = posB + "px";

let ativo = null;
let conectado = false;

P.addEventListener("pointerdown", (e) => {
    ativo = P;
    P.setPointerCapture(e.pointerId);
});

B.addEventListener("pointerdown", (e) => {
    ativo = B;
    B.setPointerCapture(e.pointerId);
});

document.addEventListener("pointerup", () => {
    ativo = null;
    conectado = false; // permite abrir novamente
});

document.addEventListener("pointermove", (e) => {

    if (!ativo) return;

    const rect = slider.getBoundingClientRect();

    const largura = slider.offsetWidth;
    let x = e.clientX - rect.left - tamanho / 2;
    const limiteP = largura / 2 - tamanho;
    const limiteB = largura / 2;

    if (ativo === P) {

        // P só vai até o meio
        x = Math.max(0, Math.min(x, limiteP));

        posP = x;
        P.style.left = posP + "px";
    }

    if (ativo === B) {

        // B só vai até o meio
        x = Math.max(limiteB, Math.min(x, largura - tamanho));

        posB = x;
        B.style.left = posB + "px";
    }

    verificarEncontro();

});

function verificarEncontro() {

    if (conectado) return;

    if (posP + tamanho >= posB) {

        conectado = true;
        mostrarEncontro();

    }

}

function mostrarEncontro() {

    mensagemMusica.classList.remove("ativa");
    mensagemMusica.setAttribute("aria-hidden", "true");
    encontro.classList.remove("ativo");
    void encontro.offsetWidth;
    encontro.classList.add("ativo");
    encontro.setAttribute("aria-hidden", "false");

    musicaEasterEgg.pause();
    musicaEasterEgg.currentTime = 0;
    audioEncontro.currentTime = 0;
    audioEncontro.play();

}




const cat = new Audio("sons/baba.mpeg");
const fart = new Audio("sons/fart.mpeg");
const audioEncontro = new Audio("sons/seofart.mpeg");
const musicaEasterEgg = new Audio("sons/musica-easter-egg.mpeg");

musicaEasterEgg.loop = true;

audioEncontro.addEventListener("ended", () => {
    if (encontro.classList.contains("ativo")) {
        musicaEasterEgg.currentTime = 0;
        musicaEasterEgg.play();
    }
});

fecharEncontro.addEventListener("click", () => {
    encontro.classList.remove("ativo");
    encontro.setAttribute("aria-hidden", "true");
    audioEncontro.pause();
    audioEncontro.currentTime = 0;
    mensagemMusica.classList.add("ativa");
    mensagemMusica.setAttribute("aria-hidden", "false");
});

fecharMensagem.addEventListener("click", () => {
    mensagemMusica.classList.remove("ativa");
    mensagemMusica.setAttribute("aria-hidden", "true");
});

cat.volume = 0.10;     // 20%
fart.volume = 0.20;    // 35%


P.addEventListener("pointerdown", () => {

    cat.currentTime = 0;
    cat.play();

});


B.addEventListener("pointerdown", () => {

    fart.currentTime = 0;
    fart.play();

});

/*
async function traduzirTexto(texto, idiomaDestino) {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=pt|${idiomaDestino}`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Erro na resposta da API');
        }

        const data = await response.json();
        return data.responseData.translatedText;
    } catch (error) {
        console.error('Erro ao traduzir:', error);
        alert('Erro ao traduzir o texto. Tente novamente mais tarde.');
        return null;
    }
}

// Função para falar o texto traduzido com a ResponsiveVoice
function falarTexto(texto, idioma) {
    responsiveVoice.speak(texto, idioma);
}

// Evento ao clicar no botão de traduzir
document.getElementById('btnTraduzir').addEventListener('click', async () => {
    const textoOriginal = document.getElementById('textoOriginal').value;
    const idiomaDestino = document.getElementById('idiomaDestino').value;

    if (!textoOriginal || !idiomaDestino) {
        alert('Por favor, preencha o texto e selecione um idioma.');
        return;
    }

    const textoTraduzido = await traduzirTexto(textoOriginal, idiomaDestino);
    if (textoTraduzido) {
        document.getElementById('textoTraduzido').value = textoTraduzido;
    }
});

// Evento ao clicar no botão de ouvir áudio
document.getElementById('btnOuvir').addEventListener('click', () => {
    const textoTraduzido = document.getElementById('textoTraduzido').value;
    const idiomaAudio = document.getElementById('idiomaAudio').value;

    if (!textoTraduzido || !idiomaAudio) {
        alert('Por favor, preencha o texto traduzido e selecione um idioma para o áudio.');
        return;
    }

    falarTexto(textoTraduzido, idiomaAudio);
});
*/
/*document.getElementById('btnTraduzir').addEventListener('click', async () => {
    const textoOriginal = document.getElementById('textoOriginal').value;
    const idiomaDestino = document.getElementById('idiomaDestino').value;

    if (!textoOriginal || !idiomaDestino) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ texto: textoOriginal, idioma_destino: idiomaDestino }),
    });

    const data = await response.json();
    document.getElementById('textoTraduzido').value = data.texto_traduzido;
});

function playAudio() {
    const audio = new Audio('traducao.mp3');
    audio.play();
}
    */
const textareaFrom = document.querySelector("#textoOriginal");
const textareaTo = document.querySelector("#textoTraduzido");
const btnTranslate = document.querySelector("#btnTraduzir");
const btnListen = document.querySelector("#btnOuvir");
const selectLanguageTo = document.querySelector("#idiomaDestino");
const selectAudioLanguage = document.querySelector("#idiomaAudio");

// Adiciona evento ao botão de tradução
btnTranslate.addEventListener("click", async () => {
    if (textareaFrom.value && selectLanguageTo.value) {
        await loadTranslation();
    } else {
        alert("Por favor, preencha todos os campos!");
    }
});

// Função para carregar a tradução e o áudio
async function loadTranslation() {
    const textoOriginal = textareaFrom.value;
    const idiomaDestino = selectLanguageTo.value; // Seleciona o idioma de destino

    const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ texto: textoOriginal, idioma_destino: idiomaDestino }),
    });

    const data = await response.json();
    textareaTo.value = data.texto_traduzido;
}

// Adiciona evento ao botão de ouvir áudio
btnListen.addEventListener("click", () => {
    const audioLanguage = selectAudioLanguage.value;
    if (audioLanguage) {
        playAudio();
    } else {
        alert("Por favor, selecione um idioma para o áudio!");
    }
});

// Função para reproduzir o áudio
function playAudio() {
    const audio = new Audio('traducao.mp3');
    audio.play();
}

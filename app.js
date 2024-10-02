const textareaFrom = document.querySelector("#textoOriginal");
const textareaTo = document.querySelector("#textoTraduzido");
const btnTranslate = document.querySelector("#btnTraduzir");
const btnListen = document.querySelector("#btnOuvir");
const selects = document.querySelectorAll("select");
const apiKey = 'de16ea9111c8432d989b64844045cbcf';

const idiomas = {
    "de": "Alemão",
    "es": "Espanhol",
    "fr": "Francês",
    "en": "Inglês",
    "it": "Italiano",
    "ja": "Japonês",
    "pt": "Português(Brasil)"
};

selects.forEach((select) => {
    for (let idioma in idiomas) {
        let selected = "";
        if (select.id === "idiomaOrigem" && idioma === "pt") {
            selected = "selected";
        } else if (select.id === "idiomaDestino" && idioma === "en") {
            selected = "selected";
        }

        const option = `<option value="${idioma}" ${selected}>${idiomas[idioma]}</option>`;
        select.insertAdjacentHTML("beforeend", option);
    }
});

btnTranslate.addEventListener("click", () => {
    if (textareaFrom.value) {
        loadTranslation();
    } else {
        alert("Por favor, insira um texto para traduzir.");
        textareaTo.value = "";
    }
});

function loadTranslation() {
    const origem = document.querySelector('#idiomaOrigem').value;
    const destino = document.querySelector('#idiomaDestino').value;
    const textoOriginal = textareaFrom.value.toLowerCase();

    fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(textoOriginal)}&langpair=${origem}|${destino}`)
        .then((res) => res.json())
        .then((data) => {
            textareaTo.value = data.responseData.translatedText;
        });
}

/* ResponsiveVoice
btnListen.addEventListener("click", () => {
    const texto = textareaTo.value;

    if (texto) {
        const idiomaDestino = document.querySelector('#idiomaDestino').value;
        responsiveVoice.speak(texto, getVoiceName(idiomaDestino));
    } else {
        alert("Por favor, traduza um texto antes de ouvir.");
    }
});

function getVoiceName(idioma) {
    const voices = {
        "de": "Deutsch Female",
        "es": "Spanish Latin American Female",
        "fr": "French Female",
        "en": "UK English Female",
        "it": "Italian Female",
        "ja": "Japanese Female",
        "pt": "Brazilian Portuguese Female"
    };
    return voices[idioma] || "Brazilian Portuguese Female";
}
    */

//  Web Speech API
btnListen.addEventListener("click", () => {
    const texto = textareaTo.value;

    if (texto) {
        const idiomaDestino = document.querySelector('#idiomaDestino').value;
        speakText(texto, idiomaDestino);
    } else {
        alert("Por favor, traduza um texto antes de ouvir.");
    }
});

function speakText(text, languageCode) {
    const utterance = new SpeechSynthesisUtterance(text);

    const voiceMap = {
        "de": "de-DE",
        "es": "es-ES",
        "fr": "fr-FR",
        "en": "en-US",  
        "it": "it-IT",
        "ja": "ja-JP",
        "pt": "pt-BR"
    };

    const voiceName = voiceMap[languageCode] || "pt-BR";
    utterance.lang = voiceName;

    const voices = window.speechSynthesis.getVoices();

    const selectedVoice = voices.find(voice => voice.lang === voiceName);
    if (selectedVoice) {
        utterance.voice = selectedVoice;
    } else {
        console.warn(`Voz não encontrada para o idioma: ${voiceName}`);
    }

    speechSynthesis.speak(utterance);
}

window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
};


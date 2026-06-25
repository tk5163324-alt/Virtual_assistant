
let btn = document.querySelector("#btn");
let content = document.querySelector("#content");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi+f2";
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good morning Tannu mam");
    } else if (hours >= 12 && hours < 16) {
        speak("Good afternoon Tannu mam");
    } else {
        speak("Good evening Tannu mam");
    }
}

window.addEventListener('load', () => {
    wishMe();
});

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    console.log(event);
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
    recognition.start();
});

function takeCommand(message) {
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello mam, how can I help you?");
    } else if (message.includes("who are you")) {
        speak("I am Natalia, created by Tannu mam");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com/", "_blank");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://www.google.com/", "_blank");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://www.facebook.com/", "_blank");
    } else if (message.includes("open calculator")) {
        speak("Opening calculator...");
        window.open("calculator://");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleTimeString();
        speak(time);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleDateString(undefined, { day: "numeric", month: "short" });
        speak(date);
    } else {
        let finalText = "This is what I found on the internet regarding: " + message.replace("natalia", "").trim();
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message.replace("natalia", "").trim()}`, "_blank");
    }
}





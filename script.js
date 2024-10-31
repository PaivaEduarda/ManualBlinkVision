function playSoundAndInstruction(frequency, instruction) {
  if (Array.isArray(frequency)) {
    playAlternatingFrequencies(frequency);
  } else {
    playFrequency(frequency);
  }

  setTimeout(() => {
    playInstruction(instruction);
  }, 1000); // Aguarda 1 segundo antes de tocar a instrução
}

function playAlternatingFrequencies(frequencies) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContext = new AudioContext();
  let index = 0;

  const oscillator = audioContext.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequencies[index], audioContext.currentTime);
  oscillator.connect(audioContext.destination);
  oscillator.start();

  const intervalId = setInterval(() => {
    index = (index + 1) % frequencies.length; // Alterna entre as frequências
    oscillator.frequency.setValueAtTime(frequencies[index], audioContext.currentTime);
  }, 500); // Muda a frequência a cada 500 ms

  // Para o som após 3 segundos (ou o tempo desejado)
  setTimeout(() => {
    clearInterval(intervalId);
    oscillator.stop();
    oscillator.disconnect();
  }, 3000); // Dura 3 segundos
}

function playFrequency(frequency) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContext = new AudioContext();

  const oscillator = audioContext.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

  oscillator.connect(audioContext.destination);
  oscillator.start();

  setTimeout(() => {
    oscillator.stop();
    oscillator.disconnect();
  }, 1000);
}

function playInstruction(instruction) {
  const utterance = new SpeechSynthesisUtterance(instruction);
  utterance.lang = "pt-BR";
  speechSynthesis.speak(utterance);
}
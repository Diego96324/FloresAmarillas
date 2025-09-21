// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Array de objetos que contiene cada línea y su tiempo de aparición en segundos
var lyricsData = [
  { text: "Lo sentía tan cercano, lo sentía desde niña", time: 15 },
  { text: "Ella sabía que él sabía, que algún día pasaría", time: 18 },
  { text: "Que vendría a buscarla, con sus flores amarillas", time: 27 },
  { text: "No te apures no detengas, el instante del encuentro", time: 32 },
  { text: "Está dicho que es un hecho, no la pierdas no hay derecho", time: 33 },
  { text: "No te olvides, que la vida", time: 41 },
  { text: "Casi nunca está dormida", time: 47 },
  { text: "En ese bar tan desierto los esperaba el encuentro (el encuentro)", time: 54 },
  { text: "Ella llegó en limosina amarilla por supuesto", time: 59 },
  { text: "Él se acercó de repente y la miró tan de frente (de frente)", time: 67 },
  { text: "Toda una vida soñada y no pudo decir nada", time: 72 },
  { text: "Ella sabía que él sabía, que algún día pasaría", time: 78 },
  { text: "Que vendría a buscarla, con sus flores amarillas", time: 83 },
  { text: "No te apures no detengas, el instante del encuentro", time: 91 },
  { text: "Está dicho que es un hecho, no la pierdas no hay derecho", time: 97 },
  { text: "No te olvides, que la vida", time: 104 },
  { text: "Casi nunca está dormida", time: 108 },
  { text: "Ella sabía que él sabía, que algún día pasaría", time: 144 },
  { text: "Que vendría a buscarla, con sus flores amarillas", time: 148 },
  { text: "No te apures no detengas, el instante del encuentro", time: 153 },
  { text: "Está dicho que es un hecho, no la pierdas no hay derecho", time: 158 },
  { text: "No te olvides, que la vida", time: 164 },
  { text: "Casi nunca está dormida", time: 169 },
  { text: "Ella sabía que él sabía", time: 176 },
  { text: "Él sabía, ella sabia", time: 183 },
  { text: "Él sabía, ella sabía y se olvidaron, de sus flores amarillas", time: 188 },
];

// Animar las letras
function updateLyrics() {
  var time = Math.floor(audio.currentTime);
  var currentLine = lyricsData.find(
    (line) => time >= line.time && time < line.time + 6
  );

  if (currentLine) {
    // Calcula la opacidad basada en el tiempo en la línea actual
    var fadeInDuration = 0.1; // Duración del efecto de aparición en segundos
    var opacity = Math.min(1, (time - currentLine.time) / fadeInDuration);

    // Aplica el efecto de aparición
    lyrics.style.opacity = opacity;
    lyrics.innerHTML = currentLine.text;
  } else {
    // Restablece la opacidad y el contenido si no hay una línea actual
    lyrics.style.opacity = 0;
    lyrics.innerHTML = "";
  }
}

setInterval(updateLyrics, 1000);

//funcion titulo
// Función para ocultar el título después de 216 segundos
function ocultarTitulo() {
  var titulo = document.querySelector(".titulo");
  titulo.style.animation =
    "fadeOut 3s ease-in-out forwards"; /* Duración y función de temporización de la desaparición */
  setTimeout(function () {
    titulo.style.display = "none";
  }, 3000); // Espera 3 segundos antes de ocultar completamente
}
setTimeout(ocultarTitulo, 216000);

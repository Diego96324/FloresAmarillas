var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// === CONFIGURACIÓN DE LETRAS ===
var lyricsData = [
  { text: "Lo sentía tan cercano, lo sentía desde niña", time: 1, duration: 6 },
  { text: "Ella sabía que él sabía, que algún día pasaría", time: 6, duration: 5 },
  { text: "Que vendría a buscarla con sus flores amarillas", time: 12, duration: 5 },
  
  { text: "No te apures, no detengas el instante del encuentro", time: 19, duration: 5 },
  { text: "Está dicho que es un hecho, no la pierdas, no hay derecho", time: 23, duration: 5 },
  { text: "No te olvides que la vida casi nunca está dormida", time: 27, duration: 9 },
  
  { text: "", time: 35, duration: 5 },
  
  { text: "En ese bar tan desierto, nos esperaba el encuentro", time: 54, duration: 7 },
  { text: "Ella llegó en limusina, amarilla, por supuesto", time: 62, duration: 6 },
  { text: "Él se acercó de repente y la miró tan de frente", time: 69, duration: 7 },
  { text: "Toda una vida soñada y no pudo decir nada", time: 77, duration: 6 },
  
  { text: "Ella sabía que él sabía, que algún día pasaría", time: 84, duration: 4 },
  { text: "Que vendría a buscarla con sus flores amarillas", time: 88, duration: 6 },
  { text: "No te apures, no detengas el instante del encuentro", time: 97, duration: 3 },
  { text: "Está dicho que es un hecho, no la pierdas, no hay derecho", time: 100, duration: 4 },
  { text: "No te olvides que la vida casi nunca está dormida", time: 104, duration: 8 },
  
  { text: "Ella sabía que él sabía, que algún día pasaría", time: 129, duration: 4 },
  { text: "Que vendría a buscarla con sus flores amarillas", time: 134, duration: 6 },  
  { text: "No te apures, no detengas el instante del encuentro", time: 142, duration: 3 },
  { text: "Está dicho que es un hecho, no la pierdas, no hay derecho", time: 146, duration: 4 },
  { text: "No te olvides que la vida casi nunca está dormida", time: 150, duration: 7 },
  
  { text: "Ella sabía que él sabía", time: 158, duration: 3 },
  { text: "El sabía ella sabía", time: 161, duration: 2 },  
  { text: "Que el sabía ella sabía", time: 163, duration: 2 }, 
  { text: "Y se olvidaron de sus flores amarillas", time: 165, duration: 9 }
];

// === SINCRONIZACIÓN Y ANIMACIONES ===
function updateLyrics() {
  var currentTime = audio.currentTime;
  
  var currentLine = lyricsData.find(line => {
    var duration = line.duration || 5;
    return currentTime >= line.time && currentTime < (line.time + duration);
  });

  if (currentLine) {
    if (lyrics.getAttribute('data-current') !== currentLine.text) {
      lyrics.setAttribute('data-current', currentLine.text);
      
      if (currentLine.text === "") {
        lyrics.style.opacity = '0';
        lyrics.innerHTML = "";
        return;
      }
      
      lyrics.style.opacity = '0';
      lyrics.style.transform = 'translate(-50%, -50%) scale(0.8)';
      lyrics.innerHTML = currentLine.text;
      
      setTimeout(() => {
        lyrics.style.opacity = '1';
        lyrics.style.transform = 'translate(-50%, -50%) scale(1)';
      }, 50);
      
      setTimeout(() => {
        lyrics.style.transform = 'translate(-50%, -50%) scale(1.05)';
        setTimeout(() => {
          lyrics.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 200);
      }, 300);
    }
    
    var duration = currentLine.duration || 5;
    var lineProgress = (currentTime - currentLine.time) / duration;
    var opacity = lineProgress < 0.8 ? 1 : 1 - ((lineProgress - 0.8) / 0.2);
    
    if (currentLine.text !== "") {
      lyrics.style.opacity = Math.max(0, opacity);
    }
    
  } else {
    if (lyrics.style.opacity > 0) {
      lyrics.style.transform = 'translate(-50%, -50%) scale(0.9)';
      lyrics.style.opacity = '0';
      
      setTimeout(() => {
        lyrics.innerHTML = "";
        lyrics.removeAttribute('data-current');
      }, 300);
    }
  }
}

setInterval(updateLyrics, 100);

// === FUNCIÓN TÍTULO ===
function ocultarTitulo() {
  var titulo = document.querySelector(".titulo");
  titulo.style.animation = "fadeOut 3s ease-in-out forwards";
  setTimeout(function () {
    titulo.style.display = "none";
  }, 3000);
}

setTimeout(ocultarTitulo, 216000);
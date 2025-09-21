// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// ============================================================================
// CONFIGURACIÓN DE LETRAS - SISTEMA MEJORADO
// ============================================================================
// Instrucciones:
// - time: momento en segundos cuando aparece la línea
// - duration: cuánto tiempo permanece visible (opcional, por defecto 5 segundos)
// - text: el texto de la línea (usa "" para espacios en blanco)

var lyricsData = [
  // Primer verso
  { text: "Lo sentía tan cercano, lo sentía desde niña", time: 1, duration: 6 },
  { text: "Ella sabía que él sabía, que algún día pasaría", time: 6, duration: 5 },
  { text: "Que vendría a buscarla con sus flores amarillas", time: 12, duration: 5 },
  
  // Coro 1
  { text: "No te apures, no detengas el instante del encuentro", time: 19, duration: 5 },
  { text: "Está dicho que es un hecho, no la pierdas, no hay derecho", time: 23, duration: 5 },
  { text: "No te olvides que la vida casi nunca está dormida", time: 27, duration: 9 }, // Duración más larga
  
  // Espacio en blanco
  { text: "", time: 35, duration: 5 }, // Espacio entre versos
  
  // Segundo verso
  { text: "En ese bar tan desierto, nos esperaba el encuentro", time: 54, duration: 7 },
  { text: "Ella llegó en limusina, amarilla, por supuesto", time: 62, duration: 6 },
  { text: "Él se acercó de repente y la miró tan de frente", time: 69, duration: 7 },
  { text: "Toda una vida soñada y no pudo decir nada", time: 77, duration: 6 },
  
  // Coro 2
  { text: "Ella sabía que él sabía, que algún día pasaría", time: 84, duration: 4 },
  { text: "Que vendría a buscarla con sus flores amarillas", time: 88, duration: 6 },
  { text: "No te apures, no detengas el instante del encuentro", time: 97, duration: 3 },
  { text: "Está dicho que es un hecho, no la pierdas, no hay derecho", time: 100, duration: 4 },
  { text: "No te olvides que la vida casi nunca está dormida", time: 104, duration: 8 },
  
  // Coro 3
  { text: "Ella sabía que él sabía, que algún día pasaría", time: 129, duration: 4 },
  { text: "Que vendría a buscarla con sus flores amarillas", time: 134, duration: 6 },  
  { text: "No te apures, no detengas el instante del encuentro", time: 142, duration: 3 },
  { text: "Está dicho que es un hecho, no la pierdas, no hay derecho", time: 146, duration: 4 },
  { text: "No te olvides que la vida casi nunca está dormida", time: 150, duration: 7 },
  
  // Coro 4
  { text: "Ella sabía que él sabía", time: 158, duration: 3 },
  { text: "El sabía ella sabía", time: 161, duration: 2 },  
  { text: "Que el sabía ella sabía", time: 163, duration: 2 }, 
  { text: "Y se olvidaron de sus flores amarillas", time: 165, duration: 9 }, 
  
  // Continúa editando desde aquí...
  // (Agrega más líneas siguiendo el mismo patrón)
];

// ============================================================================
// FUNCIÓN MEJORADA CON DURACIÓN PERSONALIZADA
// ============================================================================

function updateLyrics() {
  var currentTime = audio.currentTime;
  
  // Buscar la línea actual considerando la duración personalizada
  var currentLine = lyricsData.find(line => {
    var duration = line.duration || 5; // Duración por defecto: 5 segundos
    return currentTime >= line.time && currentTime < (line.time + duration);
  });

  if (currentLine) {
    // Verificar si es una línea nueva para aplicar animación de entrada
    if (lyrics.getAttribute('data-current') !== currentLine.text) {
      lyrics.setAttribute('data-current', currentLine.text);
      
      // Si es un espacio en blanco, ocultar el texto
      if (currentLine.text === "") {
        lyrics.style.opacity = '0';
        lyrics.innerHTML = "";
        return;
      }
      
      // Efecto de entrada estilo YouTube Music
      lyrics.style.opacity = '0';
      lyrics.style.transform = 'translate(-50%, -50%) scale(0.8)';
      lyrics.innerHTML = currentLine.text;
      
      // Animación de aparición suave
      setTimeout(() => {
        lyrics.style.opacity = '1';
        lyrics.style.transform = 'translate(-50%, -50%) scale(1)';
      }, 50);
      
      // Efecto de "pulso" sutil durante la línea
      setTimeout(() => {
        lyrics.style.transform = 'translate(-50%, -50%) scale(1.05)';
        setTimeout(() => {
          lyrics.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 200);
      }, 300);
    }
    
    // Calcular opacidad basada en el tiempo restante de la línea
    var duration = currentLine.duration || 5;
    var lineProgress = (currentTime - currentLine.time) / duration;
    var opacity = lineProgress < 0.8 ? 1 : 1 - ((lineProgress - 0.8) / 0.2);
    
    // No aplicar fade out si es un espacio en blanco
    if (currentLine.text !== "") {
      lyrics.style.opacity = Math.max(0, opacity);
    }
    
  } else {
    // Efecto de salida suave
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

setInterval(updateLyrics, 100); // Actualización más frecuente para mayor suavidad

// ============================================================================
// HERRAMIENTAS DE DEBUGGING - Para facilitar la edición
// ============================================================================

// Mostrar tiempo actual en consola (activa/desactiva con showDebug)
var showDebug = true; // Cambia a false para desactivar debugging

if (showDebug) {
  // Mostrar tiempo actual cada segundo
  setInterval(() => {
    console.log(`Tiempo actual: ${audio.currentTime.toFixed(1)}s`);
  }, 1000);
  
  // Detectar cuando cambia de línea
  var lastLine = "";
  setInterval(() => {
    var currentLine = lyricsData.find(line => {
      var duration = line.duration || 5;
      return audio.currentTime >= line.time && audio.currentTime < (line.time + duration);
    });
    
    if (currentLine && currentLine.text !== lastLine) {
      console.log(`📝 Nueva línea: "${currentLine.text}" | Tiempo: ${audio.currentTime.toFixed(1)}s | Duración: ${currentLine.duration || 5}s`);
      lastLine = currentLine.text;
    }
  }, 100);
}

// Función auxiliar para agregar líneas fácilmente
function addLyric(text, time, duration = 5) {
  return { text: text, time: time, duration: duration };
}

// Función para crear espacios en blanco fácilmente  
function addSpace(time, duration = 2) {
  return { text: "", time: time, duration: duration };
}

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

// Llama a la función después de 216 segundos (216,000 milisegundos)
setTimeout(ocultarTitulo, 216000);
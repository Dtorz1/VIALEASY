var coordenadasDaño;
var coordenadasPolicia;
var coordenadasAccidente;
var watchID; // Variable global para el ID de seguimiento
var mymap = L.map("mapa"); // No es necesario establecer una vista inicial

// Obtener la ubicación actual del usuario y centrar el mapa
navigator.geolocation.getCurrentPosition(function (position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;

  // Establecer el nivel de zoom en 15 para que se vea el círculo
  var zoomLevel = 100;

  mymap.setView([lat, lon], zoomLevel); // Centrar el mapa en la ubicación actual
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
    mymap
  );

  // Agregar un círculo con radio de 100 metros alrededor de la ubicación
  L.circle([lat, lon], {
    color: "blue",
    fillColor: "blue",
    fillOpacity: 0.3,
    radius: 50,
  }).addTo(mymap);

  // Iniciar la actualización de la ubicación cada 5 segundos
  setInterval(actualizarUbicacion, 3000);
});

function actualizarUbicacion() {
  navigator.geolocation.getCurrentPosition(function (position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    mymap.setView([lat, lon], mymap.getZoom());

    // Calcular la distancia entre tu ubicación y los marcadores
    var marcadores = [
      coordenadasDaño,
      coordenadasPolicia,
      coordenadasAccidente,
    ];
    for (var i = 0; i < marcadores.length; i++) {
      if (marcadores[i]) {
        var distancia = calcularDistancia(
          lat,
          lon,
          marcadores[i].latitud,
          marcadores[i].longitud
        );
        if (distancia < 10) {
          // Generar una alerta sonora si la distancia es menor a 10 metros
          var audio = new Audio("1.mp3"); // Reemplaza 'alerta.mp3' con el archivo de sonido que desees utilizar
          audio.play();
        }
      }
    }
  });
}

function reportarDaño() {
  // Obtener la ubicación actual del usuario y agregar el marcador
  navigator.geolocation.getCurrentPosition(function (position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    coordenadasDaño = { latitud: lat, longitud: lon }; // Guardar las coordenadas
    obtenerCoordenadasDaño(lat, lon); // Llama a la función y pasa las coordenadas
    // Crear un ícono personalizado usando la imagen "1.png" en la carpeta del proyecto
    var customIcon = L.icon({
      iconUrl: "1.png",
      iconSize: [30, 30], // Tamaño del ícono
      iconAnchor: [12, 10], // Punto de anclaje del ícono
    });

    // Agregar un marcador en el centro exacto de la ubicación actual con el ícono personalizado
    L.marker([lat, lon], { icon: customIcon }).addTo(mymap);
  });
}

function reportarPolicia() {
  // Obtener la ubicación actual del usuario y agregar el marcador
  navigator.geolocation.getCurrentPosition(function (position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    coordenadasPolicia = { latitud: lat, longitud: lon }; // Guardar las coordenadas
    obtenerCoordenadasPolicia(lat, lon); // Llama a la función y pasa las coordenadas
    // Crear un ícono personalizado usando la imagen "2.png" en la carpeta del proyecto
    var customIcon = L.icon({
      iconUrl: "2.png",
      iconSize: [30, 30], // Tamaño del ícono
      iconAnchor: [12, 10], // Punto de anclaje del ícono
    });

    // Agregar un marcador en el centro exacto de la ubicación actual con el ícono personalizado
    L.marker([lat, lon], { icon: customIcon }).addTo(mymap);
  });
}

function reportarAccidente() {
  // Obtener la ubicación actual del usuario y agregar el marcador
  navigator.geolocation.getCurrentPosition(function (position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    coordenadasAccidente = { latitud: lat, longitud: lon }; // Guardar las coordenadas
    obtenerCoordenadasAccidente(lat, lon); // Llama a la función y pasa las coordenadas
    // Crear un ícono personalizado usando la imagen "3.png" en la carpeta del proyecto
    var customIcon = L.icon({
      iconUrl: "3.png",
      iconSize: [30, 30], // Tamaño del ícono
      iconAnchor: [12, 10], // Punto de anclaje del ícono
    });

    // Agregar un marcador en el centro exacto de la ubicación actual con el ícono personalizado
    L.marker([lat, lon], { icon: customIcon }).addTo(mymap);
  });
}
// Función para centrar el mapa en la ubicación del usuario
function centrarMapaEnMiUbicacion() {
  navigator.geolocation.getCurrentPosition(function (position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    mymap.setView([lat, lon], mymap.getZoom()); // Centrar el mapa en la ubicación actual
  });
}

// sistema de obtencion de coordenadas
function obtenerCoordenadasDaño(latitud, longitud) {
  if (latitud !== undefined && longitud !== undefined) {
    alert(
      "Coordenadas del daño: Latitud " + latitud + ", Longitud " + longitud
    );
  } else {
    alert("No se han reportado coordenadas aún.");
  }
}

function obtenerCoordenadasPolicia(latitud, longitud) {
  if (latitud !== undefined && longitud !== undefined) {
    alert(
      "Coordenadas del Policia: Latitud " + latitud + ", Longitud " + longitud
    );
  } else {
    alert("No se han reportado coordenadas aún.");
  }
}

function obtenerCoordenadasAccidente(latitud, longitud) {
  if (latitud !== undefined && longitud !== undefined) {
    alert(
      "Coordenadas del accidente: Latitud " + latitud + ", Longitud " + longitud
    );
  } else {
    alert("No se han reportado coordenadas aún.");
  }
}

function redireccionarAIndex() {
  // Utiliza window.location.href para redirigir a index.html
  window.location.href = "index.html";
}

// Escuchar el evento de envío del formulario
document
  .getElementById("coordenadasForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    // Obtener las coordenadas ingresadas por el usuario
    var latitudInput = document.getElementById("latitud").value;
    var longitudInput = document.getElementById("longitud").value;

    // Verificar si las coordenadas son válidas (puedes agregar más validaciones si es necesario)
    if (latitudInput && longitudInput) {
      var lat = parseFloat(latitudInput);
      var lon = parseFloat(longitudInput);

      // Mostrar la alerta en el mapa
      mostrarAlertaEnMapa(lat, lon);
    } else {
      alert("Ingresa coordenadas válidas.");
    }
  });

// Función para mostrar la alerta en el mapa
function mostrarAlertaEnMapa(lat, lon) {
  // Centrar el mapa en las coordenadas ingresadas
  mymap.setView([lat, lon], mymap.getZoom());

  // Mostrar una alerta con las coordenadas en el mapa
  alert("Coordenadas ingresadas: Latitud " + lat + ", Longitud " + lon);
}
// -------------------------------------
function calcularDistancia(lat1, lon1, lat2, lon2) {
  var radlat1 = (Math.PI * lat1) / 180;
  var radlat2 = (Math.PI * lat2) / 180;
  var theta = lon1 - lon2;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515; // Distancia en millas
  dist = dist * 1.609344; // Distancia en kilómetros
  dist = dist * 1000; // Distancia en metros
  return dist;
}

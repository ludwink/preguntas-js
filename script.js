// #####################################################################################
// TEMPORIZADOR
var temporizador = null;
function iniciarTemporizador() {
  // Habilitar boton de Enviar
  document.getElementById("enviar").classList.remove('btn-disabled');
  document.getElementById("enviar").disabled = false;

  // Iniciar/Reiniciar el tiempo
  clearInterval(temporizador);
  tiempo = 5;
  document.getElementById("tiempo").textContent = tiempo;

  temporizador = setInterval(function () {
    tiempo--;
    document.getElementById("tiempo").textContent = tiempo;
    if (tiempo <= 0) {
      clearInterval(temporizador);
      document.getElementById("enviar").disabled = true;
      document.getElementById("enviar").classList.add('btn-disabled');
      alert("Se terminó el tiempo.");
    }
  }, 1000);

  // Limpiar inputs y eliminar colores de validación
  const inputs = document.querySelectorAll("input[type='text']");
  inputs.forEach(input => {
    input.value = "";
    input.classList.remove("resp-valida");
    input.classList.remove("resp-novalida");
  });
}

function detenerTemporizador() {
  // Desactivar el botón de Enviar
  document.getElementById("enviar").disabled = true;
  document.getElementById("enviar").classList.add('btn-disabled');
  // Detener el tiempo
  if (temporizador !== null) {
    clearInterval(temporizador);
    temporizador = null;
  }
}

// #####################################################################################
var preguntasYRespuestas = [
  {
    pregunta: "1. Nombre de un continente",
    respuestas: ["África", "América", "Asia", "Europa", "Oceanía"]
  },
  {
    pregunta: "2. Nombre de un planeta del Sistema Solar",
    respuestas: ["Mercurio", "Venus", "Tierra", "Marte", "Júpiter", "Saturno", "Urano", "Neptuno"]
  },
  {
    pregunta: "3. Nombre de uno de los días de la semana",
    respuestas: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
  },
  {
    pregunta: "4. Nombre de uno de los meses del año",
    respuestas: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  },
  {
    pregunta: "5. Nombre de una forma geométrica básica",
    respuestas: ["Círculo", "Triángulo", "Cuadrado", "Rectángulo"]
  },
];

// MOSTRAR PREGUNTAS E INPUTS
var preguntasForm = document.getElementById("preguntas-form");

preguntasYRespuestas.forEach(function (preguntaObj, index) {
  //preguntas.forEach(function (pregunta, index) {
  //  preguntaLabel.textContent = pregunta;
  var preguntaLabel = document.createElement("label");
  preguntaLabel.textContent = preguntaObj.pregunta;
  preguntasForm.appendChild(preguntaLabel);

  var preguntaInput = document.createElement("input");
  preguntaInput.type = "text";
  preguntaInput.id = "pregunta" + (index + 1);
  preguntaInput.name = "pregunta" + (index + 1);
  preguntaInput.minLength = 5;
  preguntaInput.required = true;
  preguntasForm.appendChild(preguntaInput);

  preguntasForm.appendChild(document.createElement("br"));
});

// AGREGAR BOTÓN DE ENVIO Y HACER VALIDACIONES
document.addEventListener("DOMContentLoaded", function () {
  // Agregar el botón de Enviar al final del formulario
  var formulario = document.getElementById('preguntas-form');
  var botonEnviar = document.createElement('button');

  botonEnviar.id = 'enviar';
  botonEnviar.className = 'btn btn-enviar fas fa-paper-plane';
  botonEnviar.type = 'submit';
  botonEnviar.textContent = ' Enviar';
  formulario.appendChild(botonEnviar);

  botonEnviar.addEventListener('click', function (event) {
    // Evitar el envío del formulario
    //event.preventDefault();
    validarRespuestas();
  });

  // Validar respuestas
  function validarRespuestas() {
    var respuestasUsuario = [];
    var respuestasValidas = {};

    preguntasYRespuestas.forEach(function (preguntaObj, index) {
      var inputElement = document.getElementById("pregunta" + (index + 1));
      respuestasUsuario.push({ pregunta: index, respuesta: inputElement.value });

      respuestasValidas[index] = preguntaObj.respuestas;
    });

    respuestasUsuario.forEach(function (respuestaUsuario) {
      var preguntaIndex = respuestaUsuario.pregunta;
      var inputElement = document.getElementById("pregunta" + (preguntaIndex + 1));

      if (inputElement) {
        var esRespuestaValida = respuestasValidas[preguntaIndex].includes(respuestaUsuario.respuesta);
        inputElement.classList.toggle("resp-valida", esRespuestaValida);
        inputElement.classList.toggle("resp-novalida", !esRespuestaValida);
      }
    });
  }

});

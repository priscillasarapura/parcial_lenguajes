// VALIDACIONES DEL FORMULARIO (mismo que antes)
document.getElementById('registroForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    let isValid = true;
  
    const apellido = document.getElementById('apellido').value.trim();
    const nombre = document.getElementById('nombre').value.trim();
    const dni = document.getElementById('dni').value.trim();
    const fecha = document.getElementById('fecha').value;
    const email = document.getElementById('email').value.trim();
  
    if (!/^[a-z\s]+$/i.test(apellido)) {
      isValid = false;
      document.getElementById('errorApellido').textContent = "Solo letras y espacios.";
    } else {
      document.getElementById('errorApellido').textContent = "";
    }
  
    if (!/^[a-z\s]+$/i.test(nombre)) {
      isValid = false;
      document.getElementById('errorNombre').textContent = "Solo letras y espacios.";
    } else {
      document.getElementById('errorNombre').textContent = "";
    }
  
    if (!/^\d{8}$/.test(dni)) {
      isValid = false;
      document.getElementById('errorDni').textContent = "Debe tener 8 números.";
    } else {
      document.getElementById('errorDni').textContent = "";
    }
  
    const añoNacimiento = new Date(fecha).getFullYear();
    if (añoNacimiento > 2006) {
      isValid = false;
      document.getElementById('errorFecha').textContent = "Debes haber nacido en 2006 o antes.";
    } else {
      document.getElementById('errorFecha').textContent = "";
    }
  
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      isValid = false;
      document.getElementById('errorEmail').textContent = "Email no válido.";
    } else {
      document.getElementById('errorEmail').textContent = "";
    }
  
    if (isValid) {
      alert("Formulario enviado correctamente.");
    }
  });
  
  // PREGUNTAS ALEATORIAS + BOTÓN MOSTRAR RESPUESTAS
  
  const todasLasPreguntas = [
    { texto: "¿Cuál es tu nacionalidad?", id: "nacionalidad" },
    { texto: "¿Cuál es tu color favorito?", id: "color" },
    { texto: "¿Cómo se llama tu mascota?", id: "mascota" },
    { texto: "¿Qué comida te gusta más?", id: "comida" },
    { texto: "¿Cuál es tu deporte favorito?", id: "deporte" },
    { texto: "¿Qué país te gustaría visitar?", id: "pais" },
    { texto: "¿cuantos hermanos tenes?", id: "hermanos"}
  ];
  
  let preguntasSeleccionadas = [];
  let preguntaActual = 0;
  
  document.getElementById("btnPreguntar").addEventListener("click", () => {
    const contenedor = document.getElementById("preguntas");
    const btn = document.getElementById("btnPreguntar");
  
    if (preguntaActual === 0) {
      preguntasSeleccionadas = seleccionarPreguntasAleatorias(3);
    }
  
    if (preguntaActual < preguntasSeleccionadas.length) {
      const pregunta = preguntasSeleccionadas[preguntaActual];
      const label = document.createElement("label");
      label.textContent = pregunta.texto;
      const input = document.createElement("input");
      input.type = "text";
      input.id = pregunta.id;
      input.dataset.pregunta = pregunta.texto;
      input.style.display = "block";
  
      contenedor.appendChild(label);
      contenedor.appendChild(input);
  
      preguntaActual++;
  
      if (preguntaActual === preguntasSeleccionadas.length) {
        btn.disabled = true;
        document.getElementById("btnMostrarRespuestas").style.display = "inline-block";
      }
    }
  });
  
  function seleccionarPreguntasAleatorias(cantidad) {
    const copia = [...todasLasPreguntas];
    const seleccionadas = [];
    while (seleccionadas.length < cantidad && copia.length > 0) {
      const index = Math.floor(Math.random() * copia.length);
      seleccionadas.push(copia.splice(index, 1)[0]);
    }
    return seleccionadas;
  }
  
  document.getElementById("btnMostrarRespuestas").addEventListener("click", () => {
    const salida = document.getElementById("respuestas");
    salida.innerHTML = "";
  
    preguntasSeleccionadas.forEach(p => {
      const input = document.getElementById(p.id);
      const texto = input.dataset.pregunta;
      const valor = input.value.trim();
  
      const pTag = document.createElement("p");
      pTag.textContent = `${texto} → ${valor || "Sin respuesta"}`;
      salida.appendChild(pTag);
    });
  });
  
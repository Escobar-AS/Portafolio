document.addEventListener("DOMContentLoaded", () => {
    mostrarTareas();
    mostrarHistorial();
});

function agregarTarea() {
    let input = document.getElementById("nueva-tarea");
    let tareaTexto = input.value.trim();

    if (tareaTexto) {
        let tarea = { texto: tareaTexto, completada: false };
        guardarTarea(tarea);
        mostrarTareas();
        input.value = "";
    }
}

function guardarTarea(tarea) {
    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas.push(tarea);
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function mostrarTareas() {
    let lista = document.getElementById("lista-tareas");
    lista.innerHTML = "";

    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

    tareas.forEach((tarea, index) => {
        let item = document.createElement("li");
        item.innerHTML = `
            <span class="${tarea.completada ? 'completada' : ''}" onclick="completarTarea(${index})">
                ${tarea.texto}
            </span>
            <button class="eliminar" onclick="eliminarTarea(${index})">❌</button>
        `;
        lista.appendChild(item);
    });
}

function completarTarea(index) {
    let tareas = JSON.parse(localStorage.getItem("tareas"));
    tareas[index].completada = !tareas[index].completada;

    if (tareas[index].completada) {
        agregarAlHistorial(tareas[index].texto);
    }

    localStorage.setItem("tareas", JSON.stringify(tareas));
    mostrarTareas();
}

function eliminarTarea(index) {
    let tareas = JSON.parse(localStorage.getItem("tareas"));
    tareas.splice(index, 1);
    localStorage.setItem("tareas", JSON.stringify(tareas));
    mostrarTareas();
}

function borrarCompletadas() {
    let tareas = JSON.parse(localStorage.getItem("tareas"));
    let tareasPendientes = tareas.filter(tarea => !tarea.completada);
    localStorage.setItem("tareas", JSON.stringify(tareasPendientes));
    mostrarTareas();
}

// 📅 Función para agregar al historial
function agregarAlHistorial(tareaTexto) {
    let fecha = new Date().toLocaleDateString();
    let historial = JSON.parse(localStorage.getItem("historial")) || {};

    if (!historial[fecha]) {
        historial[fecha] = [];
    }

    historial[fecha].push(tareaTexto);
    localStorage.setItem("historial", JSON.stringify(historial));
    mostrarHistorial();
}

// 📊 Función para mostrar el historial
function mostrarHistorial() {
    let historialLista = document.getElementById("historial-tareas");
    let contadorHoy = document.getElementById("contador-hoy");
    historialLista.innerHTML = "";

    let fechaHoy = new Date().toLocaleDateString();
    let historial = JSON.parse(localStorage.getItem("historial")) || {};

    let tareasHoy = historial[fechaHoy] || [];
    contadorHoy.textContent = `Tareas completadas hoy: ${tareasHoy.length}`;

    for (let fecha in historial) {
        let tareas = historial[fecha];
        let item = document.createElement("li");
        item.innerHTML = `<strong>${fecha}:</strong> ${tareas.join(", ")}`;
        historialLista.appendChild(item);
    }
}

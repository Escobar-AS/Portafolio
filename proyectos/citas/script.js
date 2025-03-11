const citas = [
    "La vida es un 10% lo que me ocurre y 90% cómo reacciono a ello.",
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    "Solo aquellos que se atreven a fallar en grande pueden lograr grandes cosas.",
    "No cuentes los días, haz que los días cuenten."
];

function generarCita() {
    let citaAleatoria = citas[Math.floor(Math.random() * citas.length)];
    document.getElementById("quote").innerText = citaAleatoria;
}

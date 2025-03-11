const apiKey = "07E9230B8F6E7C18FE072D84"; // Reemplaza con tu clave de API
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

document.addEventListener("DOMContentLoaded", async () => {
    try {
        await cargarMonedas();
        document.getElementById("cantidad").addEventListener("input", convertir);
        document.getElementById("moneda1").addEventListener("change", convertir);
        document.getElementById("moneda2").addEventListener("change", convertir);
    } catch (error) {
        console.error("Error al cargar las monedas:", error);
        alert("No se pudieron cargar las monedas. Verifica tu conexión o clave de API.");
    }
});

async function cargarMonedas() {
    try {
        let response = await fetch(apiUrl);
        if (!response.ok) throw new Error("No se pudo obtener la lista de monedas");

        let data = await response.json();
        let monedas = Object.keys(data.conversion_rates);

        let select1 = document.getElementById("moneda1");
        let select2 = document.getElementById("moneda2");

        select1.innerHTML = "";
        select2.innerHTML = "";

        monedas.forEach(moneda => {
            let option1 = document.createElement("option");
            let option2 = document.createElement("option");
            option1.value = option2.value = moneda;
            option1.textContent = option2.textContent = moneda;
            select1.appendChild(option1);
            select2.appendChild(option2);
        });

        select1.value = "USD";
        select2.value = "EUR";
        convertir();
    } catch (error) {
        console.error("Error al obtener las monedas:", error);
    }
}

async function convertir() {
    let cantidad = document.getElementById("cantidad").value;
    let moneda1 = document.getElementById("moneda1").value;
    let moneda2 = document.getElementById("moneda2").value;

    if (cantidad <= 0) {
        document.getElementById("resultado").textContent = "💲 0.00";
        return;
    }

    try {
        let response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${moneda1}`);
        if (!response.ok) throw new Error("No se pudo obtener la tasa de cambio");

        let data = await response.json();
        let tasa = data.conversion_rates[moneda2];

        let resultado = (cantidad * tasa).toFixed(2);
        document.getElementById("resultado").textContent = `💲 ${resultado}`;
    } catch (error) {
        console.error("Error al convertir:", error);
        document.getElementById("resultado").textContent = "Error al obtener tasas";
    }
}

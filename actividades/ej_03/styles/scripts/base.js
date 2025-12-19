document.addEventListener('DOMContentLoaded', () => {
    const fechaElemento = document.getElementById('fecha');
    const fechaActual = new Date(document.lastModified);
    fechaElemento.textContent = fechaActual.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    updateSetpointValue(
        document.getElementById("setpoint-slider").value
    );
});

async function readTemperature() {
    const data = await fetchData('/sensors/ds18b20/read');

    const tempEl = document.getElementById("mostrar-temperatura");

    if (data) {
        tempEl.innerText = data.temperatura;
        tempEl.parentElement.classList.add("pulse");
    } else {
        tempEl.innerText = "Error";
    }
}

async function sendSetpoint() {
    const value = Number(document.getElementById("setpoint-slider").value);
    const data = await fetchData(`/setpoint/set/${value}`);

    const buzzerEl = document.getElementById("estado-buzzer");

    if (data) {
        buzzerEl.innerText = data.buzzer;
    } else {
        buzzerEl.innerText = "Error";
    }
}

function updateSetpointValue(value) {
    document.getElementById("setpoint-value").innerText = value;
    sendSetpoint();
}

setInterval(readTemperature, 1000);
readTemperature();

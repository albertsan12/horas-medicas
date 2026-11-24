console.log("conectado...")

function actualizar_estadisticas() {
    let gonzalez = 0;
    let rojas = 0;
    let munoz = 0;

    horas.forEach(function (p) {
        if (p.doctor === 1) {
            gonzalez++;
        } else if (p.doctor === 2) {
            rojas++;
        } else if (p.doctor === 3) {
            munoz++;
        }
    });

    const stats = document.querySelectorAll(".stat-card__numero");
    stats[0].textContent = gonzalez;
    stats[1].textContent = rojas;
    stats[2].textContent = munoz;
    stats[3].textContent = horas.length;
}

function cargar_tabla(){
    console.log(tabla);
    tabla.innerHTML="";

    horas.forEach(function(p) {
        let nombreDoctor = "";
        let claseDoctor = "";

        if (p.doctor === 1) {
            nombreDoctor = "Dra. Camila Gonzalez";
            claseDoctor = "bg-gonzalez";
        } else if (p.doctor === 2) {
            nombreDoctor = "DR. Matias Rojas";
            claseDoctor = "bg-rojas";
        } else if (p.doctor === 3) {
            nombreDoctor = "Dra. Valentina Muñoz"
            claseDoctor = "bg-munoz";
        }
        
        const tr = document.createElement("tr");
        if (claseDoctor) tr.classList.add(claseDoctor);
        tr.innerHTML = `
            <td>${p.paciente}</td>
            <td>${nombreDoctor}</td>
            <td>${p.edad} años</td>
        `;
        tabla.appendChild(tr);
    });
}

function enviar_mensajes(mensaje, parrafo, input=null) {
    if (input) input.classList.add("error");

    const p = document.querySelector(`#error-${parrafo}`);
    p.textContent = mensaje;
    setTimeout(function() {
        if (input)input.classList.remove("error");
        p.textContent = "";
    }, 3000);
};

const horas = [];

const formulario = document.querySelector("#formulario");
const tabla = document.querySelector(".tabla tbody");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    console.log("hice click");

    const nombre = formulario.nombre.value;
    const  doctor = Number(formulario.doctor.value);
    const edad = Number(formulario.edad.value);

    if (nombre.trim()=== "") {
        enviar_mensajes("nombre no puede estar vacio", "nombre", formulario.nombre);
        return;
    };

    if (doctor === 0) {
        enviar_mensajes("debes seleccionar una opcion", "doctor", formulario.doctor);
        return;
    };

    if (isNaN(edad)) {
        enviar_mensajes("edad invalida", "edad", formulario.edad);
        return;
    }

    if (edad <= 0) {
        enviar_mensajes("edad no puede ser negativo o 0 ", "edad", formulario.edad);
        return;
    };

    const hora = {
        paciente : nombre,
        doctor: doctor,
        edad: edad,
    };

    horas.push(hora);

    alert("Hora agendada correctamente")
    
    formulario.reset()
    cargar_tabla();
    actualizar_estadisticas();
});
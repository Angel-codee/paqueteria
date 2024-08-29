let paquetes = [
    { nombre: "Envío de ropa - FedEx", prioridad: "normal" },
    { nombre: "Documentos urgentes - DHL", prioridad: "muy urgente" },
    { nombre: "Electrodoméstico - FedEx", prioridad: "poco urgente" },
    { nombre: "Paquete de libros - DHL", prioridad: "urgente" },
    { nombre: "Regalos de cumpleaños - FedEx", prioridad: "normal" },
    { nombre: "Paquete médico - DHL", prioridad: "muy urgente" },
    { nombre: "Mueble pequeño - FedEx", prioridad: "urgente" },
    { nombre: "Material de oficina - DHL", prioridad: "normal" },
    { nombre: "Suministros de cocina - FedEx", prioridad: "poco urgente" },
    { nombre: "Pedidos en línea - DHL", prioridad: "urgente" }
];


function actualizarTabla() {
    const tabla = document.getElementById("tabla-paquetes").getElementsByTagName('tbody')[0];
    tabla.innerHTML = "";

    paquetes.forEach((paquete, index) => {
        let row = tabla.insertRow();
        row.insertCell(0).textContent = paquete.prioridad;
        row.insertCell(1).textContent = paquete.nombre;

        let btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Entregado";
        btnEliminar.onclick = () => eliminarPaquete(index);
        row.insertCell(2).appendChild(btnEliminar);
    });
}

function ordenarPaquetes() {
    const prioridades = { "muy urgente": 1, "urgente": 2, "poco urgente": 3, "normal": 4 };
    paquetes.sort((a, b) => prioridades[a.prioridad] - prioridades[b.prioridad]);
    actualizarTabla();
}

function eliminarPaquete(index) {
    paquetes.splice(index, 1);
    actualizarTabla();
}

document.getElementById("agregarPaquete").addEventListener("click", () => {
    const nombrePaquete = document.getElementById("nombrePaquete").value;
    const prioridad = document.getElementById("prioridad").value;

    if (nombrePaquete) {
        const nuevoPaquete = { nombre: nombrePaquete, prioridad: prioridad };
        let indice = paquetes.findIndex(p => p.prioridad === prioridad);
        if (indice === -1 || paquetes[indice].prioridad !== prioridad) {
            paquetes.push(nuevoPaquete);
        } else {
            while (indice < paquetes.length && paquetes[indice].prioridad === prioridad) {
                indice++;
            }
            paquetes.splice(indice, 0, nuevoPaquete);
        }
        actualizarTabla();
        document.getElementById("nombrePaquete").value = "";
    } else {
        alert("Por favor ingrese el nombre del paquete.");
    }
});

actualizarTabla();
document.getElementById("ordenarPaquetes").addEventListener("click", ordenarPaquetes);

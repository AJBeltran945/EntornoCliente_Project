const concerts = [
    {
        artist: "Taylor Swift",
        name: "Enchanted Evenings",
        description: "Una noche mágica llena de los mayores éxitos de Taylor Swift.",
        date: "06/15/2025",
        minimumTicketPrice: 200,
        show: false
    },
    {
        artist: "Drake",
        name: "Dreams and Destiny Tour",
        description: "Un viaje musical a través de las mejores rimas y melodías de Drake.",
        date: "07/20/2025",
        minimumTicketPrice: 180,
        show: false
    },
    {
        artist: "Billie Eilish",
        name: "Echoes of Silence",
        description: "Una experiencia íntima y única con la voz cautivadora de Billie Eilish.",
        date: "08/05/2025",
        minimumTicketPrice: 150,
        show: false
    },
    {
        artist: "Harry Styles",
        name: "Celestial Nights",
        description: "Un espectáculo deslumbrante que combina el pop moderno con la esencia del rock.",
        date: "09/10/2025",
        minimumTicketPrice: 180,
        show: false
    },
    {
        artist: "Beyoncé",
        name: "Golden Aura",
        description: "La reina del pop regresa para ofrecer un show lleno de energía y talento.",
        date: "10/12/2025",
        minimumTicketPrice: 250,
        show: false
    },
    {
        artist: "The Weeknd",
        name: "Twilight Mirage",
        description: "Un viaje sonoro a través de las noches más memorables con The Weeknd.",
        date: "11/01/2025",
        minimumTicketPrice: 175,
        show: false
    },
    {
        artist: "Ariana Grande",
        name: "Heaven’s Glow Tour",
        description: "Un concierto espectacular con la poderosa voz y presencia de Ariana Grande.",
        date: "11/22/2025",
        minimumTicketPrice: 170,
        show: false
    },
    {
        artist: "Dua Lipa",
        name: "Neon Horizons",
        description: "Una noche vibrante de pop y ritmos electrizantes con Dua Lipa.",
        date: "12/06/2025",
        minimumTicketPrice: 140,
        show: false
    },
    {
        artist: "Ed Sheeran",
        name: "Journey of Hearts",
        description: "Una travesía emocional a través de las melodías y letras de Ed Sheeran.",
        date: "01/18/2025",
        minimumTicketPrice: 120,
        show: false
    },
    {
        artist: "Kendrick Lamar",
        name: "Voices of the City",
        description: "Un potente mensaje social y musical en el escenario con Kendrick Lamar",
        date: "02/14/2025",
        minimumTicketPrice: 180,
        show: false
    }
];

// ---------------- MAIN CODE ---------------- //

function filtrarConciertos() {
    const nombre = document.getElementById("nombreConcierto").value;
    const artista = document.getElementById("nombreArtista").value;
    const fechaInicio = document.getElementById("fechaInicio").value;
    const fechaFin = document.getElementById("fechaFin").value;

    concerts.forEach(concert => concert.show = false);

    if (nombre) {
        filtrarPorNombre(nombre);
    }
    if (artista) {
        filtrarPorArtista(artista);
    }
    if (fechaInicio && fechaFin) {
        filterConcertsByDate(fechaInicio, fechaFin);
    }

    for (let i = 0; i < concerts.length; i++) {
        const concierto = document.getElementById("concierto" + (i + 1));
        const header = document.getElementById("header" + (i + 1));
        if (concierto && header) {
            concierto.style.display = concerts[i].show ? "flex" : "none";
            header.style.display = concerts[i].show ? "flex" : "none";
        }
    }
}

document.getElementById("nombreConcierto").addEventListener("input", filtrarConciertos);
document.getElementById("nombreArtista").addEventListener("input", filtrarConciertos);
document.getElementById("fechaInicio").addEventListener("change", filtrarConciertos);
document.getElementById("fechaFin").addEventListener("change", filtrarConciertos);



// ---------------- FUNCTIONS ---------------- //

// Función para buscar conciertos por las primeras tres letras del artista
function filtrarPorNombre(letras) {
    const minusculas = letras.toLowerCase(); // para convertir la entrada del cliente a minusculas


    for (let i = 0; i < concerts.length; i++) {
        // Verifica si el artista comienza con las letras escritas y almacena datos en los objetos asignados si hay coindicendia
        if (concerts[i].name.toLowerCase().startsWith(minusculas)) {
            concerts[i].show = true;
        }
    }
}

// Función para buscar conciertos por las primeras tres letras del artista
function filtrarPorArtista(letras) {
    const minusculas = letras.toLowerCase(); // para convertir la entrada del cliente a minusculas


    for (let i = 0; i < concerts.length; i++) {
        // Verifica si el artista comienza con las letras escritas y almacena datos en los objetos asignados si hay coindicendia
        if (concerts[i].artist.toLowerCase().startsWith(minusculas)) {
            concerts[i].show = true;
        }
    }
}
function filterConcertsByDate(startDate, endDate) {
    const start = new Date(startDate); //objeto date para poder iterarlo despues
    const end = new Date(endDate);

    for (let i = 0; i < concerts.length; i++) { //iteramos las fechas dentro del array concertDates para pasar a objeto date
        const date = new Date(concerts[i].date);
        if (date >= start && date <= end) { //recorremos las opciones elegidas y si encuentra true lo almacena en su objeto
            concerts[i].show = true;
        }
    }
}


function calcularDiasAntelacion() {
    // Fecha del concierto
    let fechaConcierto = new Date(document.getElementById("fechaConcierto").value);
    // Días de de hoy
    let diasDeHoy = new Date();

    // Calcular la diferencia en días Math.ceil para redondear arriba
    let diferenciaMs = fechaConcierto - diasDeHoy;
    let diasHastaConcierto = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));


    document.getElementById("resultado").textContent =
        diasHastaConcierto >= 0  ? "Quedan " + diasHastaConcierto + " días hasta el concierto." : "El concierto ya ha pasado.";
}


function  determinarTemporada() {

}

function calcularPrecioDescuento(){
    let precioBase = parseFloat(document.getElementById("precio").innerText);
    let cantidad = parseInt(document.getElementById("CantidadEntradas").value);
    let checkbox = document.getElementById('Residente');
    let total;


    // Comprobar si el checkbox está marcado
    if (checkbox.checked) {
        let descuento = 0.5;
        total = (precioBase - (precioBase * descuento)) * cantidad;
    } else {
        total = precioBase * cantidad;
    }


    // Redondear el total a dos decimales usando Math
    total = Math.round(total * 100) / 100;


    // Mostrar el resultado
    alert("Total: " + total.toFixed(2) + " €");
    console.log("Total:", total.toFixed(2));
}

function calcularIngresosEsperados(){

}

function  validarTicketsDisponibles(ticketsIngresados, maxTickets){

}


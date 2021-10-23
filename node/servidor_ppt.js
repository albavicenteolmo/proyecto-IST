var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var PUERTO = 8080;
server.listen(PUERTO, function() {
    console.log('Servidor corriendo en http://localhost:' + PUERTO);
});

app.use(express.static('../')); // directorio de documentos estáticos


// Estas variables serán comunes (las mismas) en todas las conexiones

// indice de cliente
let n_cli = 0;

//array con el mi_n_cli de cada jugador
let jugadores = [null, null];
let nombreJugadores = [null, null];

let mates = ['¿Sabías que es imposible realizar la cuadratura de un círculo? Sería necesario tener un cuadrado de lado pi', 'Dicen algunos listos que la suma de todos los números naturales es igual a -1/12...', '0.99999999...=1']
let fisica = ['Einstein recibió su Nobel de Física por su trabajo en el campo fotoeléctrico; la Teoría de la Relatividad no la entendieron', 'Einstein tuvo que escapar a EEUU por su religión judía; sin embargo, los americanos eran reacios a darle el visado y tuvo que intervenir un amigo para conseguirlo... ', 'Einstein amaba la música, sobre todo, el violín. Casi tanto como a las mujeres']
let biologia = ['Los chimpancés tienen el récord de rapidez sexual: solo 3 segundos.', 'La ballena azul adulta posee una lengua que llega a pesar hasta 4 toneladas', 'El tiburón es el animal que pone los huevos más grandes. Miden hasta 20 centímetros de largo']
let mundo = ['Las semillas de la manzana contienen cianuro, comerte 40 o 50 podrían matarte', 'Estamos en una época interglaciar, nos acercamos a una glaciación', 'Los mapas mundi más comunes contienen errores de dimensionamiento']
let literatura = ['Haruki Murakami es el eterno candidato al Nobel', 'Javier Marías es uno de los autores más conocidos de España fuera de nuestras fronteras', 'Winston churchill ganó el premio Nobel de Literatura en el año 1953']


// Array -de dos posiciones- con la apuesta de cada cliente
let apuestas = [null, null];

// Array booleano indicando si ya han apostado o no cada cliente
let apostado = [false, false];

// Array booleano indicando si ya han clicado nueva partida cada cliente, o no
let nueva_partida = [false, false];


// Establecimiento de conexión con cliente.
// Debe pensarse que la acción se realiza para cada cliente de forma replicada,
// Cada conexión con cada cliente, tiene su espacio de variables propio
// para aquellas variables declaradas localmente en la función 
// (mi_n_cli y socket). Sin embargo, variables como n_cli, apuestas, apostado o
// nueva_partida son globales, y por tanto comunes e idénticas para todos.

io.on('connection', function(socket) {

    let mi_n_cli = n_cli; // Cada conexión tendrá su "mi_n_cli"
    n_cli++; // Sin embargo, n_cli es la misma variable para todos


    if (jugadores.indexOf(null) == -1) {
        console.log();
        console.log('Cliente rechazado, mi_n_cli: ' + mi_n_cli);
        socket.emit('rechazo');

    } else {
        console.log('Cliente conectado, mi_n_cli: ' + mi_n_cli);
        jugadores[mi_n_cli] = (mi_n_cli);
    }

    // Mensaje de tipo 'identificativo' con el valor de mi_n_cli
    socket.emit('identificativo', mi_n_cli);

    socket.on('apuesta', function(eleccion) {
        console.log('apuesta recibida de ' + mi_n_cli + ': ', eleccion);

        /* Deberían actualizarse los arrays apuestas y apostado
        Si ambas componentes de apostado estan a true, hay que difundir
        las apuestas con un mensaje de tipo 'resultados' */
        apostado[mi_n_cli] = true;
        apuestas[mi_n_cli] = eleccion;

        if (apostado.indexOf(false) == -1) {
            io.emit('resultados', apuestas);
        } else {
            io.emit('interrogantes', apostado);
        }

    });

    socket.on('nombre', function(nombre) {
        console.log('El jugador ' + mi_n_cli + ' tiene nombre: ' + nombre)
        nombreJugadores[mi_n_cli] = nombre;
        if (nombreJugadores.indexOf(null) == -1) {
            io.emit('nombres', nombreJugadores);
        }
    })

    socket.on('categoria', function(categoria) {
        fact = ''
        if (categoria == 'mates') {
            fact = mates[Math.floor(Math.random() * mates.length)];
        } else if (categoria == 'fisica') {
            fact = fisica[Math.floor(Math.random() * fisica.length)];
        } else if (categoria == 'biologia') {
            fact = biologia[Math.floor(Math.random() * biologia.length)];
        } else if (categoria == 'mundo') {
            fact = mundo[Math.floor(Math.random() * mundo.length)];
        } else if (categoria == 'literatura') {
            fact = literatura[Math.floor(Math.random() * literatura.length)];
        }

        io.emit('fact', fact);
    })

    socket.on('jugar_otra_vez', function() {
        console.log('El jugador ' + mi_n_cli + ' quiere jugar otra vez.')
        nueva_partida[mi_n_cli] = true;
        if (nueva_partida[0] && nueva_partida[1]) {
            console.log('Difundiendo peticion de nueva_partida');
            apostado = [false, false];
            nueva_partida = [false, false];
            io.emit('nueva_partida');
        } else {
            io.emit('intervalos', nueva_partida);
        }
    })

    socket.on('disconnect', function() {
        console.log('Usuario desconectado, mi_n_cli: ' + mi_n_cli);
        jugadores[mi_n_cli] = null;
        nombreJugadores[mi_n_cli] = null;
        n_cli = mi_n_cli;
        apostado = [false, false];
        apuestas = [null, null];
        nueva_partida = [false, false];
        io.emit('cliente_desconectado');
    })


});

console.log('Script servidor_ppt.js ejecutado');

// socket establecido
let socket;

// identificativo
let n;



// Comunicación vía socket con servidor
const PUERTO = 8080;
const HOST = "http://localhost"
const URL = HOST + ":" + PUERTO;







// Inicializa el panel de juego. Cada vez que se inicie una nueva partida:
// - Eliminar todos los bordes de las figuras
// - Se ponen interrogantes a OFF
// - Se ponen las imágenes del contrincante a traslucidas
// - Se borran los resultados
function inic() {
    return ''
}



// Se deben programar las acciones frente a la recepción de los mensajes:
//  - 'identificativo': como consecuencia de abrir la página web
//  - 'resultados': como consecuencia de que ambos jugadores han hecho ya sus apuestas
//  - 'nueva_partida': como consecuencia de que ambos jugadores han pulsado el boton "Jugar otra vez"
//
// Así mismo, se deben programar las acciones a realizar cuando se pulse
// alguno de los símbolos del juego: piedra, papel o tijera, enviando al 
// al servidor la opción escogida como el string 'piedra', 'papel' o 'tijera'
//
// La otra acción a programar es la reacción al click del botón "Jugar otra 
// vez", enviando un mensaje vacío de tipo 'jugar_otra_vez'

function arranque() {

    // apertura de socket con el servidor
    socket = io.connect(URL);

    // Reacción frente a la rececpion del identificativo (id=0 o 1)
    socket.on('identificativo', function(id) {
        n = id;

    });


    // Accion del boton "Jugar otra vez": enviar al servidor mensaje
    // de tipo 'jugar_otra_vez', sin necesidad de argumento adicional
    $("#mates").click(function() {

        socket.emit('categoria', 'mates');
    })

    $("#fisica").click(function() {

        socket.emit('categoria', 'fisica');
    })

    $("#biologia").click(function() {

        socket.emit('categoria', 'biologia');
    })

    $("#mundo").click(function() {

        socket.emit('categoria', 'mundo');
    })

    $("#literatura").click(function() {

        socket.emit('categoria', 'literatura');
    })

    socket.on('fact', function(frase) {

        $("#fact").text(frase);

    })


    // Recepcion del mensaje de tipo 'nueva_partida': inicialización del juego
    socket.on('rechazo', function() {

        window.open("../rechazo.html", '_self');

    })


    inic();


}



// Arranque de la aplicación
$(function() { arranque(); });
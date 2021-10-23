// socket establecido
let socket;

// identificativo
let n;


/* Algunas constantes */

// Yo y el contrincante
const YO = true;
const CONTRINCANTE = false;

// Piedra, papel o tijera
const PIEDRA = "piedra";
const PAPEL = "papel";
const TIJERA = "tijera";

// ON/OFF
const ON = true;
const OFF = false;

// Comunicación vía socket con servidor
const PUERTO = 8080;
const HOST = "http://localhost"
const URL = HOST + ":" + PUERTO;

var mi_nombre = "";
var nombre_rival = "";
var mis_puntos = 0;
var puntos_rival = 0;
var apostar = false;
var tiradas = 0;
let intermitencia;



// Devuelve '.yo' si soy_yo==true y '.contrario' si soy_yo==false
function get_clase_jugador(soy_yo) {
    return (soy_yo) ? '.yo' : '.contrario';
}


// Devuelve '.piedra', '.papel', '.tijera'  si eleccion = PIEDRA ('piedra'), 
// PAPEL ('papel') o TIJERA ('tijera') respectivamente.  
// Delvuelve '.nada' si eleccion es falsy
function get_clase_eleccion(eleccion) {
    return (eleccion) ? "." + eleccion : ".nada";
}

// Pinta borde alrededor de la elección: PIEDRA ('piedra'), PAPEL ('papel') 
// o TIJERA ('tijera')
// del jugador si soy_yo==true, o del contrario, si soy_yo==false.
// También elimina el borde de las restantes figuras que no coinciden
// con la eleccion. 
// Si eleccion no es incluido como argumento en la llamada, entonces
// se borra el borde del elemento que lo tuviera, es decir, 
//     poner_borde(YO): borra el borde de cualquier figura de este jugador
//     poner_borde(CONTRINCANTE): borra el borde de cualquier figura del contrincante.
function poner_borde(soy_yo, eleccion) {
    let clase_jugador = get_clase_jugador(soy_yo);
    let clase_eleccion = get_clase_eleccion(eleccion);
    $(clase_jugador + " img" + clase_eleccion).addClass("seleccionado");
    $(clase_jugador + " img" + ":not(" + clase_eleccion + ")").removeClass("seleccionado");
}


// Vuelve opaca la figura elección: PIEDRA ('piedra'), PAPEL ('papel') 
// o TIJERA ('tijera') del contrincante
function opaco(eleccion) {
    let clase_eleccion = get_clase_eleccion(eleccion);
    $(".contrario img" + clase_eleccion).removeClass("traslucido");

}

// Vuelve traslucidas todas las figuras del contrincante
function traslucidos() {
    $(".contrario .tercio:nth-child(2) img:not(.interrogante").addClass("traslucido");
}


// Pinta interrogantes encima de todas las figuras del contrincante
function interrogantes(on) {
    [PIEDRA, PAPEL, TIJERA].forEach(function(eleccion) {
        let clase_eleccion = get_clase_eleccion(eleccion);
        $(".contrario div.par img" + clase_eleccion + " + img.interrogante")
            .css('visibility', ((on) ? 'visible' : 'hidden'));
    })

}

function pinta_nombres(nombreMio, nombreRival) {
    $("#nom_cont").text(nombreRival);
    $("#mi_nombre").text(nombreMio);
}

function pinta_puntos() {
    $('#puntos_yo').text(parseInt(mis_puntos));
    $('#puntos_contrario').text(parseInt(puntos_rival));
}

function limpia() {
    mis_puntos = 0;
    puntos_rival = 0;
    nombre_rival = "";
    pinta_nombres(mi_nombre, nombre_rival);
    pinta_puntos();
    inic();
}

function interrogante(mi_apostado, su_apostado) {
    if (su_apostado == true) {
        interrogantes(ON);
    }
}


// Imprime el resultado y reajusta contadores
// Si mi_eleccion==falsy o su_eleccion==falsy, limpia resultados y retorna
function resultado(mi_eleccion, su_eleccion) {


    console.log("mi_eleccion: " + mi_eleccion + ", su_eleccion:" + su_eleccion);

    if (!mi_eleccion || !su_eleccion) {
        $('.yo .alegre').css('visibility', 'hidden');
        $('.contrario .alegre').css('visibility', 'hidden');
        $('.yo .triste').css('visibility', 'hidden');
        $('.contrario .triste').css('visibility', 'hidden');
        return;
    }

    let yo_gano, el_gana;

    // Empate
    if (mi_eleccion == su_eleccion) {
        yo_gano = el_gana = false;
    }

    // Determinacion de ganador
    if (mi_eleccion == TIJERA) {
        if (su_eleccion == PAPEL) {
            yo_gano = true;
            el_gana = false;
        } else if (su_eleccion == PIEDRA) {
            yo_gano = false;
            el_gana = true;
        }
    } else if (mi_eleccion == PAPEL) {
        if (su_eleccion == PIEDRA) {
            yo_gano = true;
            el_gana = false;
        } else if (su_eleccion == TIJERA) {
            yo_gano = false;
            el_gana = true;
        }
    } else if (mi_eleccion == PIEDRA) {
        if (su_eleccion == TIJERA) {
            yo_gano = true;
            el_gana = false;
        } else if (su_eleccion == PAPEL) {
            yo_gano = false;
            el_gana = true;
        }
    }

    console.log("yo_gano: " + yo_gano + ", el_gana: " + el_gana);

    // Enciende/apaga simbolos de victoria o derrota
    $('.yo .alegre').css('visibility', ((yo_gano) ? 'visible' : 'hidden'));
    $('.yo .triste').css('visibility', ((!yo_gano) ? 'visible' : 'hidden'));
    $('.contrario .alegre').css('visibility', ((el_gana) ? 'visible' : 'hidden'));
    $('.contrario .triste').css('visibility', ((!el_gana) ? 'visible' : 'hidden'));

    if (el_gana == true && yo_gano == false) {
        puntos_rival++;
        pinta_puntos();
    } else if (el_gana == false && yo_gano == true) {
        mis_puntos++;
        pinta_puntos();
    }

    fin = true;
    $("#otra_vez").removeAttr("disabled");
}








// Inicializa el panel de juego. Cada vez que se inicie una nueva partida:
// - Eliminar todos los bordes de las figuras
// - Se ponen interrogantes a OFF
// - Se ponen las imágenes del contrincante a traslucidas
// - Se borran los resultados
function inic() {

    // Quitar los bordes
    poner_borde(YO);
    poner_borde(CONTRINCANTE);

    // Quita los interrogantes
    interrogantes(OFF);

    // Todos las figuras del adversario se muestran traslucidas
    traslucidos();

    // Borra resultados
    resultado(false, false);
    $("#otra_vez").attr("disabled", true);

    fin = false;
    tiradas = 0;

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
        while (mi_nombre.length < 2) {
            mi_nombre = prompt("Nombre:");
            pinta_nombres(mi_nombre, nombre_rival);
        }
        socket.emit('nombre', mi_nombre);

    });

    socket.on('nombres', function(names) {
        i = names.indexOf(mi_nombre);
        nombre_rival = names[1 - n];
        pinta_nombres(names[i], names[1 - n]);
    })

    // Reacción frente a los resultados: vector res con [<eleccion>,<eleccion>],
    // siendo 
    //      <eleccion> = 'piedra' | 'papel' | 'tijera'
    // El índice del array coincidirá con el identificativo: res[0] lo que
    // ha votado el cliente con id=0, y res[1] lo que ha votado el cliente
    // con id=1, 
    // o bien res[n] lo que ha votado este cliente y res[1-n], lo
    // que ha votado el otro cliente.
    // Se debería poner borde a la elección del contrincante, así como
    // ponerlo en estado opaco.
    socket.on('resultados', function(res) {
        interrogantes(OFF);
        resultado(res[n], res[1 - n]);
    })

    socket.on('intervalos', function(part) {
        if (part[1 - n]) {
            intermitencia = setInterval(function() {
                $("#otra_vez").fadeTo(250, 0);
                $("#otra_vez").fadeTo(250, 1);
            }, 550);
        }
    })

    socket.on('interrogantes', function(apostado) {
        interrogante(apostado[n], apostado[1 - n]);
    })

    // envío del mensaje apuesta, con el string 
    //      <eleccion> = 'piedra' | 'papel' | 'tijera'
    // Ademas, se debería poner borde a la figura clicada
    $("div.yo div.tercio:nth-child(2) div.imagenes img").click(function(e) {
        if (fin == false && nombre_rival.length > 1 && tiradas < 1) {
            let eleccion = this.id;
            poner_borde(YO, eleccion)
            socket.emit('apuesta', eleccion);
            tiradas = tiradas + 1;
        }

    });

    // Accion del boton "Jugar otra vez": enviar al servidor mensaje
    // de tipo 'jugar_otra_vez', sin necesidad de argumento adicional
    $("#otra_vez").click(function() {

        socket.emit('jugar_otra_vez');
        clearInterval(intermitencia);
    })

    // Recepcion del mensaje de tipo 'nueva_partida': inicialización del juego
    socket.on('nueva_partida', function() {

        inic();

    })

    socket.on('cliente_desconectado', function() {

        limpia();

    })

    // Recepcion del mensaje de tipo 'nueva_partida': inicialización del juego
    socket.on('rechazo', function() {

        window.open("../rechazo.html", '_self');

    })


    inic();


}



// Arranque de la aplicación
$(function() { arranque(); });
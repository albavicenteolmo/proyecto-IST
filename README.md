

<h1 align="center">Proyecto de asignatura</h1>

<img src="doc/figuras/UPVcolor300.png" align="left" height="75">

<img src="doc/figuras/ETSIT.png"       align="right" height="75">







<h2 align="center">Integración de Servicios Telemáticos</h2>
<h3 align="center">Máster Universitario en Ingeniería de Telecomunicación</h3>
<h3 align="center">ETSIT-UPV</h3>


## Descripción de la aplicación
La aplicación que hemos desarrollado es un blog de la Escuela Técnica Superior de Ingenieros de Telecomunicación de la UPV. Contiene una serie de apartados y recursos que hemos considerado que pueden ser útiles para los estudiantes. <br>
El blog está formado por las siguientes páginas: Noticias, Recursos, Biblioteca, Gimnasio, Empresa, Ocio y Aprende. Todas contienen un menú de navegación fijo y un a parte de su contenido.<br>
El menú es desplegable y se queda fijo al hacer scroll gracias a la propiedad position: fixed. El footer contiene nuestros apellidos, un link a la página de la UPV, y otro hacia el inicio de la página en la que nos encontramos.

## Descripción de las diferentes páginas 
### Noticias
En la página principal podemos encontrar 3 bloques de noticias asociadas a la UPV y a la escuela ETSIT. Estos bloques contienen diferentes estilos para los cuales hemos utilizado Bootstrap. El primer bloque es de tipo “carrusel”. Las noticias se desplazan para cambiarse y que aparezcan otras en la página principal. Para ello, utilizamos un JavaScript de Bootstrap que nos permite el movimiento de estas.<br>

En el segundo boque encontramos 3 noticias alineadas. Cada noticia contiene una imagen en forma de círculo, un título, una breve descripción y un botón para acceder a la página de donde proviene la noticia.<br>
Por último, al final de la página, podemos acceder a otras 3 noticias colocadas en zigzag.

### Recursos
Se puede acceder a las distintas páginas de recursos a través del menú desplegable.
Aparecerá una lista de las asignaturas de ese curso. Cada entrada es un botón que acciona el desplegado de su contenido. Las entradas internas funcionan de la misma forma. Los nombres de los profesores contienen un enlace de tipo mailto. Las entradas bibliográficas contienen un enlace al buscador de la biblioteca UPV. El apartado Apuntes contiene enlaces a pdfs descargables, vídeos, enlaces a páginas web...

Las páginas contienen solo una muestra de dos o tres asignaturas por curso. La extensión para incluir todas consistiría simplemente en replicar código, lo cual hemos considerado que no es el objetivo del proyecto.

### Biblioteca
La página de biblioteca contiene dos elementos: un formulario y un iframe. El formulario permite la búsqueda de un libro en la página de polibuscador de la UPV. El iframe contiene un calendario de Google sincronizado con la página web de la biblioteca, que muestra los horarios de apertura de esta, así como distintos eventos.

### Gimnasio
La página de Gimnasio contiene información para los socios de deportes de la UPV. Consiste en un iframe con el pdf del programa.

### Empresa
Este apartado está pensado para facilitar a los alumnos la información sobre las prácticas de empresa. Al principio de la página encontramos varios enlaces a pdfs sobre ofertas de empleo, instrucciones para generar un convenio de prácticas, etc. Debajo de estos enlaces hay un formulario para hacer nuestro propio currículum, que podemos descargar en pdf.

### Ocio
La pestaña de ocio nos traslada a la sección de juegos y entretenimiento de nuestro blog. La intención de crear esta sección en el blog es otorgar dinamismo y algo de entretenimiento gratuito a las personas que entren en nuestra aplicación. En esta página podemos encontrar los juegos de Solitario, Piedra papel tijera, Buscaminas, Ajedrez y DBZ.

#### Solitario

El juego del Solitario se desarrolló a lo largo de las prácticas de IST. Contiene la totalidad de las cartas de la baraja española y está en pleno funcionamiento. Las normas están especificadas en los guiones de las prácticas de la asignatura.

#### Piedra papel o tijera
De igual modo que el Solitario, este juego se desarrolló en las prácticas propias de la asignatura. Este juego te permite jugar contra un contrincante que puede ir cambiando, dado que el sistema de jugadores lo gestiona el servidor. Las normas son de sobra conocidas y están especificadas en los guiones de las prácticas. Aparecerá una página de rechazo si ya existen dos jugadores en la partida y alguien intenta conectarse. Esta página sólo aparecerá en caso de fallo o rechazo.
Nota: hay que tener en cuenta que para jugar a Piedra papel tijera hace falta lanzar el servidor (node/servidor_ppt.js) e instalar los paquetes de socket.io y express. Además, como máximo puede haber 2 personas jugando.

#### Buscaminas
 En la pestaña del Buscaminas, encontramos un pequeño ejemplo del mítico juego que ha entretenido a miles de personas durante generaciones. El juegador sólo tendrá que ir descubriendo casillas hasta completar todas aquellas que no oculten una bomba en su interior. Para jugar más partidas, valdría con únicamente clicar el botón de Reiniciar. Los números indican el número de bombas cercanas a esa casilla.

#### Ajedrez
Se ha introducido un motor del juego de ajedrez para que el usuario pueda competir contra la IA y probar su nivel. El juego reacciona con rapidez y te permite echar tantas partidas como quieras. El usuario jugará de blancas y la IA, de negras.

#### DBZ
 El juego introducido con temática de la mítica serie de “Dragon Ball Z” es un intento de satisfacer las inquietudes “freaks” de nuestros usuarios. Es un pequeño homenaje a la serie de entretenimiento que marcó una generación. El usuario controla a Goku con las teclas y dispara con la tecla “Space”. El usuario tendrá que acabar con la vida del rival, controlado por la IA. Cuando iniciamos el juego, debemos esperar unos segundos hasta que se cargue.

### Aprende
La sección de “Aprende” es un intento de acercar distintos ámbitos científicos al usuario de manera rápida, graciosa y entretenida. El usuario puede elegir qué tema le interesa más, sobre qué tema quiere conocer algún dato curioso:
Los temas a elegir son: Mates, Física, Biología, Mundo y Literatura.
La página mostrará una serie de datos curiosos de manera aleatoria del tema seleccionado por el usuario. Así pues, se han introducido unas tres curiosidades por tema para servir de ejemplo para este trabajo; sin embargo, se pueden introducir tantas como se quieran. El servidor se encarga de gestionar esta sección. Para conseguir la experiencia completa, debemos tener el servidor activo en nuestro ordenador. <br>

<i>Nota: hay que tener en cuenta que poder hacer uso de esta sección hace falta lanzar el servidor (node/servidor_ppt.js) e instalar los paquetes de socket.io y express.<i><br>
  
Ejemplo:
En resumen, la parte de Ocio y Aprende se conciben como una manera de escapar de la seriedad que puede acarrear el estudio universitario. La idea es ofrecer un pequeño reducto de entretenimiento al usuario dentro de la formalidad vigente en el blog.



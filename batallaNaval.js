var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var scoreR = document.getElementById("scoreR");
var rctx = scoreR.getContext("2d");

let tableroUno = new Array();
let tableroDos = new Array();

let gameOver = true;
let wins1 = 0;
let wins2 = 0;

var jugador = 1;

var destructor1 = 0;
var submarino1 = 0;
var crucero1 = 0;
var acorazado1 = 0;
var portaviones1 = 0;

var destructor2 = 0;
var submarino2 = 0;
var crucero2 = 0;
var acorazado2 = 0;
var portaviones2 = 0;

const ejeLetras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const ejeNumeros = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
var posicion1 = [1, 2, 3, 4, 5, 6, 7,8, 9, 10];
var posicion2 = [1, 2, 3, 4, 5, 6, 7,8, 9, 10];


limpiar();

function limpiar() {
  
  var tabCol1 = 5;
  var tabFila1 = 1;
  var tabCol2 = 20;
  var tabFila2 = 1;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  rctx.clearRect(0, 0, scoreR.width, scoreR.height);

  for (let i = 0; i < 10; i++) {
    tableroUno[i] = new Array();
    tableroDos[i] = new Array();
    ctx.font = "italic 37px Poppins";
    ctx.fillStyle = "rgb(16, 13, 206)";
    ctx.fillText("Tablero del Jugador 1", 310, 605);
    ctx.fillText("Tablero del Jugador 2", 1100, 605);
    ctx.fillText(ejeLetras[i], 210, (i * 50) + 85);
    ctx.fillText(ejeLetras[i], 960, (i * 50) + 85);
    ctx.fillText(i + 1, (i * 50) + 260, 40);
    ctx.fillText(i + 1, (i * 50) + 1010, 40);
    for (let j = 0; j < 10; j++) {
      tableroUno[i][j] = 0;
      tableroDos[i][j] = 0;
      ctx.fillStyle = "#36BAEB";
      ctx.fillRect(tabCol1 * 50, tabFila1 * 50, 49, 49);
      ctx.fillRect(tabCol2 * 50, tabFila2 * 50, 49, 49);
      tabCol1 += 1;
      tabCol2 += 1;
    }
    tabCol1 = 5;
    tabFila1 += 1;
    tabCol2 = 20;
    tabFila2 += 1;
  }
  gameOver = true;
  rctx.font = "40px Poppins";
  rctx.fillStyle = "rgb(16, 13, 206)";
  rctx.fillText("Comienza el Jugador 1", 120, 50);
  
}

// Creacion de barcos al azar
let crearBarcos = (jug, casillas, valor) => {
  let ran1 = (Math.floor(Math.random() * (posicion1.length - casillas)));
  let ran2 = (Math.floor(Math.random() * (posicion2.length - casillas)));
  let horizontal = ran1 % 2;
  let count = 1;
      var ranX1 = posicion1[ran1];
      var ranY1 = posicion1[ran1];
      var ranX2 = posicion2[ran2];
      var ranY2 = posicion2[ran2];
  while (count <= casillas) {
    if (jug == 1) {
      tableroUno[ranX1][ranY1] = valor;
      let xnew = parseInt(ranX1) + 2;
      let ynew = parseInt(ranY1) + 5;
      ctx.font = "40px Poppins";
      ctx.fillStyle = "#ea180e";
      // Si se quita los comentarios se muestra la ubicacion de la generacion de barcos
      //ctx.fillText(tableroUno[ranX1][ranY1], ynew * 50, xnew * 50); 
    } else {
      tableroDos[ranX2][ranY2] = valor;
      let xnew = parseInt(ranX2) + 2;
      let ynew = parseInt(ranY2) + 20;
      ctx.font = "40px Poppins";
      ctx.fillStyle = "#ea180e";
      //ctx.fillText(tableroDos[ranX2][ranY2], ynew * 50, xnew * 50);
    }
    count += 1;
    (horizontal) ? ranX1 += 1 : ranY1 += 1;
    (horizontal) ? ranX2 += 1 : ranY2 += 1;
  }
  (jug == 1) ? posicion1.splice(ran1,1) : posicion2.splice(ran2,1);
  
}

// Creando destructores
crearBarcos(1, 2, 1);
crearBarcos(2, 2, 1);
// Creando submarinos
crearBarcos(1, 3, 2);
crearBarcos(2, 3, 2);
// // Creando cruceros
crearBarcos(1, 3, 3);
crearBarcos(2, 3, 3);
// // Creando acorazados
crearBarcos(1, 4, 4);
crearBarcos(2, 4, 4);
// // Creando portaviones
crearBarcos(1, 5, 5);
crearBarcos(2, 5, 5);

let mensaje = (ship, coordX, coordY) => {
  rctx.clearRect(0, 0, scoreR.width, scoreR.height);
  rctx.font = "40px Poppins";
  rctx.fillStyle = "#ea180e";
  let ejeY = parseInt(coordY) + 1;
  rctx.fillText("Dañaste un " + ship + " en coordenada (" + ejeLetras[coordX] + "," + ejeY + ")", 30, 30);

  // marcamos gris cuando le dimos a un barco
  if (jugador == 1) {
    let xnew = parseInt(coordX) + 1;

    let ynew = parseInt(coordY) + 20;
    ctx.fillStyle = "#697080";
    ctx.fillRect(ynew * 50, xnew * 50, 49, 49);
    tableroDos[coordX][coordY] += 5;
  } else {
    let xnew = parseInt(coordX) + 1;
    let ynew = parseInt(coordY) + 5;
    ctx.fillStyle = "#697080";
    ctx.fillRect(ynew * 50, xnew * 50, 49, 49);
    tableroUno[coordX][coordY] += 5;
  }
}

// esta funcón pinta rojo la ubicación del barco hundido
let hundido = (ship, num) => {
  num += 5;
  let tabCol1 = 5;
  let tabFila1 = 1;
  let tabCol2 = 20;
  let tabFila2 = 1;
  for (let i = 0; i < 10; i++) {

    for (let j = 0; j < 10; j++) {
      if ((jugador == 2) && (tableroUno[i][j] == num)) {
        ctx.fillStyle = "#ea180e";
        ctx.fillRect(tabCol1 * 50, tabFila1 * 50, 49, 49);
      } else if ((jugador == 1) && (tableroDos[i][j] == num)) {
        ctx.fillStyle = "#ea180e";
        ctx.fillRect(tabCol2 * 50, tabFila2 * 50, 49, 49);
      }
      tabCol1 += 1;
      tabCol2 += 1;
    }
    tabCol1 = 5;
    tabFila1 += 1;
    tabCol2 = 20;
    tabFila2 += 1;
  }
  rctx.clearRect(0, 0, scoreR.width, scoreR.height);
  rctx.font = "40px Poppins";
  rctx.fillStyle = "#ea180e";
  rctx.fillText("Hundieron tu " + ship, 30, 30);
  (jugador == 1) ? wins2 += 1 : wins1 += 1;
  
  // Aqui verifica si ya hay un ganador que derribó todos los barcos de su enemigo
  if (wins1 == 5) {
    rctx.font = "40px Poppins";
    rctx.fillStyle = "rgb(16, 13, 206)";
    rctx.fillText("Ganaste Jugador " + jugador, 30, 80);
    gameOver = false
  }
  if (wins2 == 5) {
    rctx.font = "40px Poppins";
    rctx.fillStyle = "rgb(16, 13, 206)";
    rctx.fillText("Ganaste Jugador " + jugador, 30, 80);
    gameOver = false
  }
}

// Se llama a esta función con el boton coordenadas para atacar
function ataca() {
  var letraInput = null;
  var numeroInput = null;
  rctx.fillStyle = "rgb(16, 13, 206)";
  letraInicial = document.getElementsByName("letras")[0].value;
  letraInicial = letraInicial.toUpperCase();
  console.log(ejeLetras.indexOf(letraInicial));
  letraInput = ejeLetras.indexOf(letraInicial);
  numeroInput = document.getElementsByName("numeros")[0].value;
  console.log(ejeNumeros.indexOf(numeroInput));

  if ((gameOver) && (ejeLetras.indexOf(letraInicial) >= 0) && (ejeNumeros.indexOf(numeroInput) >= 0)) {
    numeroInput -= 1;
    if (jugador == 2) {
      switch (tableroUno[letraInput][numeroInput]) {
        case 0:
          rctx.clearRect(0, 0, scoreR.width, scoreR.height);
          rctx.fillText("Al Agua Bro!!", 30, 30);
          break;
        case 1:
          mensaje("Destructor", letraInput, numeroInput);
          destructor1 += 1;
          if (destructor1 == 2) { hundido("Destructor", 1) }
          break;
        case 2:
          mensaje("Submarino", letraInput, numeroInput);
          submarino1 += 2;
          if (submarino1 == 6) { hundido("Submarino", 2) }
          break;
        case 3:
          mensaje("Crucero", letraInput, numeroInput);
          crucero1 += 3;
          if (crucero1 == 9) { hundido("Crucero", 3) }
          break;
        case 4:
          mensaje("Acorazado", letraInput, numeroInput);
          acorazado1 += 4;
          if (acorazado1 == 16) { hundido("Acorazado", 4) }
          break;
        case 5:
          mensaje("Portaviones", letraInput, numeroInput);
          portaviones1 += 5;
          if (portaviones1 == 25) { hundido("Portaviones", 5) }
          break;
        default:
          rctx.clearRect(0, 0, scoreR.width, scoreR.height);
          rctx.fillText("Aquí le diste a algo antes...  ", 30, 30);
      }
      jugador = 1;
    } else {
      switch (tableroDos[letraInput][numeroInput]) {
        case 0:
          rctx.clearRect(0, 0, scoreR.width, scoreR.height);
          rctx.fillText("Fallaste!!", 30, 30);
          break;
        case 1:
          mensaje("Destructor", letraInput, numeroInput);
          destructor2 += 1;
          if (destructor2 == 2) { hundido("Destructor", 1) }
          break;
        case 2:
          mensaje("Submarino", letraInput, numeroInput);
          submarino2 += 2;
          if (submarino2 == 6) { hundido("Submarino", 2) }
          break;
        case 3:
          mensaje("Crucero", letraInput, numeroInput);
          crucero2 += 3;
          if (crucero2 == 9) { hundido("Crucero", 3) }
          break;
        case 4:
          mensaje("Acorazado", letraInput, numeroInput);
          acorazado2 += 4;
          if (acorazado2 == 16) { hundido("Acorazado", 4) }
          break;
        case 5:
          mensaje("Portaviones", letraInput, numeroInput);
          portaviones2 += 5;
          if (portaviones2 == 25) { hundido("Portaviones", 5) }
          break;
        default:
          rctx.clearRect(0, 0, scoreR.width, scoreR.height);
          rctx.fillText("Aquí le diste a algo antes... ", 30, 30);
      }
      jugador = 2;
    }

    if (gameOver) { rctx.fillText("Siguiente turno Jugador " + (jugador), 30, 80); }

  }
}


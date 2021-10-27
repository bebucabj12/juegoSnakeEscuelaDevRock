//Cada cuantos mmilisegundos se va a volver a ejecutar la función looper
const INTERVALO = 80;
//Tamaño del cuadrado
const SIZE = 10;
//Tamaño del canvas
const ANCHO = 500;
//Defino las direcciones que van a realizarse cuando el usuario aprete una tecla
const DIRECTION = {
    //[X , Y]
    ArrowDown: [0, 1],
    ArrowUp: [0, -1],
    ArrowRight: [1, 0],
    ArrowLeft: [-1, 0],
    A: [-1, 0],
    W: [0, -1],
    S: [0, 1],
    D: [1, 0],
    a: [-1, 0],
    w: [0, -1],
    s: [0, 1],
    d: [1, 0],
}

//Controles y seteos de direccion de la vibora cuando inicia
let controls = {
    direction: { x: 1, y: 0 },
    snake: [
        { x: 0, y: 0 }
    ],
    victim: { x: 0, y: 250 },
    playing: false,
    growing: 0
}

//Variable con las direcciones
let move;
//Referencio el canvas en JS
let canvasWrite = document.querySelector("canvas");
//Referencia al contexto del canvas
let ctx = canvasWrite.getContext("2d");

let looper = () => {
    //Armar objeto vacio de cola
    let cola = {}

    //Clonar el ultimo elemento de la serpiente
    Object.assign(cola, controls.snake[controls.snake.length - 1]);

    //Instancio la cabeza de la serpiente
    const head = controls.snake[0];

    //Si la posicion en x y en y de la cabeza coincide con la de la victima es true
    let catching = head.x == controls.victim.x && head.y === controls.victim.y

    //Detecto si en esta vuelta del loop hay choque
    if (colision()) {
        //Pongo en false el juego
        controls.playing = false;
        //Mostrar cartel de 'Lose'

        reLoad();
    }

    //Referencio la direccion actual
    let dx = controls.direction.x;
    let dy = controls.direction.y;

    //Guardo el tamaño de la vibora
    let tam = controls.snake.length - 1

    //Si el juego corre
    if (controls.playing) {
        //Hago una iteracion de la vibora de atras para adelante
        for (let idx = tam; idx > -1; idx--) {
            //Guarda en la const head la cabeza de la serpiente
            const head = controls.snake[idx];
            //Pregunto si es la cabeza
            if (idx === 0) {
                //Si es la cabeza avanza a la nueva direccion
                head.x += dx;
                head.y += dy;
            } else {
                //Sino asigno posicion del miembro anterior
                head.x = controls.snake[idx - 1].x;
                head.y = controls.snake[idx - 1].y;
            }
        }
    }

    //Verifico si atrapo algo
    if (catching) {
        controls.growing += 1;
        revictim();
    }

    //Si tengo que crecer
    if (controls.growing > 0) {
        //Agrego a la vibora el clon de cola creado anteriormente
        controls.snake.push(cola)
        controls.growing -= 1
    }

    //Llamo a la animación a dibujar
    requestAnimationFrame(print);
    //Llamar a la funcion luego de X intervalo
    setTimeout(looper, INTERVALO)
}

let colision = () => {
    const head = controls.snake[0];
    if (head.x < 0 || head.x >= ANCHO / SIZE || head.y < 0 || head.y >= ANCHO / SIZE) {
        return true;
    }
    for (let idx = 1; idx < controls.snake.length; idx++) {
        const sq = controls.snake[idx];
        if (sq.x == head.x && sq.y == head.y) {
            return true
        }
    }
}

//Almaceno en move la direccion que apreto el usuario
document.onkeydown = (e) => {
    //Guardo la nueva direccion ingresa por el usuario
    move = DIRECTION[e.key];
    //Deconstruyo X Y 
    const [x, y] = move;
    //Valido que no se pueda ir en dirección contraria
    if (-x !== controls.direction.x && -y !== controls.direction.y) {
        //Asigno las direcciones a mis controles
        controls.direction.x = x;
        controls.direction.y = y;
    }
}

let print = () => {
    //Cada vez que se llame esta función el context se borra
    ctx.clearRect(0, 0, ANCHO, ANCHO);
    for (let idx = 0; idx < controls.snake.length; idx++) {
        const { x, y } = controls.snake[idx]
        printActors('#949cdf', x, y);
    }
    const victim = controls.victim;
    printActors('#fca3cc', victim.x, victim.y)
}

let printActors = (color, x, y) => {
    //Indico cual sera el color del dibujo a crear
    ctx.fillStyle = color;
    //Creo un rectangulo (posicion X, posicion Y, Ancho, Alto)
    ctx.fillRect(x * SIZE, y * SIZE, SIZE, SIZE);
}

let random = () => {
    //Convierto a DIRECTION en un array y lo guardo en direction
    let direction = Object.values(DIRECTION)
    return {
        x: parseInt(Math.random() * ANCHO / SIZE),
        y: parseInt(Math.random() * ANCHO / SIZE),
        d: direction[parseInt(Math.random() * 11)]
    }
}

let revictim = () => {
    let newPosition = random();
    let victim = controls.victim;
    victim.x = newPosition.x;
    victim.y = newPosition.y;
}

let reLoad = () => {
    controls = {
        direction: { x: 1, y: 0 },
        snake: [
            { x: 0, y: 0 }
        ],
        victim: { x: 0, y: 250 },
        playing: false,
        growing: 0
    }
    move = random();
    let headRandom = controls.snake[0];
    headRandom.x = move.x;
    headRandom.y = move.y;
    controls.direction.x = move.d[0];
    controls.direction.y = move.d[1];


    // console.log('move', move)
    // console.log('Que tiene headRandom.x', headRandom.x) //devuelve un num de 0 a 49
    // console.log('Que tiene headRandom.y', headRandom.y) //devuelve un num de 0 a 49
    //console.log('move.x', move.x)
    //console.log('move.y', move.y)
    //console.log('move.d', move.d) //devuelve un array ej: [0, 1]
    //console.log('controls.direction.x', controls.direction.x)
    //console.log('controls.direction.y', controls.direction.y)

    if (move.x < 40 && controls.direction.x == -1) {

        console.log('no tiene que ir a la izq')
        controls.direction.x = move.d[1];
        controls.direction.y = move.d[0];

    } else if (move.y <= 40 && controls.direction.y == -1) {

        console.log('no tiene que ir arriba')
        controls.direction.x = move.d[0];
        controls.direction.y = move.d[1];

    } else if (move.x >= 42 && controls.direction.x == 1) {

        console.log('no tiene que ir a la derecha');
        controls.direction.x = move.d[0];
        controls.direction.y = move.d[1];

    } else if (move.y >= 42 && controls.direction.y == 1) {

        console.log('no tiene que ir para abajo');
        controls.direction.x = move.d[0];
        controls.direction.y = move.d[-1];
    }

    //Posicion random de la victima
    positionVictim = random();
    let victim = controls.victim;
    victim.x = positionVictim.x;
    victim.y = positionVictim.y;
    controls.playing = true
}

//Cuando el documento carga llamo a looper
window.onload = () => {
    reLoad();
    looper();
}
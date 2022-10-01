//se toman elemntos del html
const div1 = document.querySelector("#divCapa1");
const btnNuevaPalabra = document.querySelector("#btnNuevaPalabra");
const btnIniciar = document.querySelector("#btnIniciar");

const div2 = document.querySelector("#divCapa2");
const inpAgregaPalabra = document.querySelector("#inpAgregarPalabra");
const lbInformarivo = document.querySelector("#lb-informativo");
const btnGuardar = document.querySelector("#btnGuardar");
const btnCancelar = document.querySelector("#btnCancelar");

const div3 = document.querySelector("#divCapa3");
let pantallaHorca = document.querySelector("#canvasHorca"); //300 x 400
let pincel = pantallaHorca.getContext("2d");
let pantallaLineas = document.querySelector("#canvasLineas");
let pincel2 = pantallaLineas.getContext("2d");
let pantallaLetraIncorrecta = document.querySelector("#canvasLetrasIncorrectas"); //300 x 400
let pincel3 = pantallaLetraIncorrecta.getContext("2d");
const btnNuevo = document.querySelector("#btnNuevo");
const btnDesistir = document.querySelector("#btnDesistir");
let inputValidaLetra = document.querySelector("#inpValidaLetra");

//variables para manejo y validacion de palabras y letras escogidas
let palabrasSecretasIniciales = ["PROGRAMA","JUEGO","WEB","FINAL","SCRIPT","ESTILO","ETIQUETA","EVENTO","LINEA","CODIGO"];
let palabrasSecretas = palabrasSecretasIniciales;
let palabraSorteada = "";
let letraSorteadas = [];

let textoInput = ""; // tomara el texto 

const letrasValidas = new RegExp("^[a-z]+$", "i"); //variable de letras permitidas

let coorXletraInc = 0; //coordenada x para las letras incorrectas

let finalRecorridoInput = 0;//variable para incrmentar y validar el final del recoorido de las letras de la palbra escogida, para luego saber si la letra escogida es valida o no 

let intentos = 0;  // intentos fallidos al llegar a 8 se pierde el juego (usado para validar perdedor)
let letrasCompletas = 0; // se incrementa cuando se pinta una letra de la palabra escogida (usada para vaalidar ganador)

let letrasIncorrectas = ""; //para capturar las letras incorrectas que se dibujaran en el canvas

function inicarJuego(){ // se dan los parametros iniciales
    div1.style.display="none";
    div2.style.display="none";
    div3.style.display="block";
    inputValidaLetra.disabled=false;
    inputValidaLetra.focus();
    btnNuevo.disabled=false;
    btnNuevo.style.background="#0A3871";
    limpiarPantalla();
    textoInput="";
    intentos=0;
    letrasCompletas=0;
    letrasIncorrectas="";
    palabraSorteada = palabrasSecretas[Math.floor(Math.random()*palabrasSecretas.length)];//sortea una palabra del array, palabrasSecretas (se hace con .length porque se pueden añadir mas palabras)
    letraSorteadas = [];
    for (let i = 0; i < palabraSorteada.length; i++){ //se llena variable en un array con cada letra de la palabra sorteada
        letraSorteadas.push(palabraSorteada.charAt(i));
    }
    dibujarLineas();
}

function validarLetras(){ // valida las letras introducidas en el juego
    inputValidaLetra.value = inputValidaLetra.value.toUpperCase();//convierte letra a mayuscula, ya que javascript ejectuta primero que css
    textoInput = textoInput + inputValidaLetra.value; //variable que va concatenado las letras y con esta se validan las letras repetidas
    let ultimoCaracter = textoInput.charAt((textoInput.length)-1);
    let letraRepetida = false;
    inputValidaLetra.value="";
    if(!letrasValidas.test(ultimoCaracter)){ //si la letra no es valida, borra esa letra (ultima)
        textoInput = textoInput.substring(0,(textoInput.length)-1);
    }else{

        finalRecorridoInput = false;
    
        if(textoInput.length === 1){ //condicional para primera letra, ya que no se compara.
            finalRecorridoInput = true; //util para dibujar palabra incorecta
            dibujarLetras();
        } else{
            for (let inc = 0; inc<((textoInput.length)-1); inc++){ //recorre el texto almacenado y compara las letras
                if(inc ===((textoInput.length)-2)){ //valida que el final del recorrido sea hasta la penultima letra
                    finalRecorridoInput = true;
                }
                if (ultimoCaracter === textoInput.charAt(inc)){ //si la letra coincide corta es letra de la variable que las almacena
                    textoInput = textoInput.substring(0,(textoInput.length)-1);
                    letraRepetida = true;
                    break;
                }
            }
            if(letraRepetida===false){ // si no hay letras repetidas se procede a dibujar letras
                console.log(textoInput);
                dibujarLetras();
            }
        }
   
    }
    verificarGanador();
}

function limpiarPantalla(){
    pincel.clearRect(0,0,pantallaHorca.width, pantallaHorca.height);
    pincel2.clearRect(0,0,pantallaLineas.width, pantallaLineas.height);
    pincel3.clearRect(0,0,pantallaLetraIncorrecta.width, pantallaLetraIncorrecta.height);
}

function verificarGanador (){
    if (letrasCompletas == letraSorteadas.length){
        Swal.fire({
            title: "¡FELICIDADES!",
            text: "Usted ganó",
            icon: "success"
        });
        inputValidaLetra.disabled=true;
        btnNuevo.disabled=false;
        btnNuevo.style.background="#0A3871";
    }else if(intentos == 8){
        Swal.fire({
            title: "FIN DEL JUEGO",
            text: "Usted perdió, la palabra correcta era " + palabraSorteada,
            icon: "error"
        });
        inputValidaLetra.disabled=true;
        btnNuevo.disabled=false;
        btnNuevo.style.background="#0A3871";
    }
}

function irPantallaInicial (){
    div2.style.display="none";
    div3.style.display="none";
    div1.style.display="block";
    palabrasSecretas = palabrasSecretasIniciales;
}

function irPantalla2(){
    div2.style.display="block";
    div3.style.display="none";
    div1.style.display="none";
    inpAgregaPalabra.focus();
    inpAgregaPalabra.value="";
    inpAgregaPalabra.placeholder="Ingrese una palabra";
}
function verificarNuevaPalabra(){
    //compara con letras validas y con el maximo de letras permitidas por palabra
    if((!letrasValidas.test(inpAgregaPalabra.value)) || inpAgregaPalabra.value.length>8){
        inpAgregaPalabra.value = inpAgregaPalabra.value.substring(0,((inpAgregaPalabra.value).length-1));
        lbInformarivo.style.color = "red";
    }else{
        inpAgregaPalabra.value = inpAgregaPalabra.value.toUpperCase();
        lbInformarivo.style.color="#495057";
    }
}
function guardarNuevaPalabra(){
    if ((inpAgregaPalabra.value == "") || (inpAgregaPalabra.value.length<3)){
        Swal.fire({
            title: "ERROR",
            text: "Una palabra tiene mínimo 3 letras ",
            icon: "error"
        })
    }else{
        palabrasSecretas = [inpAgregaPalabra.value];// palabra secreta toma valor de la nueva palabra, es decir solo una palabra va estar disponible para el juego.
        inicarJuego();
        btnNuevo.style.background="#D1CECD";
        btnNuevo.disabled = true;
    }
    
}


btnIniciar.onclick = inicarJuego;
inpAgregaPalabra.oninput = verificarNuevaPalabra;
btnNuevo.onclick = inicarJuego;
btnDesistir.onclick = irPantallaInicial;
btnNuevaPalabra.onclick = irPantalla2;
btnGuardar.onclick= guardarNuevaPalabra;
inputValidaLetra.oninput = validarLetras;
btnCancelar.onclick = irPantallaInicial;
btnDesistir.onclick = irPantallaInicial;

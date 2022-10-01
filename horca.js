function dibujarHorca(){ // dibuja todo el recuadro de la horca y el muñeco
    const colorHorca="#8B4A0A";
    const colorMuneco = "#000000";
    const colorFondoCabeza ="#000000";
    if(intentos == 1){
        pincel.beginPath();
        pincel.lineWidth=5;
        pincel.moveTo(0,197.5);
        pincel.lineTo(300,197.5);
        pincel.strokeStyle = colorHorca;
        pincel.stroke();
        pincel.beginPath();
        pincel.moveTo(75,200);
        pincel.lineTo(75,2.5);
        pincel.stroke();

    }if(intentos == 2){
        pincel.beginPath(); // dibuja base horizontal alta
        pincel.moveTo(72.5,2.5);
        pincel.lineTo(200,2.5);
        pincel.stroke();
        pincel.beginPath(); // // dibuja linea de base horizontal alta a cabeza
        pincel.moveTo(200,0);
        pincel.lineTo(200,25);
        pincel.stroke();
    }if(intentos == 3){
        //dibujando cabeza
        pincel.fillStyle = colorMuneco;
        pincel.beginPath(); //inicia nueva ruta de dibujo
        pincel.arc(200,45, 20, 0, 2*3.14 ); //coordenas x, coordenada y, radio, constante 0, constante pi)
        pincel.fill();
        pincel.fillStyle = colorFondoCabeza;
        pincel.beginPath();
        pincel.arc(200,45, 15, 0, 2*3.14 ); //coordenas x, coordenada y, radio, constante 0, constante pi)
        pincel.fill();
    }if(intentos == 4){
        //dibujando tronco
        pincel.fillStyle = colorMuneco;
        pincel.fillRect(197.5,62.5,5,80);
    }if(intentos == 5){
        //dibujando brazo izquierdo
        pincel.beginPath();
        pincel.strokeStyle = colorMuneco;
        pincel.moveTo(200,62);
        pincel.lineTo(170,92);
        pincel.stroke();
    }if(intentos == 6){
        //dibujando brazo derecho
        pincel.beginPath();
        pincel.moveTo(200,62);
        pincel.lineTo(230,92);
        pincel.stroke();
    }if(intentos == 7){
        //dibujando pierna izquierda
        pincel.beginPath();
        pincel.moveTo(200,142);
        pincel.lineTo(170,172);
        pincel.stroke();
    }if(intentos == 8){
        //dibujando pierna derecha
        pincel.beginPath();
        pincel.moveTo(200,142);
        pincel.lineTo(230,172);
        pincel.stroke();

    }
}

function dibujarLetras(){ //dibuja letras tanto correctas como incorrectas
    let ultimoCaracter = textoInput.charAt((textoInput.length)-1);
    let letraCorrecta = false;
    let coordenadaLineaX = 10;
    let i = 0;
    for (let i=0; i<letraSorteadas.length; i++){ //reccorre cada letra de la palabra sorteada y compara si hay igualdad y dibuja la letra que coincida. (puede coincidir varias letras, se puede dibujar mas de una)
        if(ultimoCaracter == (letraSorteadas[i])){
            pincel2.beginPath();
            //pincel.strokeStyle="blue";
            pincel2.fillStyle="#0A3871";
            pincel2.font="30px arial";
            pincel2.textAlign="center";
            pincel2.fillText(letraSorteadas[i],coordenadaLineaX,24);
            letraCorrecta=true;
            letrasCompletas = letrasCompletas + 1; //variable que verifica ganador
        }
        coordenadaLineaX = coordenadaLineaX + 38; //coordenada horizontal(x) de la letra.
    }

    if(letraCorrecta==false && finalRecorridoInput==true){ //dibuja letra incorrecta solo al finalizar el reccorrido de todas las letras, ya que solo se dibuja una letra incorrecta por cada recorrido finalizado.
        letrasIncorrectas = letrasIncorrectas + ultimoCaracter;
        let ancho = (letrasIncorrectas.length*30);
        pantallaLetraIncorrecta.width = ancho;
        pincel3.beginPath();
        pincel3.fillStyle="#0A3871";
        pincel3.font="24px arial";
        pincel3.textAlign="center";
        pincel3.fillText(letrasIncorrectas,(ancho/2),26); //pinta letra en la mitad del canvas
        intentos = intentos + 1; //valida perdedor
        dibujarHorca();
    }


    
}

function dibujarLineas (){
    pincel2.clearRect(0,0,pantallaLineas.width, pantallaLineas.height);//limpia todo el espacio del canvas
    let ancho = 0;
    let coordenadaLineaX = 0;
    for(let inc=0; inc<letraSorteadas.length; inc++){ //recorrido del largo de la palabra sorteada, para saber el ancho del canvas
        ancho = ancho + 37;
    }
    pantallaLineas.width=ancho;

    //dibuja cada linea conforme al largo de la palabra sorteada
    for(let i=0; i<letraSorteadas.length; i++){
        pincel2.fillStyle = "#0A3871";
        pincel2.fillRect(coordenadaLineaX,28,30,2);
        coordenadaLineaX = coordenadaLineaX + 37; 
    }
}
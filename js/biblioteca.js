window.onload = function (){
    libreria = JSON.parse(localStorage.getItem('meGusta'));
    imprimirMeGusta()
};

// Variables:

let mg = document.querySelector('#mg');
let libreria = JSON.parse(localStorage.getItem('meGusta'));
// Funciones: 

function imprimirMeGusta(){
    console.log(libreria);
    if(libreria.length == 0){
        mg.style.display = "none";
    }else{
        mg.innerHTML = "";
        for(let i = 0; i<libreria.length; i++){
            let div = document.createElement('div');
            div.setAttribute('class', 'cozas');
            div.setAttribute('data-aos', 'zoom-in-left');
            div.setAttribute('data-aos-delay', '1000');
            let estructura = `    
            <img src='${libreria[i].imagen}' alt="">
            <p id='titulo'>${libreria[i].titulo}</p>
            <p>${libreria[i].autor}</p>
            <input type="button" onclick="eliminar(this)" value="Eliminar">`
            div.innerHTML = estructura;
            mg.appendChild(div);
        }
    }
}

function eliminar(element){
    let titulo = element.parentElement.querySelector('#titulo').textContent;
    console.log(element.parentElement.querySelector('#titulo').textContent);
    buscar(titulo);
}

function limpiar(){
    let tabla = [];
    localStorage.setItem('meGusta', JSON.stringify(tabla)); 
}

function buscar(titulo){
    for(let i = 0; i < libreria.length; i++){
        if(libreria[i].titulo == titulo){
            libreria.splice(i, 1);
            console.log(libreria);
            localStorage.setItem('meGusta', JSON.stringify(libreria));
            imprimirMeGusta();
        }
    }
}
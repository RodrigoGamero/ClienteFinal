// Listener:
document.getElementById('nombre').addEventListener('change', validaNombre);
document.getElementById('apellidos').addEventListener('change', validaApe);
document.getElementById('email').addEventListener('change', validaEmail);
document.getElementById('usuario').addEventListener('change', validaNombre);
document.getElementById('contra').addEventListener('change', validaPass);
document.getElementById('enviar').addEventListener('click', function (event){
    console.log('asdasd1')
    if(validaApe() && validaEmail() && validaNombre() && validaPass()){
        alert('enviado.');
        event.preventDefault();
        return false;
    }else{
        alert('No válido.');
        event.preventDefault();
        return true;
    }
});


// Expresiones: 

let expNombre = /(^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{3,16})+$/;
let expApe = /(^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{3,16})+$/;
let expEmail = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
let expContra = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,18}$/;
// Funciones:

function validaNombre(){
    let nombre = document.getElementById('nombre').value;
    let valido = true;
    if(!expNombre.test(nombre)){
        document.getElementById('nombre').style.borderBottom = '2px solid red';
        valido = false;
    }else{
        document.getElementById('nombre').style.borderBottom = '2px solid black';
        valido =  true;
    }
    return valido;
}

function validaApe(){
    let ape = document.getElementById('apellidos').value;
    if(!expApe.test(ape)){
        document.getElementById('apellidos').style.borderBottom = '2px solid red';
        return false;
    }else{
        document.getElementById('apellidos').style.borderBottom = '2px solid black';

        return true;
    }
}

function validaEmail(){
    let x = document.getElementById('email').value;
    if(!expEmail.test(x)){
        document.getElementById('email').style.borderBottom = '2px solid red';
        return false;
    }else{
        document.getElementById('email').style.borderBottom = '2px solid black';

        return true;
    }
}

function validaPass(){
    let x = document.getElementById('contra').value;
    if(!expContra.test(x)){
        document.getElementById('contra').style.borderBottom = '2px solid red';
        return false;
    }else{
        document.getElementById('contra').style.borderBottom = '2px solid black';

        return true;
    }

}
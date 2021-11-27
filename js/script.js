// Precarga:

window.onload = cargarBbdd();
window.onload = extraeDatos();

// Variables:

let item, titulo, autor, publicado, enlaceLibro, imagenLibro;
let enlacePeticion = "https://www.googleapis.com/books/v1/volumes?q=tittle:";
let apiKey = "key=AIzaSyBD6LD3app1Bfa-Htlz1aTZulX1H7sRkvA";
let infoLibroUlt;
let articulos = [];
let meGusta = [];
let listaLibros = document.querySelector('#libros');
let carrito = document.querySelector('#carro');
let popup = document.querySelector('#popUp');

document.body.addEventListener('click', function(e){
  if(e.target.classList.contains('comprar')){
    pintarCarrito();  
  }else if(e.target.classList.contains('portada')){
    if (document.getElementById('popUp').style.opacity == '0') {
      let libro = e.target.parentElement.parentElement.parentElement;
      pintarLibro(libro);
      document.getElementById('popUp').style.transition = 'visibility 0.3s linear, opacity 0.3s linear';
      document.getElementById('popUp').style.visibility = 'visible';
      document.getElementById('popUp').style.opacity = '1';
      listaLibros.style.opacity = '0.4';
    } else {
      let libro = e.target.parentElement.parentElement.parentElement;
      pintarLibro(libro);
      volver()
    }
  }
})

listaLibros.addEventListener('click', agregarLibro);
document.getElementById('carrito').addEventListener('click', function () {
  if (document.getElementById('carro').style.opacity == '0') {
    document.getElementById('carro').style.transition = 'visibility 0.3s linear, opacity 0.3s linear';
    document.getElementById('carro').style.opacity = '1';
    document.getElementById('carrito').style.borderBottom = "2px solid black";
  } else {
    document.getElementById('carro').style.transition = 'visibility 0.3s linear, opacity 0.3s linear';
    document.getElementById('carro').style.opacity = '0';
    document.getElementById('carrito').style.borderBottom = "0px solid black";
  }
});


// Funciones:
function pintarLibro(libro){
  popup.innerHTML = "";
  let x = document.createElement('div');
  x.setAttribute("class", 'container')
  let contenido = "";
  let infoLibro = {
    imagen: libro.querySelector('#imagenLibro').querySelector('img').src,
    titulo: libro.querySelectorAll('div')[0].querySelectorAll('div')[1].querySelector('.titulo').textContent,
    autor: libro.querySelectorAll('div')[0].querySelectorAll('div')[1].querySelector('.autor').textContent,
    sinopsis: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur in, accusamus eos aut quibusdam, amet fugit, obcaecati voluptate porro veniam dicta ex? Vero, pariatur doloremque? Debitis ut quod numquam aut.",
    precio: "9.95€"
  };
  infoLibroUlt = infoLibro;
  contenido = `    <img class="imgpop" src="${infoLibro.imagen}" alt="">
  <div class="texto">
      <h2 class="titupop"><strong>${infoLibro.titulo}</strong></h2>
      <p class="autor"><strong>${infoLibro.autor}</strong></p>
      <p class="sinopsis">${infoLibro.sinopsis}</p>
      <p class="precio">Precio: ${infoLibro.precio}</p>
      <input class="btnpop" id="btnmg" onclick="incluirMeGusta()" type="button" value="Me gusta">
      <input class="btnpop" id="btnvolver" onclick="volver()" type="button" value="Volver"> </div>`;
  x.innerHTML = contenido;
  popup.appendChild(x);
}

function incluirMeGusta(){
  console.log(infoLibroUlt);
  meGusta.push(infoLibroUlt);
  alert("¡Incluido en Mi biblioteca!");
  localStorage.setItem('meGusta', JSON.stringify(meGusta)); 
  console.log(JSON.parse(localStorage.getItem('meGusta')));
}

function imprimirMeGusta(){

}

function volver(){
  document.getElementById('popUp').style.transition = 'visibility 0.3s linear, opacity 0.3s linear';
  // document.getElementById('popUp').style.display = 'none';
  document.getElementById('popUp').style.visibility = 'hidden';
  document.getElementById('popUp').style.opacity = '0';
  listaLibros.style.opacity = '1';
}

function agregarLibro(e) {
  if (e.target.classList.contains('comprar')) {
    let y = e.target.parentElement.parentElement.parentElement.parentElement;
    leerDatosLibro(y);
  }
}



function limpiarCarrito(){
    articulos = []
    document.querySelector('#carro').innerHTML = `<h2>Tu cesta</h2>
    <p class="total">
        <strong>TOTAL: 0.00 €</strong>
        <br><br><input type='button' onclick="limpiarCarrito()" class='limpiar' id='limpiar' value='Vaciar'>
    </p>`
}

function leerDatosLibro(libro) {
  let infoLibro = {
    imagen: libro.querySelector('#imagenLibro').querySelector('img').src,
    titulo: libro.querySelectorAll('div')[1].querySelectorAll('p')[0].textContent,
    autor: libro.querySelectorAll('div')[1].querySelectorAll('p')[1].textContent,
    cantidad: 1
  };

  if (articulos.length != 0) {
    let valido = buscarArticulos(infoLibro.titulo);
    console.log("VALIDO: " + valido);
    if (valido != undefined) {
      articulos[valido].cantidad += 1;
    } else {
      articulos.push(infoLibro);

    }
  } else {
    articulos.push(infoLibro);
  }

}


function pintarCarrito() {
  carrito.innerHTML = "<h2>Tu cesta</h2>";
  for (let i = 0; i < articulos.length; i++) {
    let elemento = document.createElement("div");
    elemento.setAttribute("class", "estructura");
    elemento.setAttribute('data-aos', 'fade-in');
    elemento.setAttribute('data-aos-delay', '200');
    let estructura = `
        <p id="titulo"><strong>Título: </strong>${articulos[i].titulo}</p>
        <p><strong>Autor: </strong>${articulos[i].autor}</p>
        <p id="cantidad"><strong>Cantidad: </strong>${articulos[i].cantidad}</p>`;
    elemento.innerHTML = estructura;
    carrito.appendChild(elemento);
  }
  let total = document.createElement("p");
  total.setAttribute("class", "total");
  total.innerHTML = "<strong>TOTAL: " + (calculaCantidad() * 9.95).toFixed(2) + " €</strong>" +
    "<br><br><input type='button' class='limpiar' onclick='limpiarCarrito()' id='limpiar' value='Vaciar'>";
  carrito.appendChild(total);
}

function calculaCantidad() {
  let total = 0;
  for (let i = 0; i < articulos.length; i++) {
    total += articulos[i].cantidad;
  }
  return total;
}

function buscarArticulos(nombre) {
  console.log("nombre: " + nombre);
  for (let i = 0; i < articulos.length; i++) {
    if (Object.is(articulos[i].titulo, nombre)) {
      return i;
    }
  }
}


function extraeDatos() {
  document.querySelector("#libros").innerHTML = "";
  let libros = JSON.parse(localStorage.getItem('libros'));
  let consulta = document.getElementById('busqueda').value;
  let busqueda = buscar(libros, consulta);
  for (let i = 0; i < busqueda.length; i++) {
    let y = document.createElement("div");
    y.setAttribute("class", "contieneLibro");
    let autor = busqueda[i].autor;
    let fecha = busqueda[i].fecha;
    let titulo = busqueda[i].titulo;
    let imagen = busqueda[i].imagen;
    let x = formato(imagen, titulo, autor, fecha, i);
    y.innerHTML = x;
    instanciarLibro(y);
  }

}

function buscar(libros, nombre) {
  let tabla = new Array();
  for (let i = 0; i < libros.length; i++) {
    if (libros[i].titulo.toUpperCase().includes(nombre.toUpperCase()) || libros[i].autor.toUpperCase().includes(nombre.toUpperCase()))
      tabla.push(libros[i]);
  }
  return tabla;
}

function instanciarLibro(y) {
  document.getElementById('libros').appendChild(y);
}


// Función que da formato a cada libro que trae la petición a google books.
function formato(imagen, titulo, autor, fecha, i) {
  var htmlCard = "";
  var htmlCard = `<div data-aos="zoom-in" data-aos-delay="${i * 300}" class="tarjetaLibro">
    <div id="imagenLibro" class="imagenLibro"><img class="portada" src="${imagen}" alt=""></div>
    <div>
      <p class="titulo">${titulo}</p>
      <p class="autor">${autor}</p>
      <p class="gris">
        <span class="fecha">20-20-${fecha}</span>
        <span><input type="button" class="comprar" id="comprar" value="Comprar"></span>
      </p>
    </div>
    </div>`

  return htmlCard;
}

function pulsar(e) {
  if (e.keyCode === 13 && !e.shiftKey) {
    e.preventDefault();
    extraeDatos();
  }
}


function cargarBbdd() {
  let libros = [
    {
      "autor": "Will Smith",
      "titulo": "Will",
      "fecha": "2021",
      "imagen": "https://images-na.ssl-images-amazon.com/images/I/91PpDVWjhLL.jpg"
    },
    {
      "autor": "Sarag J. Maas",
      "titulo": "House of sky and breath",
      "fecha": "2021",
      "imagen": "https://infoliteraria.com/wp-content/uploads/2021/09/image-2-666x1024.jpg"
    },
    {
      "autor": "Brian Cox",
      "titulo": "Puttin the rabbit in the hat",
      "fecha": "2021",
      "imagen": "https://images-na.ssl-images-amazon.com/images/I/712g0hQ+tvL.jpg"
    },
    {
      "autor": "J.K Rowling",
      "titulo": "Harry Potter y la piedra filosofal",
      "fecha": "1997",
      "imagen": "https://images-na.ssl-images-amazon.com/images/I/81fS9LRN29L.jpg"
    },
    {
      "autor": "J.K Rowling",
      "titulo": "Harry Potter y la cámara secreta",
      "fecha": "1998",
      "imagen": "https://images-na.ssl-images-amazon.com/images/I/91Fo5YdHNLL.jpg"
    },
    {
      "autor": "J.K Rowling",
      "titulo": "Harry Potter y el prisionero de Azkaban",
      "fecha": "1999",
      "imagen": "https://images-na.ssl-images-amazon.com/images/I/91CdlJab2WL.jpg"
    },
    {
      "autor": "J.K Rowling",
      "titulo": "Harry Potter y el cáliz de fuego",
      "fecha": "2000",
      "imagen": "https://images-na.ssl-images-amazon.com/images/I/81llGKelLvL.jpg"
    },
    {
      "autor": "J.K Rowling",
      "titulo": "Harry Potter y la orden del fénix",
      "fecha": "2003",
      "imagen": "https://images-na.ssl-images-amazon.com/images/I/91gBKtYXd6L.jpg"
    },
    {
      "autor": "J.K Rowling",
      "titulo": "Harry Potter y el misterio del principe",
      "fecha": "2005",
      "imagen": "https://images-na.ssl-images-amazon.com/images/I/91B4rhtUevL.jpg"
    },
    {
      "autor": "J.K Rowling",
      "titulo": "Harry Potter y las reliquias de la muerte",
      "fecha": "2007",
      "imagen": "https://images-na.ssl-images-amazon.com/images/I/91xWR6oJz9L.jpg"
    },
    {
      "autor": "J.R.R Tolkien",
      "titulo": "El señor de los anillos: La comunidad del anillo",
      "fecha": "1954",
      "imagen": "https://images-na.ssl-images-amazon.com/images/I/816QLZKwmIL.jpg"
    },
    {
      "autor": "J.R.R Tolkien",
      "titulo": "El señor de los anillos: Las dos torres",
      "fecha": "1954",
      "imagen": "https://images-na.ssl-images-amazon.com/images/I/81U5RVCuTHL.jpg"
    },
    {
      "autor": "J.R.R Tolkien",
      "titulo": "El señor de los anillos: El retorno del rey",
      "fecha": "1955",
      "imagen": "https://images-na.ssl-images-amazon.com/images/I/711htm1Ve+L.jpg"
    },
    {
      "autor": "Brandon Sanderson",
      "titulo": "Nacidos de la bruma: El imperio final",
      "fecha": "2006",
      "imagen": "https://images-na.ssl-images-amazon.com/images/I/81G6v5bXYHL.jpg"
    },
    {
      "autor": "Brandon Sanderson",
      "titulo": "Nacidos de la bruma: El pozo de la ascensión",
      "fecha": "2007",
      "imagen": "https://kbimages1-a.akamaihd.net/9dd49539-6aa4-4ee3-a0bc-ea7818c2ed5b/1200/1200/False/trilogia-nacidos-de-la-bruma-mistborn-pack-con-el-imperio-final-el-pozo-de-la-ascension-el-heroe-de-las-eras.jpg"
    },
    {
      "autor": "Brandon Sanderson",
      "titulo": "Nacidos de la bruma: El héroe de las eras",
      "fecha": "2008",
      "imagen": "https://images-na.ssl-images-amazon.com/images/I/81c5VPXgDqL.jpg"
    },
    {
      "autor": "Brandon Sanderson",
      "titulo": "Archivo de las tormentas: El camino de los reyes",
      "fecha": "2010",
      "imagen": "https://4.bp.blogspot.com/-JAKDj_0VlFo/WoxKToRfV2I/AAAAAAAAT14/jMb1KOBjD_oY4cmY-zrP21h-K6c9mZ10QCLcBGAs/s1600/19556g.jpg"
    },
    {
      "autor": "Brandon Sanderson",
      "titulo": "Archivo de las tormentas: Palabras radiantes",
      "fecha": "2014",
      "imagen": "https://images-na.ssl-images-amazon.com/images/I/91iLAw42-GL.jpg"
    },
    {
      "autor": "Brandon Sanderson",
      "titulo": "Archivo de las tormentas: Juramentada",
      "fecha": "2017",
      "imagen": "https://images-na.ssl-images-amazon.com/images/I/91CqGHNvtbL.jpg"
    },
    {
      "autor": "Brandon Sanderson",
      "titulo": "Archivo de las tormentas: El ritmo de la guerra",
      "fecha": "2020",
      "imagen": "https://comicstores.es/imagenes_grandes/9788417/978841734793.JPG"
    },

    {
      "autor": "Brian Cox",
      "titulo": "Puttin the rabbit in the hat",
      "fecha": "2021",
      "imagen": "https://images-na.ssl-images-amazon.com/images/I/712g0hQ+tvL.jpg"
    }
  ]
  localStorage.setItem('libros', JSON.stringify(libros));
}

// GOOGLE BOOKS API


// function extraeDatos() {
//   let busqueda = document.getElementById("busqueda").value.replace(" ", "+");
//   let url = enlacePeticion + busqueda + "&maxResults=30";
//   console.log(url);
//   fetch(url).then(function (response) {
//     return response.json();
//   }).then(function (result) {
//     let items = result.items;
//     console.log(items);
//     console.log(items.length);
//     for(let i = 0; i < items.length; i++){
//       let y = document.createElement("div");
//       y.setAttribute("class", "contieneLibro");
//       let autor = "anom";
//       if(items[i].volumeInfo.hasOwnProperty('authors')){
//         autor = items[i].volumeInfo.authors[0];
//       }
//       let titulo = items[i].volumeInfo.title;
//       let imagen = "";

//       if(items[i].volumeInfo.hasOwnProperty("imageLinks")){
//         imagen = items[i].volumeInfo.imageLinks['thumbnail'];
//       }else{  
//           imagen = "https://www.magisnet.com/wp-content/uploads/2020/05/pagina4libros.jpg";
//       }

//       let x = formato(imagen, titulo, autor, i);
//       y.innerHTML = x;
//       instanciarLibro(y);
//     }
//   });
// }







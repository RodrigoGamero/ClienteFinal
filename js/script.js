// VariableS:
let item, titulo, autor, publicado, enlaceLibro, imagenLibro;

let enlacePeticion = "https://www.googleapis.com/books/v1/volumes?q=tittle:";
let apiKey = "key=AIzaSyBD6LD3app1Bfa-Htlz1aTZulX1H7sRkvA";

window.addEventListener('DOMContentLoaded', (event) => {

});

// document.getElementById("").addEventListener("click", extraeDatos());




// Funciones:
function extraeDatos() {
  let busqueda = document.getElementById("busqueda").value.replace(" ", "+");
  let url = enlacePeticion + busqueda;
  console.log(url);
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (result) {
    let items = result.items;
    console.log(items);
    console.log(items.length);
    for(let i = 0; i < items.length; i++){
      let y = document.createElement("div");
      let autor = items[i].volumeInfo.authors[0];
      let titulo = items[i].volumeInfo.title;
      let imagen = "";
      
      if(items[i].volumeInfo.hasOwnProperty("imageLinks")){
        imagen = items[i].volumeInfo.imageLinks['thumbnail'];
      }else{  
          imagen = "https://www.magisnet.com/wp-content/uploads/2020/05/pagina4libros.jpg";
      }
      
      let x = formato(imagen, titulo, autor);
      y.innerHTML = x;
      document.getElementById('libros').appendChild(y);
    }
  });
}



function formato(imagen, titulo, autor) {
  // var viewUrl = 'book.html?isbn='+isbn;
  var htmlCard = `<div class="tarjetaLibro">
    <div><img src="${imagen}" alt=""></div>
    <div><p class="titulo">${titulo}</p>
    <p class="autor">${autor}</p></div>
    </div>`
  return htmlCard;
}
// });




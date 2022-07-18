const carrito = document.getElementById("carrito");
const platillos = document.getElementById("lista-platillos");
const listaPlatillos = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

cargarEventListeners();

function cargarEventListeners() {
    //Se ejecuta cuando se presionar agregar carrito
  platillos.addEventListener("click", comprarPlatillo);
  //Cuando se elimina productos del carrito
  carrito.addEventListener("click", eliminarPlatillo);
  //Al vaciar carrito
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
  //Al cargar documento se muestra lo almacenado en LS
  document.addEventListener("DOMContentLoaded", leerLocalStorage);
}

function comprarPlatillo(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const platillo = e.target.parentElement.parentElement;
        leerDatosPlatillo(platillo);
    }
    
}

function leerDatosPlatillo(platillo){
    const infoPlatillo = {
        imagen: platillo.querySelector('img').src,
        titulo: platillo.querySelector('h4').textContet,
        precio: platillo.querySelector('.precio span').textContent,
        id: platillo.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoPlatillo);
}

function insertarCarrito(platillo) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${platillo.imagen}" width=100>
        </td>
        <td>${platillo.titulo}</td>
        <td>${platillo.precio}</td>
        <td>
            <a href="#" class="borrar-platillo" data-id="${platillo.id}">X</a>
        </td>
        `;
    listaPlatillos.appendChild(row);
    guardarPlatilloLocalStorage(platillo);
}

function eliminarPlatillo(e){
    e.preventDefault();

    let platillo,
        platilloId;
    if(e.target.classList.contains('borrar-platillo')){
        e.target.parentElement.parentElement.remove();
        platillo = e.target.parentElement.remove();
        platilloId = platillo.querySelector('a').getAttribute('data-id');
    }
    eliminarPlatilloLocalStorage(platilloId)
}

function vaciarCarrito(){
    while(listaPlatillos.firstChild){
        listaPlatillos.removeChild(listaPlatillos.firstChild);
    }
    vaciarLocalStorage();

    return false;
}

function guardarPlatilloLocalStorage(platillo){
    let platillos;

    platillos = obtenerPlatillosLocalStorage();
    platillos.push(platillo);

    localStorage.setItem('platillos', JSON.stringify(platillos));
}

function obtenerPlatillosLocalStorage(){
    let platillosLS;
    
    if(localStorage.getItem('platillos') === null){
        platillosLS = [];
    }else{
        platillosLS = JSON.parse(localStorage.getItem('platillos'));
    }
    return platillosLS;
}

function leerLocalStorage() {
    let platillosLS;

    platillosLS = obtenerPlatillosLocalStorage();

    platillosLS.forEach(function(platillo) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${platillo.imagen}" width=100>
            </td>
            <td>${platillo.titulo}</td>
            <td>${platillo.precio}</td>
            <td>
                <a href="#" class="borrar-platillo" data-id="${platillo.id}">X</a>
            </td>
            `;
        listaPlatillos.appendChild(row);
    });
}

function eliminarPlatilloLocalStorage(platillo){
    let platillosLS;
    platillosLS = obtenerPlatillosLocalStorage();

    platillosLS.forEach(function(platillosLS, index){
        if(platillosLS.id === platillo){
            platillosLS.splice(index, 1);
        }
    });

    localStorage.setItem('platillos', JSON.stringify(platillosLS));
}

function vaciarLocalStorage() {
    localStorage.clear();
}
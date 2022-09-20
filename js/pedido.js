const carro = new Carrito();
const carrito = document.getElementById('carrito');
const productos = document.getElementById('lista-productos');
const listaProductos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const procesarPedidoBtn = document.getElementById('procesar-pedido');

cargarEventos();

function cargarEventos(){

    //Función que se ejecuta cuando se da click agregar carrito
    productos.addEventListener('click', (e)=>{
        carro.comprarProducto(e)
    });

    //Función para cuando se eliminan los productos del carrito
    carrito.addEventListener('click', (e)=>{
        carro.eliminarProducto(e)
    });

    //Función que se ejecuta al vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', (e)=>{
        carro.vaciarCarrito(e)
    });

    //Función que se ejecuta al cargar lo se muestra y está almacenado en LocalStorage
    document.addEventListener('DOMContentLoaded', carro.leerLocalStorage());

    //Función que se ejecuta para poder enviar el pedido a otra página
    procesarPedidoBtn.addEventListener('click', (e)=>{
        carro.procesarPedido(e)
    });
}
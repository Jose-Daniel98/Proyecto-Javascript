const compra = new Carrito();
const listaCompra = document.querySelector("#lista-compra tbody");
const carrito = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');


cargarEventos();

//Función para cargar los diferentes eventos
function cargarEventos() {
    document.addEventListener('DOMContentLoaded', compra.leerLSCompra());

    //Función para eliminar los productos del carrito
    carrito.addEventListener('click', (e) => {
        compra.eliminarProducto(e)
    });

    compra.calcularTotal();

    //Evento que se ejecuta cuando se selecciona "Procesar Compra"
    procesarCompraBtn.addEventListener('click', procesarCompra);

    //Eventos addEventListener
    carrito.addEventListener('change', (e) => {
        compra.obtenerEvento(e)
    });
    carrito.addEventListener('keyup', (e) => {
        compra.obtenerEvento(e)
    });


}

//Función para procesar la compra de lo seleccionado y que se encuentra en el carrito
function procesarCompra(e) {
    e.preventDefault();

    if (compra.obtenerProductosLS().length === 0) {
        Swal.fire({
            type: 'info',
            title: '¡Lo sentimos!',
            text: 'En este momento no hay productos. Por favor selecciona algún producto',
            showConfirmButton: false,
            timer: 2000
        })
        .then(function () {
            window.location = "index.html";
        });
    }
    else if (cliente.value === '' || correo.value === '') {
        Swal.fire({
            type: 'info',
            title: '¡Importante!',
            text: 'Por favor completar todos los campos requeridos',
            showConfirmButton: false,
            timer: 2000
        });
    }
    else {
        const cargandoGif = document.querySelector('#cargando');
            cargandoGif.style.display = 'block';

            const enviado = document.createElement('img');
            enviado.src = './img/gmail-sent.gif';
            enviado.style.display = 'block';
            enviado.width = '150';

            setTimeout(() => {
                cargandoGif.style.display = 'none';
                document.querySelector('#loaders').appendChild(enviado);

                setTimeout(() => {
                    enviado.remove();
                    compra.vaciarLS();
                    window.location = "./index.html";
                }, 2000);
                Swal.fire({
                    type: 'success',
                    title: `¡Gracias por tu compra ${cliente.value}!`,
                    text: 'El paquete con los productos se enviará el día de mañana',
                    text: 'Plazo máximo de entrega 4 días',
                    showConfirmButton: false,
                    timer: 30000
                });
            }, 3000);
    }
}


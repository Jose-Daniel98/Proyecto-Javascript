const compra = new Carrito();
const listaCompra = document.querySelector("#lista-compra tbody");
const carrito = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');


cargarEventos();

//Función para cargar los diferentes eventos
function cargarEventos() {
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());

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
function procesarCompra() {
    if (compra.obtenerProductosLocalStorage().length === 0) {
        Swal.fire({
            type: 'error',
            title: '¡Lo sentimos!',
            text: 'En este momento no hay productos. Por favor selecciona algún producto',
            showConfirmButton: false,
            timer: 2000
        }).then(function () {
            window.location = "index.html";
        })
    }
    else if (cliente.value === '' || correo.value === '') {
        Swal.fire({
            type: 'error',
            title: '¡Importante!',
            text: 'Por favor completar todos los campos requeridos',
            showConfirmButton: false,
            timer: 2000
        })
    }
    else {
        
        //aqui se coloca el user id generado en el emailJS
        (function () {
            emailjs.init("user_CEozz2F39lJJOLF5mJiDA");
        })();

        let myform = $("form#procesar-pago");

        myform.submit( (event) => {
            event.preventDefault();

            // Se puede cambiar a tu ID de servicio, o mantener el servicio por defecto
            var service_id = "default_service";
            var template_id = "template_3SA9LsqQ";

            const cargandoGif = document.querySelector('#cargando');
            cargandoGif.style.display = 'block';

            const enviado = document.createElement('img');
            enviado.src = 'img/mail.gif';
            enviado.style.display = 'block';
            enviado.width = '150';

            emailjs.sendForm(service_id, template_id, myform[0])
                .then(() => {
                    cargandoGif.style.display = 'none';
                    document.querySelector('#loaders').appendChild(enviado);

                    setTimeout(() => {
                        compra.vaciarLocalStorage();
                        enviado.remove();
                        window.location = "index.html";
                    }, 2000);


                }, (err) => {
                    Swal.fire({
                        type: 'error',
                        title: '¡Hubo un error!',
                        text: 'No se pudo enviar el correo electrrónico',
                        showConfirmButton: false,
                        timer: 2000
                    })
                });

            return false;

        });

    }
}


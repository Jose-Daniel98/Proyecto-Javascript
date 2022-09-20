class Carrito {

    //Se añaden los productos al carrito
    comprarProducto(e){
        e.preventDefault();

        //Condicional para poder agregar productos al carrito
        if(e.target.classList.contains('agregar-carrito')){
            const producto = e.target.parentElement.parentElement;

            //Enviamos el o los productos seleccionados para poder tomar sus datos
            this.leerDatosProducto(producto);
        }
    }

    //Método para leer los datos del producto
    leerDatosProducto(producto){
        const infoProducto = {
            imagen : producto.querySelector('img').src,
            titulo: producto.querySelector('h4').textContent,
            precio: producto.querySelector('.precio span').textContent,
            id: producto.querySelector('a').getAttribute('data-id'),
            cantidad: 1
        }

        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (productoLS){
            if(productoLS.id === infoProducto.id){
                productosLS = productoLS.id;
            }
        });

        //Alerta para repetición de productos
        if(productosLS === infoProducto.id){
            Swal.fire({
                type: 'info',
                title: '¡Espera un momento!',
                text: 'El producto ya se encuentra agregado.',
                showConfirmButton: false,
                timer: 1000
            })
        }
        else {
            this.insertarCarrito(infoProducto);
        }
        
    }

    //Método para mostrar los productos que se seleccionaron en el carrito
    insertarCarrito(producto){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width=100>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
                <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
            </td>
        `;
        listaProductos.appendChild(row);
        this.guardarProductosLocalStorage(producto);

    }

    //Método para eliminar el producto del carrito en el DOM
    eliminarProducto(e){
        e.preventDefault();
        let producto, productoID;
        if(e.target.classList.contains('borrar-producto')){
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoID = producto.querySelector('a').getAttribute('data-id');
        }
        this.eliminarProductoLocalStorage(productoID);
        this.calcularTotal();

    }

    //Método para eliminar todos los productos del carrito
    vaciarCarrito(e){
        e.preventDefault();
        while(listaProductos.firstChild){
            listaProductos.removeChild(listaProductos.firstChild);
        }
        this.vaciarLocalStorage();

        return false;
    }

    //Método para almacenar y guardar en el LocalStorage
    guardarProductosLocalStorage(producto){
        let productos;
        //Toma valor de un arreglo con datos del LS
        productos = this.obtenerProductosLocalStorage();
        //Agregar el producto al carrito
        productos.push(producto);
        //Agregamos al LS
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    //Método para obtener y comprobar que hay elementos en el LocalStorage
    obtenerProductosLocalStorage(){
        let productoLS;

        //Condición para comprobar si hay productos en LocalStorage
        if(localStorage.getItem('productos') === null){
            productoLS = [];
        }
        else {
            productoLS = JSON.parse(localStorage.getItem('productos'));
        }
        return productoLS;
    }

    //Método para leer y mostrar los productos guardados en el LocalStorage
    leerLocalStorage(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto){
            //Construir plantilla, para poder mostarla en el HTML y el DOM
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width=100>
                </td>
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td>
                    <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
                </td>
            `;
            listaProductos.appendChild(row);
        });
    }

    //Método para leer y mostrar los productos guardados en el LocalStorage que se encuentran en el HTML de compra.html
    leerLocalStorageCompra(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto){
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width=100>
                </td>
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td>
                    <input type="number" class="form-control cantidad" min="1" value=${producto.cantidad}>
                </td>
                <td id='subtotales'>${producto.precio * producto.cantidad}</td>
                <td>
                    <a href="#" class="borrar-producto fas fa-times-circle" style="font-size:30px" data-id="${producto.id}"></a>
                </td>
            `;
            listaCompra.appendChild(row);
        });
    }

    //Método para eliminar el producto por su ID del LocalStorage
    eliminarProductoLocalStorage(productoID){
        let productosLS;
        //Se obtiene el arreglo de los productos
        productosLS = this.obtenerProductosLocalStorage();
        //Se compara el id del producto borrado con lo que hay en LocalStorage
        productosLS.forEach(function(productoLS, index){
            if(productoLS.id === productoID){
                productosLS.splice(index, 1);
            }
        });

        //Se añade el arreglo actual al LocalStorage
        localStorage.setItem('productos', JSON.stringify(productosLS));
    }

    //Método para eliminar y vaciar todos los datos del LocalStorage
    vaciarLocalStorage(){
        localStorage.clear();
    }

    //Método para procesar pedido del o los productos
    procesarPedido(e){
        e.preventDefault();

        if(this.obtenerProductosLocalStorage().length === 0){
            //Alerta para carrito vacio y agregar productos
            Swal.fire({
                type: 'error',
                title: '¡Lo sentinos!',
                text: 'El carrito está vacío. Por favor agrega algún producto.',
                showConfirmButton: false,
                timer: 2000
            })
        }
        else {
            location.href = "compra.html";
        }
    }

    //Método para calcular los montos de los productos
    calcularTotal(){
        let productosLS;
        let total = 0, igv = 0, subtotal = 0;
        productosLS = this.obtenerProductosLocalStorage();
        for(let i = 0; i < productosLS.length; i++){
            let element = Number(productosLS[i].precio * productosLS[i].cantidad);
            total = total + element;
            
        }
        
        igv = parseFloat(total * 0.18).toFixed(2);
        subtotal = parseFloat(total-igv).toFixed(2);

        document.getElementById('subtotal').innerHTML = "₡ " + subtotal;
        document.getElementById('igv').innerHTML = "₡ " + igv;
        document.getElementById('total').value = "₡ " + total.toFixed(2);
    }

    //Método para obtener los eventos
    obtenerEvento(e) {
        e.preventDefault();
        let id, cantidad, producto, productosLS;
        if (e.target.classList.contains('cantidad')) {
            producto = e.target.parentElement.parentElement;
            id = producto.querySelector('a').getAttribute('data-id');
            cantidad = producto.querySelector('input').value;
            let actualizarMontos = document.querySelectorAll('#subtotales');
            productosLS = this.obtenerProductosLocalStorage();
            productosLS.forEach(function (productoLS, index) {
                if (productoLS.id === id) {
                    productoLS.cantidad = cantidad;                    
                    actualizarMontos[index].innerHTML = Number(cantidad * productosLS[index].precio);
                }    
            });
            localStorage.setItem('productos', JSON.stringify(productosLS));
            
        }
        else {
            console.log("click afuera");
        }
    }
}
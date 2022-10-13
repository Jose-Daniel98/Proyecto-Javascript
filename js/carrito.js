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
        // Creación del Objeto infoProducto
        const infoProducto = {
            imagen: producto.querySelector('img').src,
            titulo: producto.querySelector('h4').textContent,
            precio: producto.querySelector('.precio span').textContent,
            id: producto.querySelector('a').getAttribute('data-id'),
            cantidad: 1
        }

        let productosLS;
        productosLS = this.obtenerProductosLS();
        productosLS.forEach(function (productoLS){
            if(productoLS.id === infoProducto.id){
                productosLS = productoLS.id;
            }
        });

        //If else convertido a Operador Ternario
        //Alerta para repetición de productos
        productosLS === infoProducto.id ? Swal.fire({
                    type: 'info',
                    title: '¡Espera un momento!',
                    text: 'El producto ya se encuentra agregado.',
                    showConfirmButton: false,
                    timer: 1000
                }) : this.insertarCarrito(infoProducto);
        
    }

    //Método para mostrar los productos que se seleccionaron en el carrito
    insertarCarrito(producto){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width=100>
            </td>
            <td>₡${producto.titulo}</td>
            <td> ₡${producto.precio}</td>
            <td>
                <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
            </td>
        `;
        listaProductos.appendChild(row);
        this.guardarProductosLS(producto);

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
        this.eliminarProductoLS(productoID);
        this.calcularTotal();

    }

    //Método para eliminar todos los productos del carrito
    vaciarCarrito(e){
        e.preventDefault();
        
        while(listaProductos.firstChild){
            listaProductos.removeChild(listaProductos.firstChild);
        }
        this.vaciarLS();

        return false;
    }

    //Método para almacenar y guardar en el LocalStorage
    guardarProductosLS(producto){
        let productos;
        //Toma valor de un arreglo con datos del LocalStorage
        productos = this.obtenerProductosLS();
        //Agregar el producto al carrito
        productos.push(producto);
        //Agregamos al LS
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    //Método para obtener y comprobar que hay elementos en el LocalStorage
    obtenerProductosLS(){
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
    leerLS(){
        let productosLS;
        productosLS = this.obtenerProductosLS();
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
    leerLSCompra(){
        let productosLS;
        productosLS = this.obtenerProductosLS();
        productosLS.forEach(function (producto){
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class= "table-bordered">
                    <img src="${producto.imagen}" width=100>
                </td>
                <td class= "table-bordered">
                ${producto.titulo}
                </td>
                <td class= "table-bordered">
                ${producto.precio}
                </td>
                <td class= "table-bordered">
                    <input type="number" class="form-control cantidad" min="1" value=${producto.cantidad}>
                </td>
                <td id='subtotales' class= "table-bordered">${producto.precio * producto.cantidad}</td>
                <td class= "table-bordered">
                    <a href="#" class="borrar-producto fas fa-times-circle" style="font-size:30px" data-id="${producto.id}"></a>
                </td>
            `;
            listaCompra.appendChild(row);
        });
    }

    //Método para eliminar el producto por su ID del LocalStorage
    eliminarProductoLS(productoID){
        let productosLS;
        //Se obtiene el arreglo de los productos
        productosLS = this.obtenerProductosLS();
        //Se compara el id del producto borrado con lo que hay en LocalStorage
        productosLS.forEach(function(productoLS, index) {
            if(productoLS.id === productoID){
                productosLS.splice(index, 1);
            }
        });

        //Se añade el arreglo actual al LocalStorage
        localStorage.setItem('productos', JSON.stringify(productosLS));
    }

    //Método para eliminar y vaciar todos los datos del LocalStorage
    vaciarLS(){
        localStorage.clear();
    }

    //Método para procesar pedido del o los productos
    procesarPedido(e){
        e.preventDefault();

        if(this.obtenerProductosLS().length === 0){
            //Alerta para carrito vacio y agregar productos
            Swal.fire({
                type: 'info',
                title: '¡Lo sentimos!',
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
        let total = 0;
        let iva = 0; // Hace referencia al impuesto a la venta (13%)
        let subtotal = 0;

        productosLS = this.obtenerProductosLS();

        for(let i = 0; i < productosLS.length; i++){
            let element = Number(productosLS[i].precio * productosLS[i].cantidad);
            total = total + element;
            
        }
        
        iva = parseFloat(total * 0.13).toFixed(2);
        subtotal = parseFloat(total - iva).toFixed(2);

        document.getElementById('subtotal').innerHTML = "₡ " + subtotal;
        document.getElementById('iva').innerHTML = "₡ " + iva;
        document.getElementById('total').value = "₡ " + total.toFixed(2);
    }

}
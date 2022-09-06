function solicitarNombre() {
    alert("Bienvenido a Floristería Turrialba. \n¡Es un gusto atenderle!");
    let nombre = prompt("Ingrese su nombre");
    while(nombre === "")
    nombre = prompt("Ingrese su nombre");
    let apellido = prompt("ingrese su apellido");
    while(apellido === "")
    apellido = prompt("Ingrese su apellido");
    alert("Hola " + nombre + " " + apellido + "!");
}

const productos = [
    {nombre: "lirio", precio: 50},
    {nombre: "rosa", precio: 100},
    {nombre: "tulipan", precio: 150},
    {nombre: "begonia", precio: 200},
    {nombre: "hortensia", precio: 250},
    {nombre: "orquidea", precio: 300},
];
let carrito = [];

solicitarNombre();
let seleccion = prompt("Desea comprar algún producto?. \nDigite si para continuar. \nDigite no para finalizar.");

while(seleccion != "si" && seleccion != "no"){
    alert("Por favor ingresa 'si' ó 'no'");
    seleccion = prompt("Desea comprar algún producto?. \nDigite si para continuar. \nDigite no para finalizar.");
}

if(seleccion == "si"){
    alert("Nuestra lista de productos:")
    let todosLosProductos = productos.map(
       (producto) => producto.nombre + " " + "₡" + producto.precio
    );
    alert(todosLosProductos.join(" - "))
} else if (seleccion == "no"){
  alert("Gracias por venir, !Hasta pronto¡");   
}

while(seleccion != "no"){
    let producto = prompt("Por favor agrega un producto a tu pedido. \nImportante: Recuerda  escribir el nombre como se muestra a continuación \nlirio - rosa- tulipan - begonia - hortensia- orquidea");
    let precio = 0

    if(producto == "lirio" || producto == "rosa" || producto == "tulipan" || producto == "begonia" || producto == "hortensia" || producto == "orquidea"){
        switch(producto){
            case "lirio":
                precio = 50;
                break;
            case "rosa":
                precio = 100
                break;
            case "tulipan":
                precio = 150
                break;
            case "begonia":
                precio = 200
                break;
            case "hortensia":
                precio = 250
                break;
            case "orquidea":
                precio = 300
                break;
            default:
                break;
        }
    let unidades = parseInt(prompt("¿Cuantas unidades quiere llevar?"));

    carrito.push({producto, unidades, precio});
    console.log(carrito);
    } else {
      alert("No tenemos ese producto disponible");  
    }

    seleccion = prompt("¿Desea seguir comprando? \nDigite si para continuar. \nDigite no para finalizar.");

    while(seleccion === "no"){
       alert("¡Gracias por la compra! Hasta pronto");
       carrito.forEach((carritoFinal) => {
        console.log(`Producto: ${carritoFinal.producto}, Unidades: ${carritoFinal.unidades}, Total a pagar por producto: ${carritoFinal.unidades * carritoFinal.precio}`);
       });
    break;
    }
}

const total = carrito.reduce((acc, el) => acc + el.precio * el.unidades, 0);
console.log(`El total a pagar por su compra es: ${total}`);

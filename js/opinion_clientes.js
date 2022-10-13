window.onload = activarListener();

let contenido = document.querySelector('#contenido');

function activarListener(){
    document.getElementById('button').onclick = traer();
}

        function traer() {
            fetch('./js/tabla.json')
                .then(res => res.json())
                .then(datos => {
                    tabla(datos);
                });
        }

        function tabla(datos) {
            contenido.innerHTML = '';
            for(let valor of datos){
                contenido.innerHTML += `
                
                <tr>
                    <th scope="row">
                    ${ valor.id}
                    </th>
                    <td>
                    ${ valor.nombre}
                    </td>
                    <td>
                    ${ valor.email}
                    </td>
                    <td>
                    ${ valor.calificacion}
                    </td>
                </tr>
                
                `;
            }
        }
function ObtenerVenta() {
    fetch('https://localhost:7245/Venta')
    .then(response => response.json())
    .then(data => MostrarVenta(data))
    .catch(error => console.log("No se pudo acceder al servicio.", error));
}


function MostrarVenta(data) {
    $("#todasLasVentas").empty();
    $.each(data, function(index, item) {
        $('#todasLasVentas').append(
            "<tr>",
            "<td>" + item.id + "</td>",
            "<td>" + item.fechaVenta + "</td>",
            "<td>" + item.finalizada + "</td>",
            "<td>" + item.idCliente + "</td>",
            "<td><button class='btn btn-info' onclick='BuscarVentaId(" + item.id + ")'>Modificar</button></td>",
            "<td><button class='btn btn-danger' onclick='EliminarVenta(" + item.id + ")'>Eliminar</button></td>",
            "</tr>"
        )
    })
}
// function MostrarVentas(data) {
//     let tbody = document.getElementById('todasLasVentas');
//     tbody.innerHTML = '';

//     data.forEach(element => {
//         let tr = tbody.insertRow();

//         let td0 = tr.insertCell(0);
//         let tdId = document.createTextNode(element.id);
//         td0.appendChild(tdId);

//         let td1 = tr.insertCell(1);
//         let tdFecha = document.createTextNode(element.fechaVenta);
//         td1.appendChild(tdFecha);

//         let td2 = tr.insertCell(2);
//         let estadoFinalizada = element.finalizada ? "Finalizado" : "Pendiente";
//         let tdFinalizada = document.createTextNode(estadoFinalizada);
//         td2.appendChild(tdFinalizada);

//         let td3 = tr.insertCell(3);
//         let tdCliente = document.createTextNode(`${element.cliente.nombreCliente} ${element.cliente.apellidoCliente}`);
//         td3.appendChild(tdCliente);


//         let btnEditar = document.createElement('button');
//         btnEditar.innerText = 'Modificar';
//         btnEditar.setAttribute('class', 'btn btn-info');
//         btnEditar.setAttribute('onclick', `BuscarVentaId(${element.id})`);
//         let td4 = tr.insertCell(4);
//         td4.appendChild(btnEditar);

//         let btnEliminar = document.createElement('button');
//         btnEliminar.innerText = 'Eliminar';
//         btnEliminar.setAttribute('class', 'btn btn-danger');
//         btnEliminar.setAttribute('onclick', `EliminarVenta(${element.id})`);
//         let td5 = tr.insertCell(5);
//         td5.appendChild(btnEliminar);

//         let btnDetalle = document.createElement('button');
//         btnDetalle.innerText = 'Detalle';
//         btnDetalle.setAttribute('class', 'btn btn-success');
//         btnDetalle.setAttribute('onclick', `BuscarProductosDetalle(${element.id})`);
//         let td6 = tr.insertCell(6);
//         td6.appendChild(btnDetalle);
function CrearVenta() {
    var nombreVenta = document.getElementById("Nombre").value;
    if (nombreVenta == "" || nombreProd == null) {
        return mensajesError('#error', null, "Por favor ingrese un Nombre para la Venta.");
    } 

    let venta = {
        fechaVenta: document.getElementById("FechaVenta").value,
        finalizada: document.getElementById("Finalizada").checked,
        idCliente: document.getElementById("idCliente").value,
        cliente: null,
        
    };

    fetch('https://localhost:7245/Venta',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(venta)
        }
    )
    .then(response => response.json())
    .then(data =>{
        if(data.status == undefined){
            document.getElementById("FechaVenta").value = "";
            document.getElementById("Finalizada").value = 0;
            document.getElementById("idCliente").value = 0;

            $('#modalAgregarVenta').modal('hide');
            ObtenerVenta();
        } else {
            mensajesError('#error', data);
        }
            
    })
    .catch(error => console.log("Hubo un error al guardar la venta, verifique el mensaje de error: ", error))
}


function EliminarVenta(id) {
    var siElimina = confirm("¿Esta seguro de borrar esta venta?.")
    if (siElimina == true) {
        EliminarSi(id);
    }
}

function EliminarSi(id) {
    fetch(`https://localhost:7245/Venta/${id}`,
    {
        method: "DELETE"
    })
    .then(() => {
        ObtenerVenta();
    })
    .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error))
}


function BuscarVentaId(id) {
    fetch(`https://localhost:7245/Venta/${id}`,{
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("IdVenta").value = data.id;
        document.getElementById("FechaVentaEditar").value = data.fechaVenta;
        document.getElementById("FinalizadaEditar").value = data.finalizada;
        document.getElementById("idClienteEditar").value = data.idCliente;

       
        $('#modalEditarVenta').modal('show');
    })
    .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error));
}


function EditarVenta() {
    let idVenta = document.getElementById("idVenta").value;

    let editarVenta = {
        id: idVenta,
        fechaVenta: fechaVenta,
        finalizada: document.getElementById("FinalizadaEditar").checked,
        idCliente: document.getElementById("IdClienteEditar").value,
        cliente: null
    };

    fetch(`https://localhost:7245/Venta/${idVenta}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editarVenta)
    })
    .then(data => {
        
        document.getElementById("idVenta").value = 0;
        document.getElementById("FechaVentaEditar").value = "";
        document.getElementById("FinalizadaEditar").checked;
        document.getElementById("IdClienteEditar").value = 0;
        
        $('#modalEditarVenta').modal('hide');
        ObtenerVenta(); })
    .catch(error => console.error("No se pudo acceder a la API, verifique el mensaje de error: ", error));}


function mensajesError(id, data, mensaje) {
    $(id).empty();
    if (data != null) {
        $.each(data.errors, function(index, item) {
            $(id).append(
                "<ol>",
                "<li>" + item + "</li>",
                "</ol>"
            )
        })
    }
    else{
        $(id).append(
            "<ol>",
            "<li>" + mensaje + "</li>",
            "</ol>"
        )
    }
    
    $(id).attr("hidden", false);
}

function BuscarProductosDetalle(id) {
    fetch(`https://localhost:7245/DetallesVentas/${id}`, {
        method: "GET"
    })
        .then(response => response.json())
        .then(async data => {
            MostrarProductosDetalle(data);
            await ObtenerProductos();
            FiltrarProductos();
            document.getElementById("idDetalleVenta").value = id;
            $('#modalVentaDetalle').modal('show');
        })
        .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error));
}

function MostrarProductosDetalle(data) {
    $("#todosLosDetalles").empty();
    $.each(data, function (index, item) {
        const cantidad = item.producto.cantidad;
        const precioVenta = item.producto.precioVenta;
        const total = cantidad * precioVenta;
        $('#todosLosDetalles').append(
            `<tr>
                <td>${item.producto.nombreProducto}</td>
                <td>${cantidad}</td>
                <td>${precioVenta}</td>
                <td>${total.toFixed(2)}</td> 
            </tr>`
        );
    });
}



function GuardarDetalle() {
    let idDetalleVenta = document.getElementById("idDetalleVenta").value;
    let guardarDetalle = {
        productoId: document.getElementById("ProductosIdDetalle").value,
        producto: null,
        ventaId: idDetalleVenta,
    };

    fetch('https://localhost:7245/DetallesVentas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(guardarDetalle)
    })
        .then(response => response.json())
        .then(() => {
            document.getElementById("Idproductodetalle").value = 0;
            $("#errorDetalle").empty();
            $("#errorDetalle").attr("hidden", true);
            BuscarProductosDetalle(idDetalleVenta);
        })
        .catch(error => console.log("Hubo un error al guardar el detalle, verifique el mensaje de error: ", error));
}


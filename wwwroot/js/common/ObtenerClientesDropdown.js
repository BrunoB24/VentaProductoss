function ObtenerClientesDropdown() {
    fetch('https://localhost:7245/Cliente')
    .then(response => response.json())
    .then(async data => {
        localStorage.setItem("clientes", JSON.stringify(data));
    })
    .catch(error => console.log("No se pudo acceder al servicio.", error));
}

function FiltrarClientesDropdow(cliente, todosClientes) {
    todosClientes = JSON.parse(todosClientes);

    if (cliente != null) {
        $('#AlumnoId').empty();

        const clienteFiltrados = todosClientes.filter(todosClientesItem => 
            !cliente.find(clienteItem => clienteItem.clienteId === todosClientesItem.id)
        );

        console.log("Clientes filtrados: ", clienteFiltrados);

        $.each(clienteFiltrados, function(index, item) {
            $('#ClienteId').append(
                "<option value='"+ item.id + "'>" + item.nombre + "</option>"            
            )
        })
    }
    else {
        $.each(todosClientes, function(index, item) {
            $('#ClienteId').append(
                "<option value='"+ item.id + "'>" + item.nombre + "</option>"            
            )
        })
    }
}
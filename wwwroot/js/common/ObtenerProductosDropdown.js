function ObtenerProductosDropdown() {
    fetch('https://localhost:7245/Index')
    .then(response => response.json())
    .then(data => CompletarDropdown(data))
    .catch(error => console.log("No se pudo acceder al servicio.", error));
}


function CompletarDropdown(data) {
    $("#ProductoId").empty();
    $.each(data, function(index, item) {
        $('#ProductoId').append(
            "<option value='"+ item.id + "'>" + item.nombre + "</option>"            
        )
    })

    $("#ProductoEditarId").empty();
    $.each(data, function(index, item) {
        $('#ProductoEditarId').append(
            "<option value='"+ item.id + "'>" + item.nombre + "</option>"            
        )
    })
}
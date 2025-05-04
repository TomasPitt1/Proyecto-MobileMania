let contenedorCarrito = document.getElementById("seccion-carrito-productos")
let contendedorCarritoTotal = document.getElementById("seccion-carrito")
let storageCarrito = localStorage.getItem("productosCarrito")
storageCarrito = JSON.parse(storageCarrito)

function renderCarrito(cartItems) {
    cartItems.forEach(celular => {
        const carrito = document.createElement("div")
        carrito.innerHTML = `<h3>${celular.modelo}</h3>
                            <p>${celular.marca}</p>
                            <p>Precio unitario: ${celular.precio}</p>
                            <p>Cantidad: ${celular.cantidad}</p>
                            <p>Total: ${celular.precio * celular.cantidad}</p>
                            <button class="productoEliminar" id="${celular.id}">Eliminar</button>`;
        contenedorCarrito.appendChild(carrito)
    })
    botonEliminarCarrito()
    calculoTotal(cartItems)
}

function calculoTotal(cartItems) {
    const totalAnterior = document.getElementById("total-carrito");
    if (totalAnterior) {
        totalAnterior.remove();
    }
    const total = cartItems.reduce((suma, producto) =>
        suma + (producto.precio * producto.cantidad), 0);
    const sumaTotal = document.createElement("h3");
    sumaTotal.id = "total-carrito";
    sumaTotal.textContent = `TOTAL: $${total}`;
    contendedorCarritoTotal.appendChild(sumaTotal)
}

function botonEliminarCarrito() {
    const botonEliminar = document.querySelectorAll(".productoEliminar");

    botonEliminar.forEach(button => {
        button.onclick = (e) => {
            const celularId = parseInt(e.currentTarget.id);

            let carrito = JSON.parse(localStorage.getItem("productosCarrito")) || [];

            carrito = carrito.filter(producto => producto.id !== celularId);

            localStorage.setItem("productosCarrito", JSON.stringify(carrito));

            contenedorCarrito.innerHTML = "";
            renderCarrito(carrito);
        };
    });
}

renderCarrito(storageCarrito)


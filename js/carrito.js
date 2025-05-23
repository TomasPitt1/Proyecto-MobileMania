let contenedorCarrito = document.getElementById("seccion-carrito-productos")
let contendedorBotones = document.getElementById("seccion-carrito-botones")
let contendedorCarritoTotal = document.getElementById("seccion-carrito")
let storageCarrito = localStorage.getItem("productosCarrito")
storageCarrito = JSON.parse(storageCarrito)

function renderCarrito(cartItems) {
    cartItems.forEach(celular => {
        const carrito = document.createElement("div")
        carrito.innerHTML = `<img src="${celular.imagen}" alt="${celular.modelo}" class="img-producto">
                            <h3>${celular.modelo}</h3>
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

    if (!cartItems|| cartItems.length === 0) {
  sumaTotal.textContent = `El carrito esta vacio, agregalos en la seccion de productos!`;
    } else{
    sumaTotal.textContent = `TOTAL: $${total}`;}
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


function botonDeCompra (){
    const botonComprar = document.createElement("button")
    botonComprar.className = "boton-vaciar-comprar"
    botonComprar.textContent = "Comprar"

botonComprar.onclick = () => {
Swal.fire({
  title: "Queres continuar con la compra?",
  showDenyButton: true,
  confirmButtonText: "Si",
  denyButtonText: `No`
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire("Compra realizada! El comprobante sera enviado a tu casilla de correo registrada", "", "success");
  } else if (result.isDenied) {
    Swal.fire("Podes seguir con el pago mas tarde!", "", "info");
  }
});
}
contendedorBotones.appendChild(botonComprar)
}
botonDeCompra()


function botonVaciarCarrito (){
    const botonVaciar = document.createElement("button")
    botonVaciar.className = "boton-vaciar-comprar"
    botonVaciar.textContent = "Vaciar Carrito"

botonVaciar.onclick = () => {
    localStorage.removeItem("productosCarrito");
    contenedorCarrito.innerHTML = "";
    calculoTotal([]);
Swal.fire({
  title: "Carrito vacio!"
});
}
contendedorBotones.appendChild(botonVaciar)
}
botonVaciarCarrito()
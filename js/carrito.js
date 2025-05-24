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

  if (!cartItems || cartItems.length === 0) {
    sumaTotal.textContent = `El carrito esta vacio, agregalos en la seccion de productos!`;
  } else {
    sumaTotal.textContent = `TOTAL: $${total}`;
  }
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


function botonVaciarCarrito() {
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


function botonDeCompra() {
  const botonComprar = document.createElement("button")
  botonComprar.className = "boton-vaciar-comprar"
  botonComprar.textContent = "Comprar"

  botonComprar.onclick = () => {

    Swal.fire({
      title: "Finalizar compra",
      html:
        `<input type="text" id="nombre" class="swal2-input" placeholder="Nombre y apellido">
        <input type="email" id="email" class="swal2-input" placeholder="Correo electrónico">
        <input type="text" id="direccion" class="swal2-input" placeholder="Dirección de entrega">
        <input type="number" id="dni" class="swal2-input" placeholder="DNI">
        <input type="number" id="tarjeta" class="swal2-input" placeholder="Número de Tarjeta">
        <input type="date" id="vencimiento" class="swal2-input" placeholder="Vencimiento de la Tarjeta">
        <input type="number" id="codigo" class="swal2-input" placeholder="Código de Seguridad">`,

      focusConfirm: false,

      preConfirm: () => {

        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const direccion = document.getElementById("direccion").value;
        const dni = document.getElementById("dni").value;
        const tarjeta = document.getElementById("tarjeta").value;
        const vencimiento = document.getElementById("vencimiento").value;
        const codigo = document.getElementById("codigo").value;

        if (!nombre || !email || !direccion || !dni || !tarjeta || !vencimiento || !codigo) {
          Swal.showValidationMessage('Por favor, ingrese todos los datos');
        } else {
          return { nombre, email, direccion, dni, tarjeta, vencimiento, codigo };
        }
      }
    }).then((resultado) => {
      const datos = resultado.value;

      const carrito = JSON.parse(localStorage.getItem("productosCarrito")) || [];

      const total = carrito.reduce((suma, producto) =>
        suma + (producto.precio * producto.cantidad), 0);

      let celularesComprados = "";
      carrito.forEach(producto => {
        celularesComprados += `<li class="lista-comprados">${producto.modelo} (${producto.marca})(${producto.cantidad})</li>`;
      });

      Swal.fire({
        title: 'Resumen de tu compra',
        html:
          `<p><strong>Nombre:</strong> ${datos.nombre}</p>
          <p><strong>Email:</strong> ${datos.email}</p>
          <p><strong>Dirección:</strong> ${datos.direccion}</p>
          <p><strong>DNI:</strong> ${datos.dni}</p>
          <p><strong>Medio de pago:</strong> Tarjeta N° ${datos.tarjeta}</p>
          <p><strong>Productos:</strong></p>
<ul>
  ${celularesComprados}
</ul>
<p><strong>Total a pagar:</strong> $${total}</p>`,
        icon: 'success'
      });

      localStorage.removeItem("productosCarrito");
      contenedorCarrito.innerHTML = "";
      calculoTotal([]);
    })
  };
  contendedorBotones.appendChild(botonComprar)
}
botonDeCompra()
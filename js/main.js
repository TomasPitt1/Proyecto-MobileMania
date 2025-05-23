
let productosCarrito = JSON.parse(localStorage.getItem("productosCarrito")) || [];

let productos = document.getElementById("productos");
let celulares = [];


const renderProductos = async () => {
    const usersError = "<span>No se pueden cargar los productos, intente mas tarde</span>"
    let renderizado = ``

    try {
        let solicitud = await fetch("./bd/data.json")
        let data = await solicitud.json()
        celulares = data;
        data.forEach(celular => {
            const card = document.createElement("div")
            card.innerHTML = `<img src="${celular.imagen}" alt="${celular.modelo}" class="img-producto">
                            <h3>${celular.modelo}</h3>
                            <p>${celular.marca}</p>
                            <p>${celular.precio}</p>
                            <div>
                            <button class="boton-restar" data-id="${celular.id}">-</button>
                            <span id="contador-${celular.id}">1</span>
                            <button class="boton-sumar" data-id="${celular.id}">+</button>
            </div>
                            <button class="productoAgregar" id="${celular.id}">Agregar</button>`
            productos.appendChild(card)
        })
        botonCantidad();
        botonAgregarCarrito();

    } catch (err) {
        renderizado = usersError
        document.body.innerHTML = renderizado
    }
}
renderProductos(celulares)


function botonAgregarCarrito() {
    addButton = document.querySelectorAll(".productoAgregar")
    addButton.forEach(button => {
        button.onclick = (e) => {
            const celularId = parseInt(e.currentTarget.id);
            const celularSeleccionado = celulares.find(celular => celular.id == celularId)
            const cantidadElegida = parseInt(document.getElementById(`contador-${celularId}`).textContent);

            let carrito = JSON.parse(localStorage.getItem("productosCarrito")) || [];

            const existente = carrito.find(prod => prod.id === celularId);

            if (existente) {
                existente.cantidad += cantidadElegida;
            } else {
                const celularConCantidad = {
                    imagen: celularSeleccionado.imagen,
                    modelo: celularSeleccionado.modelo,
                    marca: celularSeleccionado.marca,
                    precio: celularSeleccionado.precio,
                    id: celularSeleccionado.id,
                    cantidad: cantidadElegida,
                };

                carrito.push(celularConCantidad);
                Toastify({
                    text: "Producto agregado al carrito",
                    duration: 1500,
                    destination: "#",
                    newWindow: true,
                    close: false,
                    gravity: "top",
                    position: "center",
                    stopOnFocus: false,
                    style: {
                        background: "white",
                        color:"black"
                    },
                }).showToast();
            }

            localStorage.setItem("productosCarrito", JSON.stringify(carrito));
        };
    });
}



function botonCantidad() {
    const botonSumar = document.querySelectorAll(".boton-sumar");
    const botonRestar = document.querySelectorAll(".boton-restar");

    botonSumar.forEach(boton => {
        boton.onclick = () => {
            const id = boton.getAttribute("data-id");
            const contador = document.getElementById(`contador-${id}`);
            contador.textContent = parseInt(contador.textContent) + 1;
        };
    });

    botonRestar.forEach(boton => {
        boton.onclick = () => {
            const id = boton.getAttribute("data-id");
            const contador = document.getElementById(`contador-${id}`);
            const valorActual = parseInt(contador.textContent);
            if (valorActual > 1) {
                contador.textContent = valorActual - 1;
            }
        };
    });
}

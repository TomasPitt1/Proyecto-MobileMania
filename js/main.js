class Celular {
    static id = 0
    constructor(modelo, marca, precio) {
        this.id = ++Celular.id,
            this.modelo = modelo,
            this.marca = marca,
            this.precio = precio
    }
}
const celular1 = new Celular("Galaxy 54", "Samsung", 900000)
const celular2 = new Celular("Iphone 15", "Apple", 1200000)
const celular3 = new Celular("Iphone 16 PRO", "Apple", 1500000)
const celular4 = new Celular("G 79", "Motorola", 800000)
const celular5 = new Celular("Galaxy S21", "Samsung", 700000)
const celular6 = new Celular("Redmi Note 12", "Xiaomi", 950000)

const celulares = [celular1, celular2, celular3, celular4, celular5, celular6]

let productosCarrito = JSON.parse(localStorage.getItem("productosCarrito")) || [];

let productos = document.getElementById("productos")
function renderProductos(celulares) {
    celulares.forEach(celular => {
        const card = document.createElement("div")
        card.innerHTML = `<h3>${celular.modelo}</h3>
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
                    modelo: celularSeleccionado.modelo,
                    marca: celularSeleccionado.marca,
                    precio: celularSeleccionado.precio,
                    id: celularSeleccionado.id,
                    cantidad: cantidadElegida,
                };

                carrito.push(celularConCantidad);
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
const contenedor = document.getElementById("contenedor");
fetch("./database.json")
  .then((Response) => Response.json())

  .then((data) => {
    for (const producto of data) {
      contenedor.innerHTML += `
    <div class="phone">
        <div class="phoneConteiner">
        <img class="imgPhone" src="${producto.imagen}"/>
        </div>
        <h2>$${producto.price}</h2>
        <h3>Hasta 12 cuotas sin interes</h3>
        <p>${producto.name}${" "}${producto.modelo}</p>
        <button class="btn-comprar" id="${
          producto.boton
        }">Añadir al carrito<i class="bi bi-cart4"></i></button>
    </div>`;
    }

    const listadoCompras = [];

    for (const producto of data) {
      const carritoCargar = document.getElementById(producto.boton);
      carritoCargar.addEventListener("click", () => {
        Swal.fire("Añadiste este producto al carrito de compras");
        listadoCompras.push(producto.name + " " + producto.modelo);
        console.log(listadoCompras);

        document.getElementById("carritoVacio").style.display = "none";
        document.getElementById("btnBagFill").style.display = "block";
      });
    }
    carritoLleno.addEventListener("click", () => {
      Swal.fire({
        icon: "question",
        title: "Desea comprar estos Productos?",
        text: listadoCompras,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, pagar",
        cancelButtonText: "Seguir mirando",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            "Su pago fue aceptado con éxito",
            "Muchas gracias por su compra.",
            "success"
          );
        }
      });
    });
  });

const mensajes = [];

const formularioContacto = document.querySelector(".form");

const contenedorHTML = document.querySelector("#contenedorMensajes");

const renderizarMensajes = () => {
  contenedorHTML.innerHTML = " ";
  for (const mensaje of mensajes) {
    contenedorHTML.innerHTML += `
          <div class="Uexitoso" d-none>
          <h2>${mensaje.nombre}:</h2>
          <p>${mensaje.mensaje}</p>
          </div>
          `;
  }
};

formularioContacto.addEventListener("submit", (event) => {
  event.preventDefault();
  mensajes.push({
    nombre: formularioContacto.nombreCompleto.value,
    mail: formularioContacto.correoElectronico.value,
    mensaje: formularioContacto.textarea.value,
  });
  formularioContacto.reset();
  renderizarMensajes();
});
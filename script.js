
"use strict";

const TELEFONO_RESTAURANTE = "18094624113";

const productos = [
    {
        id: 1,
        nombre: "Paletas",
        precio: 35,
        categoria: "helados",
        imagen: "https://i.pinimg.com/originals/60/cb/bc/60cbbce7312f9923961e5d591eb5e643.jpg",
        descripcion: "Helado de distintos sabores."
    },
    {
        id: 2,
        nombre: "Helados",
        precio: 50,
        categoria: "helados",
        imagen: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=700&q=80",
        descripcion: "Una opción para disfrutar algo dulce."
    },
    {
        id: 3,
        nombre: "Botellita de agua 500 ml",
        precio: 15,
        categoria: "bebidas",
        imagen: "https://cdn.almacen.do/2026/03/Agua-Planeta-Azul-16-fardo-2.jpg",
        descripcion: "Agua en botella de 500 ml."
    },
    {
        id: 4,
        nombre: "Fundita de hielo",
        precio: 5,
        categoria: "hielo-agua",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnAqLXJOSGdeVQ44i4jQYJIQZK5B3wCveO4JSsWK8U35rIAqaol4mlvxE7&s=10",
        descripcion: "Fundita de hielo."
    },
    {
        id: 5,
        nombre: "Funditas de agua",
        precio: 5,
        categoria: "hielo-agua",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjuEIWRAaLKqTeOIqZiXrqEHUpVGSpf5NKQb4jVerp0cBRdO4lkgXwy7w&s=10",
        descripcion: "Promoción: 2 funditas por RD$5.",
        promocion: "agua"
    },
    {
        id: 6,
        nombre: "Refresco pequeño",
        precio: 15,
        categoria: "bebidas",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXXBEh_jApOa8NOgq6WvVWBTVghSRKh1clAQ2s7xwhyiAWZsSlOczBT5Y&s=10",
        descripcion: "Refresco. Precio según tamaño."
    },
    {
        id: 7,
        nombre: "Refresco mediano",
        precio: 20,
        categoria: "bebidas",
        imagen: "https://www.surtidoraaurora.com.do/images/thumbs/2956279_refresco-coca-cola-250ml-121-.jpeg",
        descripcion: "Refresco. Precio según tamaño."
    },
    {
        id: 8,
        nombre: "Refresco grande",
        precio: 30,
        categoria: "bebidas",
        imagen: "https://i0.wp.com/www.ensegundos.do/wp-content/uploads/2011/10/Refrescos.png?quality=80&ssl=1",
        descripcion: "Refresco. Precio según tamaño."
    },
    {
        id: 9,
        nombre: "Tostada",
        precio: 40,
        categoria: "comidas",
        imagen: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80",
        descripcion: "Tostada preparada."
    },
    {
        id: 10,
        nombre: "Yaniqueque",
        precio: 5,
        categoria: "comidas",
        imagen: "https://www.cocinadominicana.com/wp-content/uploads/2025/05/yaniqueque-recipe-dominican-GLZ0016.jpg",
        descripcion: "Yaniqueque crujiente."
    },
    {
        id: 11,
        nombre: "Tapado de huevo",
        precio: 30,
        categoria: "comidas",
        imagen: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=700&q=80",
        descripcion: "Tapado de huevo."
    },
    {
        id: 12,
        nombre: "Tapado de longaniza o jamoneta",
        precio: 35,
        categoria: "comidas",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReb47RISMhtQzTzbQ9PwZNpfkQLai9XmOog3nOxMc8af7uqYDEYaQkaio&s=10",
        descripcion: "Tapado de longaniza o jamoneta."
    },
    {
        id: 13,
        nombre: "Jugo natural",
        precio: 50,
        categoria: "bebidas",
        imagen: "https://media.istockphoto.com/id/1199220949/es/vector/un-vaso-de-jugo-de-naranja-fresco.jpg?s=612x612&w=0&k=20&c=oL9AXgeqFOoYqEAFbZ0N4AsHKNUC3PsYUPENixp3hjU=",
        descripcion: "Jugo refrescante."
    }
];

const productGrid = document.getElementById("product-grid");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const subtotalElement = document.getElementById("subtotal");
const totalElement = document.getElementById("total");
const clearCartButton = document.getElementById("clear-cart");
const orderForm = document.getElementById("order-form");
const statusElement = document.getElementById("status");
const addressGroup = document.getElementById("address-group");
const addressInput = document.getElementById("address");

const carrito = new Map();

function dinero(cantidad) {
    return cantidad.toLocaleString("es-DO", {
        style: "currency",
        currency: "DOP"
    });
}

function buscarProducto(id) {
    return productos.find(producto => producto.id === id);
}

// Evita que una imagen caída deje vacía la tarjeta.
function imagenAlternativa(img) {
    img.onerror = () => {
        img.onerror = null;
        img.src = "https://placehold.co/700x450/fff0c7/14752c?text=De+Jenny+Morla";
    };
}

function crearImagen(src, alt, clase) {
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.className = clase;
    img.loading = "lazy";
    img.decoding = "async";
    imagenAlternativa(img);
    return img;
}

function mostrarProductos(categoria = "todos") {
    const filtrados = categoria === "todos"
        ? productos
        : productos.filter(producto => producto.categoria === categoria);

    productGrid.replaceChildren();

    filtrados.forEach(producto => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "product-card";

        const contenedorImagen = document.createElement("div");
        contenedorImagen.className = "product-card__image-wrap";
        contenedorImagen.appendChild(
            crearImagen(producto.imagen, producto.nombre, "product-card__image")
        );

        const cuerpo = document.createElement("div");
        cuerpo.className = "product-card__body";

        const categoriaTexto = document.createElement("span");
        categoriaTexto.className = "product-card__category";
        categoriaTexto.textContent = producto.categoria.replace("-", " ");

        const titulo = document.createElement("h3");
        titulo.textContent = producto.nombre;

        const descripcion = document.createElement("p");
        descripcion.className = "product-card__description";
        descripcion.textContent = producto.descripcion;

        const pie = document.createElement("div");
        pie.className = "product-card__bottom";

        const precio = document.createElement("span");
        precio.className = "product-price";
        precio.textContent = producto.promocion
            ? "2 por " + dinero(producto.precio)
            : dinero(producto.precio);

        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "add-button";
        boton.dataset.action = "add";
        boton.dataset.id = producto.id;
        boton.textContent = "+ Agregar";

        pie.append(precio, boton);
        cuerpo.append(categoriaTexto, titulo, descripcion, pie);
        tarjeta.append(contenedorImagen, cuerpo);
        productGrid.appendChild(tarjeta);
    });
}

function agregarProducto(id) {
    const producto = buscarProducto(id);
    if (!producto) return;

    carrito.set(id, (carrito.get(id) || 0) + 1);
    statusElement.textContent = `${producto.nombre} agregado al carrito.`;
    mostrarCarrito();
}

function cambiarCantidad(id, cambio) {
    if (!carrito.has(id)) return;

    const nuevaCantidad = carrito.get(id) + cambio;

    if (nuevaCantidad <= 0) {
        carrito.delete(id);
    } else {
        carrito.set(id, nuevaCantidad);
    }

    mostrarCarrito();
}

function eliminarProducto(id) {
    carrito.delete(id);
    mostrarCarrito();
}

// Dos funditas cuestan RD$5.
// Para tres unidades se cobran dos parejas: RD$10.
function calcularImporte(producto, cantidad) {
    if (producto.promocion === "agua") {
        return Math.ceil(cantidad / 2) * producto.precio;
    }

    return producto.precio * cantidad;
}

function mostrarCarrito() {
    cartItems.replaceChildren();

    let cantidadTotal = 0;
    let subtotal = 0;

    carrito.forEach((cantidad, id) => {
        const producto = buscarProducto(id);
        if (!producto) return;

        cantidadTotal += cantidad;
        const importe = calcularImporte(producto, cantidad);
        subtotal += importe;

        const elemento = document.createElement("article");
        elemento.className = "cart-item";

        elemento.appendChild(
            crearImagen(producto.imagen, producto.nombre, "cart-item__image")
        );

        const info = document.createElement("div");
        info.className = "cart-item__info";

        const titulo = document.createElement("h4");
        titulo.textContent = producto.nombre;

        const precio = document.createElement("p");
        precio.className = "cart-item__price";
        precio.textContent = dinero(importe);

        const control = document.createElement("div");
        control.className = "quantity-control";

        const menos = document.createElement("button");
        menos.type = "button";
        menos.dataset.action = "decrease";
        menos.dataset.id = id;
        menos.textContent = "−";
        menos.setAttribute("aria-label", "Reducir cantidad");

        const numero = document.createElement("span");
        numero.textContent = cantidad;

        const mas = document.createElement("button");
        mas.type = "button";
        mas.dataset.action = "increase";
        mas.dataset.id = id;
        mas.textContent = "+";
        mas.setAttribute("aria-label", "Aumentar cantidad");

        control.append(menos, numero, mas);
        info.append(titulo, precio, control);

        const quitar = document.createElement("button");
        quitar.type = "button";
        quitar.className = "cart-item__remove";
        quitar.dataset.action = "remove";
        quitar.dataset.id = id;
        quitar.textContent = "✕";
        quitar.setAttribute("aria-label", "Eliminar producto");

        elemento.append(info, quitar);
        cartItems.appendChild(elemento);
    });

    if (carrito.size === 0) {
        const vacio = document.createElement("p");
        vacio.className = "empty-cart";
        vacio.textContent = "Todavía no has agregado productos.";
        cartItems.appendChild(vacio);
    }

    cartCount.textContent = cantidadTotal;
    subtotalElement.textContent = dinero(subtotal);
    totalElement.textContent = dinero(subtotal);
    clearCartButton.disabled = carrito.size === 0;
}

productGrid.addEventListener("click", event => {
    const boton = event.target.closest("button[data-action]");
    if (!boton || boton.dataset.action !== "add") return;

    agregarProducto(Number(boton.dataset.id));
});

cartItems.addEventListener("click", event => {
    const boton = event.target.closest("button[data-action]");
    if (!boton) return;

    const id = Number(boton.dataset.id);

    if (boton.dataset.action === "increase") cambiarCantidad(id, 1);
    if (boton.dataset.action === "decrease") cambiarCantidad(id, -1);
    if (boton.dataset.action === "remove") eliminarProducto(id);
});

document.querySelector(".filters").addEventListener("click", event => {
    const boton = event.target.closest("button[data-category]");
    if (!boton) return;

    document.querySelectorAll(".filter").forEach(filtro => {
        filtro.classList.remove("filter--active");
        filtro.setAttribute("aria-pressed", "false");
    });

    boton.classList.add("filter--active");
    boton.setAttribute("aria-pressed", "true");
    mostrarProductos(boton.dataset.category);
});

clearCartButton.addEventListener("click", () => {
    carrito.clear();
    mostrarCarrito();
    statusElement.textContent = "Carrito vaciado.";
});

function actualizarEntrega() {
    const seleccion = orderForm.querySelector(
        'input[name="delivery"]:checked'
    );

    const requiereDireccion = seleccion.value === "Delivery";
    addressGroup.hidden = !requiereDireccion;
    addressInput.required = requiereDireccion;

    if (!requiereDireccion) addressInput.value = "";
}

orderForm.querySelectorAll('input[name="delivery"]').forEach(radio => {
    radio.addEventListener("change", actualizarEntrega);
});

orderForm.addEventListener("submit", event => {
    event.preventDefault();

    if (carrito.size === 0) {
        statusElement.textContent = "Agrega al menos un producto al carrito.";
        return;
    }

    if (!orderForm.reportValidity()) return;

    const nombre = document.getElementById("customer-name").value.trim();
    const telefono = document.getElementById("customer-phone").value.trim();
    const modalidad = orderForm.querySelector(
        'input[name="delivery"]:checked'
    ).value;
    const direccion = addressInput.value.trim();

    if (!/^[0-9+\s()-]{7,20}$/.test(telefono)) {
        statusElement.textContent = "Verifica el formato de tu teléfono.";
        return;
    }

    if (modalidad === "Delivery" && !direccion) {
        statusElement.textContent = "Escribe la dirección de entrega.";
        addressInput.focus();
        return;
    }

    const lineas = [];
    let subtotal = 0;

    carrito.forEach((cantidad, id) => {
        const producto = buscarProducto(id);
        if (!producto) return;

        const importe = calcularImporte(producto, cantidad);
        subtotal += importe;

        lineas.push(
            `- ${producto.nombre} x${cantidad}: ${dinero(importe)}`
        );
    });

    const mensaje = [
        "¡Hola! Quiero hacer un pedido a De Jenny Morla Guzmán.",
        "",
        "MI PEDIDO:",
        ...lineas,
        "",
        `TOTAL DE PRODUCTOS: ${dinero(subtotal)}`,
        "",
        `Nombre: ${nombre}`,
        `Teléfono: ${telefono}`,
        `Modalidad: ${modalidad}`,
        ...(modalidad === "Delivery" ? [`Dirección: ${direccion}`] : []),
        "",
        "Por favor, confirmen el pedido y el costo de entrega."
    ].join("\n");

    const numero = TELEFONO_RESTAURANTE.replace(/\D/g, "");

    if (!/^[1-9]\d{7,14}$/.test(numero)) {
        statusElement.textContent = "Revisa el número de WhatsApp configurado.";
        return;
    }

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    const ventana = window.open(url, "_blank", "noopener,noreferrer");

    if (!ventana) {
        statusElement.textContent =
            "El navegador bloqueó la ventana. Permite abrir WhatsApp e inténtalo de nuevo.";
        return;
    }

    statusElement.textContent =
        "Pedido preparado. Revisa WhatsApp y pulsa Enviar.";
});

document.getElementById("year").textContent = new Date().getFullYear();

actualizarEntrega();
mostrarProductos();
mostrarCarrito();

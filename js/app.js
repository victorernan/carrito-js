//variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector("#lista-cursos");
const contenedorCarrito = document.querySelector('#lista-carrito');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let carritoItems = [];

cargarEventListeners();

function cargarEventListeners() {
    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

function agregarCurso(e) {
    //se evita que al pinchar un curso se vaya hacia arriba
    e.preventDefault();
    const cursoSeleccionado = e.target.parentElement.parentElement;
    if (e.target.classList.contains('agregar-carrito')) {
        leerDatos(cursoSeleccionado);
    }
    console.log(carritoItems);
}

function leerDatos(curso) {

    //guardar en un objeto todos los campos que necesito
    //y luego agregarselos a la tabla
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('.info-card h4').textContent,
        precio: curso.querySelector('.info-card .u-pull-right').textContent,
        //document.querySelector('.precio span').textContent
        id: curso.querySelector('.button-primary').getAttribute('data-id'),
        cantidad: 1
    }

    //curso.id === infoCurso.id compara lo que llega con lo que se acaba de agregar
    const buscarItem = carritoItems.some(curso => curso.id === infoCurso.id);

    if (buscarItem) { //map va a ir iterando sobre todo el objeto
        const cursos = carritoItems.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });

    } else {
        carritoItems = [...carritoItems, infoCurso];
        //carritoItems.push(infoCurso);
    }
    carritoHTML();
}

function carritoHTML() {
    //funcion que pinta en el html todos los elementos del carrito de la compra
    limpiarHTML();

    carritoItems.forEach(curso => {
        // esta linea, para evitar tener que poner curso a cada variable
        const { imagen, titulo, precio, cantidad, id } = curso;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <img src=${imagen} width="100%">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;
        contenedorCarrito.appendChild(tr);
    });
}

function limpiarHTML() {
    contenedorCarrito.innerHTML = '';
    // contenedorCarrito.appendChild(tr) añade lo nuevo y lo 
    //anterior por lo que el contenido se multiplica cada vez q pasa
}

function eliminarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar-curso')) {
        //console.log("entra");
        const cursoID = e.target.getAttribute('data-id');
        carritoItems = carritoItems.filter(curso => curso.id !== cursoID);
        carritoHTML();
    }
}

function vaciarCarrito() {
    const borrar = carritoItems.splice(0, carritoItems.length);
    limpiarHTML();
}
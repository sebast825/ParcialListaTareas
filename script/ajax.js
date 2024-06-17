const containerTasks = document.querySelector(".container");

const URLproductos =
  "https://66252bda04457d4aaf9e131e.mockapi.io/api/v1/tasks";
  
let productos = [];

function retornarFilaHTML(data) {
  return `
 <div class="card p-3">
      <div class="row no-gutters">
        <div class="col-9 col-md-8">
          <div class="card-body">
            <h2 class="card-title">${data.tittle}</h2>
            <p class="card-text">${data.fechaCreacion}</p>
          </div>
        </div>
        <div class="col-3 col-md-4 d-flex justify-content-center align-items-center">
          <img src="images/play.png" class="card-img" alt="...">
        </div>
      </div>
    </div>

  `;
}
obtenerTareas()



function obtenerTareas() {
  fetch(URLproductos)
    .then((response) => {
      // operador ternario como alternativa
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("No se pueden obtener los datos del servidor.");
      }
    })
    .then((data) => {
      productos.push(...data);
      console.log(productos)
      productos.reverse();
    })
    .then(() => {
      if (productos.length > 0) {
        //containerFotos.innerHTML ="";
      /*  productos.forEach(
          (producto) => (containerFotos.innerHTML += retornarFilaHTML(producto))
        )*/
        
      }
    
    })
    .catch((error) => {
      ToastIt.now({
        message: error.message,
        style: "error",
        timer: 3700,
        close: true,
      });
    });
}

function guardarTarea(data, callback) {
   // Validación de datos
   const nuevoProducto = {
     fechaCreacion: data.fecha,
     fechaConculsion: null,
     titulo: data.titulo,
     descripcion: data.descripcion,
     estado: "nuevo"
   };
   const opciones = {
     method: "POST",
     headers: { "content-type": "application/json" },
     body: JSON.stringify(nuevoProducto),
   };
 
   fetch(URLproductos, opciones)
     .then((response) => {
       if (response.status === 201) {
         return response.json();
       } else {
         throw new Error("No se puede crear el recurso.");
       }
     })
     .then((data) => {
       // Si se proporciona un callback, se llama después de que se completa el guardado
       if (callback) {
         callback();
       }
       // Actualizar productos y mostrar el ID en inputCodigo
       obtenerProductos();
       inputCodigo.value = data.id;
     })
     .catch((error) => {
       // Manejo de errores
       ToastIt.now({
         message: error.message,
         style: "error",
         timer: 3700,
         close: true,
       });
     });
 }
 
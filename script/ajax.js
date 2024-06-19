const containerTasks = document.querySelector(".container");


const URLtarea =
  "https://66252bda04457d4aaf9e131e.mockapi.io/api/v1/tasks";
  
let tareaLista = [];
//si se agregan estados, terminado SIEMPRE debe ser el ultimo
const listaEstados = ["nuevo","terminado"]



function obtenerTareas() {
   tareaLista = [];
  fetch(URLtarea)
    .then((response) => {
      // operador ternario como alternativa
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("No se pueden obtener los datos del servidor.");
      }
    })
    .then((data) => {
      tareaLista.push(...data);
      console.log(tareaLista)
      tareaLista.reverse();
      
    })
    .then(() => {
      if (tareaLista.length > 0) {
        //containerFotos.innerHTML ="";
        mostrarTareas()
        
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
     fechaConclusion: null,
     tittle: data.tittle,
     description: data.description,
     estado: listaEstados[0]
   };
   const opciones = {
     method: "POST",
     headers: { "content-type": "application/json" },
     body: JSON.stringify(nuevoProducto),
   };
 
   fetch(URLtarea, opciones)
     .then((response) => {
      document.querySelector('.closeCreateModalBtn').click();            

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
       // Actualizar tareaLista y mostrar el ID en inputCodigo
       obtenerTareas();
     
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
 
 
function modifcarProducto (data){
  const tareaModificada = {
    fechaCreacion: data.fecha,
    fechaConculsion: data.fechaConclusion,
    tittle: data.tittle,
    descritcion: data.description,
    estado: data.estado
  }

  const opciones = {
      method: 'PUT',
      headers: { "content-type": "application/json" },
      body: JSON.stringify(tareaModificada)
  }

  fetch(`${URLtarea}/${data.id}`, opciones)
  .then((response)=> {
      if (response.status === 200) {
        obtenerTareas();

        return response.json()
      } else {
          throw new Error("Error al modificar el recurso.")
      }
  })
  .then((data)=> {
     
      ToastIt.now({
          message: "tarea modificada con éxito.",
          style: 'success',
          timer: 3700,
          close: true
      })
  })
  .catch((error)=> {
      ToastIt.now({
          message: error.message,
          style: 'error',
          timer: 3700,
          close: true
      })
  })
}

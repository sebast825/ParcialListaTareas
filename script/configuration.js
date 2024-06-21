const configurationGuardar = document.querySelector(".configurationModalGuardarBtn");
const selectVoice = document.querySelector('#selectVoice')
const inputRateConfiguration = document.querySelector('#inputRateConfiguration')


let vozAudio = localStorage.getItem('vozAudio') || "es-MX"; 
let velocidadReproduccion = localStorage.getItem('velocidadReproduccion') || 1;

/* actualiza el FE al cargar */
inputRateConfiguration.value = velocidadReproduccion;
selectVoice.value = vozAudio;


configurationGuardar.addEventListener("click",()=>{

   velocidadReproduccion = inputRateConfiguration.value
   vozAudio = selectVoice.value

   localStorage.setItem('vozAudio',vozAudio);
   localStorage.setItem('velocidadReproduccion',velocidadReproduccion);

   document.querySelector('.closeConfiguracionModalBtn').click();            

})
function reproducirAudio(description){
   Speakit.utteranceRate = velocidadReproduccion;

   Speakit.utterancePitch = 0.9;
   Speakit.readText(description, vozAudio);
}

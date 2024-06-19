const configurationGuardar = document.querySelector(".configurationModalGuardarBtn");
const selectVoice = document.querySelector('#selectVoice')
const inputRateConfiguration = document.querySelector('#inputRateConfiguration')


let vozAudio = "en-AU"; 
let velocidadReproduccion = 1

configurationGuardar.addEventListener("click",()=>{
   console.log(inputRateConfiguration.value)
   velocidadReproduccion = inputRateConfiguration.value
   vozAudio = selectVoice.value
   document.querySelector('.closeConfiguracionModalBtn').click();            

})
function reproducirAudio(description){
   Speakit.utteranceRate = velocidadReproduccion;

   Speakit.utterancePitch = 0.9;
   Speakit.readText(description, vozAudio);
}

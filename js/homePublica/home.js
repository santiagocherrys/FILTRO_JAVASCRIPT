/* Selectore */

import { urlCompanies, urlJobs } from "../libs/API/api.js";
import { getDb } from "../libs/API/apiFunctions.js";

const card_job = document.querySelector('.contenedor');
const modality_filter = document.querySelector('#modality-filter');
const searchBox = document.querySelector('#searchBox');
const botonSearch = document.querySelector('#botonSearch');

botonSearch.addEventListener('click',async (e)=>{

  e.preventDefault();
  console.log("Valor caja: ", searchBox.value);
  console.log("Valor select: ", modality_filter.value );
  console.log("Funciona");

  if(modality_filter.value || searchBox.value){

    /* Se limpia pantalla */
    card_job.innerHTML = ``;
    
    const jobs = await getDb(urlJobs);

    const filtrado = jobs.filter(filtrarSelect).filter(filtrarSearch);
    

    pintarJobs(filtrado);
    function filtrarSelect(filtro){
      if(modality_filter.value){
        return filtro.modality === modality_filter.value;
      }else{
        return filtro;
      }
    }

    function filtrarSearch(filtro){
      if(searchBox.value){
        return filtro.title === searchBox.value;
      }else{
        return filtro;
      }
    }
    

  }else{
    card_job.innerHTML = ``;
    pintarHome();
  }

});


/* Imprimir dinamicamente */

document.addEventListener('DOMContentLoaded',()=>{
    pintarHome();
})

async function pintarHome(){
    /* Se llama a la base de datos */
    const noticias = await getDb(urlJobs);
    pintarJobs(noticias);
     
}

function pintarJobs(jobs){
    
  jobs.forEach( async (job) => {
    const {id, title, description, publicationDate, location, experience, modality, salary, companyId} = job;
    const imagen = await getDb(urlCompanies)
    const empresa = imagen.filter(getImage);
    let img;
    if(empresa.length>0){
      img = empresa[0].imageCompany;
    }else{
      img = "assets/img/register.jpg";
    }
    
    

    console.log("esta es imagen" , img);
    function getImage(comp){
      if(companyId){
        return comp.nameCompany === companyId;
      }else{
        return comp;
      }
    }
    card_job.innerHTML += `
    <div class="card-job">
        <h2>${title}</h2>

        <p>
        ${description}
        </p>

        <div class="row">
          <div class="col-6">
            <div class="d-flex gap-2 align-items-center fs-5 text-muted">
              <i class="bx bx-current-location"></i>
              <span class="fw-semibold">${location}</span>
            </div>

            <div class="d-flex gap-2 align-items-center fs-5 text-muted">
              <i class="bx bx-time"></i>
              <span class="fw-semibold">${publicationDate}</span>
            </div>
          </div>

          <div class="col-6 d-flex justify-content-end">
            <img
              src=${img}
              alt="logo"
              height="80"
              width="80"
              class="object-fit-contain rounded-circle img-company"
            />
          </div>
        </div>
      </div>  
    `;
});
    
}


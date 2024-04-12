import { urlJobs } from "../libs/API/api.js";
import { createJob, deleteById, getDb, getNewById, updateNew } from "../libs/API/apiFunctions.js";

/* Selectores */
const tbodyAdmin = document.querySelector('#tbodyAdmin');
const formAddJob = document.querySelector('#formAddJob');
const title_job = document.querySelector('#title-job');
const experience = document.querySelector('#experience');
const salary = document.querySelector('#salary');
const location = document.querySelector('#Location');
const modality = document.querySelector('#modality');
const description = document.querySelector('#description');
const identificador = document.querySelector('#identificador');
const botonModal = document.querySelector('#botonModal');

document.addEventListener('DOMContentLoaded',()=>{
    paintJobs();
    identificador.value="";
})



export async function paintJobs(){

    /* Se lee todas las vacantes */
    const trabajos = await getDb(urlJobs);

    

    console.log("Trae todos los trabajos", trabajos);

    /* Se filtra por compañia */

    const trabajosCompany = trabajos.filter(filtrar);
    console.log("este es el filtro", trabajosCompany);

    if(trabajosCompany.length > 0){
        /* Borra todo */
        tbodyAdmin.innerHTML = "";

        /* Pinta las cards */
        trabajosCompany.forEach(trabajo => {
            
            const {id, title, description, publicationDate, location, experience, modality, salary, companyId } = trabajo;
            console.log("id trabajo: " , id);
            tbodyAdmin.innerHTML += `
            <tr>
            <td>
              <div class="d-middle">
                <img
                  src="assets/img/logo.webp"
                  alt="img-product"
                  width="60"
                  height="60"
                  class="img-fluid rounded-circle img-company"
                />
              </div>
            </td>
            <td>${companyId}</td>
            <td>${title}</td>
            <td>${location}</td>
            <td>${experience}</td>
            <td>${modality}</td>
            <td>${salary}</td>
            <td>
            
              <button class="btn btn-primary btn-edit" valor=${id} >
                <i class="bx bx-edit" ></i>
              </button>

              <button class="btn btn-danger btn-delete" valor=${id}>
                <i class="bx bx-trash" ></i>
              </button>
            </td>
          </tr>
            `;
        

        });

        
        /* Se añade los eventos a los botones */
        /* Boton editar */
        const btnEdit = document.querySelectorAll('.btn-edit');
        console.log("este es el boton edit", btnEdit);
        /* Boton eliminar */
        const btnDelete = document.querySelectorAll('.btn-delete');
        
        
        /* Evento editar */
        btnEdit.forEach((edit) =>{
            console.log("hola");
            edit.addEventListener('click', async ()=>{
                console.log("este es el id:", edit.getAttribute('valor'));

                /* mandar el id */
                identificador.value = edit.getAttribute('valor');

                /* Actualizamos el modal con el contenido */
                const contenido = await getNewById(edit.getAttribute('valor'));

                title_job.value = contenido.title;
                experience.value = contenido.experience;
                salary.value = contenido.salary;
                location.value = contenido.location;
                modality.value = contenido.modality;
                description.value = contenido.description;
                botonModal.click();
                 
            });
        })

        /* Evento borrar */

        btnDelete.forEach(erase =>{
            erase.addEventListener('click', ()=>{
                console.log("este es el id:", erase.getAttribute('valor'));

                /* Borra selecciòn */
                deleteById(erase.getAttribute('valor'));
            });
        })
        

    }else{
        /* Empresa no tiene noticias, se borra el contenedor*/
        console.log("entro a hacer nada");
        /* tbodyAdmin.innerHTML = ""; */
    }
;

//Se pone esto porque no tiene bueno el DOM
identificador.value="";
}

/* Evento de form añadir trabajo */
formAddJob.addEventListener('submit',async (e)=>{
  e.preventDefault();

  /* Se crea  elemento con post */

  console.log("titulo: ", title_job.value);
  console.log("Experiencia: ", experience.value);
  console.log("Salario: ", salary.value);
  console.log("Location: ", location.value);
  console.log("Modalidad:" , modality.value);
  console.log("Description: " ,description.value);


  /* Obtener empresa */
  const company = JSON.parse(localStorage.getItem('user'));

  /* Obtener hora */
  const hora = new Date();

  /* Revisa si es editar o actualizar */
  const job ={
    title: title_job.value,
    description: description.value,
    publicationDate: `${hora.getDate()}/${(hora.getMonth()+1)}/${hora.getFullYear()}`,
    location: location.value,
    experience: experience.value,
    modality: modality.value,
    salary: salary.value,
    companyId: company.nameCompany
  }

  console.log(identificador.value);
  console.log("Identificador con e.target ", e.target.value);
  console.log("Este es el objeto a enviar ", job);

  if(identificador.value){
    console.log("actualizar información");

    await updateNew(identificador.value,job);
  }else{
    /* Crea nuevo elemento */
    formAddJob.reset();
    
    await createJob(job);
  }

  

})

function filtrar(jobs){
/* Se filtra por compañia */
const company = JSON.parse(localStorage.getItem('user'));
console.log("company name: ", company.nameCompany);
if(company.nameCompany){
    return jobs.companyId === company.nameCompany;
}else{
    return jobs;
}


}




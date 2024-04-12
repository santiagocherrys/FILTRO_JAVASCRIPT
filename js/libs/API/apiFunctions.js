


/* Funciones CRUD */
import { urlCompanies, urlJobs } from "./api.js";

/* Get */

export async function getDb(url){
    const response = await fetch(url);
    const data = await response.json();

    return data;
} 

/* Filtrar por email */
export async function filtrarEmail(email){
    const data = await getDb(`${urlCompanies}/?email=${email}`);
    return data;
}

/* agregar compañia */

export async function createCompany(company){
    try{
        await fetch(urlCompanies,{
            method: 'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify(company)
        })

    }catch(error){
        console.log("este es el error: " ,error);
    }
}

export async function createJob(job){
    try{
        await fetch(urlJobs,{
            method: 'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify(job)
        })

    }catch(error){
        console.log("este es el error: " ,error);
    }
    
}

export async function deleteById(id){
    await fetch(`${urlJobs}/${id}`,{
        method: "DELETE"
    });
    
}

export async function getNewById(id){
    const data = await getDb(`${urlJobs}/${id}`);
    return data;
    //Como no funciona el DOM se tiene que llamar de aqui
}

export async function updateNew(id,job){
    await fetch(`${urlJobs}/${id}`,{
        method: 'PUT',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify(job)
    })
    
    
}
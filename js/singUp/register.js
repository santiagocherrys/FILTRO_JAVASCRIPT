import { urlCompanies } from "../libs/API/api.js";
import { createCompany, filtrarEmail, getDb} from "../libs/API/apiFunctions.js";

/* Selectores */
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password_confirmation = document.querySelector('#password-confirmation');
const company = document.querySelector('#company');
const nitCompany = document.querySelector('#nitCompany');
const img_company = document.querySelector('#img-company');
const formRegister = document.querySelector('#formRegister');


/* Evento de tipo submit */

formRegister.addEventListener('submit', async (e)=>{
    e.preventDefault(); 

    /* revisar correo de compañia */
    console.log("Este es el correo filtrado",await filtrarEmail(email.value));

    const comp = await filtrarEmail(email.value);

    if(comp.length > 0){
        alert('Este correo ya està registrado');
        if(comp[0].nit == nitCompany.value){
            alert("El nit ya està registrado, no se puede repetir");
        }
    }else{
        /* revisar si el nit está repetido */
        const buscNit = await getDb(urlCompanies)
        const filtro = buscNit.filter(searchNit);
        
        if(filtro.length > 0){
            alert("El nit ya está registrado, tiene que ser unico");
        }else{
            /* Se puede hacer el registro de la compañia */
            /* alert("Se puede hacer el registro de la compañia"); */

            /* despues de validar que correo y nit no esten registrados se revisa la contraseña */
            if(checkPassword(password.value , password_confirmation.value) == true){
                
                /* Se crea el objeto a enviar */
                const addCompany = {
                    email: email.value,
                    nameCompany: company.value,
                    imageCompany: img_company.value, 
                    nit: nitCompany.value,
                    password: password.value
                }

                
                /* Se añade compañia a base de datos json server */
                await createCompany(addCompany);

                /* Se redirije a la vista de index */
                window.location.href = "index.html";


            }else{
                alert('no se puede crear usuario')
            }
        }

        
    }
    
})

/* Rectificar que las contraseñas esten correctas */
function checkPassword(passw,passwConfirm){
    /* Confirma si las contraseñas son iguales y si  cumple con mìnimo 6 caracteres */
    if(passw === passwConfirm){
        
        if(passw.length >= 6){
            console.log("contraseña correcta");
            return true;
        }else{
            alert("no cumple con mìnimo 6 caracteres");
            return false;
        }

    }

    if((passw < 6) || (passwConfirm < 6)){
        alert("La contraseña no cumple con mínimo 6 caracteres de longitud");
        return false;
    }else{
        alert("las contraseñas no son iguales");
        return false;
    }
}


/* Buscar Nit */
function searchNit(busqueda){
    if(nitCompany.value){
        return busqueda.nit === nitCompany.value;
    }else{
        return busqueda;
    }

}



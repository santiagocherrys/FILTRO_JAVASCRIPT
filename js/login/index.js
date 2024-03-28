/* Login */
import { filtrarEmail} from "../libs/API/apiFunctions.js";

/* importaciones */


/* Selectores */
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const formLogin = document.querySelector('#formLogin');


console.log("Hola Mundo");

/* Evento formulario submit */
formLogin.addEventListener('submit', async (e)=>{
    e.preventDefault();


    console.log("Tu email es:" , email.value);
    console.log("Tu contraseña es: ", password.value);

    const userResult = await filtrarEmail(email.value);

    /* Se chequea que el usuario está registrado */
    
    checkUser(userResult,password);


    
    
})




function checkUser(usuario, password){
    if(usuario.length > 0){
        console.log(usuario);
        if(usuario[0].password === password.value){
            console.log("usuario y clave correcta");
            
            /* Se guarda en el localstorage */
            localStorage.setItem('user', JSON.stringify(usuario[0]));

            /* redirige a vista administrador */
            window.location.href = "administrator.html";
        }else{
            alert("contraseña incorrecta");
        }
    }else{
        
        /* Si no existe resultado */
        alert('correo incorrecto');
    }
}


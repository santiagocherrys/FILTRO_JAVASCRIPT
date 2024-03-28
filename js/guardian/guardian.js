/* Guardían para que no entren al administrator */

(
    ()=>{
        const user = localStorage.getItem('user');
       
        
        /* Si no hay usuario */
        if(!user){
            window.location.href = "index.html"
        } 
    }
)();
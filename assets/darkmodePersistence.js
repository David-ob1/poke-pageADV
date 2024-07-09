export function cargarThemeLocalStorage (){
    const darkModeActivado = localStorage.getItem("darkMode") === "true"
    darkModeActivado && document.body.classList.add("dark");

   }


 export function guadarTema (estado){
    console.log(estado)
    localStorage.setItem("darkMode",estado)

   } 

  export function toggleTheme(){
    let body = document.querySelector("body")
    body.classList.toggle("dark");
    guadarTema(body.classList.contains("dark"))
}
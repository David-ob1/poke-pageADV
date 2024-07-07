const API = "https://pokeapi.co/api/v2/pokemon/"
import {displayElement} from './assets/imprimir.js'
const listaPokemon = document.getElementById("listaPokemon")
const sun = document.getElementById("light-mode")
const moon = document.getElementById("dark-mode")

sun.addEventListener("click",toggleTheme)
moon.addEventListener("click",toggleTheme)


function toggleTheme (){
document.querySelector("body").classList.toggle("dark");

}


const fetchPokemon  = async ()=>{

    const promises = []

    for(let i = 1; i<= 5;i++){
        promises.push(fetch(API + i)
                        .then(response => response.json()
                        .catch(error => console.log("hubo error pibe: " + error))
    
    ))
    }
    
    let template =""
    try{
        const results = await Promise.all(promises)

        results.forEach(data => { 
            const {id,name,height,weight} = data

            const img = data.sprites.other["official-artwork"].front_default

           let types = data.types.map(type => type.type.name)
          
            const pokemon = {
                id,
                name,
                img,
                height,
                weight,
                types,
            }    
        
        template += CardTemplate(pokemon)
        
    })
    
    displayElement(listaPokemon,template)
    
}catch (error){
    
    console.log(error)
    
}


}

fetchPokemon()


// const mostrarPokemon = (data) => {
//     console.log(`Nombre: ${data.name}`);
//     console.log(`ID: ${data.id}`);
//     console.log(`Tipo: ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}`);
//     // Aquí puedes agregar más información que desees mostrar
//   };

  function CardTemplate (obj){
   const {types} = obj
    let typeTemplate = types.map(type => `<p class="${type} tipo">${type}</p>`)

    typeTemplate = typeTemplate.join('')

    let pokemonId = obj.id.toString();

    
    if (pokemonId.length === 1){
        pokemonId = "00" + pokemonId
    }else if (pokemonId.length === 2) {
        pokemonId = "0" + pokemonId
    }

    return`
        <div class="pokemon">
        <p class="pokemon-id-back">#${pokemonId}</p>
        <div class="pokemon-imagen">
        <img
            src="${obj.img}"
            alt="${obj.name}"
        />
        </div>

        <div class="pokemon-info">
        <div class="nombre-contenedor">
            <p class="pokemon-id">#${pokemonId}</p>
            <h2 class="pokemon-nombre">${obj.name}</h2>
        </div>

        <div class="pokemon-tipos">
         ${typeTemplate}
        </div>

        <div class="pokemon-stats">
            <p class="stat">${obj.height}M</p>
            <p class="stat">${obj.weight}KG</p>
        </div>
        </div>
    </div>`

  }
 
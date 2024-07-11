import {displayElement} from './assets/imprimir.js'
import {cargarThemeLocalStorage , toggleTheme } from './assets/darkmodePersistence.js'

const API = "https://pokeapi.co/api/v2/pokemon/"
const LIMIT = 20

const listaPokemon = document.getElementById("listaPokemon")
const sun = document.getElementById("light-mode")
const moon = document.getElementById("dark-mode")

document.addEventListener("DOMContentLoaded", e =>{
    cargarThemeLocalStorage()
    
})

const getInfoByPage = async (page)=>{
    const offset = (page * LIMIT) - LIMIT

    try {
        const response = await fetch(`${API}?offset=${offset}&limit=${LIMIT}`)
        const data = await response.json()

        return data.results;

    }catch(error){
        console.log("No salio bien mostro" + error)
    }

}

const getPokemonInfo = async (urlPokemon) => {
    const res = await fetch(urlPokemon)
    const pokemonInfo = await res.json();
    return pokemonInfo
}

const arrayOfUrl = (arrayData)=>{
    return arrayData.map(element => {
        return getPokemonInfo (element.url)
    })

}

const getPokemons = async function(page){
    console.log(page)
    try{
        const arrayData = await getInfoByPage(page)
        
        const arrayPromises =  arrayOfUrl(arrayData)

        const pokemons = Promise.all(arrayPromises)
        .then(pokemon => {
            return pokemon

        })
        .catch(error =>{
            console.log(error)
        })
        
        return pokemons


    }catch(error){
        console.log(error)
    }
}


const mostarPokemons = async (page = 1)=>{
    const memory = Number(localStorage.getItem("actualPage"))

    console.log("memory " + memory)

    console.log("page "+ page)
    localStorage.setItem("actualPage",`${page}`)
    
    console.log("prev api " +page)
    const pokemons = await getPokemons(page)
    // console.log(pokemons)
    const arrayPokemons = pokemons.map( pokemon => {
        const {height, id, name, weight, sprites} = pokemon

       const obj = {
            id,
            height,
            name,
            weight,
            img:sprites.other["official-artwork"].front_default,
        } 

        return obj
    }
        )

        // arrayPokemons.forEach(pokemon => )
    

    // try{

    //   let arrayPokemons = pokemons.map(({height, id, name, weight, sprites}) =>{

    //        const obj= {
    //             id,
    //             name,
    //             height,
    //             img:sprites.other["official-artwork"].front_default,
    //             weight

    //         }

            
            
    //     })
    //     console.log(arrayPokemons)

    // }catch(error){
    //     console.log(error)
    // }

}
mostarPokemons()



sun.addEventListener("click",toggleTheme)
moon.addEventListener("click",toggleTheme)



    
// const fetchPokemon  = async ()=>{

//     const promises = []

//     for(let i = 1; i<= 5;i++){
//         promises.push(fetch(API + i)
//                         .then(response => response.json()
//                         .catch(error => console.log("hubo error pibe: " + error))
    
//     ))
//     }
    
//     let template =""
//     try{
//         const results = await Promise.all(promises)

//         results.forEach(data => { 
//             const {id,name,height,weight} = data

//             const img = data.sprites.other["official-artwork"].front_default

//            let types = data.types.map(type => type.type.name)
          
//             const pokemon = {
//                 id,
//                 name,
//                 img,
//                 height,
//                 weight,
//                 types,
//             }    
        
//         template += CardTemplate(pokemon)
        
//     })
    
//     displayElement(listaPokemon,template)
    
// }catch (error){
    
//     console.log(error)
    
// }


// }

// fetchPokemon()


//   function CardTemplate (obj){
//    const {types} = obj
//     let typeTemplate = types.map(type => `<p class="${type} tipo">${type}</p>`)

//     typeTemplate = typeTemplate.join('')

//     let pokemonId = obj.id.toString();

    
//     if (pokemonId.length === 1){
//         pokemonId = "00" + pokemonId
//     }else if (pokemonId.length === 2) {
//         pokemonId = "0" + pokemonId
//     }

//     return`
//         <div class="pokemon">
//         <p class="pokemon-id-back">#${pokemonId}</p>
//         <div class="pokemon-imagen">
//         <img
//             src="${obj.img}"
//             alt="${obj.name}"
//         />
//         </div>

//         <div class="pokemon-info">
//         <div class="nombre-contenedor">
//             <p class="pokemon-id">#${pokemonId}</p>
//             <h2 class="pokemon-nombre">${obj.name}</h2>
//         </div>

//         <div class="pokemon-tipos">
//          ${typeTemplate}
//         </div>

//         <div class="pokemon-stats">
//             <p class="stat">${obj.height}M</p>
//             <p class="stat">${obj.weight}KG</p>
//         </div>
//         </div>
//     </div>`

//   }
 
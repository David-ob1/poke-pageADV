import {displayElement} from './assets/imprimir.js'
import {cargarThemeLocalStorage , toggleTheme } from './assets/darkmodePersistence.js'
import {CardTemplate} from './assets/createCards.js'
// import {setpages,displayBtn} from "./assets/pageStorage.js"

const API = "https://pokeapi.co/api/v2/pokemon/"
const LIMIT = 20

const listaPokemon = document.getElementById("listaPokemon")
const sun = document.getElementById("light-mode")
const moon = document.getElementById("dark-mode")
const $btnPrev = document.getElementById("prev")
const $btnAct = document.getElementById("actual")
const $btnNext = document.getElementById("next")
let actualPage


let memory = localStorage.getItem("actualPage") 
memory ? actualPage = memory : actualPage = 1,localStorage.setItem("actualPage",actualPage)

actual.innerHTML = actualPage
// console.log(actualPage)


// displayBtn(btnObj,actualPage)
document.addEventListener("DOMContentLoaded", e =>{
    cargarThemeLocalStorage()
    // actualPage = setpages(btnObj,actualPage)

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

    // localStorage.setItem("actualPage",`${page}`) 
    
    const pokemons = await getPokemons(page)

    const arrayPokemons = pokemons.map( pokemon => {
        
        const {height, id, name, weight, sprites,types} = pokemon

       const obj = {
            id,
            height,
            name,
            weight,
            img:sprites.other["official-artwork"].front_default,
            types:types.map(type => type.type.name)
        } 
        return obj
    })
// console.log(arrayPokemons)

    let templateCards = ""

    arrayPokemons.forEach(pokemon => 
        templateCards += CardTemplate(pokemon)

    )
        
    // console.log(templateCards)
displayElement(listaPokemon,templateCards)


}
// console.log(actualPage)
mostarPokemons(actualPage)


$btnPrev.addEventListener("click",()=>{
    let page = Number(localStorage.getItem("actualPage"))
    console.log(page)
    let updatePage = page - 1
    if ( updatePage >= 1){
        localStorage.setItem("actualPage",updatePage)
        mostarPokemons(updatePage)
    }
    


})
$btnNext.addEventListener("click",()=>{
    console.log("hola")
    let page = Number(localStorage.getItem("actualPage"))
    console.log(page)
    let updatePage = page + 1
    localStorage.setItem("actualPage",updatePage)
    mostarPokemons(updatePage)

    
})

sun.addEventListener("click",toggleTheme)
moon.addEventListener("click",toggleTheme)


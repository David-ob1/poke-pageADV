const API = "https://pokeapi.co/api/v2/pokemon/"

const fetchPokemon  = async ()=>{

    const promises = []

    for(let i = 1; i<= 5;i++){
        promises.push(fetch(API + i)
                        .then(response => response.json()
                        .catch(error => console.log("hubo error pibe: " + error))
    
    ))
    }

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


            console.log(pokemon)
        
        })


    }catch (error){

        console.log(error)

 }


}

fetchPokemon()


const mostrarPokemon = (data) => {
    console.log(`Nombre: ${data.name}`);
    console.log(`ID: ${data.id}`);
    console.log(`Tipo: ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}`);
    // Aquí puedes agregar más información que desees mostrar
  };

export function CardTemplate (obj){
    // console.log(obj)
    const {types} = obj
    // console.log(types)

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
// export function setpages(btnObj,pageNumber){

//   let LoacalSNumber =  localStorage.getItem("actualPage")

//   if( LoacalSNumber ){
//       pageNumber = parseInt(LoacalSNumber)
//      displayBtn (btnObj,pageNumber)
//     // localStorage.setItem("actualPage",pageNumber) 

//   }else{
//       displayBtn(btnObj,1)
//       pageNumber = 1
//     // localStorage.setItem("actualPage",pageNumber) 

//   }

//   return pageNumber

// }


// export function displayBtn (btnObj,number){
//     console.log(btnObj)
//     const {$btnPrev,$btnAct,$btnNext} = btnObj

//     number <= 1  ? $btnPrev.style.opacity = 0
//     : $btnPrev.innerHTML = number - 1

//             console.log("llego "+ number)


//          $btnAct.textContent = number
//          $btnNext.textContent = number + 1

    




// }
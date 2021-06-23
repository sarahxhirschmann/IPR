// CLIENT

$( document ).ready((() => {
  // DOMContent is laoded, now we can start checking HTML Elements
  // If we dont "wait" for document to be ready, we cannot access HTML elements
  // for testing purposes, you can use a "debugger;" statement or also "console.log(element)"
  console.log('DOM is ready!')

removeButton();

}));
  //----------------------------------------------START: ADD RECIPES--------------------------------------------------------------



  function removeButton() {
    document.getElementById("pre").style.visibility = "hidden";
    document.getElementById("nxt").style.visibility = "hidden";
  }



function insertData (){
  const title = $('#title-input')
  const incredients = $('#incredients-input')
  const preparation = $('#prep-input')
  const books = getBookValues();
  console.log(books);
  saveData(title.val(), books, incredients.val(), preparation.val());
}


function saveData(title, books, incredients, preparation){
  if (title != null){
    fetch("/api/recipes", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        books,
        incredients,
        preparation,
      }),
    });
  }
}


function getBookValues(){
  //let book = "kein Buch ausgewählt";
  let book = 0;
  const mix = document.getElementById('mixed');
  const veggie = document.getElementById('vegetarian');
  const sweet = document.getElementById('sweets');

  if (mix.checked){
    book += "1"
  }
  if (veggie.checked){
    book += "2"
  }
  if (sweet.checked){
    book += "3"
  }
  return book
}
 //----------------------------------------------END: ADD RECIPES--------------------------------------------------------------


//------------------------------------------START: VIEW BY BOOKS--------------------------------------------------------------
var arr = []  
var i=0
var lengthCnt=0

  async function showDataBooks(id){
    //clear
    arr = []
    i=0
    lengthCnt = 0

    document.getElementById("nxt").style.visibility = "visible";

    //clear innerHTML
    document.getElementById('txtBook').innerHTML = '';

      const response = await fetch("/api/recipes", {
            method: "get",
            headers: {
              "Content-Type": "application/json"
            },
      });

      const data = await response.json();
      const buttonID = id

      //Count
      data.forEach(d =>{
        if (buttonID == "mixed" && (d.book == 1 || d.book == 12 || d.book == 123 || d.book == 13)){      
          lengthCnt++
        }
        if (buttonID == "veggie" && (d.book == 2 || d.book == 12 || d.book == 123 || d.book == 23)){      
          lengthCnt++
        }
        if (buttonID == "sweets" && (d.book == 3 || d.book == 13 || d.book == 123 || d.book == 23)){      
          lengthCnt++
        }
      });

      //addData
      data.forEach(d =>{
        if (buttonID == "mixed" && (d.book == 1 || d.book == 12 || d.book == 123 || d.book == 13)){      
              arr.push('<div class="row justify-content-center"><h3>Mixed Recipes</h3></div><div><h4>'+d.title+'</h4></div>'
              +'<div><h5>Incredients:</h5></div>'+'<div>'+d.incredients+'</div>'
              +'<div><h5>Preparation:</h5></div>'+'<div>'+d.preparation+'</div>')
          }
        if (buttonID == "veggie" && (d.book == 2 || d.book == 12 || d.book == 123 || d.book == 23)){      
            arr.push('<div class="row justify-content-center"><h3>Veggie Book</h3></div><div><h4>'+d.title+'</h4></div>'
            +'<div><h5>Incredients:</h5></div>'+'<div>'+d.incredients+'</div>'
            +'<div><h5>Preparation:</h5></div>'+'<div>'+d.preparation+'</div>')
        }
        if (buttonID == "sweets" && (d.book == 3 || d.book == 13 || d.book == 123 || d.book == 23)){      
              arr.push('<div class="row justify-content-center"><h3>Cakes and Sweets</h3></div><div><h4>'+d.title+'</h4></div>'
              +'<div><h5>Incredients:</h5></div>'+'<div>'+d.incredients+'</div>'
              +'<div><h5>Preparation:</h5></div>'+'<div>'+d.preparation+'</div>')
        }
      });

      insertDiv(0);
  }

  function prev(){
    
    if(i<2){
      document.getElementById("pre").style.visibility = "hidden";
    }
    if(i > 0){
      i--
      document.getElementById("nxt").style.visibility = "visible";
    } 
    insertDiv(i)
  }

  function next(){
    if(i<lengthCnt-1) {
        i++
        document.getElementById("pre").style.visibility = "visible";
    } 
    if(i==lengthCnt-1) {
      document.getElementById("nxt").style.visibility = "hidden";
    }
    insertDiv(i)
  }


  function insertDiv(j){
    document.getElementById('txtBook').innerHTML = arr[j];
  }






  

//------------------------------------------------------------END: VIEW BY BOOKS-------------------------------------------------------------------------------------




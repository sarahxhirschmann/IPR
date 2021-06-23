// CLIENT

$( document ).ready((() => {
  // DOMContent is laoded, now we can start checking HTML Elements
  // If we dont "wait" for document to be ready, we cannot access HTML elements
  // for testing purposes, you can use a "debugger;" statement or also "console.log(element)"
  console.log('DOM is ready!')
  getData();
}));
  //----------------------------------------------START: ADD RECIPES--------------------------------------------------------------



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

//-------------------------------------------------------START: VIEW ALL RECIPES-----------------------------------------------
//var arr1 = []
  async function getData() {
     
      //clear innerHTML
      document.getElementById('showText').innerHTML = '';
      // fetch table data
      const response = await fetch("/api/recipes", {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        },
      });
    
      // fill table
      const json = await response.json();
      json.forEach(elem => {
          document.getElementById('showTitle').innerHTML += '<button class="btn default" id="'+elem.ID+'" onclick="showData(this.id)">'+elem.title+'</button>'
          //arr1.push(elem.ID)
      });
    }


   async function showData(id){

    document.getElementById('showText').innerHTML = '';

      const response = await fetch("/api/recipes", {
            method: "get",
            headers: {
              "Content-Type": "application/json"
            },
      });

      const data = await response.json();
      const buttonID = id
      console.log(buttonID)
      
      data.forEach(e => {
            if (buttonID == e.ID){        
                document.getElementById('showText').innerHTML += '<div><h4>'+e.title+'</h4></div>'
                                                              +'<div><h5>Incredients:</h5></div>'+'<div>'+e.incredients+'</div>'
                                                              +'<div><h5>Preparation:</h5></div>'+'<div>'+e.preparation+'</div>';
              
              }
    });
  }
//---------------------------------------END: VIEW ALL RECIPES----------------------------------------------------------


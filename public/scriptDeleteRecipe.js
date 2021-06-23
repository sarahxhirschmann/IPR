// CLIENT

$( document ).ready((() => {
  // DOMContent is laoded, now we can start checking HTML Elements
  // If we dont "wait" for document to be ready, we cannot access HTML elements
  // for testing purposes, you can use a "debugger;" statement or also "console.log(element)"
  console.log('DOM is ready!')

}));




//-------------------------------------------------------START: VIEW ALL RECIPES-----------------------------------------------


var arr = []

async function getDataToDelete() {
     
      //clear innerHTML
      document.getElementById('showTitleToDelete').innerHTML = '';
      document.getElementById('showTextDelete').innerHTML = '';
      // fetch table data
      const response = await fetch("/api/recipes", {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        },
      });
    
      const title = $('#deleteTitle-input')

      const json = await response.json();
      json.forEach(elem => {

        if (title.val() == elem.title){
          document.getElementById('showTitleToDelete').innerHTML += '<input type="checkbox" id="'+elem.ID+'" onclick="showDataToDelete(this.id)"><label for="'+elem.ID+'">'+elem.title+'</label><br>'
          arr.push(elem.ID)
        } 
      });

    if (document.getElementById('showTitleToDelete').innerHTML == ""){
      document.getElementById('showTitleToDelete').innerHTML = '<p>Title could not be found. Please try again.</p>'
    }


    }


   async function showDataToDelete(id){

    document.getElementById('showTextDelete').innerHTML = '';

      const response = await fetch("/api/recipes", {
            method: "get",
            headers: {
              "Content-Type": "application/json"
            },
      });

      const data = await response.json();
      const cbxID = id
      const cbx = document.getElementById(cbxID)

      if(cbx.checked) {
      data.forEach(e => {
            if (cbxID == e.ID){        
                document.getElementById('showTextDelete').innerHTML += '<div><h4>'+e.title+'</h4></div>'
                                                              +'<div><h5>Incredients:</h5></div>'+'<div>'+e.incredients+'</div>'
                                                              +'<div><h5>Preparation:</h5></div>'+'<div>'+e.preparation+'</div>';
              
              }
    });
  }
  }




  async function deleteData(){

    arr.forEach(e => {
      const id = document.getElementById(e)
      console.log(e);
      if(id.checked){
        console.log("Test1");
        fetch("/api/recipes", {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            e,
          }),
        });
      }

    });
  }

//---------------------------------------END: VIEW ALL RECIPES----------------------------------------------------------


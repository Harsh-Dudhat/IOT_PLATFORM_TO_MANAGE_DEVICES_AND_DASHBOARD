function login() {
            
    let newObj = {
         "username" : document.getElementById('username').value,
         "password" : document.getElementById('password').value
     }

     fetch('http://localhost:8080/endpoint', {

         method: "POST",
         body:JSON.stringify({
             "FunctionName": "logintable",
             "ReqID": "725795",
             "InData":JSON.stringify(newObj)}),
         headers: { "Content-type": "application/json; hcarset=UTF-8" }
     })
         .then((response) => {
             
             return response.json();
         })
         .then(myJSON => {
            
             // console.log(myJSON);
              if (myJSON.Code == 000) {
                 window.open("../Index files/index.html", "_self");
             }
             else {
                 alert("invalid usename or password!")
             }
           

         })
         .catch(err => console.log(err));
     }
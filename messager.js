
var connexion=document.querySelector('#connexion');
var chat=document.querySelector('#chat');
var name=""
var tok=""
var email =""
var passwor =""
var connet=document.querySelector('#connect');
chat.style.display="none";

connexion.addEventListener('click', function(e){
    email =document.querySelector('#login').value;
    passwor =document.querySelector('#password').value;
   e.preventDefault()
   fetch("http://edu2.shareyourtime.fr/apijsv2/auth",{
    method:"POST",
    headers: {"Content-Type" : "application/x-www-form-urlencoded" },
    body :"email="+email+"&password="+passwor
    }).then((res) => {

            res.json().then((json) => {
              if (json.status==200) {
                name=email;
                tok=json.data.token;
               
                connet.style.display="none";
                chat.style.display="inline-block";
            }else{
                connet.style.display="inline-block";
                chat.style.display="none";
            }
})




})

console.log(this.status)








var liste=document.querySelector('#liste');
var send=document.querySelector('#envoyer');
setInterval(function(){

    fetch("http://edu2.shareyourtime.fr/apijsv2/messages",{
      method:"GET",
      headers: {Authorization :"Bearer "+tok}
  }).then(function(data){
   data.json().then(function(json){
      liste.innerHTML="";
      console.log(json);

      for (var i = json.data.length-1; i >=0; i--) {
        var li=document.createElement("li");
        var  message = json.data[i].message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        li.innerHTML+="<span><u>"+json.data[i].nickname+"</u><br></span><span> "+message+"<br><br></span>";
        liste.appendChild(li)

    }
    window.scrollTo(0,document.querySelector("#liste").scrollHeight);


})



} )


}, 500);


send.addEventListener('click', function() {

    var test=document.querySelector('#message').value;
    var nom=name;
    fetch("http://edu2.shareyourtime.fr/apijsv2/messages",{
        method:"POST",
        headers: {
          Authorization :"Bearer "+tok,
          "Content-Type" : "application/x-www-form-urlencoded"
      },
      body :"message="+test
  })


    document.querySelector('#message').value="";


}) 
function getToken(email, password,callback){

  fetch("http://edu2.shareyourtime.fr/apijsv2/messages",{
        method:"POST",
        headers: {
          "Content-Type" : "application/x-www-form-urlencoded"
      }, }).then((data)=> {
        data.json().then((json)=>{
          callback(json.data.token);
        })
      })
}

})
console.log(getToken(email,password,(tok)=>{
  console.log(tok)
}))





// setInterval(function(){

//         fetch("http://edu2.shareyourtime.fr/apijs/messages",{method:"GET"}).then(function(data){
//              data.json().then(function(json){
//               liste.innerHTML="";
//                  console.log(json);

//               for (var i = json.data.length-1; i >=0; i--) {
//                 var li=document.createElement("li");
//                var  message = json.data[i].message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
//                  li.innerHTML+="<span><u>"+json.data[i].nickname+"</u><br></span><span> "+message+"<br><br></span>";
//                  liste.appendChild(li)
//                   }

//              })



//           } )


// }, 500);
//           send.addEventListener('click', function() {
//              var test=document.querySelector('#message').value;
//               var nom=name;
//               fetch("http://edu2.shareyourtime.fr/apijs/messages",{method:"POST",
//                 headers: {"Content-Type" : "application/x-www-form-urlencoded" },
//                   body :"message="+test+"&nickname="+nom})

//                   console.log(this.status)

//                   document.querySelector('#message').value="";


//   }) 


//          
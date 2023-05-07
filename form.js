import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword,  createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";


 const firebaseConfig = {
    apiKey: "AIzaSyDeXUJuAkvu0-YDdFY8j2eQWWlA7ZTwRzQ",
    authDomain: "login-9e5bd.firebaseapp.com",
    projectId: "login-9e5bd",
    storageBucket: "login-9e5bd.appspot.com",
    messagingSenderId: "366576597503",
    appId: "1:366576597503:web:596f65ef042991c7e50fca"
 };

 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const database = getDatabase();


  document.getElementById("reg-btn").addEventListener('click', function(){
   document.getElementById("register-div").style.display="inline";
   document.getElementById("login-div").style.display="none";
});

document.getElementById("log-btn").addEventListener('click', function(){
 document.getElementById("register-div").style.display="none";
 document.getElementById("login-div").style.display="inline";

});

  document.getElementById("login-btn").addEventListener('click', function(){
   const loginEmail= document.getElementById("login-email").value;
   const loginPassword =document.getElementById("login-password").value;

   signInWithEmailAndPassword(auth, loginEmail, loginPassword)
  .then((userCredential) => {
    const user = userCredential.user;

    let lgdate = new Date();
    update(ref(database, 'users/' + user.uid), {
      last_login: lgdate,
    })

    .then(() => {
      // Data saved successfully!
      document.getElementById("result-box").style.display="inline";
      document.getElementById("login-div").style.display="none";
      document.getElementById("result").innerHTML="Welcome Back<br>"+loginEmail+" was Login Successfully";

    })

    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      document.getElementById("result-box").style.display="inline";
     document.getElementById("login-div").style.display="none";
     document.getElementById("result").innerHTML="Sorry ! <br>"+errorMessage;
    });

    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    document.getElementById("result-box").style.display="inline";
     document.getElementById("login-div").style.display="none";
     document.getElementById("result").innerHTML="Sorry ! <br>"+errorMessage;

  });
});


  document.getElementById("register-btn").addEventListener('click', function(){

   const registerEmail= document.getElementById("register-email").value;
   const registerPassword =document.getElementById("register-password").value;

   createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
  .then((userCredential) => {
    const user = userCredential.user;

    set(ref(database, 'users/' + user.uid), {
      email: registerEmail,
      password: registerPassword
    })

    .then(() => {
      // Data saved successfully!
     document.getElementById("result-box").style.display="inline";
     document.getElementById("register-div").style.display="none";
     document.getElementById("result").innerHTML="Welcome <br>"+registerEmail+" was Registered Successfully";

    })
        
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      document.getElementById("result-box").style.display="inline";
      document.getElementById("register-div").style.display="none";
      document.getElementById("result").innerHTML="Sorry ! <br>"+errorMessage;

    });
});


document.getElementById("log-out-btn").addEventListener('click', function(){
  signOut(auth).then(() => {
     document.getElementById("result-box").style.display="none";
       document.getElementById("login-div").style.display="inline";
  }).catch((error) => {
     document.getElementById("result").innerHTML="Sorry ! <br>"+errorMessage;
  });

});

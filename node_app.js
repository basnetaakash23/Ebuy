var firebaseConfig = {
    apiKey: "AIzaSyCwki_8ddB4QoP8Vz1AD5NhohFZStMjcO8",
    authDomain: "loginform-5b0b4.firebaseapp.com",
    databaseURL: "https://loginform-5b0b4.firebaseio.com",
    projectId: "loginform-5b0b4",
    storageBucket: "loginform-5b0b4.appspot.com",
    messagingSenderId: "188141154292",
    appId: "1:188141154292:web:04a412de09e0dc02f293a1",
    measurementId: "G-FMRDX5141Q"
  };

 // admin.initializeApp(config);

const firebase = require('firebase-admin');
var serviceAccount = require("./loginKey.json");
require("firebase/auth");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
  
});
var auth = firebase.auth();

let storage = firebase.firestore();

var express=require("express"); 
var bodyParser=require("body-parser"); 

var app=express();
app.use(express.static(__dirname));

app.get('/',function(req,res){ 
	res.set({ 
		'Access-control-Allow-Origin': '*'
		}); 
	return res.redirect('signup_login.html'); 
}).listen(3000) 
console.log("server listening at port 3000");

app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
	extended: true
}));



app.post('/sign_up', function(req,res){ 
	var emailid =req.body.email;
	var name = req.body.username; 
	var passw = req.body.password;
	//var pass = CryptoJS.AES.encrypt(req.body.password, "Ronaldo").toString();  
	 

	// var data = { 
	// 	"name": name, 
	// 	"email":email, 
	// 	"password":pass, 
	// 	"phone":phone 
	// } 
// db.collection('details').insertOne(data,function(err, collection){ 
// 		if (err) throw err; 
// 		console.log("Record inserted Successfully"); 
			
// 	});
	firebase.auth().createUser({
  		uid: name,
  		email: emailid,
  		pass: passw
})
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully created new user:', userRecord.uid);
  })
  .catch(function(error) {
    console.log('Error creating new user:', error);
  });

  

	// admin.auth().createUserWithEmailAndPassword(emailid, passw).catch(function(error) {
 //  // Handle Errors here.
 //  		var errorCode = error.code;
 //  		var errorMessage = error.message;
 //  // ...
	// });

	


	/*
	storage.collection("users").add({
		"name": name, 
		"email":email, 
		"password":pass 
		
    
  })
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    })
  .catch(function(error) {
    console.error("Error adding document: ", error);
  });

  */

  return res.redirect('/signup');
 });


app.post('/log_in', function(req,res){ 
	var userid =req.body.user_name;
	var passw = req.body.pass_word;
	console.log(userid);
	console.log(passw);
	//var pass = CryptoJS.AES.encrypt(req.body.password, "Ronaldo").toString();  
	 

	// var data = { 
	// 	"name": name, 
	// 	"email":email, 
	// 	"password":pass, 
	// 	"phone":phone 
	// } 
// db.collection('details').insertOne(data,function(err, collection){ 
// 		if (err) throw err; 
// 		console.log("Record inserted Successfully"); 
			
// 	});
	// firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
 //  // Handle Errors here.
 //  		var errorCode = error.code;
 //  		var errorMessage = error.message;
 //  // ...
	// });


//   firebase.auth().importUsers([{
//   	uid: userid,
//   	pass: passw

// 	}]
  
// )
//   .then(function(results) {
//   	console.log(results);
//     // results.errors.forEach(function(indexedError) {
//     // 	console.log('Error importing user ' + indexedError.index);
//     // 	return res.redirect('/');
//     // });
//     return res.redirect('/');
//   })
//   .catch(function(error) {
//     console.log('Error importing users:', error);
//     return res.redirect('/');
//   });


	firebase.auth().getUser(userid)
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully fetched user data:', userRecord.toJSON());
  })
  .catch(function(error) {
    console.log('Error fetching user data:', error);
  });

});





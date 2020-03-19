var firebase = require("firebase");

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

  firebase.initializeApp(firebaseConfig);

const admin = require('firebase-admin');
var serviceAccount = require("./loginKey.json");
require("firebase/auth");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
  
});
var auth = admin.auth();

let storage = admin.firestore();

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
	
	firebase.auth().createUserWithEmailAndPassword(emailid, passw).then(function(user){
		var user = firebase.auth().currentUser;
		User.create({email: user.emailid, password: password, credits: 10000.00});
		console.log(user.email);
		res.send(user);
	}).

	catch(function(error) {
  // Handle Errors here.
  		var errorCode = error.code;
  		var errorMessage = error.message;
  // ...
	});

  return res.redirect('/signup');
 });


app.post('/log_in', function(req,res){ 
	var userid =req.body.user_name;
	var passw = req.body.pass_word;

	firebase.auth().signInWithEmailAndPassword(userid, passw).catch(function(error) {
  // Handle Errors here.
  		var errorCode = error.code;
  		var errorMessage = error.message;
  // ...
	});

	firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
         console.log(user.email);
         res.redirect('signin_success.html');
         postdata(user.email);
      // User is signed in.
      } else {
      // No user is signed in.
      }
   });

   console.log(req.body.user_name);
   console.log("HTTP POST Request");
   //res.send("200");


  admin.auth().createCustomToken(userid)
  	.then(function(customToken) {
    // Send token back to client
  	})
  	.catch(function(error) {
    	console.log('Error creating custom token:', error);
  	});

});


function postdata(email){
	var email_ = email;

	app.post('/info', function(req, res){

		var fullname = req.body.full_name;
		var phonenumber = req.body.phone_number;
		var laptop = req.body.laptop;
		var docRef = storage.collection('users').doc(email_);
		var setData = docRef.set({
			FullName: fullname,
			PhoneNumber: phonenumber,
			Laptop: laptop
		});
		res.send("200");
});

}








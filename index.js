var correctAnswers = 0;
var count, dbRefCount, dbRefCorrectAnswers;
var db = firebase.database();
var flag = 'false';
var userId, i,j,k,l,m,n,o,p,q,r;

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
  
        document.getElementById("user-div").style.display = "block"; //Warning div will be visible
        document.getElementById("login_div").style.display = "none";
  
        var user = firebase.auth().currentUser;
        var userId = firebase.auth().currentUser.uid;
        
        if(user != null) {
            
            dbRefCount = db.ref('Responses/' + userId + '/Count');
            dbRefCorrectAnswers = db.ref('Responses/' + userId + '/Correct_Answers');

            var email_id = user.email;
            document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;    
        }
    } 
    else {
      // No user is signed in.
    
        document.getElementById("user-div").style.display = "none";
        document.getElementById("login_div").style.display = "block";
    
    }
});
  
  
function login(){
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
            window.alert('Wrong password.');
        } 
        else {
            window.alert("Error : " + errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
        
    });
}

function register() {
    document.getElementById('register_div').style.display = "block";
    document.getElementById('login_div').style.display = "none";
}

function handleSignUp() {
    var userEmail = document.getElementById("email").value;
    var userPass = document.getElementById("password").value;
    var userName = document.getElementById('name').value;
    var rollNumber = document.getElementById('roll-number').value;
    console.log(rollNumber);

    if (userEmail.length < 4) {
        window.alert('Please enter a valid email address.');
        return;
    }
    if (userPass.length < 4) {
        window.alert('Please enter a password.');
        return;
    }
    // Sign in with email and pass.
    // [START createwithemail]
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass)
    .then(user => {
        var userId = firebase.auth().currentUser.uid;
        console.log(userId);
        document.getElementById('warning-div').style.display = "block";
        document.getElementById('register_div').style.display = "none";
        return db.ref('Responses/' + userId ).set({
            Correct_Answers: 0,
            Count: 0,
            Name: userName,
            Roll_Number: rollNumber,
            email: userEmail,
            uid: userId
        });
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
            window.alert('The password is too weak.');
        } 
        else {
            window.alert("Error : " + errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
    });
    // [END createwithemail]
}


function logout(){
    firebase.auth().signOut();
}


function enterContest() {

    console.log(firebase.auth().currentUser.uid);
    //Retrieve the value of COUNT and store it in a variable 'count' and parseInt() it
    dbRefCount.on('value', snap => {count = snap.val();
        console.log(count);
        if(count==0) { 
            count++;
            flag = 'true'; //has entered for the first time
            document.getElementById('warning-div').style.display = "none";
            document.getElementById('question-1').style.display = "block";
            i = 30;
            timer1();
            dbRefCount.set(count);
        }
    
        else if(count==1 && flag=='true') {
            document.getElementById('warning-div').style.display = "none";
            document.getElementById('failure-div').style.display = "none";
            document.getElementById('question-1').style.display = "block";
        }

        else if(count==1 && flag=='false') {
            document.getElementById('warning-div').style.display = "none";
            document.getElementById('failure-div').style.display = "block";
        }
    });
}

function timer1() {
    document.getElementById('timer-1').innerHTML = i;
    console.log("timer1() running");
    i=i-1;
    if(i==0) {
        console.log("timer1() stopped");
        next1();
    }
    else if(i>0) {
        setTimeout(timer1,1000);
        document.getElementById('next-1').addEventListener("click",
        function(){
            i=-1;
            console.log("Next Button Clicked");
            return;
        });
    }
}
function timer2() {
    document.getElementById('timer-2').innerHTML = j;
    console.log("timer2() running");
    j=j-1;
    if(j==0) {
        console.log("timer2() stopped");
        next2();
    }
    else if(j>0) {
        setTimeout(timer2,1000);
        document.getElementById('next-2').addEventListener("click",
        function(){
            j=-1;
            console.log("Next Button Clicked");
            return;
        });
    }  
}
function timer3() {
    document.getElementById('timer-3').innerHTML = k;
    console.log("timer3() running");
    k=k-1;
    if(k==0){ 
        console.log("timer3() stopped");
        next3();
    }
    else if(k>0) {
        setTimeout(timer3,1000);
        document.getElementById('next-3').addEventListener("click",
        function(){
            k=-1;
            console.log("Next Button Clicked");
            return;
        });
    }
}
function timer4() {
    document.getElementById('timer-4').innerHTML = l;
    console.log("timer4() running");
    l--;
    if(l==0){ 
        console.log("timer4() stopped");
        next4();
    }
    else if(l>0) {
        setTimeout(timer4,1000);
        document.getElementById('next-4').addEventListener("click",
        function(){
            l=-1;
            console.log("Next Button Clicked");
            return;
        });
    }
    
}
function timer5() {
    document.getElementById('timer-5').innerHTML = m;
    console.log("timer5() running");
    m--;
    if(m==0) {
        console.log("timer5() stopped");
        next5();
    }
    else if(m>0) {
        setTimeout(timer5,1000);
        document.getElementById('next-5').addEventListener("click",
        function(){
            m=-1;
            console.log("Next Button Clicked");
            return;
        });
    }
}
function timer6() {
    document.getElementById('timer-6').innerHTML = n;
    console.log("timer6() running");
    n--;
    if(n==0) { 
        console.log("timer6() stopped");
        next6();
    }
    else if(n>0) {
        setTimeout(timer6,1000);
        document.getElementById('next-6').addEventListener("click",
        function(){
            n=-1;
            console.log("Next Button Clicked");
            return;
        });
    }
}
function timer7() {
    document.getElementById('timer-7').innerHTML = o;
    console.log("timer7() running");
    o--;
    if(o==0) { 
        console.log("timer7() stopped");
        next7();
    }
    else if(o>0) {
        setTimeout(timer7,1000);
        document.getElementById('next-7').addEventListener("click",
        function(){
            o=-1;
            console.log("Next Button Clicked");
            return;
        });
    }
}
function timer8() {
    document.getElementById('timer-8').innerHTML = p;
    console.log("timer8() running");
    p--;
    if(p==0) {
        console.log("timer8() stopped");
        next8();
    }
    else if(p>0) {
        setTimeout(timer8,1000);
        document.getElementById('next-8').addEventListener("click",
        function(){
            p=-1;
            console.log("Next Button Clicked");
            return;
        });
    }
}
function timer9() {
    document.getElementById('timer-9').innerHTML = q;
    console.log("timer9() running");
    q--;
    if(q==0) {
        console.log("timer9() stopped");
        next9();
    }
    else if(q>0) {
        setTimeout(timer9,1000);
        document.getElementById('next-9').addEventListener("click",
        function(){
            q=-1;
            console.log("Next Button Clicked");
            return;
        });
    }
}
function timer10() {
    document.getElementById('timer-10').innerHTML = r;
    console.log("timer10() running");
    r--;
    if(r==0) {
        console.log("timer10() stopped");
        finishContest();
    }    
    else if(r>0) {
        setTimeout(timer10,1000);
        document.getElementById('next-10').addEventListener("click",
        function(){
            r=-1;
            console.log("Next Button Clicked");
            return;
        });
    }
}


function next1() {
    correctAnswers = 0;
    var ans1 = '';
    var response1 = document.getElementsByName('response-1');
    for(var i = 0; i < response1.length; i++) {
        if(response1[i].checked) {
            ans1 = response1[i].value;
        }
    }
    if(ans1 == 'b')
        correctAnswers++;
    dbRefCorrectAnswers.set(correctAnswers);
    document.getElementById('question-1').style.display = "none";
    document.getElementById('question-2').style.display = "block";
    j = 30;
    timer2();
}
function next2() {
    var ans2 = '';
    var response2 = document.getElementsByName('response-2');
    for(var i = 0; i < response2.length; i++) {
        if(response2[i].checked) {
            ans2 = response2[i].value;
        }
    }
    if(ans2 == 'a')
        correctAnswers++;
    dbRefCorrectAnswers.set(correctAnswers);
    document.getElementById('question-2').style.display = "none";
    document.getElementById('question-3').style.display = "block";
    k = 30;
    timer3();
}
function next3() {
    var ans3 = '';
    var response3 = document.getElementsByName('response-3');
    for(var i = 0; i < response3.length; i++) {
        if(response3[i].checked) {
            ans3 = response3[i].value;
        }
    }
    if(ans3 == 'b')
        correctAnswers++;
    dbRefCorrectAnswers.set(correctAnswers);
    document.getElementById('question-3').style.display = "none";
    document.getElementById('question-4').style.display = "block";
    l = 30;
    timer4();
}
function next4() {
    var ans4 = '';
    var response4 = document.getElementsByName('response-4');
    for(var i = 0; i < response4.length; i++) {
        if(response4[i].checked) {
            ans4 = response4[i].value;
        }
    }
    if(ans4 == 'd')
        correctAnswers++;
    dbRefCorrectAnswers.set(correctAnswers);
    document.getElementById('question-4').style.display = "none";
    document.getElementById('question-5').style.display = "block";
    m = 30;
    timer5();
       
}
function next5() {
    var ans5 = ''; 
    var response5 = document.getElementsByName('response-5');
    for(var i = 0; i < response5.length; i++) {
        if(response5[i].checked) {
            ans5 = response5[i].value;
        }
    }
    if(ans5 == 'c')
        correctAnswers++;
    dbRefCorrectAnswers.set(correctAnswers);
    document.getElementById('question-5').style.display = "none";
    document.getElementById('question-6').style.display = "block";
    n = 30;
    timer6();
        
}
function next6() {
    var ans6 = '';
    var response6 = document.getElementsByName('response-6');
    for(var i = 0; i < response6.length; i++) {
        if(response6[i].checked) {
            ans6 = response6[i].value;
        }
    }
    if(ans6 == 'd')
        correctAnswers++;
    dbRefCorrectAnswers.set(correctAnswers);
    document.getElementById('question-6').style.display = "none";
    document.getElementById('question-7').style.display = "block";
    o = 30;
    timer7();
}
function next7() {
    var ans7 = '';
    var response7 = document.getElementsByName('response-7');
    for(var i = 0; i < response7.length; i++) {
        if(response7[i].checked) {
            ans7 = response7[i].value;
        }
    }
    if(ans7 == 'a')
        correctAnswers++;
    dbRefCorrectAnswers.set(correctAnswers);
    document.getElementById('question-7').style.display = "none";
    document.getElementById('question-8').style.display = "block";
    p = 30;
    timer8();
       
}
function next8() {
    var ans8 = '';
    var response8 = document.getElementsByName('response-8');
    for(var i = 0; i < response8.length; i++) {
        if(response8[i].checked) {
            ans8 = response8[i].value;
        }
    }
    if(ans8 == 'b')
        correctAnswers++;
    dbRefCorrectAnswers.set(correctAnswers);
    document.getElementById('question-8').style.display = "none";
    document.getElementById('question-9').style.display = "block";
    q = 30;
    timer9();
}
function next9() {
    var ans9 = '';
    var response9 = document.getElementsByName('response-9');
    for(var i = 0; i < response9.length; i++) {
        if(response9[i].checked) {
            ans9 = response9[i].value;
        }
    }
    if(ans9 == 'c')
        correctAnswers++;
    dbRefCorrectAnswers.set(correctAnswers);
    document.getElementById('question-9').style.display = "none";
    document.getElementById('question-10').style.display = "block";
    r = 30;
    timer10();
}


function finishContest() {
    var ans10 = '';
    var response10 = document.getElementsByName('response-10');
    for(var i = 0; i < response10.length; i++) {
        if(response10[i].checked) {
            ans10 = response10[i].value;
        }
    }
    if(ans10 == 'c')
        correctAnswers++;
    dbRefCorrectAnswers.set(correctAnswers);
    document.getElementById('question-10').style.display = "none";
    document.getElementById('finish-div').style.display = "block";

    document.getElementById('correct-answers').innerHTML = correctAnswers; 
     
}

/*
function prev2() {
    document.getElementById('question-2').style.display = "none";
    document.getElementById('question-1').style.display = "block";
}

function prev3() {
    document.getElementById('question-3').style.display = "none";
    document.getElementById('question-2').style.display = "block";
}
function prev4() {
    document.getElementById('question-4').style.display = "none";
    document.getElementById('question-3').style.display = "block";
}
function prev5() {
    document.getElementById('question-5').style.display = "none";
    document.getElementById('question-4').style.display = "block";
}
function prev6() {
    document.getElementById('question-6').style.display = "none";
    document.getElementById('question-5').style.display = "block";
}
function prev7() {
    document.getElementById('question-7').style.display = "none";
    document.getElementById('question-6').style.display = "block";
}
function prev8() {
    document.getElementById('question-8').style.display = "none";
    document.getElementById('question-7').style.display = "block";
}
function prev9() {
    document.getElementById('question-9').style.display = "none";
    document.getElementById('question-8').style.display = "block";
}
function prev10() {
    document.getElementById('question-10').style.display = "none";
    document.getElementById('question-9').style.display = "block";
}
*/
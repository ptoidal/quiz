//Home page
function openAdminPage() {
    window.open("https://synopede.pw/COMP351/indv_proj/admin.html");
}

function openStudentPage() {
    window.open("https://synopede.pw/COMP351/indv_proj/student.html");
}


//Admin page and Student page
function increase_size( el ) {
    el.style.height = "0px";
    el.style.height = el.scrollHeight+"px";
}

function goBack() {
    window.location.href="home.html";
}




let index; // initialize as Starting_index + 1 from DB
let answers = [];
let q_ids = [];



//initially hide student page
//in case there are no questions
function hideInitially() {
    
    let el;
    el = document.getElementById("submitButton");
    el.style.visibility = "hidden";
    el = document.getElementById("q1");
    el.style.visibility = "hidden";

    //fill student page with questions
    getQuestionsFromDB();
}


//unhide student page
//in case there are no questions
function unhideSTUDENTPage() {
    
    let el;
    el = document.getElementById("submitButton");
    el.style.visibility = "visible";
    el = document.getElementById("q1");
    el.style.visibility = "visible";

}




//Receive questions from DB
function getQuestionsFromDB() {
    
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'https://synopede.pw/COMP351/indv_proj/read_quizDB', true); //true means asynchronous
    xhttp.send();


    xhttp.onreadystatechange = function () {
        
        if (this.readyState == 4 && this.status == 200) {   

            let parsed = JSON.parse(this.responseText);
            
            
            //create the webpage
            if ( document.title == "Admin" )
                createADMINPage( parsed );
            if ( document.title == "Student" ) {
                unhideSTUDENTPage();
                createSTUDENTPage( parsed );
            }
            
            
            // when we add a new question we will use this starting index
            if ( parsed.Starting_index === null ) {
                index = 1;
            }
            else {
                index = parsed.Starting_index + 1;
            }
            
        }
    };
}






//fill the admin page with questions, answers and buttons
function createADMINPage(parsed) {
    
    if ( parsed.Starting_index === null ) {
        return; //no questions saved
    }
    
    let i;
    for (i=0; i<parsed.rawDB.length; i++) {
        
        fillTextAreasADMIN(
            i+1,
            parsed.rawDB[i].q,
            parsed.rawDB[i].c1,
            parsed.rawDB[i].c2,
            parsed.rawDB[i].answer,
            parsed.rawDB[i].c3,
            parsed.rawDB[i].c4
        );
        
        duplicateDiv(i+2,true); //next question with buttons
        
        answers.push( parsed.rawDB[i].answer ); //keep track of number of questions
        q_ids.push( parsed.rawDB[i].q_id ); //keep track of q_ids for editing and deletion


    }
    
    
    //prepare a blank question at the end
    fillTextAreasADMIN( parsed.rawDB.length + 1,"","","","","","" );
    document.getElementById('r1_'+ (parsed.rawDB.length + 1) ).checked = false;
    document.getElementById('r2_'+ (parsed.rawDB.length + 1) ).checked = false;
    document.getElementById('r3_'+ (parsed.rawDB.length + 1) ).checked = false;
    document.getElementById('r4_'+ (parsed.rawDB.length + 1) ).checked = false;


}









//fill the student page with questions
function createSTUDENTPage(parsed) {
    
    let el;

    
    //there is no quiz available
    if ( parsed.Starting_index === null ) {
        document.getElementById("noQuizFound").innerHTML = "No questions saved!  Create a quiz on the Admin page.";

        el = document.getElementById("q1");
        el.parentNode.removeChild(el);  //remove question
        el = document.getElementById("submitButton");
        el.parentNode.removeChild(el);  //remove submit button
        return; //no questions saved
    }
    

    

    //fill questions
    let i;
    for (i=0; i<parsed.rawDB.length; i++) {
        
        if ( i != parsed.rawDB.length-1 )  //do not create a blank question at the end
            duplicateDiv(i+2,false); //create blank next question without buttons
        
        fillTextAreasSTUDENT(
            i+1,
            parsed.rawDB[i].q,
            parsed.rawDB[i].c1,
            parsed.rawDB[i].c2,
            parsed.rawDB[i].c3,
            parsed.rawDB[i].c4
        );
        
        answers.push( parsed.rawDB[i].answer ); //create answer sheet

    }
    
    
    //make textareas readonly
    let textAreas = document.getElementsByTagName("textarea");
    for (i=0; i<textAreas.length; i++) {
        document.getElementsByTagName("textarea")[i].readOnly = "true";
    }
    
    
    
    //create SUBMIT button
    let orig = document.getElementById("submitButton");
    let clone = orig.cloneNode();
    clone.id = "submitButton_1";
    clone.innerHTML = "Submit";
    document.body.appendChild(clone);
    
    el = document.getElementById("submitButton");
    el.parentNode.removeChild(el);  //remove submit button at top
    

}






//duplicate the question div
//i is the "Question #"
//I.E. i=2 is for "Question 2"
function duplicateDiv(i,addButtons) {
    

    //create new div to store question in
    let div = document.createElement("div");
    div.id = "q"+i;
    
    //function to create break in HTML
    function br() {
        div.appendChild( document.createElement("br") ); 
    }


    //these two variables will be reused multiple times
    let orig;
    let clone;

    //add "Question #"
    orig = document.getElementById("q_num_1");
    clone = orig.cloneNode(true);
    clone.id = "q_num_" + i;
    clone.innerHTML = "Question " + i;
    div.appendChild(clone);
    
    //add question description
    orig = document.getElementById("q_desc_1");
    clone = orig.cloneNode(true);
    clone.id = "q_desc_" + i;
    div.appendChild(clone);
    
    br(); // same as <br/>
    br(); // same as <br/>

    


    //add four radio buttons and four text areas
    let y;
    for (y=1; y<5; y++) {
    
        //add radio button
        orig = document.getElementById("r"+y+"_1");
        clone = orig.cloneNode(true);
        clone.id = "r"+y+"_" + i;
        clone.name = "radio_" + i;
        div.appendChild(clone);
    
        //add text area
        orig = document.getElementById("ta"+y+"_1");
        clone = orig.cloneNode(true);
        clone.id = "ta"+y+"_" + i;
        clone.name = "ta_" + i;
        div.appendChild(clone);
        
            br(); // same as <br/>
    }
    
    


    
    
    //Let's add the three buttons now
    //if the parameter addButtons is TRUE
    //we also need to remove the ADD button from the previous question
    if ( addButtons ) {
    
        //add ADD button    
        orig = document.getElementById( "add_"+(i-1) );
        clone = orig.cloneNode(true);
        clone.id = "add_" + i;
        div.appendChild(clone);
        
        //add SAVE CHANGES button
        orig = document.getElementById("save_1");
        clone = orig.cloneNode(true);
        clone.id = "save_" + i;
        div.appendChild(clone);
        
        //add DELETE button
        orig = document.getElementById("del_1");
        clone = orig.cloneNode(true);
        clone.id = "del_" + i;
        div.appendChild(clone);
        
        //remove ADD button from previous question
        let el;
        el = document.getElementById( "add_"+(i-1) );
        el.parentNode.removeChild(el);

    }
    
    
    //add duplicate div to body
    document.body.appendChild(div);

}









//fill in the Questions on the Admin page
//i is the "Question #"
//I.E. i=2 is for "Question 2"
function fillTextAreasADMIN(i,q,c1,c2,answer,c3,c4) {
    
    document.getElementById("q_desc_"+i).value = q; //fill in question description
    document.getElementById("ta1_"+i).value = c1; //fill in first choice
    document.getElementById("ta2_"+i).value = c2; //fill in second choice
    
    //check for third choice            
    if ( c3 !== null )
        document.getElementById("ta3_"+i).value = c3;
    else
        document.getElementById("ta3_"+i).value = null;

    //check for fourth choice
    if ( c4 !== null )
        document.getElementById("ta4_"+i).value = c4;
    else
        document.getElementById("ta4_"+i).value = null;
    
    
    //fill in the radio button
    if ( answer==1 )
        document.getElementById('r1_'+i).checked = true;
    else if ( answer==2 )
        document.getElementById('r2_'+i).checked = true;
    else if ( answer==3 )
        document.getElementById('r3_'+i).checked = true;
    else if ( answer==4 )
        document.getElementById('r4_'+i).checked = true;

}







//fill in the Questions on the Student page
//i is the "Question #"
//I.E. i=2 is for "Question 2"
function fillTextAreasSTUDENT(i,q,c1,c2,c3,c4) {
    
    document.getElementById("q_desc_"+i).innerHTML = q; //fill in question description
    document.getElementById("ta1_"+i).innerHTML = c1; //fill in first choice
    document.getElementById("ta2_"+i).innerHTML = c2; //fill in second choice
    
    let el;
    
    //check for third choice            
    if ( c3 !== null )
        document.getElementById("ta3_"+i).innerHTML = c3;
    else { 
        el = document.getElementById("ta3_"+i);
        el.parentNode.removeChild(el);  //remove third textarea
        el = document.getElementById("r3_"+i);
        el.parentNode.removeChild(el);  //remove third radio button
    }

    
    //check for fourth choice
    if ( c4 !== null )
        document.getElementById("ta4_"+i).innerHTML = c4;
    else {
        el = document.getElementById("ta4_"+i);
        el.parentNode.removeChild(el);  //remove fourth text area
        el = document.getElementById("r4_"+i);
        el.parentNode.removeChild(el);  //remove fourth radio button
    }

}








//marks the quiz on the STUDENT page
//note we have an array called answers
function markQuiz() {
    
    let i, noOfRightAnswers;
    noOfRightAnswers = 0;
    
    for (i=0; i<answers.length; i++) {
        if ( document.getElementById( 'r'+answers[i]+'_'+ (i+1) ).checked == true )
            noOfRightAnswers++;
    }
    
    window.alert("Your grade is: "+noOfRightAnswers+"/"+answers.length);

}










function validateInput(x,q,c1,c2,c3,c4) {
    
    //ensure the question description is filled
    if ( q == "" ) {
        window.alert("Please enter a description for the question.");
        return [];
    }
    
    //ensure top two choices are filled
    if ( c1 == "" || c2 == "") {
        window.alert("Please fill in at least two choices, starting with the first two text boxes.");
        return [];
    }

    //see if c3 has a value
    if ( !c3 ) {
        c3 = null;
    }
    
    //see if c4 has a value
    if ( !c4 ) {
        c4 = null;
    }
    
    //textbox 4 filled but not textbox 3
    if ( c4 && c3 === null ) {
        window.alert("The fourth text box is filled, but not the third text box.");
        return [];
    }
    

    //ensure a radio button is selected
    //and set answer variable
    if (document.getElementById('r1_'+x).checked) {
        answer = 1;
    }
    else if (document.getElementById('r2_'+x).checked) {
        answer = 2;
    }
    else if (document.getElementById('r3_'+x).checked) {
        //check if text box 3 is empty
        if ( !c3 ) {
            window.alert("Radio button 3 selected, but there is no answer in the third text box.");
            return [];
        }
        answer = 3;
    }
    else if (document.getElementById('r4_'+x).checked) {
        //check if text box 4 is empty
        if ( !c4 ) {
            window.alert("Radio button 4 selected, but there is no answer in the fourth text box.");
            return [];
        }
        answer = 4;
    }
    else {
        window.alert("Please select a radio button.");
        return [];
    }    
    
    
    
    
    //escape single quotes and double quotes
    q = q.replace(/'/g, "\\'");
    q = q.replace(/"/g, "\\\"");
    c1 = c1.replace(/'/g, "\\'");
    c1 = c1.replace(/"/g, "\\\"");
    c2 = c2.replace(/'/g, "\\'");
    c2 = c2.replace(/"/g, "\\\"");
    if ( c3 ) {
        c3 = c3.replace(/'/g, "\\'");
        c3 = c3.replace(/"/g, "\\\"");
    }
    if ( c4 ) {
        c4 = c4.replace(/'/g, "\\'");
        c4 = c4.replace(/"/g, "\\\"");
    }
    
    
    
    //input is valid
    return [q,c1,c2,answer,c3,c4];
    
    
}










function addQuestion() {
    
    //we need to validate input
    
    let q_id,q,c1,c2,answer,c3,c4;
    let x = answers.length + 1; //we will use this for "Question #"

    q = document.getElementById("q_desc_"+x).value;
    c1 = document.getElementById("ta1_"+x).value;
    c2 = document.getElementById("ta2_"+x).value;
    c3 = document.getElementById("ta3_"+x).value;
    c4 = document.getElementById("ta4_"+x).value;
    
    let validatedArray;
    validatedArray = validateInput(x,q,c1,c2,c3,c4);
    
    if ( validatedArray.length == 0 ) {
        return; //input is not valid
    }
    
    
    //input is valid
    q = validatedArray[0];
    c1 = validatedArray[1];
    c2 = validatedArray[2];
    answer = validatedArray[3];
    c3 = validatedArray[4];
    c4 = validatedArray[5];
    
    
    
    //input is validated
    //let's send the data to the server
    const xhttp = new XMLHttpRequest();
    const data = JSON.stringify( {"q_id":index, "q":q, "c1":c1, "c2":c2, "answer":answer, "c3":c3, "c4":c4} );


    xhttp.open('POST', 'https://synopede.pw/COMP351/indv_proj/addQuestion', data);
    xhttp.responseType = 'json';
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(data);
    
    

    //update answers and next index    
    q_id = index;
    index++;
    answers.push(answer);
    q_ids.push(q_id);
    
    
    //create next blank question
    duplicateDiv(index,true); //next question with buttons
    fillTextAreasADMIN( answers.length + 1,"","","",0,"","" );
    document.getElementById('r1_'+ (answers.length + 1) ).checked = false;
    document.getElementById('r2_'+ (answers.length + 1) ).checked = false;
    document.getElementById('r3_'+ (answers.length + 1) ).checked = false;
    document.getElementById('r4_'+ (answers.length + 1) ).checked = false;

    
}












function saveQuestion(id) {
    
    //we need to validate input
    let q_id,q,c1,c2,answer,c3,c4;
    
    
    //grab q_id from array
    let x = id; //save_#
    x = x.substring(5,);  //just the # from save_#
    q_id = q_ids[x-1];
    
    //make sure we aren't saving changes to a question that doesn't exist
    if ( x == answers.length+1 ) {
        window.alert("Cannot save changes to a question that doesn't exist.  Use the ADD button first.");
        return;
    }
    
    
    q = document.getElementById("q_desc_"+x).value;
    c1 = document.getElementById("ta1_"+x).value;
    c2 = document.getElementById("ta2_"+x).value;
    c3 = document.getElementById("ta3_"+x).value;
    c4 = document.getElementById("ta4_"+x).value;
    
    let validatedArray;
    validatedArray = validateInput(x,q,c1,c2,c3,c4);
    
    if ( validatedArray.length == 0 ) {
        return; //input is not valid
    }
    
    
    //input is valid
    q = validatedArray[0];
    c1 = validatedArray[1];
    c2 = validatedArray[2];
    answer = validatedArray[3];
    c3 = validatedArray[4];
    c4 = validatedArray[5];
    
    
    
    //input is validated
    //let's send the updated data to the server
    const xhttp = new XMLHttpRequest();
    const data = JSON.stringify( {"q_id":q_id, "q":q, "c1":c1, "c2":c2, "answer":answer, "c3":c3, "c4":c4} );


    xhttp.open('PUT', 'https://synopede.pw/COMP351/indv_proj/addQuestion', true);
    xhttp.responseType = 'json';
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(data);
    
    
}








function deleteQuestion(id) {
    
    //grab q_id from array
    let q_id;
    let x = id; //del_#
    x = x.substring(4,);  //just the # from del_#
    q_id = q_ids[x-1];
    
    //make sure we aren't deleting a question that doesn't exist
    if ( x == answers.length+1 ) {
        window.alert("Cannot delete a question that doesn't exist.  Use the ADD button first.");
        return;
    }

    
    const xhttp = new XMLHttpRequest();
    const data = JSON.stringify( {"q_id":q_id} );

    xhttp.open('DELETE', 'https://synopede.pw/COMP351/indv_proj/addQuestion', true);
    xhttp.responseType = 'json';
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(data);
    
    
    // refresh the page
    location.reload();

}








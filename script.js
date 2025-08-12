const form = document.getElementById('form');
const nameInput = document.getElementById('studentName');
const idInput = document.getElementById('studentId');
const gradeInput = document.getElementById('studentGrade');
const subjectInput = document.getElementById('subject');
const table = document.querySelector('table');


//add student to array of object
let studentArray = [];
let studentIDLibrary = {};

//function to add student
function addStudent(event)
{
  event.preventDefault();

  const studentName = nameInput.value.trim();
  const studentId= parseInt(idInput.value.trim());
  const studentGrade = gradeInput.value.trim();
  const studentGradeInt = parseInt(studentGrade);
  const subject = subjectInput.value;
  let student_GradeLetter = "";

  switch(Math.floor(studentGradeInt/10)) {
    case 0: case 1: case 2: case 3: case 4: case 5:
      student_GradeLetter = "F";
      break;
    case 6:
      student_GradeLetter = "D";
      break;
    case 7:
      student_GradeLetter = "C";
      break;
    case 8:
      student_GradeLetter = "B";
      break;
    case 9: case 10:
      student_GradeLetter = "A";
      break;
  }


//condition to create object
  if(studentName && studentId && studentGrade && student_GradeLetter && subject)
  {
  const studentObject = {
    name: studentName,
    id : studentId,
    grade : studentGrade,
    gradeletter : student_GradeLetter,
    sub: subject
  };

   studentArray.push(studentObject);
   displayStudent();

   nameInput.value = "";
   idInput.value = "";
   gradeInput = "";
   subjectInput = "";

  
   nameInput.focus();
  }
  
  else{
    alert('Please enter all the required fields.')
  }
}

  /*
  //add student id to library for uniqueness check
  if(studentId) {
    studentIDLibrary[studentId] = true;
  }

//add grade letter to student object
  if(studentGrade < 0 || studentGrade > 100) {  
    alert('Please enter a valid grade between 0 and 100.');
    return;
  }

//validate studentid for uniqueness
  if(studentId in studentIDLibrary) {
    alert('This student ID already exists. Please enter a unique ID.');
    return;
  }
}
*/

//function to update displayed list
function displayStudent(){
  outputList.innerHTML = "";

  if(studentArray.length === 0){
    outputList.innerHTML = "<tr><td colspan='7' id='defaultText'>No student data entered yet.</td></tr>";
    return;
  }

  studentArray.forEach((item,index) => {
      const listItem = document.createElement('tr');
      listItem.innerHTML = `<td>${index + 1}.</td> <td class="items">${item.name}</td> <td class="items">${item.id}</td>
       <td class="items">${item.grade}</td> <td> ${item.gradeletter} </td> <td class="items">${item.sub}</td> 
      <td class="items"><button id="deleteBtn" onclick="removeStudent(${index})">Delete</button></td>`;
  
      outputList.appendChild(listItem);
    });

}

//form submit event
form.addEventListener('submit', addStudent)

displayStudent();

//function to delete student list
function removeStudent(index) {
  studentArray.splice(index, 1);
  displayStudent();
}





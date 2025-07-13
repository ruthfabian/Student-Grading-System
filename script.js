const form = document.getElementById('form');
const nameInput = document.getElementById('studentName');
const idInput = document.getElementById('studentId');
const gradeInput = document.getElementById('studentGrade');
const subjectInput = document.getElementById('subject');
const outputList = document.getElementById('outputList');

//add student to array of object
let studentArray = [];

function addStudent(event)
{
  event.preventDefault();

  const studentName = nameInput.value.trim();
  const studentId= parseInt(idInput.value.trim());
  const studentGrade = parseInt(gradeInput.value.trim());
  const subject = subjectInput.value;

//condition to create object
  if(studentName && studentId && studentGrade && subject)
  {
  const studentObject = {
    name: studentName,
    id : studentId,
    grade : studentGrade,
    sub: subject
  };

   studentArray.push(studentObject);
   updateDisplay();

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

//function to update displayed list
function updateDisplay(){
  outputList.innerHTML = "";

  if(studentArray.length === 0){
    outputList.innerHTML = "<p>No student data entered yet.</p>";
    return;
  }

  studentArray.forEach((item,index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${index + 1}.</strong> ${item.name}
    ${item.id} ${item.grade} ${item.sub}`;

    outputList.appendChild(listItem);
  });

}

//form submit event
form.addEventListener('submit', addStudent)

updateDisplay();


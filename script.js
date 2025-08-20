// Array to store student objects
let students = [];

// DOM elements
const form = document.getElementById("form");
const studentName = document.getElementById("studentName");
const studentId = document.getElementById("studentId");
const studentGrade = document.getElementById("studentGrade");
const subject = document.getElementById("subject");
const idError = document.getElementById("idError");
const gradeError = document.getElementById("gradeError");
const outputList = document.getElementById("outputList");
const btnSubmit = document.getElementById("btn1");
const btnStats = document.getElementById("btn2");
const statisticsArea = document.getElementById("statisticsArea");

// Convert numeric grade to letter grade
function getLetterGrade(grade) {
    if (grade >= 90) return "A";
    else if (grade >= 80) return "B";
    else if (grade >= 70) return "C";
    else if (grade >= 60) return "D";
    else return "F";
}

// Validate input fields
function validateInput() {
    let valid = true;

    // Name validation
    if (studentName.value.trim() === "") {
        studentName.style.border = "1px solid red";
        valid = false;
    } else {
        studentName.style.border = "";
    }

    // ID validation
    const duplicate = students.some(s => s.id === studentId.value.trim());
    if (studentId.value.trim() === "" || studentId.value <= 0) {
        idError.textContent = "Enter a valid ID.";
        studentId.style.border = "";
        valid = false;
    } else if (duplicate) {
        idError.textContent = "This Student ID already exists.";
        studentId.style.border = "1px solid red";
        valid = false;
    } else {
        idError.textContent = "";
        studentId.style.border = "";
    }

    // Grade validation
    if (studentGrade.value === "" || studentGrade.value < 0 || studentGrade.value > 100) {
        gradeError.textContent = "Grade must be between 0 and 100.";
        studentGrade.style.border = "";
        valid = false;
    } else {
        gradeError.textContent = "";
        studentGrade.style.border = "";
    }

    // Subject validation
    if (subject.value === "~Select Subject~") {
        subject.style.border = "";
        valid = false;
    } else {
        subject.style.border = "";
    }

    btnSubmit.disabled = !valid;
    return valid;
}

// Add student
function addStudent(e) {
    e.preventDefault();
    if (!validateInput()) return;

    const newStudent = {
        name: studentName.value.trim(),
        id: studentId.value.trim(),
        grade: Number(studentGrade.value),
        subject: subject.value,
        letterGrade: getLetterGrade(Number(studentGrade.value))
    };

    students.push(newStudent);
    displayStudents();
    form.reset();
    btnSubmit.disabled = true;
}

// Display students in table
function displayStudents() {
    outputList.innerHTML = "";
    students.forEach((student, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.grade}</td>
            <td>${student.letterGrade}</td>
            <td>${student.subject}</td>
            <td><button onclick="removeStudent(${index})" id="deleteBtn">Remove</button></td>
        `;
        outputList.appendChild(row);
    });
}

// Remove student
function removeStudent(index) {
    students.splice(index, 1);
    displayStudents();
}

// Calculate statistics
function calculateStats() {
    if (students.length === 0) {
        statisticsArea.innerHTML = "<p>No students to calculate statistics.</p>";
        return;
    }
    // Group students by subject

    const subjects = {};

    students.forEach(stu => {

        if (!subjects[stu.subject]) {

            subjects[stu.subject] = [];

        }

        subjects[stu.subject].push(stu);

    });

    // Clear previous stats before recalculating
    statisticsArea.innerHTML = "";
    
    
      // Loop through each subject and calculate stats

    for (const subj in subjects) {

        const list = subjects[subj];

        let total = 0;

        let highest = -Infinity;

        let lowest = Infinity;

        let letterCount = { A: 0, B: 0, C: 0, D: 0, F: 0 };

        let passCount = 0;

        let failCount = 0;

        list.forEach(stu => {

            total += stu.grade;

            if (stu.grade > highest) highest = stu.grade;

            if (stu.grade < lowest) lowest = stu.grade;

            let letter = getLetterGrade(stu.grade);

            letterCount[letter]++;

            if (stu.grade >= 60) passCount++;

            else failCount++;

        });

        const avg = (total / list.length).toFixed(2);

        // Display per subject stats
        const div = document.createElement("div");

        div.innerHTML = `

            <h3>${subj} Statistics</h3>

            <p>Average Grade: ${avg}</p>

            <p>Highest Grade: ${highest}</p>

            <p>Lowest Grade: ${lowest}</p>

            <p>Letter Counts: A(${letterCount.A}), B(${letterCount.B}), C(${letterCount.C}), D(${letterCount.D}), F(${letterCount.F})</p>

            <p>Pass: ${passCount}, Fail: ${failCount}</p>


        `;
      
      statisticsArea.appendChild(div);
      }
       

  
}

// Event listeners
form.addEventListener("submit", addStudent);
studentName.addEventListener("input", validateInput);
studentId.addEventListener("input", validateInput);
studentGrade.addEventListener("input", validateInput);
subject.addEventListener("change", validateInput);
btnStats.addEventListener("click", calculateStats);

```javascript
// ===============================
// STUDENT MANAGEMENT JAVASCRIPT
// ===============================


// Display all students
function displayStudents(studentList = null) {

    const table = document.getElementById("studentsTable");
    const noStudents = document.getElementById("noStudents");

    if (!table) {
        return;
    }

    const students = studentList || getStudents();

    table.innerHTML = "";

    if (students.length === 0) {

        if (noStudents) {
            noStudents.style.display = "block";
        }

        return;
    }

    if (noStudents) {
        noStudents.style.display = "none";
    }


    students.forEach(function(student) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.id}</td>

            <td>
                <strong>${student.name}</strong>
            </td>

            <td>${student.email}</td>

            <td>${student.course}</td>

            <td>${student.year}</td>

            <td>
                <span class="attendance">
                    ${student.attendance}%
                </span>
            </td>

            <td>
                <span class="status ${student.status.toLowerCase()}">
                    ${student.status}
                </span>
            </td>

            <td>

                <button
                    class="action-btn edit-btn"
                    onclick="editStudent(${student.id})"
                >
                    Edit
                </button>

                <button
                    class="action-btn delete-btn"
                    onclick="deleteStudent(${student.id})"
                >
                    Delete
                </button>

            </td>
        `;

        table.appendChild(row);

    });

}


// ===============================
// SEARCH AND FILTER
// ===============================

function searchStudents() {

    const searchInput = document.getElementById("searchInput");
    const courseFilter = document.getElementById("courseFilter");

    const searchText = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    const selectedCourse = courseFilter
        ? courseFilter.value
        : "";


    const students = getStudents();


    const filteredStudents = students.filter(function(student) {

        const matchesSearch =
            student.name.toLowerCase().includes(searchText) ||
            student.email.toLowerCase().includes(searchText) ||
            student.course.toLowerCase().includes(searchText);


        const matchesCourse =
            selectedCourse === "" ||
            student.course === selectedCourse;


        return matchesSearch && matchesCourse;

    });


    displayStudents(filteredStudents);

}


// ===============================
// DELETE STUDENT
// ===============================

function deleteStudent(id) {

    const students = getStudents();

    const student = students.find(function(item) {
        return item.id === id;
    });


    if (!student) {
        return;
    }


    const confirmed = confirm(
        "Are you sure you want to delete " +
        student.name +
        "?"
    );


    if (!confirmed) {
        return;
    }


    const updatedStudents = students.filter(function(item) {
        return item.id !== id;
    });


    saveStudents(updatedStudents);

    displayStudents();

    alert("Student deleted successfully.");

}


// ===============================
// EDIT STUDENT
// ===============================

function editStudent(id) {

    const students = getStudents();

    const student = students.find(function(item) {
        return item.id === id;
    });


    if (!student) {
        return;
    }


    const newName = prompt(
        "Enter student name:",
        student.name
    );


    if (newName === null || newName.trim() === "") {
        return;
    }


    const newEmail = prompt(
        "Enter student email:",
        student.email
    );


    if (newEmail === null || newEmail.trim() === "") {
        return;
    }


    student.name = newName.trim();
    student.email = newEmail.trim();


    saveStudents(students);

    displayStudents();

    alert("Student updated successfully.");

}


// ===============================
// ADD STUDENT
// ===============================

function addStudent(event) {

    event.preventDefault();


    const students = getStudents();


    // Generate new student ID
    let newId = 1001;


    if (students.length > 0) {

        const ids = students.map(function(student) {
            return Number(student.id);
        });

        newId = Math.max(...ids) + 1;
    }


    const student = {

        id: newId,

        name: document.getElementById("name").value.trim(),

        email: document.getElementById("email").value.trim(),

        phone: document.getElementById("phone").value.trim(),

        dob: document.getElementById("dob").value,

        course: document.getElementById("course").value,

        year: document.getElementById("year").value,

        attendance: Number(
            document.getElementById("attendance").value
        ),

        status: document.getElementById("status").value

    };


    // Validate student name
    if (student.name === "") {

        alert("Please enter student name.");

        return;
    }


    // Validate email
    if (student.email === "") {

        alert("Please enter student email.");

        return;
    }


    // Validate course
    if (student.course === "") {

        alert("Please select a course.");

        return;
    }


    // Validate year
    if (student.year === "") {

        alert("Please select academic year.");

        return;
    }


    // Validate attendance
    if (
        student.attendance < 0 ||
        student.attendance > 100
    ) {

        alert("Attendance must be between 0 and 100.");

        return;
    }


    students.push(student);

    saveStudents(students);


    alert(
        "Student added successfully!\n\n" +
        "Student ID: " + newId
    );


    window.location.href = "students.html";

}


// ===============================
// FORM SUBMIT
// ===============================

const studentForm = document.getElementById("studentForm");


if (studentForm) {

    studentForm.addEventListener(
        "submit",
        addStudent
    );

}


// ===============================
// LOAD STUDENTS PAGE
// ===============================

if (document.getElementById("studentsTable")) {

    displayStudents();

}

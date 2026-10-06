const defaultStudents = [
    {
        name: "Rahul Sharma",
        course: "Computer Science",
        year: "3rd Year",
        status: "Active"
    },
    {
        name: "Ananya Rao",
        course: "Information Technology",
        year: "2nd Year",
        status: "Active"
    },
    {
        name: "Arjun Kumar",
        course: "Data Science",
        year: "3rd Year",
        status: "Active"
    }
];

function getStudents() {
    const data = localStorage.getItem("students");

    if (!data) {
        localStorage.setItem("students", JSON.stringify(defaultStudents));
        return defaultStudents;
    }

    return JSON.parse(data);
}

function displayDashboardStudents() {
    const students = getStudents();

    const total = document.getElementById("totalStudents");
    const table = document.getElementById("recentStudents");

    if (total) {
        total.textContent = students.length;
    }

    if (table) {
        table.innerHTML = "";

        students.slice(-5).reverse().forEach(student => {
            table.innerHTML += `
                <tr>
                    <td>${student.name}</td>
                    <td>${student.course}</td>
                    <td>${student.year}</td>
                    <td>
                        <span class="status">${student.status}</span>
                    </td>
                </tr>
            `;
        });
    }
}

function toggleTheme() {
    document.body.classList.toggle("dark");
}

function clearStudents() {
    const confirmDelete = confirm(
        "Are you sure you want to delete all student records?"
    );

    if (confirmDelete) {
        localStorage.removeItem("students");
        location.reload();
    }
}

displayDashboardStudents();
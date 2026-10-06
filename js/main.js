/* =========================================
   STUDENTHUB - MAIN JAVASCRIPT
   ========================================= */


/* ---------- DEFAULT STUDENTS ---------- */

const defaultStudents = [

    {
        id: 1001,
        name: "Rahul Sharma",
        email: "rahul@example.com",
        phone: "9876543210",
        dob: "2004-05-12",
        course: "Computer Science",
        year: "3rd Year",
        attendance: 91,
        status: "Active"
    },

    {
        id: 1002,
        name: "Ananya Rao",
        email: "ananya@example.com",
        phone: "9876543211",
        dob: "2005-02-20",
        course: "Information Technology",
        year: "2nd Year",
        attendance: 87,
        status: "Active"
    },

    {
        id: 1003,
        name: "Arjun Kumar",
        email: "arjun@example.com",
        phone: "9876543212",
        dob: "2004-09-10",
        course: "Data Science",
        year: "3rd Year",
        attendance: 84,
        status: "Active"
    },

    {
        id: 1004,
        name: "Priya Nair",
        email: "priya@example.com",
        phone: "9876543213",
        dob: "2003-01-18",
        course: "Artificial Intelligence",
        year: "4th Year",
        attendance: 94,
        status: "Graduated"
    },

    {
        id: 1005,
        name: "Karan Mehta",
        email: "karan@example.com",
        phone: "9876543214",
        dob: "2005-06-22",
        course: "Cyber Security",
        year: "2nd Year",
        attendance: 72,
        status: "Active"
    },

    {
        id: 1006,
        name: "Sneha Shetty",
        email: "sneha@example.com",
        phone: "9876543215",
        dob: "2004-11-08",
        course: "Computer Science",
        year: "3rd Year",
        attendance: 96,
        status: "Active"
    }

];


/* ---------- GET STUDENTS ---------- */

function getStudents() {

    const storedStudents =
        localStorage.getItem("students");

    if (storedStudents) {

        try {

            return JSON.parse(storedStudents);

        } catch (error) {

            console.error(
                "Unable to read student data:",
                error
            );

        }

    }


    localStorage.setItem(
        "students",
        JSON.stringify(defaultStudents)
    );


    return defaultStudents;
}


/* ---------- SAVE STUDENTS ---------- */

function saveStudents(students) {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

}


/* ---------- THEME ---------- */

function toggleTheme() {

    document.body.classList.toggle("dark");

    const isDark =
        document.body.classList.contains("dark");

    localStorage.setItem(
        "studentHubTheme",
        isDark ? "dark" : "light"
    );

    updateThemeButton();

}


function loadTheme() {

    const savedTheme =
        localStorage.getItem("studentHubTheme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

    }

    updateThemeButton();

}


function updateThemeButton() {

    const buttons =
        document.querySelectorAll(".theme-btn");

    const isDark =
        document.body.classList.contains("dark");


    buttons.forEach(function(button) {

        button.textContent =
            isDark ? "☀️" : "🌙";

    });

}


/* ---------- SIDEBAR ---------- */

function toggleSidebar() {

    const sidebar =
        document.querySelector(".sidebar");

    if (sidebar) {

        sidebar.classList.toggle("open");

    }

}


/* ---------- CURRENT DATE ---------- */

function displayCurrentDate() {

    const dateElement =
        document.getElementById("currentDate");

    if (!dateElement) {
        return;
    }


    const today = new Date();


    const options = {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric"
    };


    dateElement.textContent =
        today.toLocaleDateString(
            "en-IN",
            options
        );

}


/* ---------- DASHBOARD STATISTICS ---------- */

function displayDashboardStats() {

    const students = getStudents();


    const total =
        students.length;


    const active =
        students.filter(function(student) {

            return student.status === "Active";

        }).length;


    const graduated =
        students.filter(function(student) {

            return student.status === "Graduated";

        }).length;


    let averageAttendance = 0;


    if (students.length > 0) {

        const totalAttendance =
            students.reduce(
                function(sum, student) {

                    return sum +
                        Number(student.attendance || 0);

                },
                0
            );


        averageAttendance =
            Math.round(
                totalAttendance / students.length
            );

    }


    setText(
        "totalStudents",
        total
    );

    setText(
        "activeStudents",
        active
    );

    setText(
        "graduatedStudents",
        graduated
    );

    setText(
        "averageAttendance",
        averageAttendance + "%"
    );


    setText(
        "bannerStudents",
        total
    );

    setText(
        "bannerAttendance",
        averageAttendance + "%"
    );


    setText(
        "attendanceValue",
        averageAttendance + "%"
    );


    updateAttendanceCircle(
        averageAttendance
    );


    displayAttendanceDetails(
        students
    );

}


/* ---------- SET TEXT ---------- */

function setText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {

        element.textContent = value;

    }

}


/* ---------- RECENT STUDENTS ---------- */

function displayDashboardStudents() {

    const table =
        document.getElementById(
            "recentStudents"
        );


    if (!table) {
        return;
    }


    const emptyMessage =
        document.getElementById(
            "dashboardEmpty"
        );


    const students =
        getStudents();


    table.innerHTML = "";


    if (students.length === 0) {

        if (emptyMessage) {

            emptyMessage.style.display =
                "block";

        }

        return;
    }


    if (emptyMessage) {

        emptyMessage.style.display =
            "none";

    }


    const recentStudents =
        [...students]
            .reverse()
            .slice(0, 5);


    recentStudents.forEach(
        function(student) {

            const row =
                document.createElement("tr");


            const attendance =
                Number(
                    student.attendance || 0
                );


            const attendanceClass =
                attendance >= 75
                    ? "attendance-good"
                    : "attendance-low";


            const statusClass =
                getStatusClass(
                    student.status
                );


            row.innerHTML = `

                <td>
                    <strong>
                        #${student.id}
                    </strong>
                </td>

                <td>
                    <span class="student-name">
                        ${escapeHTML(student.name)}
                    </span>

                    <span class="student-email">
                        ${escapeHTML(student.email)}
                    </span>
                </td>

                <td>
                    ${escapeHTML(student.course)}
                </td>

                <td>
                    ${escapeHTML(student.year)}
                </td>

                <td>
                    <span class="${attendanceClass}">
                        ${attendance}%
                    </span>
                </td>

                <td>
                    <span class="status-badge ${statusClass}">
                        ${escapeHTML(student.status)}
                    </span>
                </td>

            `;


            table.appendChild(row);

        }
    );

}


/* ---------- STATUS CLASS ---------- */

function getStatusClass(status) {

    if (status === "Active") {

        return "status-active";

    }


    if (status === "Graduated") {

        return "status-graduated";

    }


    return "status-inactive";

}


/* ---------- COURSE DISTRIBUTION ---------- */

function displayCourseDistribution() {

    const container =
        document.getElementById(
            "courseDistribution"
        );


    if (!container) {
        return;
    }


    const students =
        getStudents();


    container.innerHTML = "";


    if (students.length === 0) {

        container.innerHTML =
            `<p class="empty-message"
                style="display:block;">
                No course data available.
            </p>`;

        return;
    }


    const courseCounts = {};


    students.forEach(
        function(student) {

            const course =
                student.course || "Other";


            if (!courseCounts[course]) {

                courseCounts[course] = 0;

            }


            courseCounts[course]++;

        }
    );


    const courses =
        Object.entries(courseCounts)
            .sort(
                function(a, b) {

                    return b[1] - a[1];

                }
            );


    courses.forEach(
        function(item) {

            const course =
                item[0];

            const count =
                item[1];


            const percentage =
                Math.round(
                    (count / students.length) *
                    100
                );


            const wrapper =
                document.createElement("div");


            wrapper.className =
                "course-item";


            wrapper.innerHTML = `

                <div class="course-info">

                    <span>
                        ${escapeHTML(course)}
                    </span>

                    <strong>
                        ${count}
                    </strong>

                </div>

                <div class="progress-bar">

                    <div
                        class="progress-fill"
                        style="width:${percentage}%"
                    ></div>

                </div>

            `;


            container.appendChild(wrapper);

        }
    );

}


/* ---------- ATTENDANCE DETAILS ---------- */

function displayAttendanceDetails(students) {

    const goodElement =
        document.getElementById(
            "goodAttendance"
        );


    const lowElement =
        document.getElementById(
            "lowAttendance"
        );


    if (!goodElement || !lowElement) {
        return;
    }


    const good =
        students.filter(
            function(student) {

                return Number(
                    student.attendance || 0
                ) >= 75;

            }
        ).length;


    const low =
        students.length - good;


    goodElement.textContent =
        good;


    lowElement.textContent =
        low;

}


/* ---------- ATTENDANCE CIRCLE ---------- */

function updateAttendanceCircle(value) {

    const circle =
        document.getElementById(
            "attendanceCircle"
        );


    if (!circle) {
        return;
    }


    const degrees =
        Math.round(
            (value / 100) * 360
        );


    circle.style.background =
        `conic-gradient(
            #2563eb 0deg,
            #2563eb ${degrees}deg,
            #e8edf4 ${degrees}deg,
            #e8edf4 360deg
        )`;

}


/* ---------- ESCAPE HTML ---------- */

function escapeHTML(value) {

    if (value === null ||
        value === undefined) {

        return "";

    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* ---------- CLEAR STUDENTS ---------- */

function clearStudents() {

    const confirmed =
        confirm(
            "Are you sure you want to remove all student data?"
        );


    if (!confirmed) {
        return;
    }


    localStorage.removeItem("students");


    location.reload();

}


/* ---------- INITIALIZE ---------- */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadTheme();

        displayCurrentDate();

        displayDashboardStats();

        displayDashboardStudents();

        displayCourseDistribution();

    }
);
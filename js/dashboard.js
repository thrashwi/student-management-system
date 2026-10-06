<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StudentHub - Analytics</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="topbar">

    <div class="logo">Student<span>Hub</span></div>

    <nav>
        <a href="index.html">Dashboard</a>
        <a href="students.html">Students</a>
        <a href="add-student.html">Add Student</a>
        <a href="courses.html">Courses</a>
    </nav>

    <button class="theme-btn" onclick="toggleTheme()">🌙</button>

</header>

<main class="container">

    <div class="page-heading">

        <div>
            <p class="small-title">ANALYTICS</p>
            <h1>Student Analytics</h1>
            <p>Overview of student information.</p>
        </div>

    </div>

    <section class="analytics-grid">

        <div class="card">
            <h2>Course Distribution</h2>

            <div class="progress-item">
                <div>
                    <span>Computer Science</span>
                    <strong>32%</strong>
                </div>
                <div class="progress">
                    <div style="width:32%"></div>
                </div>
            </div>

            <div class="progress-item">
                <div>
                    <span>Information Technology</span>
                    <strong>25%</strong>
                </div>
                <div class="progress">
                    <div style="width:25%"></div>
                </div>
            </div>

            <div class="progress-item">
                <div>
                    <span>Data Science</span>
                    <strong>20%</strong>
                </div>
                <div class="progress">
                    <div style="width:20%"></div>
                </div>
            </div>

            <div class="progress-item">
                <div>
                    <span>Artificial Intelligence</span>
                    <strong>15%</strong>
                </div>
                <div class="progress">
                    <div style="width:15%"></div>
                </div>
            </div>

        </div>

        <div class="card">

            <h2>Attendance Overview</h2>

            <div class="attendance-circle">
                <strong>87%</strong>
                <span>Average Attendance</span>
            </div>

        </div>

    </section>

</main>

<script src="js/main.js"></script>

</body>
</html>
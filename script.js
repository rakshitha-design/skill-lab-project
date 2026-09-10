// ======================================================
// ATTENDANCE MANAGEMENT SYSTEM
// Complete Frontend JavaScript
// ======================================================


// ======================================================
// 1. DEFAULT DATA
// ======================================================

const defaultStudents = [
    {
        id: "01",
        name: "Rahul",
        className: "CSE - 3",
        present: 7,
        absent: 1,
        late: 0,
        total: 8
    },
    {
        id: "02",
        name: "Priya",
        className: "CSE - 3",
        present: 7,
        absent: 1,
        late: 0,
        total: 8
    },
    {
        id: "03",
        name: "Arun",
        className: "CSE - 3",
        present: 5,
        absent: 2,
        late: 1,
        total: 8
    },
    {
        id: "04",
        name: "Sneha",
        className: "CSE - 3",
        present: 7,
        absent: 1,
        late: 0,
        total: 8
    }
];


const defaultTeachers = [
    {
        id: "T01",
        name: "Mr. Kumar",
        department: "CSE",
        classes: 3
    },
    {
        id: "T02",
        name: "Ms. Priya",
        department: "ECE",
        classes: 2
    },
    {
        id: "T03",
        name: "Mr. Arun",
        department: "ME",
        classes: 2
    },
    {
        id: "T04",
        name: "Ms. Sneha",
        department: "CSE",
        classes: 3
    }
];


// ======================================================
// 2. LOCAL STORAGE
// ======================================================

function getStudents() {

    const savedStudents =
        localStorage.getItem("attendanceStudents");

    if (savedStudents) {
        return JSON.parse(savedStudents);
    }

    localStorage.setItem(
        "attendanceStudents",
        JSON.stringify(defaultStudents)
    );

    return defaultStudents;
}


function saveStudents(students) {

    localStorage.setItem(
        "attendanceStudents",
        JSON.stringify(students)
    );

}


function getTeachers() {

    const savedTeachers =
        localStorage.getItem("attendanceTeachers");

    if (savedTeachers) {
        return JSON.parse(savedTeachers);
    }

    localStorage.setItem(
        "attendanceTeachers",
        JSON.stringify(defaultTeachers)
    );

    return defaultTeachers;
}


// ======================================================
// 3. LOGIN
// ======================================================

const loginForm =
    document.getElementById("loginForm");

const loginPage =
    document.getElementById("loginPage");

const dashboard =
    document.getElementById("dashboard");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const username =
                document.getElementById("username")
                .value
                .trim();

            const password =
                document.getElementById("password")
                .value
                .trim();


            if (username === "" || password === "") {

                alert(
                    "Please enter username and password."
                );

                return;
            }


            /*
             * DEMO LOGIN
             *
             * Username: admin
             * Password: admin123
             *
             * You can change these later when
             * connecting MongoDB/backend.
             */

            if (
                username === "admin" &&
                password === "admin123"
            ) {

                localStorage.setItem(
                    "loggedIn",
                    "true"
                );

                localStorage.setItem(
                    "loggedUser",
                    username
                );

                loginPage.style.display = "none";

                dashboard.style.display = "flex";

                showPage("dashboardHome");

                updateDashboard();

                alert(
                    "Login successful!"
                );

            } else {

                alert(
                    "Invalid username or password.\n\n" +
                    "Demo Login:\n" +
                    "Username: admin\n" +
                    "Password: admin123"
                );

            }

        }
    );

}


// ======================================================
// 4. CHECK LOGIN WHEN PAGE LOADS
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const loggedIn =
            localStorage.getItem("loggedIn");

        if (loggedIn === "true") {

            loginPage.style.display = "none";

            dashboard.style.display = "flex";

            showPage("dashboardHome");

            updateDashboard();

        } else {

            loginPage.style.display = "flex";

            dashboard.style.display = "none";

        }


        renderStudents();

        renderTeachers();

        renderReports();

        updateTodayAttendance();

    }
);


// ======================================================
// 5. PAGE NAVIGATION
// ======================================================

function showPage(pageId) {

    const pages =
        document.querySelectorAll(".page");


    pages.forEach(function (page) {

        page.classList.remove("active");

    });


    const selectedPage =
        document.getElementById(pageId);


    if (selectedPage) {

        selectedPage.classList.add("active");

    }


    // Refresh page data whenever opened

    if (pageId === "dashboardHome") {

        updateDashboard();

    }

    if (pageId === "students") {

        renderStudents();

    }

    if (pageId === "teachers") {

        renderTeachers();

    }

    if (pageId === "today") {

        updateTodayAttendance();

    }

    if (pageId === "records") {

        renderRecords();

    }

    if (pageId === "reports") {

        renderReports();

    }

}


// ======================================================
// 6. LOGOUT
// ======================================================

function logout() {

    const confirmation =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmation) {
        return;
    }


    localStorage.removeItem(
        "loggedIn"
    );

    localStorage.removeItem(
        "loggedUser"
    );


    dashboard.style.display = "none";

    loginPage.style.display = "flex";


    loginForm.reset();

}


// ======================================================
// 7. STUDENT TABLE
// ======================================================

function renderStudents() {

    const tableBody =
        document.querySelector(
            "#students tbody"
        );


    if (!tableBody) {
        return;
    }


    const students =
        getStudents();


    tableBody.innerHTML = "";


    students.forEach(function (student) {

        const percentage =
            calculatePercentage(
                student.present,
                student.total
            );


        const row =
            document.createElement("tr");


        row.innerHTML = `
            <td>${student.id}</td>

            <td>${student.name}</td>

            <td>${student.className}</td>

            <td>${percentage}%</td>
        `;


        tableBody.appendChild(row);

    });

}


// ======================================================
// 8. STUDENT SEARCH
// ======================================================

const studentSearch =
    document.querySelector(
        "#students .search-box input"
    );


if (studentSearch) {

    studentSearch.addEventListener(
        "input",
        function () {

            const searchText =
                this.value
                    .toLowerCase()
                    .trim();


            const rows =
                document.querySelectorAll(
                    "#students tbody tr"
                );


            rows.forEach(function (row) {

                const rowText =
                    row.textContent
                        .toLowerCase();


                if (
                    rowText.includes(
                        searchText
                    )
                ) {

                    row.style.display = "";

                } else {

                    row.style.display = "none";

                }

            });

        }
    );

}


// ======================================================
// 9. TEACHER TABLE
// ======================================================

function renderTeachers() {

    const tableBody =
        document.querySelector(
            "#teachers tbody"
        );


    if (!tableBody) {
        return;
    }


    const teachers =
        getTeachers();


    tableBody.innerHTML = "";


    teachers.forEach(function (teacher) {

        const row =
            document.createElement("tr");


        row.innerHTML = `
            <td>${teacher.id}</td>

            <td>${teacher.name}</td>

            <td>${teacher.department}</td>

            <td>${teacher.classes}</td>
        `;


        tableBody.appendChild(row);

    });

}


// ======================================================
// 10. TEACHER SEARCH
// ======================================================

const teacherSearch =
    document.querySelector(
        "#teachers .search-box input"
    );


if (teacherSearch) {

    teacherSearch.addEventListener(
        "input",
        function () {

            const searchText =
                this.value
                    .toLowerCase()
                    .trim();


            const rows =
                document.querySelectorAll(
                    "#teachers tbody tr"
                );


            rows.forEach(function (row) {

                const rowText =
                    row.textContent
                        .toLowerCase();


                if (
                    rowText.includes(
                        searchText
                    )
                ) {

                    row.style.display = "";

                } else {

                    row.style.display = "none";

                }

            });

        }
    );

}


// ======================================================
// 11. MARK ATTENDANCE
// ======================================================

function saveAttendance() {

    const rows =
        document.querySelectorAll(
            "#mark tbody tr"
        );


    if (rows.length === 0) {

        alert(
            "No students available."
        );

        return;
    }


    let presentCount = 0;

    let absentCount = 0;

    let lateCount = 0;


    const students =
        getStudents();


    rows.forEach(function (row, index) {

        const radioButtons =
            row.querySelectorAll(
                'input[type="radio"]'
            );


        let status = "Present";


        if (
            radioButtons.length >= 2
        ) {

            if (
                radioButtons[1].checked
            ) {

                status = "Absent";

            }

        }


        if (status === "Present") {

            presentCount++;

        } else {

            absentCount++;

        }


        // Update student data

        if (students[index]) {

            students[index].total++;

            if (status === "Present") {

                students[index].present++;

            } else {

                students[index].absent++;

            }

        }

    });


    saveStudents(students);


    // Save today's attendance

    const todayData = {

        date: getSelectedDate(),

        present: presentCount,

        absent: absentCount,

        late: lateCount,

        total:
            presentCount +
            absentCount +
            lateCount

    };


    localStorage.setItem(
        "todayAttendance",
        JSON.stringify(todayData)
    );


    updateDashboard();

    updateTodayAttendance();

    renderStudents();

    renderRecords();

    renderReports();


    alert(
        "Attendance saved successfully!\n\n" +

        "Present: " +
        presentCount +

        "\nAbsent: " +
        absentCount +

        "\nLate: " +
        lateCount +

        "\nTotal: " +
        todayData.total
    );

}


// ======================================================
// 12. GET SELECTED DATE
// ======================================================

function getSelectedDate() {

    const dateInput =
        document.querySelector(
            "#mark input[type='date']"
        );


    if (
        dateInput &&
        dateInput.value
    ) {

        return dateInput.value;

    }


    const today =
        new Date();


    return today
        .toISOString()
        .split("T")[0];

}


// ======================================================
// 13. TODAY'S ATTENDANCE
// ======================================================

function updateTodayAttendance() {

    const savedData =
        localStorage.getItem(
            "todayAttendance"
        );


    let data;


    if (savedData) {

        data =
            JSON.parse(savedData);

    } else {

        data = {

            date: getSelectedDate(),

            present: 42,

            absent: 8,

            late: 0,

            total: 50

        };

    }


    const cards =
        document.querySelectorAll(
            "#today .card"
        );


    if (cards.length >= 4) {

        cards[0]
            .querySelector("p")
            .textContent =
            data.present;


        cards[1]
            .querySelector("p")
            .textContent =
            data.absent;


        cards[2]
            .querySelector("p")
            .textContent =
            data.late;


        cards[3]
            .querySelector("p")
            .textContent =
            data.total;

    }

}


// ======================================================
// 14. DASHBOARD
// ======================================================

function updateDashboard() {

    const students =
        getStudents();


    const teachers =
        getTeachers();


    let present = 0;

    let absent = 0;


    const todayData =
        localStorage.getItem(
            "todayAttendance"
        );


    if (todayData) {

        const data =
            JSON.parse(todayData);


        present = data.present;

        absent = data.absent;

    } else {

        present = 42;

        absent = 8;

    }


    const cards =
        document.querySelectorAll(
            "#dashboardHome .card"
        );


    if (cards.length >= 4) {

        cards[0]
            .querySelector("p")
            .textContent =
            students.length;


        cards[1]
            .querySelector("p")
            .textContent =
            teachers.length;


        cards[2]
            .querySelector("p")
            .textContent =
            present;


        cards[3]
            .querySelector("p")
            .textContent =
            absent;

    }


    // Overall attendance

    const total =
        present + absent;


    const percentage =
        calculatePercentage(
            present,
            total
        );


    const progressBar =
        document.querySelector(
            ".progress-bar"
        );


    if (progressBar) {

        progressBar.style.width =
            percentage + "%";

        progressBar.textContent =
            percentage + "%";

    }

}


// ======================================================
// 15. VIEW RECORDS
// ======================================================

function renderRecords() {

    const tableBody =
        document.querySelector(
            "#records tbody"
        );


    if (!tableBody) {
        return;
    }


    const students =
        getStudents();


    tableBody.innerHTML = "";


    students.forEach(function (student) {

        const row =
            document.createElement("tr");


        row.innerHTML = `
            <td>${student.id}</td>

            <td>${student.name}</td>

            <td>${student.present}</td>

            <td>${student.absent}</td>

            <td>${student.late}</td>

            <td>${student.total}</td>
        `;


        tableBody.appendChild(row);

    });

}


// ======================================================
// 16. ATTENDANCE PERCENTAGE
// ======================================================

function calculatePercentage(
    present,
    total
) {

    if (total === 0) {

        return 0;

    }


    return (
        (present / total) *
        100
    ).toFixed(1);

}


// ======================================================
// 17. REPORTS
// ======================================================

function renderReports() {

    const reportCard =
        document.querySelector(
            "#reports .report-card"
        );


    if (!reportCard) {
        return;
    }


    const students =
        getStudents();


    const reportItems =
        reportCard.querySelectorAll(
            ".report-item"
        );


    students.forEach(
        function (student, index) {

            if (
                reportItems[index]
            ) {

                const percentage =
                    calculatePercentage(
                        student.present,
                        student.total
                    );


                reportItems[index]
                    .querySelector("span")
                    .textContent =
                    student.name;


                reportItems[index]
                    .querySelector("strong")
                    .textContent =
                    percentage + "%";

            }

        }
    );


    // Overall percentage

    let totalPresent = 0;

    let totalClasses = 0;


    students.forEach(
        function (student) {

            totalPresent +=
                student.present;

            totalClasses +=
                student.total;

        }
    );


    const overall =
        calculatePercentage(
            totalPresent,
            totalClasses
        );


    const largePercentage =
        document.querySelector(
            ".large-percentage"
        );


    if (largePercentage) {

        largePercentage.textContent =
            overall + "%";

    }

}


// ======================================================
// 18. GENERATE REPORT
// ======================================================

function generateReport() {

    const students =
        getStudents();


    let reportText =
        "ATTENDANCE REPORT\n";

    reportText +=
        "========================\n\n";


    students.forEach(
        function (student) {

            const percentage =
                calculatePercentage(
                    student.present,
                    student.total
                );


            reportText +=
                "Name: " +
                student.name +
                "\n";

            reportText +=
                "Present: " +
                student.present +
                "\n";

            reportText +=
                "Absent: " +
                student.absent +
                "\n";

            reportText +=
                "Late: " +
                student.late +
                "\n";

            reportText +=
                "Attendance: " +
                percentage +
                "%\n\n";

        }
    );


    alert(reportText);

}


// ======================================================
// 19. VIEW RECORD SEARCH
// ======================================================

const recordSearch =
    document.querySelector(
        "#records .search-records"
    );


if (recordSearch) {

    recordSearch.addEventListener(
        "input",
        function () {

            const searchText =
                this.value
                    .toLowerCase()
                    .trim();


            const rows =
                document.querySelectorAll(
                    "#records tbody tr"
                );


            rows.forEach(function (row) {

                const text =
                    row.textContent
                        .toLowerCase();


                row.style.display =
                    text.includes(
                        searchText
                    )
                        ? ""
                        : "none";

            });

        }
    );

}


// ======================================================
// 20. DATE VALIDATION
// ======================================================

const dateInputs =
    document.querySelectorAll(
        'input[type="date"]'
    );


dateInputs.forEach(function (input) {

    input.addEventListener(
        "change",
        function () {

            if (!this.value) {

                alert(
                    "Please select a date."
                );

            }

        }
    );

});


// ======================================================
// 21. GENERATE REPORT BUTTON
// ======================================================

const reportButtons =
    document.querySelectorAll(
        "#reports .save-btn"
    );


reportButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                generateReport();

            }
        );

    }
);


// ======================================================
// 22. CURRENT DATE
// ======================================================

function setCurrentDate() {

    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    const markDate =
        document.querySelector(
            "#mark input[type='date']"
        );


    if (
        markDate &&
        !markDate.value
    ) {

        markDate.value = today;

    }

}


setCurrentDate();


// ======================================================
// 23. PREVENT EMPTY SEARCH ERRORS
// ======================================================

document.addEventListener(
    "input",
    function (event) {

        if (
            event.target.tagName === "INPUT"
        ) {

            // Remove unwanted spaces
            if (
                event.target.type === "text"
            ) {

                event.target.value =
                    event.target.value
                        .replace(/\s+/g, " ")
                        .replace(/^\s/, "");

            }

        }

    }
);


// ======================================================
// 24. SYSTEM START MESSAGE
// ======================================================

console.log(
    "Attendance Management System is running."
);
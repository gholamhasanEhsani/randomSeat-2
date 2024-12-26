let data = {
    days: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10", "Day 11"],
    students: {
        "دهم": ["امیر پویا پورامینی", "محمدحسین ترابی نساج", "محمدحسن ترجمان", "علیرضا تیموری", "علی حاجی محمد باقر", "محمدهادی حداد", "محمد حسین دهمردان", "علی ذوالفقاری", "محمد صدرا راستی", "محمدهانی رحیمی", "محمدمهدی رضایی ارجمند", "امیرمهدی شیدایی زاده", "محمد مهدی صفری", "سید محمدرضا ضیاحائری", "سید حسام الدین طباطبایی نیا", "محمد حسین عابدزاده", "امیرعباس قبادی", "سید مجتبی نورحسینی"],
        "یازدهم": ["غلامحسن احسانی", "محمد علی اکبرخراسانی", "علی بخشی", "امیر پارسا پور امینی", "محمد مهدی سبزه ای", "علی سعیدی", "سجاد شفیق اسکی", "علی گرامی", "میثم محمدی"]
    }
};
const studentList = Object.values(data.students).flat();
let d = [];

async function generatePDF(i = null) {
    if (i == null) {
        document.querySelectorAll('.print-button').forEach(button => {
            button.style.display = 'none';
        });
        printJS({
            printable: 'resultTableContainer',
            type: 'html',
            css: 'https://printjs-4de6.kxcdn.com/print.min.css',
            style: '@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@700&display=swap"); @page { size: A4 landscape; margin: 1cm; } body { font-family: Rubik, sans-serif; direction: rtl; text-align: right; } table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid #ddd; padding: 8px; text-align: center; } th { background-color: #f4f4f4; font-weight: bold; }',
            scanStyles: false
        });
        document.querySelectorAll('.print-button').forEach(button => {
            button.style.display = 'inline';
        });
    } else {
        const seats = d[i];
        const r = {};
        const t6 = document.querySelector("#tab6");
        seats.forEach((seat, ind) => r[studentList[ind]] = seat);
        t6.innerHTML = "";
        for (k in r) {
            let classOfStudent;
            for (const [className, studentArray] of Object.entries(data.students)) {
                if (studentArray.includes(k)) {
                    classOfStudent = className;
                    break;
                }
            }
            t6.innerHTML += `<div class=card><div class=header><img alt=logo src=https://gholamhasan.sirv.com/refah.png><div class=header-text><div class=school>دبیرستان پسرانه رفاه</div><div class=year>سال تحصیلی 1404 - 1403</div></div></div><div class=seat>صندلی شماره: <span>${r[k]}</span></div><div class=name>نام: <span>${k}</span></div><div class=class>پایه: <span>${classOfStudent}</span></div></div>`;
        }
        printJS({
            printable: 'tab6',
            type: 'html',
            css: 'https://printjs-4de6.kxcdn.com/print.min.css',
            style: '@import url(https://fonts.googleapis.com/css2?family=Rubik:wght@700&display=swap);@page{size:A4 portrait;margin:2mm}@media print{div{break-inside:avoid}}*{margin:0;padding:0;box-sizing:border-box}#tab6{font-family:Rubik,sans-serif;direction:rtl;text-align:right;display:grid;grid-template-columns:auto auto !important;gap:10px;padding-right:1vw}.card{width:47.5vw;height:6.5cm;border:1px solid #000;border-radius:10px;display:flex;flex-direction:column;justify-content:space-evenly;margin:10px 0}.header{display:flex;align-items:center;gap:20px;padding-right:15px}.header-text{display:flex;flex-direction:column;gap:10px}.school{font-size:1.25rem}.year{font-size:.8em}.seat{font-size:2rem;border:1px solid #000;width:90%;margin-right:5%;text-align:center;padding:10px;border-radius:10px}img{width:60px}.class,.name{padding-right:5%}',
            scanStyles: false
        });
    }
}
async function generateXLSX() {
    var wb = XLSX.utils.table_to_book(document.querySelector("#resultTableContainer table"));
    XLSX.writeFile(wb, "SheetJSTable.xlsx");
}

function generateRandomSeatNumbers(studentsList, daysCount) {
    const seatAssignments = {};
    const studentsCount = studentsList.length;

    // تخصیص شماره صندلی‌ها به دانش‌آموزان به‌صورتی که در هر روز یکتا باشند
    for (let day = 0; day < daysCount; day++) {
        const seats = Array.from({
            length: studentsCount
        }, (_, index) => index + 1);
        shuffleArray(seats);

        studentsList.forEach((student, index) => {
            if (!seatAssignments[student]) {
                seatAssignments[student] = [];
            }
            seatAssignments[student].push(seats[index]);
        });
    }

    return seatAssignments;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function generateResultTable() {
    d = [];
    clearLocalStorage();
    const resultTableContainer = document.getElementById('resultTableContainer');
    resultTableContainer.innerHTML = ''; // Clear previous results

    const table = document.createElement('table');
    table.className = 'result-table';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    // Create header row with days
    headerRow.appendChild(document.createElement('th')); // Empty top-left cell
    data.days.forEach((day, i) => {
        const th = document.createElement('th');
        th.textContent = day;
        headerRow.appendChild(th);
        const span = document.createElement('span');
        span.innerHTML = `<img src='https://gholamhasan.sirv.com/printer.png' alt='printer' style='width: 15px; height: 15px; margin-left: 8px;cursor: pointer;' onclick='generatePDF(${i})' class='print-button'>`;
        th.appendChild(span);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    // Combine all students into a single list
    const studentsList = [];
    Object.keys(data.students).forEach(className => {
        studentsList.push(...data.students[className]);
    });

    const seatAssignments = generateRandomSeatNumbers(studentsList, data.days.length);

    studentsList.forEach(student => {
        const row = document.createElement('tr');
        const studentCell = document.createElement('td');
        studentCell.textContent = student;
        row.appendChild(studentCell);

        // Assign seat numbers to each student for each day
        for (let dayIndex = 0; dayIndex < data.days.length; dayIndex++) {
            const cell = document.createElement('td');
            cell.textContent = seatAssignments[student][dayIndex];
            row.appendChild(cell);
        }

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    resultTableContainer.appendChild(table);
    let i = 0;

    while (i < data.days.length) {
        d.push([]);
        i++;
    }
    let keys = Object.keys(seatAssignments);
    d.forEach((day, index) => {
        keys.forEach(key => {
            d[index].push(seatAssignments[key][index]);
        });
    });
}

function saveTableToLocalStorage() {
    clearLocalStorage();
    const table = document.querySelector("#resultTableContainer table");
    if (table) {
        const tableHTML = table.outerHTML;
        localStorage.setItem("savedTable", tableHTML);
        localStorage.setItem("savedD", JSON.stringify(d));
        console.log(d);
        // alert
    } else {
        // alert
    }
}

function loadTableFromLocalStorage() {
    const savedTable = localStorage.getItem("savedTable");
    const savedD = localStorage.getItem("savedD");
    if (savedTable && savedD) {
        const tableHTML = savedTable;
        d = JSON.parse(savedD);
        const resultTableContainer = document.getElementById('resultTableContainer');
        resultTableContainer.innerHTML = tableHTML;
        console.log("Table loaded from localStorage");
        // alert
        return true;
    }
    return false;
}

const clearLocalStorage = () => {
    localStorage.removeItem("savedTable");
    localStorage.removeItem("savedD");
    // alert
}

window.onload = function () {
    if (!loadTableFromLocalStorage()) {
        generateResultTable();
    }
};
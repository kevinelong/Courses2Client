function getCourseId() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));
    return id;
}

function renderCourse(course, targetId) {
    // window.courseId.innerText = JSON.stringify(course, undefined, 4)
    const target = document.getElementById(targetId);
    target.innerHTML = `
        <h2>${course.courseName}</h2>
        <span class="id">ID: ${course.id}</span>,
        <span class="dept">DEPT: ${course.dept}</span>,
        <span class="number">NUMBER: ${course.courseNum}</span>
        <h2 class="instructor">INSTRUCTOR: ${course.instructor}</h2>
        <span class="number">DATE: ${course.startDate}</span>
        <h2 class="days">DAYS:${course.numDays}</h2>
    `;
}

function readCourse(targetId) {
    // window.courseId.innerText = getCourseId();

    const baseURL = "http://localhost:8081/api";
    const coursesURI = "/courses/" + getCourseId();

    fetch(baseURL + coursesURI).then(r => r.json()).then(c => renderCourse(c, targetId));
}

function renderCourseForm(course, targetId) {
    // window.courseId.innerText = JSON.stringify(course, undefined, 4)
    const target = document.getElementById(targetId);
    target.innerHTML = `
    <label>Course Name:<input id="courseName" value="${course.courseName}" type="text"></label>
    <label>Department:<input id="dept" value="${course.dept}" type="text"></label>
    <label>Course Number:<input id="courseNum" value="${course.courseNum}" type="number"></label>
    <label>Instructor:<input id="instructor" value="${course.instructor}" type="text"></label>
    <label>Start Date:<input id="startDate" value="${course.startDate}" type="date"></label>
    <label>Number Days:<input id="numDays" value="${course.numDays}" type="number"></label>
    `;
}
function courseFromForm() {
    return {
        courseName: courseName.value,
        dept: dept.value,
        courseNum: courseNum.value,
        instructor: instructor.value,
        startDate: startDate.value,
        numDays: numDays.value,
    }
}
function editCourse(targetId) {
    const baseURL = "http://localhost:8081/api";
    const coursesURI = "/courses/" + getCourseId();
    fetch(baseURL + coursesURI).then(r => r.json()).then(c => renderCourseForm(c, targetId));
}

function newCourse(targetId) {
    renderCourseForm({
        courseName: "",
        dept: "",
        courseNum: "",
        instructor: "",
        startDate: "",
        numDays: "",
    }, targetId);
}

function createOrUpdateCourse(isCreate){
    const data = courseFromForm();
    const baseURL = "http://localhost:8081/api";
    const coursesURI = isCreate ? "/courses/" : "/courses/" + getCourseId();
    fetch(
        baseURL + coursesURI, 
        { 
            method: isCreate ? "POST" : "PUT",
            body:  JSON.stringify(data),
            headers: {
                "Content-Type" : "application/json"
            }
        }
    ).then(
        r => window.location = "index.html"
    );
}

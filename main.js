function getCourseId() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));
    return id;
} 

function renderCourse(course, targetId){
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

function readCourse(targetId){
    // window.courseId.innerText = getCourseId();

    const baseURL = "http://localhost:8081/api";
    const coursesURI = "/courses/" + getCourseId();

    fetch(baseURL + coursesURI).then(r=>r.json()).then( c => renderCourse(c, targetId) );
}
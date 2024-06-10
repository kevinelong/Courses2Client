function getCourseId() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));
    return id;
} 
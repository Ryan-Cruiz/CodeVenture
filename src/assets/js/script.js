const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))


$(document).ready(function () {
    let user_container = $('#user-container');
    user_container.hide();
    $('#user-icon').click(function () {
        user_container.toggle();
    })
    var simplemde = new SimpleMDE({ element: $("#MyID")[0] });
});
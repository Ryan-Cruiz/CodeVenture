$(document).ready(function () {
    let lesson_id = $('#param').data('lesson');
    let level_id = $("#param").data('level');
    $(document).on('click', 'button.task-btn', function () {
        let currentUser = $('#currentUser')
        let currentUser_id = $('#currentUser').attr('aria-user');
        let user_id = $(this).parent().parent().data('user');
        let user_name = $(this).parent().siblings('.user_name').text();
        console.log(currentUser_id, user_id);
        if (currentUser_id != user_id) {
            currentUser.attr('aria-user', user_id);
            $.get(`/api/getUserTasks/${user_id}/${lesson_id}/${level_id}`, function (res) {
                console.log(res);
                let highScore = 0;
                $('.modal-title').text(user_name + " History")
                $('.total-retake').text(res.length)
                let output = "";
                res.map(data => {
                    if (data.answers.score > highScore) {
                        highScore = data.answers.score;
                    }
                    output += `
                <tr>
                    <td>${data.answers.score} / ${data.answers.totalQuestion}</td>
                    <td>${new Date(data.created_at).toLocaleDateString()}</td>
                    <td>${data.school_year}</td>
                </tr>
                `;
                })
                $('.high-score').text(highScore)
                $('#tbody').html(output);
            })
        }
    })
    $(document).on('change', 'select#school_year_select', function () {
        let current_year = $('#currentUser').attr('aria-currentyear');
        let school_year = $(this).val();
        console.log(school_year)
        if (school_year != current_year) {
            $.get(`/api/getUsersTasksBySchoolYear/${lesson_id}/${level_id}?school_year=${school_year}`, function (res) {
                console.log(res);
                let output = "";
                res.map(data => {
                    output += `
                    <tr class="align-middle" data-user="${data.user_id}">
                            <td class="user_name">${data.first_name} ${data.last_name}</td>
                            <td>
                                <button type="button" class="btn btn-primary m-0 task-btn" data-bs-toggle="modal" data-bs-target="#taskAnswerModal">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    `
                });
                $('#userTable').html(output);
            });
        }
    })
})
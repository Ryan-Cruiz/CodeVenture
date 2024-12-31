const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

$(document).ready(function () {
    setTimeout(() => {
        $('.alert').fadeOut(3000);
    }, 1000);
    let counter = 1;
    let user_container = $('#user-container');
    user_container.hide();
    $('#user-icon').click(function () {
        user_container.toggle();
    })
    $("#addQuestion").click(function (e) {
        let html = `<div class="mt-5 border">
                    <div class="remove-question btn btn-danger float-end m-1">Remove</div>
                    <div class="m-2">
                        <label>Question</label>
                        <textarea name="question[]" class="form-control" required>Question</textarea>
                    </div>
                     <div class="choice-container m-2" aria-value="${counter}">
                     <div class="input-group my-2">
                            <div class="input-group-text">
                              <input class="form-check-input mt-0" type="radio" value="Option" name="correctAnswer[${counter}]">
                            </div>
                            <input type="text" class="form-control option-input" value="Option" autocomplete="off" name="questionChoice[]" onclick="this.select();" required>
                            <div class="btn btn-danger remove-choice m-0">Remove</div>
                        </div>
                     </div>
                     <input type="hidden" name="choice_length" value="1" class="choice-counter">
                       <div class="m-2">
                            <label for="description">Description of Correct Answer</label>
                            <textarea name="description[]" class="form-control" id="description"></textarea>
                        </div>
                     <div class="btn btn-primary m-2 add-choice">Add Choice</div>
                    </div>`;
        $('#question-container').append(html);
        counter++;
    })
    $(document).on('click', 'div.remove-question', function () {
        $(this).parent().remove();
    })
    $(document).on('click', 'div.add-choice', function () {
        let numbering = $(this).siblings('.choice-container').attr('aria-value');
        let html = ` <div class="input-group my-2">
                            <div class="input-group-text">
                              <input class="form-check-input mt-0" type="radio" value="Option" name="correctAnswer[${numbering}]">
                            </div>
                            <input type="text" class="form-control option-input" value="Option" autocomplete="off" name="questionChoice[]" onclick="this.select();" required>
                            <div class="btn btn-danger remove-choice m-0">Remove</div>
                        </div>`
        $(this).siblings('.choice-container').append(html);
        $(this).siblings('.choice-counter').val($(this).siblings('.choice-container').children().length)
    })
    $(document).on('click', 'div.remove-choice', function () {
        $(this).parent().remove();
    });
    $(document).on('keyup', 'input.option-input', function () {
        $(this).siblings('.input-group-text').children('input').val($(this).val())
    });
    $(document).on('click', '#editBtn', function () {
        // console.log($(this).siblings());
        let title = $(this).siblings('.lesson-title').text();
        let description = $(this).siblings('.lesson-description').text();
        let id = $(this).parent().data('id')
        // console.log(id, title, description)
        $('#editTitle').val(title);
        $('#editDescription').val(description);
        $('#lesson_id').val(id);
    })
    $(document).on('change','#after_level_selector',function(){
        let lesson_id = $(this).data('lesson-id');
        let selectedAfterId = $(this).children('option:selected').val();
        $('#create_task').attr('href',`/new_level/${lesson_id}/task?after=`+selectedAfterId)
        $('#create_material').attr('href',`/new_level/${lesson_id}/material?after=`+selectedAfterId);
    })
});
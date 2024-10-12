const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))


$(document).ready(function () {
    let counter=1;
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
                            <div class="btn btn-danger remove-choice">Remove</div>
                        </div>
                     </div>
                     <input type="hidden" name="choice_length" value="1" class="choice-counter">
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
                            <div class="btn btn-danger remove-choice">Remove</div>
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
});
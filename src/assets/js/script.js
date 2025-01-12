const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

$(document).ready(function () {
    setTimeout(() => {
        $('.alert').fadeOut(5000);
    }, 1000);
    let counter = 1;
    let user_container = $('#user-container');
    user_container.hide();
    $('#user-icon').click(function () {
        user_container.toggle();
    })
    $("#addQuestion").click(function (e) {
        let html = `<div class="mt-5 border">
                    <div class="remove-question btn btn-danger float-end m-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="28" fill="currentColor" class="mt-1" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"></path>
                        </svg>
                    </div>
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
                            <div class="btn btn-danger remove-choice m-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="28" fill="currentColor" class="mt-1" viewBox="0 0 16 16">
                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"></path>
                                </svg>
                            </div>
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
                            <div class="btn btn-danger remove-choice m-0">
                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="28" fill="currentColor" class="mt-1" viewBox="0 0 16 16">
                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"></path>
                                </svg>
                            </div>
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
        let img_link = $(this).parent().siblings('.img-link').attr('src');
        console.log(img_link)
        let isEnabled = $(this).parent().siblings('.is-enabled').data('enabled');
        let description = $(this).siblings('.lesson-description').text();
        let id = $(this).parent().data('id')
        let school_year = $(this).parent().attr('aria-valueschoolyear')
        // console.log(id, title, description)
        $('#editTitle').val(title);
        $('#editDescription').val(description);
        $('#editImg_link').val(img_link)
        $('#editIsEnabled').val(isEnabled)
        $('#editSchool_year').val(school_year);
        $('#lesson_id').val(id);
    })
    $(document).on('change','#after_level_selector',function(){
        let lesson_id = $(this).data('lesson-id');
        let selectedAfterId = $(this).children('option:selected').val();
        $('#create_task').attr('href',`/new_level/${lesson_id}/task?after=`+selectedAfterId)
        $('#create_material').attr('href',`/new_level/${lesson_id}/material?after=`+selectedAfterId);
    })
    $(document).on('submit','.submit-form',function(){
        $(this).find(':input[type=submit]').attr('disabled',true)
        $(this).find(':input[type=submit]').val('Processing...')
        setTimeout(() => {
            $(this).find(':input[type=submit]').attr('disabled',false)
            $(this).find(':input[type=submit]').val('Save')
        }, 3000);
    })
});
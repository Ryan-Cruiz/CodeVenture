$(document).ready(function(){
    // alert('he')
    $('#add_test').click(function(){
        let output = `<div class="input-group mb-3">
                    <input type="text" name="testCases[]" required class="form-control" placeholder="Test Case">
                    <input type="text" name="testCasesAnswer[]" required class="form-control" placeholder="Test Case Answer">
                    <div class="btn btn-outline-danger remove-btn"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                            height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path
                                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                        </svg>
                    </div>
                </div>`
        $('#case_container').append(output)
    })
    $(document).on('click', 'div.remove-btn', function () {
        $(this).parent().remove();
    })
});
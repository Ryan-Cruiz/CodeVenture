$(document).ready(async function () {

    var editor = ace.edit("editor");
    let code_session = ace.createEditSession([$('#code_value').val(), "  // Your Code Here", "  ", "}"])
    editor.setSession(code_session);
    // editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/javascript");
    editor.gotoLine(3, 2);
    editor.resize();
    editor.session.setTabSize(2);
    editor.commands.on("exec", function (e) {
        var rowCol = editor.selection.getCursor();
        if ((rowCol.row === 0) || ((rowCol.row + 1) === editor.session.getLength())) {
            e.preventDefault();
            e.stopPropagation();
        }
    });
    let json = $("#value").data('value');
    $('#run-btn').click(function (e) {
        $('#run-btn').attr('disabled', true);
        $('#run-btn').text("Running");
        setTimeout(() => {
            $('#run-btn').attr('disabled', false);
            $('#run-btn').text("Run");
        }, 5000)
        let params = json.params.split(',');
        e.preventDefault();
        let variables = [];
        let arrFunc = [];
        json.testCases.forEach((v) => {
            let temp = "";
            v.split("|").forEach((value, j) => {
                temp += `${params[j]} = ${value};`;
            })
            // console.log(temp);
            variables.push(temp);
        })
        let createdFunction;
        var lines = editor.session.doc.getAllLines()
        let code = new Array(lines);
        code[0].pop();
        code[0].shift()
        let new_session = ace.createEditSession(code[0])
        json.testCases.forEach((v, i) => {
            createdFunction = Function(json.params, `${variables[i]}\n${new_session.getValue()}`);
            arrFunc.push(createdFunction());
        })
        var logger = document.getElementById('output');
        logger.innerHTML = "";
        if (!console) {
            console = {};
        }
        var old = console.log;
        console.log = function (message) {
            if (typeof message == 'object') {
                logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : String(message)) + '<br />';
            } else {
                logger.innerHTML += message + '<br />';
            }
        }
        let caseType = "return";
        let testCases = json.testCasesAnswer;
        var reg = /^\d+$/;
        let correctAnswer = 0;
        arrFunc.forEach((item, i) => {
            if (caseType == 'return') {
                $("#output").append("<br/>-> " + item + "<br/>");
            }
            if (item.toString() == testCases[i].toString()) {
                $("#test_cases > li:nth-child(" + (i + 1) + ")").addClass('text-success');
                // alert(i);
                correctAnswer++
            } else {
                $("#test_cases > li:nth-child(" + (i + 1) + ")").removeClass('text-success');
            }
        })
        $('#correctAnswer').text(correctAnswer);
        $('#user_code').val(new_session.getValue());
        let lesson_id = $('#lesson_id').data("value");
        let level_id = $("#level_id").data('value');
        $.ajax({
            url: `/submit/codeTask/${lesson_id}/${level_id}`,
            data: { data: new_session.getValue() },
            method: "POST",
            success: alert("Success")
        })
    })

})

/**
// Enter code below
counter = 0
for(let i=0;i<x.length;i++){
counter += x[i];
}
for(let i=0;i<y.length;i++){
counter += y[i];
}
return counter;
 */
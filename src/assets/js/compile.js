$(document).ready(function () {
    // var editor = ace.edit("editor");
    // let s =  ace.createEditSession([""]);
    // editor.setSession(s);
    // editor.setTheme("ace/theme/monokai");
    // editor.session.setMode("ace/mode/javascript");
    // editor.resize()
    // editor.session.replace(new ace.Range(0, 0, 1, 0), "new text");
    $('#run-btn').click(function (e) {
        $('#run-btn').attr('disabled', true)
        $('#run-btn').text("Running")
        // console.log(editor.session.getTextRange(editor.getSelectionRange())); 
        // console.log($('.ace_line:last-child'));
        let params = json.params.split(',');
        e.preventDefault();
        let variables = [];
        let arrFunc = [];
        json.testCases.forEach((v)=>{
            let temp = "";
            v.split("|").forEach((value,j) =>{
                temp += `${params[j]} = ${value};`;
            })
            console.log(temp);
            variables.push(temp);
        })
        let createdFunction;
        json.testCases.forEach((v,i) => {
            createdFunction = Function(json.params,variables[i]+document.getElementById('code').innerText);
            arrFunc.push(createdFunction());
        })
        var logger = document.getElementById('output');
        logger.innerHTML = "";
        if (!console) {
            console = {};
            // console.log(f(1,2));
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
        let testCases = json.testCasesAnswer
        var reg = /^\d+$/;
        console.log(variables)
        console.log(createdFunction)
        console.log(arrFunc)
        let correctAnswer = 0;
        arrFunc.forEach((item, i) => {
            if (item.toString() == testCases[i].toString()) {
                $("#test_cases > li:nth-child(" + (i + 1) + ")").addClass('text-success');
                // alert(i);
                correctAnswer++
            } else {
                $("#test_cases > li:nth-child(" + (i + 1) + ")").removeClass('text-success');
            }
            if (caseType == 'return') {
                console.log($("#test_cases > li:nth-child(" + (i + 1) + ") > span").text())
                console.log(item);
            }
        })
        $('#correctAnswer').text(correctAnswer);
        $.ajax({
            url: '/test',
            method: 'post',
            success: setTimeout(() => {
                $('#run-btn').attr('disabled', false)
                $('#run-btn').text("Run")
            }, 3000)
        })
        $('#user_code').val($('#code').html().split('<br>').join('\\n'))
    })
})
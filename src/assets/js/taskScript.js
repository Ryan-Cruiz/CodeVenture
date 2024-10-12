if(<%= data[0].isTask%> == '0'){
    var simplemde = new SimpleMDE({
        element: $("#MyID")[0],
        renderingConfig: {
            singleLineBreaks: false,
            codeSyntaxHighlighting: true,
        },
    });
}
@echo off
echo Create Model
set "model=%modelname%"
    goto modelCheck
    :modelPrompt
    set /p "modelname=Enter Name: "
    :modelCheck
    IF not defined modelname goto :modelPrompt
    echo Creating %modelname%.model.js
    cd %cd%/src/models/
    type nul > %modelname%.model.js
    echo const loader = require('../loaders.js'); > %modelname%.model.js
    echo const model = loader.model; >> %modelname%.model.js
    echo class %modelname% extends model { >> %modelname%.model.js
    echo // Create something >> %modelname%.model.js
    echo } >> %modelname%.model.js
    echo module.exports = new %modelname%(); >> %modelname%.model.js
    echo Created %modelname%.model.js Successfully!
    exit
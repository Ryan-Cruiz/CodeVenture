@echo off
echo 1. Create Controller
echo 2. Create Model
echo 3. Create View
set "msg=%opt%"
set "model=%modelname%"
set "controller=%controllername%"
set "view=%viewname%"
goto msgCheck
:msgPrompt
set /p "msg=Enter Choice: "
:msgCheck
IF not defined msg goto :msgPrompt
if "%msg%"=="1" (
    goto controllerCheck
    :controllerPrompt
    set /p "controllername=Enter Name: "
    :controllerCheck
    IF not defined controllername goto :controllerPrompt
    echo Creating %controllername%.controller.js
    cd %cd%/src/controllers/
    type nul >%controllername%.controller.js
    @echo off
    echo const loader = require('../loaders.js'); > %controllername%.controller.js
    echo const model = loader.core.model; >> %controllername%.controller.js
    echo const $ = loader.profile; >> %controllername%.controller.js
    echo class %controllername% { >> %controllername%.controller.js
    echo //Create Something >> %controllername%.controller.js
    echo } >> %controllername%.controller.
    echo module.exports = new %controllername%(); >> %controllername%.controller.js
    echo Created %controllername%.controller.js Successfully!
    exit
)  else if "%msg%"=="2" (
    goto modelCheck
    :modelPrompt
    set /p "modelname=Enter Name: "
    :modelCheck
    IF not defined modelname goto :modelPrompt
    echo Creating %modelname%.model.js
    cd %cd%/src/models/
    type nul >%modelname%.model.js
    echo const loader = require('../loaders.js'); > %modelname%.model.js
    echo const model = loader.model; >> %modelname%.model.js
    echo class Car extends model { >> %modelname%.model.js
    echo //Create Something >> %controllername%.controller.js
    echo } >> %modelname%.model.js
    echo module.exports = new %modelname%(); >> %modelname%.model.js
    echo Created %modelname%.model.js Successfully!
    exit
) else if "%msg%"=="3" (
    goto viewCheck
    :viewPrompt
    set /p "viewname=Enter Name: "
    :viewCheck
    IF not defined viewname goto :viewPrompt
    echo Creating %viewname%.ejs
    cd %cd%/src/views/
    type nul >%viewname%.ejs
    echo Created %viewname%.ejs Successfully!
    exit
)
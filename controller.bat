@echo off
echo Create Controller
set "controller=%controllername%"
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
        echo // Create something >> %controllername%.controller.js
        echo } >> %controllername%.controller.js
        echo module.exports = new %controllername%(); >> %controllername%.controller.js
        echo Created %controllername%.controller.js Successfully!
        exit

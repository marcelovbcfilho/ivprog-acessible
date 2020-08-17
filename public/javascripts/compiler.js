function compile() {
    let operations = document.getElementsByName('mainOperationsType');
    let stringToBeCompiled = ``;
    let compiledJavascriptCode = $("#compiledJavascriptCode");

    // Cleaning compiled code area
    compiledJavascriptCode.html(``);

    // declaring variables
    compiledJavascriptCode.append(`//Declarando variáveis<br/>`);
    for (let i = 0; i < variables.length; i++) {
        stringToBeCompiled += `let ${variables[i].name} = ${getVariableTypeBarrier(variables[i].type)}${variables[i].value}${getVariableTypeBarrier(variables[i].type)};\n`;
        compiledJavascriptCode.append(`let ${variables[i].name} = ${getVariableTypeBarrier(variables[i].type)}${variables[i].value}${getVariableTypeBarrier(variables[i].type)}; <br/>`);
    }

    for (let i = 0; i < operations.length; i++) {
        switch (operations[i].value) {
            case mainCodeTypes.attribution: {
                console.log(operations[i].previousElementSibling.value);

                if (i !== 0) {
                    stringToBeCompiled += `;`;
                }

                stringToBeCompiled += `\n${getVariableById(operations[i].previousElementSibling.value).name} = `;
                compiledJavascriptCode.append(`<br/>${getVariableById(operations[i].previousElementSibling.value).name} = `);
                break;
            }
            case mainCodeTypes.variable: {
                console.log(operations[i].previousElementSibling.value);
                stringToBeCompiled += `${getVariableById(operations[i].previousElementSibling.value).name} `;
                compiledJavascriptCode.append(`${getVariableById(operations[i].previousElementSibling.value).name} `);
                break;
            }
            case mainCodeTypes.operation: {
                let operation = getOperationById(operations[i].previousElementSibling.value);
                console.log(`${operation.firstVariable.name} ${operation.operation.operator} ${operation.secondVariable.name}`);
                stringToBeCompiled += `${operation.firstVariable.name} ${operation.operation.operator} ${operation.secondVariable.name} `;
                compiledJavascriptCode.append(`${operation.firstVariable.name} ${operation.operation.operator} ${operation.secondVariable.name} `);
                break;
            }
            case mainCodeTypes.operator: {
                console.log(operations[i].previousElementSibling.value);
                stringToBeCompiled += `${getOperationByValue(operations[i].previousElementSibling.value).operator} `;
                compiledJavascriptCode.append(`${getOperationByValue(operations[i].previousElementSibling.value).operator} `);
                break;
            }
        }
    }

    compiledJavascriptCode.append(`<br/><br/>//Exibindo variáveis`);
    for (let i = 0; i < variables.length; i++) {
        stringToBeCompiled += `\nalert("${variables[i].name} = " + ${variables[i].name});`;
        compiledJavascriptCode.append(`<br/>alert("${variables[i].name} = " + ${variables[i].name});`);
    }

    eval(stringToBeCompiled);
}
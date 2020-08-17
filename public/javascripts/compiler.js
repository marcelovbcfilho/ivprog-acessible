function compile() {
    let operations = document.getElementsByName('mainOperationsType');
    let stringToBeCompiled = ``;

    // declaring variables
    for (let i = 0; i < variables.length; i++) {
        stringToBeCompiled += `let ${variables[i].name} = ${variables[i].value};`;
    }

    for (let i = 0; i < operations.length; i++) {
        switch (operations[i].value) {
            case mainCodeTypes.attribution: {
                console.log(operations[i].previousElementSibling.value);

                if (i !== 0)
                    stringToBeCompiled += `;`;

                stringToBeCompiled += `\n${getVariableById(operations[i].previousElementSibling.value).name} = `;
                break;
            }
            case mainCodeTypes.variable: {
                console.log(operations[i].previousElementSibling.value);
                stringToBeCompiled += `${getVariableById(operations[i].previousElementSibling.value).name} `;
                break;
            }
            case mainCodeTypes.operation: {
                let operation = getOperationById(operations[i].previousElementSibling.value);
                console.log(`${operation.firstVariable.name} ${operation.operation.operator} ${operation.secondVariable.name}`);
                stringToBeCompiled += `${operation.firstVariable.name} ${operation.operation.operator} ${operation.secondVariable.name} `;
                break;
            }
            case mainCodeTypes.operator: {
                console.log(operations[i].previousElementSibling.value);
                stringToBeCompiled += `${getOperationByValue(operations[i].previousElementSibling.value).operator} `;
                break;
            }
        }
    }

    for (let i = 0; i < variables.length; i++) {
        stringToBeCompiled += `\nalert("${variables[i].name} = " + ${variables[i].name});`;
    }

    eval(stringToBeCompiled);
}
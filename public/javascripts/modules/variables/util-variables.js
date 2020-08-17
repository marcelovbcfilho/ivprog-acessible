function mountCodeFromVariable(variable = {name: "", type: "String", value: ""}) {
    let variableBarrier = getVariableTypeBarrier(variable.type);
    return `${variable.type} ${variable.name} = ${variableBarrier}${variable.value}${variableBarrier}`;
}

function getVariableById(id) {
    for (let i = 0; i < variables.length; i++) {
        if (variables[i].id == id)
            return variables[i];
    }

    return null;
}
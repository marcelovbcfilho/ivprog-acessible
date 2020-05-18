function mountCodeFromVariable(variable = {name: "", type: "String", value: ""}) {
    let variableBarrier = getVariableTypeBarrier(variable.type);
    return `${variable.type} ${variable.name} = ${variableBarrier}${variable.value}${variableBarrier}`;
}
function placeOperationAt() {
    let firstVariable = document.getElementById('firstOperationSubMenuVariable');
    let operation = document.getElementById('operationTypeSubMenu');
    let secondVariable = document.getElementById('secondOperationSubMenuVariable');
    let id = universalId.next();
    let html = ``;

    let compiledView = `${variables[firstVariable.value].name} ${getOperationByValue(operation.value).operator} ${variables[secondVariable.value].name}`;

    html += `<div class="col-2 p-2 m-2 operation-main" id="workspaceVariableDiv${id}">`;
    html += `    <input type="hidden" id="workspaceGlobalMenu${id}" name="${WORKSPACE_COMPONENTS_NAME}" value='${compiledView}' ${UNIVERSAL_WORKSPACE_ID}="${id}">`;
    html += `    <input type="hidden" id="operationId${id}" value='${id}'>`;
    html += `    <input type="hidden" name="mainOperationsType" value='${mainCodeTypes.operation}'>`;
    html += `    <div class="row">`;
    html += `        <div class="col-9 pt-2 text-center" style="border-right: 1px solid #646464;">`;
    html += `            <h6>${compiledView}</h6>`;
    html += `        </div>`;
    html += `        <div class="col-3 text-center" style="border-left: 1px solid #646464;">`;
    html += `            <button type="button" class="btn btn-danger" onclick="deleteOperationFromMain(${id})">X</button>`;
    html += `        </div>`;
    html += `    </div>`;
    html += `</div>`;

    $(html).insertAfter(`#workspaceVariableDiv${document.getElementById('placeOperationAt').value}`);

    operations.push({
        id: id,
        firstVariable: variables[firstVariable.value],
        operation: getOperationByValue(operation.value),
        secondVariable: variables[secondVariable.value],
        usage: document.getElementById(`workspaceVariableDiv${id}`)
    });

    variables[firstVariable.value].usages.push(document.getElementById(`workspaceVariableDiv${id}`));
    variables[secondVariable.value].usages.push(document.getElementById(`workspaceVariableDiv${id}`));

    hideSubMenu();
}

function placeOperatorAt() {
    let operator = getOperationByValue(document.getElementById('operatorTypeSubMenu').value);
    let id = universalId.next();
    let html = ``;

    html += `<div class="col-2 p-2 m-2 operation-main" id="workspaceVariableDiv${id}">`;
    html += `    <input type="hidden" id="workspaceGlobalMenu${id}" name="${WORKSPACE_COMPONENTS_NAME}" value='${operator.operator}' ${UNIVERSAL_WORKSPACE_ID}="${id}">`;
    html += `    <input type="hidden" id="operatorValue${id}" value='${operator.value}'>`;
    html += `    <input type="hidden" name="mainOperationsType" value='${mainCodeTypes.operator}'>`;
    html += `    <div class="row">`;
    html += `        <div class="col-9 pt-2 text-center" style="border-right: 1px solid #646464;">`;
    html += `            <h6>${operator.operator}</h6>`;
    html += `        </div>`;
    html += `        <div class="col-3 text-center" style="border-left: 1px solid #646464;">`;
    html += `            <button type="button" class="btn btn-danger" onclick="deleteOperatorFromMain(${id})">X</button>`;
    html += `        </div>`;
    html += `    </div>`;
    html += `</div>`;

    $(html).insertAfter(`#workspaceVariableDiv${document.getElementById('placeOperatorAt').value}`);

    operatorsMain.push({
        id: id,
        operation: operator,
        usage: document.getElementById(`workspaceVariableDiv${id}`)
    });

    hideSubMenu();
}

function deleteOperationFromMain(id) {
    for (let i = 0; i < operations.length; i++) {
        if (operations[i].id === id) {
            operations[i].usage.remove();
            operations.splice(i, 1);
        }
    }
}

function deleteOperatorFromMain(id) {
    for (let i = 0; i < operatorsMain.length; i++) {
        if (operatorsMain[i].id === id) {
            operatorsMain[i].usage.remove();
            operatorsMain.splice(i, 1);
        }
    }
}
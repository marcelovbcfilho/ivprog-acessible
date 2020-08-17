let creatingVariable = false;
let variables = [];

/*
 * Workspace position modal attributes
 */
let $workspacePositionModal = $("#workspacePositionModal");
let $workspacePositionModalBody = $("#workspacePositionModalBody");
let $workspacePositionModalPositionsSelect = $(
    "#workspacePositionModalPositionsSelect"
);

let workspaceToBeAddId = null;
let workspaceToBeAddVariable = null;
let workspaceToBeAddAfterComponent = null;

function addVariable(
    variable = {name: "", type: dataTypes.String, value: ""},
    id = null
) {
    subMenuOptions.style.display = "none";

    if (creatingVariable === false) {
        // Blocking future variable creation until finish the current creation
        creatingVariable = true;

        let html = "";
        html += `<div class="col-3 p-2" id="variableCreationDiv">`;
        html += `    <div class="card">`;
        html += `        <div class="card-header">`;
        html += `            <h3>Adicionar variável</h3>`;
        html += `        </div>`;
        html += `        <div class="card-body">`;
        html += `            <div class="row">`;
        html += `                <div class="col-3">`;
        html += `                    <label for="variableName">Nome: </label>`;
        html += `                </div>`;
        html += `                <div class="col-9">`;
        html += `                    <input id="variableName" type="text" value="${variable.name}">`;
        html += `                </div>`;
        html += `            </div>`;
        html += `            <div class="row">`;
        html += `                <div class="col-3">`;
        html += `                    <label for="variableType">Tipo: </label>`;
        html += `                </div>`;
        html += `                <div class="col-9">`;
        html += `                    <select id="variableType">`;
        // Filling data type select with available data types in {data-types.js}
        for (let dataType in dataTypes) {
            if (dataType === variable.type)
                html += `                        <option value="${dataType}" selected>${dataTypes[dataType]}</option>`;
            else
                html += `                        <option value="${dataType}">${dataTypes[dataType]}</option>`;
        }
        html += `                    </select>`;
        html += `                </div>`;
        html += `            </div>`;
        html += `            <div class="row">`;
        html += `                <div class="col-3">`;
        html += `                    <label for="variableValue">Valor: </label>`;
        html += `                </div>`;
        html += `                <div class="col-9">`;
        html += `                    <input id="variableValue" type="text" value="${variable.value}">`;
        html += `                </div>`;
        html += `            </div>`;
        html += `        </div>`;
        html += `        <div class="card-footer">`;
        html += `            <div class="row">`;
        html += `                <div class="col-6">`;
        html += `                    <button type="button" class="btn btn-warning" accesskey="c" onclick="cancelAddVariable(${id})">Cancelar</button>`;
        html += `                </div>`;
        html += `                <div class="col-6">`;
        html += `                    <button type="button" class="btn btn-info" accesskey="s" onclick="addVariableToCode({id: ${id}})">Salvar</button>`;
        html += `                </div>`;
        html += `            </div>`;
        html += `        </div>`;
        html += `    </div>`;
        html += `</div>`;
        $workspace.append(html);
    }
}

function addVariableToCode({id = null}) {
    let code = "";

    let variable = {
        name: $("#variableName").val(),
        type: $("#variableType").val(),
        value: $("#variableValue").val(),
    };

    code = mountCodeFromVariable(variable);

    // Sending code to screen
    addCodeToScreen({id: id, code: code, variable: variable});

    // Removing div form for variable creation
    $("#variableCreationDiv").remove();

    // Enabling future variable creation
    creatingVariable = false;
}

function cancelAddVariable(id = null) {
    // Removing div form for variable creation
    $("#variableCreationDiv").remove();

    if (id != null) $(`#variableDiv${id}`).show();

    // Enabling future variable creation
    creatingVariable = false;
}

function editVariable(
    id = null,
    variable = {name: "", type: dataTypes.String, value: ""}
) {
    $(`#variableDiv${id}`).hide();
    addVariable(variable, id);
}

function deleteVariable(variableIndex = null, subMenuOptionId) {
    trashSound.play();

    document.getElementById(subMenuOptionId).remove();

    for (let i = 0; i < variables[variableIndex].attributions.length; i++) {
        variables[variableIndex].attributions[i].parentElement.parentElement.remove();
    }

    for (let i = 0; i < variables[variableIndex].usages.length; i++) {
        variables[variableIndex].usages[i].remove();
    }

    variables.splice(variableIndex, 1);
    // Refresh variables sub menu
    buildVariablesSubmenu();
}

function addCodeToScreen({
                             id = null,
                             code = "Some code",
                             variable = {name: "", type: "String", value: ""},
                         }) {
    let html = ``;

    if (id != null) {
        $(`#mainCode${id}`).html(`<span>${code}</span>`);
        $(`#globalMenu${id}`).val(code);
        $(`#positionCode${id}`).html(
            `<button type="button" class="btn btn-dark" id="positionCode${id}" onclick='askWhereToPlaceTheVariable(${id}, ${JSON.stringify(
                variable
            )})'>Posicionar</button>`
        );
        $(`#editCode${id}`).html(
            `<button type="button" class="btn btn-info" id="editCodeButton${id}" onclick='editVariable(${id}, ${JSON.stringify(
                variable
            )})'>Editar</button>`
        );
        $(`#variableDiv${id}`).show();

        updateVariable({
            id: id,
            name: variable.name,
            type: variable.type,
            value: variable.value,
            code: code,
            element: document.getElementById(`variableDiv${id}`),
        });
    } else {
        id = universalId.next();
        html += `<div class="col-3 p-2" id="variableDiv${id}">`;
        html += `    <input type="hidden" id="globalMenu${id}" value="${code}"/>`;
        html += `    <div class="card" id="variableCard${id}">`;
        html += `        <div class="card-header" id="variableCardHeader${id}">`;
        html += `            <h4>Variável</h4>`;
        html += `        </div>`;
        html += `        <div class="card-body" id="variableCardBody${id}">`;
        html += `            <div class="row code-line" id="codeLine${id}">`;
        html += `                <div class="col-2 line-number" id="mainLine${id}"><span>${getCurrentMainLineNumber()}</span></div>`;
        html += `                <div class="col-10 line-code" id="mainCode${id}"><span>${code}</span></div>`;
        html += `            </div>`;
        html += `        </div>`;
        html += `        <div class="card-footer" id="variableCardFooter${id}">`;
        html += `            <div class="row">`;
        html += `                <div class="col-4" id="deleteCode${id}">`;
        html += `                    <button type="button" class="btn btn-danger" id="deleteCodeButton${id}" onclick="deleteVariable(${id})">Remover</button>`;
        html += `                </div>`;
        html += `                <div class="col-4 align-self-center" id="positionCode${id}">`;
        html += `                    <button type="button" class="btn btn-dark" id="positionCodeButton${id}" onclick='askWhereToPlaceTheVariable(${id}, ${JSON.stringify(
            variable
        )})'>Posicionar</button>`;
        html += `                </div>`;
        html += `                <div class="col-3" id="editCode${id}">`;
        html += `                    <button type="button" class="btn btn-info" id="editCodeButton${id}" onclick='editVariable(${id}, ${JSON.stringify(
            variable
        )})'>Editar</button>`;
        html += `                </div>`;
        html += `            </div>`;
        html += `        </div>`;
        html += `    </div>`;
        html += `</div>`;

        // Saving reference to variable in variables array
        variables.push({
            id: id,
            name: variable.name,
            type: variable.type,
            value: variable.value,
            code: code,
            element: document.getElementById(`variableDiv${universalId.next()}`),
            attributions: [],
            usages: []
        });
    }
}

function askWhereToPlaceTheVariable(
    id = null,
    variable = {name: "", type: "String", value: ""}
) {
    if (buildAllWorkspaceComponentsSelect()) {
        $workspacePositionModal.modal("toggle");
        $workspacePositionModalPositionsSelect.focus();

        workspaceToBeAddId = id;
        workspaceToBeAddVariable = variable;
    } else {
        addVariableToMain({id: id, variable: variable});
    }
}

function buildAllWorkspaceComponentsSelect() {
    let allWorkspaceComponents = $(
        `input[type="hidden"][name="${WORKSPACE_COMPONENTS_NAME}"]`
    );
    let selectOptions = [];

    if (allWorkspaceComponents.length > 0) {
        for (let i = 0; i < allWorkspaceComponents.length; i++) {
            selectOptions.push(
                `<option value="${allWorkspaceComponents[i].attributes.universalworkspaceid.value}">${allWorkspaceComponents[i].value}</option>`
            );
        }

        $workspacePositionModalPositionsSelect.empty(); // remove old options
        selectOptions.forEach((object, index, array) => {
            $workspacePositionModalPositionsSelect.append($(object));
        });

        return true;
    } else {
        return false;
    }
}

$("#workspacePositionModalAddButton").click(() => {
    addVariableToMain({
        id: workspaceToBeAddId,
        variable: workspaceToBeAddVariable,
        afterComponentWithId: $workspacePositionModalPositionsSelect.val(),
    });

    // Reset variables for future use
    workspaceToBeAddId = null;
    workspaceToBeAddVariable = null;

    // Hide position modal
    $workspacePositionModal.modal("toggle");
});

function updateVariable(
    variable = {
        id: 0,
        name: "Name",
        type: "String",
        value: "Value",
        code: 'String Name = "value"',
        element: document.getElementById("body"),
    }
) {
    for (let i = 0; i < variables.length; i++) {
        if (variables[i].id === variable.id) {
            variables[i] = variable;
            return;
        }
    }

    console.warn(
        `Can't find variable with id: ${variable.id} to update, please verify the variable universalId`
    );
}

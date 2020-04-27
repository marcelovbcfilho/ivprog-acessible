const $code = $("#code");
const $main = $("#main");
const $functions = $("#functions");

let universalId = 0;
let creatingVariable = false;


function addVariable(variable = {name: "", type: dataTypes.String, value: ""}, id = null) {
    if (creatingVariable === false) {
        // Blocking future variable creation until finish the current creation
        creatingVariable = true;

        let html = "";
        html += `<div class="card col-3" id="variableCreationDiv">`;
        html += `    <div class="card-header">`;
        html += `       <h3>Adicionar variável</h3>`;
        html += `    </div>`;
        html += `    <div class="card-body">`;
        html += `        <div class="row">`;
        html += `            <div class="col-3">`;
        html += `                <label for="variableName">Nome: </label>`;
        html += `            </div>`;
        html += `            <div class="col-9">`;
        html += `                <input id="varibaleName" type="text" value="${variable.name}">`;
        html += `            </div>`;
        html += `        </div>`;
        html += `        <div class="row">`;
        html += `            <div class="col-3">`;
        html += `                <label for="variableType">Tipo: </label>`;
        html += `            </div>`;
        html += `            <div class="col-9">`;
        html += `                <select id="variableType">`;
        // Filling data type select with available data types in {data-types.js}
        for (let dataType in dataTypes) {
            if (dataType === variable.type)
                html += `                    <option value="${dataType}" selected>${dataTypes[dataType]}</option>`;
            else
                html += `                    <option value="${dataType}">${dataTypes[dataType]}</option>`;
        }
        html += `                </select>`;
        html += `            </div>`;
        html += `        </div>`;
        html += `        <div class="row">`;
        html += `            <div class="col-3">`;
        html += `                <label for="variableValue">Valor: </label>`;
        html += `            </div>`;
        html += `            <div class="col-9">`;
        html += `                <input id="variableValue" type="text" value="${variable.value}">`;
        html += `            </div>`;
        html += `        </div>`;
        html += `    </div>`;
        html += `    <div class="card-footer">`;
        html += `        <div class="row">`;
        html += `            <div class="col-6">`;
        html += `                <button type="button" accesskey="c" onclick="cancelAddVariable(${id})">Cancelar</button>`;
        html += `            </div>`;
        html += `            <div class="col-6">`;
        html += `                <button type="button" accesskey="s" onclick="addVariableTocode({id: ${id}})">Salvar</button>`;
        html += `            </div>`;
        html += `        </div>`;
        html += `    </div>`;
        html += `</div>`;
        $code.append(html);
    }
}

function addVariableTocode({id = null}) {
    let code = "";

    let variable = {
        name: $("#varibaleName").val(),
        type: $("#variableType").val(),
        value: $("#variableValue").val()
    };

    let variableBarrier = getVariableTypeBarrier(variable.type);

    code += `${variable.type} ${variable.name} = ${variableBarrier}${variable.value}${variableBarrier}`;

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

    if (id != null)
        $(`#codeLine${id}`).show();

    // Enabling future variable creation
    creatingVariable = false;
}

function editVariable(id = null, variable = {name: "", type: dataTypes.String, value: ""}) {
    $(`#codeLine${id}`).hide();
    addVariable(variable, id);
}

function deleteVariable(id = null) {
    if (id != null)
        $(`#codeLine${id}`).remove();
}

function addCodeToScreen({
                             id = null,
                             code = "Some code",
                             variable = {name: "", type: "String", value: ""}
                         }) {
    let html = ``;

    if (id != null) {
        $(`#mainCode${id}`).html(`<span>${code}</span>`);
        $(`#editCode${id}`).html(`<button type="button" id="editCodeButton${id}" onclick='editVariable(${id}, ${JSON.stringify(variable)})'>Editar</button>`);
        $(`#codeLine${id}`).show();
    } else {
        html += `<div class="row code-line" id="codeLine${universalId}">`;
        html += `    <div class="col-1 line-number" id="mainLine${universalId}"><span>${getCurrentMainLineNumber()}</span></div>`;
        html += `    <div class="col-7 line-code" id="mainCode${universalId}"><span>${code}</span></div>`;
        html += `    <div class="col-2" id="editCode${universalId}">`;
        html += `        <button type="button" id="editCodeButton${universalId}" onclick='editVariable(${universalId}, ${JSON.stringify(variable)})'>Editar</button>`;
        html += `    </div>`;
        html += `    <div class="col-2" id="deleteCode${universalId}">`;
        html += `        <button type="button" id="deleteCodeButton${universalId}" onclick="deleteVariable(${universalId})">Deletar</button>`;
        html += `    </div>`;
        html += `</div>`;

        $code.append(html);
    }

    // Increasing universal id
    universalId += 1;
}

function addFunctionToScreen({
                                 name = "functionName",
                             }) {

}

function getCurrentMainLineNumber() {
    // TO DO: Find a way to know in wath line the main code is
    return $(".code-line").length + 1;
}
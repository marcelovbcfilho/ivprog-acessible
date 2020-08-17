const UNIVERSAL_WORKSPACE_ID = "universalworkspaceid";
const WORKSPACE_COMPONENTS_NAME = "workspaceComponents";

function addVariableToMain({
                               id = null,
                               variable = {name: "", type: "String", value: ""},
                               afterComponentWithId = null,
                           }) {
    let html = ``;

    if (afterComponentWithId === null) {
        html += `<div class="col-12">`;
        html += `    <div class="row">`;
    }
    html += `        <div class="col-2 p-2 m-2 variable-available-main" id="workspaceVariableDiv${id}">`;
    html += `            <input type="hidden" id="workspaceGlobalMenu${id}" name="${WORKSPACE_COMPONENTS_NAME}" value='${variable.name}' ${UNIVERSAL_WORKSPACE_ID}="${id}">`;
    html += `            <input type="hidden" id="variableId${id}" value='${variable.id}'>`;
    html += `            <input type="hidden" name="mainOperationsType" value='${mainCodeTypes.variable}'>`;
    html += `            <div class="row">`;
    html += `                <div class="col-9 pt-2 text-center" style="border-right: 1px solid #646464;">`;
    html += `                <h6>${variable.name}</h6>`;
    html += `                </div>`;
    html += `                <div class="col-3 text-center" style="border-left: 1px solid #646464;">`;
    html += `                    <button type="button" class="btn btn-danger" onclick="deleteVariableFromMain(${id})">X</button>`;
    html += `                </div>`;
    html += `            </div>`;
    html += `        </div>`;
    if (afterComponentWithId === null) {
        html += `    </div>`;
        html += `</div>`;
    }

    if (afterComponentWithId == null) {
        $main.append(html);
    } else {
        $(html).insertAfter(`#workspaceVariableDiv${afterComponentWithId}`);
    }

    variable.usages.push(document.getElementById(`workspaceVariableDiv${id}`));
}

function attributeValueToMain({
                                  id = null,
                                  variable = {name: "", type: "String", value: ""},
                              }) {
    let html = ``;

    html += `<div class="col-12">`;
    html += `    <div class="row">`;
    html += `        <div class="col-2 p-2 m-2 variable-attribution-main" id="workspaceVariableDiv${id}">`;
    html += `            <input type="hidden" id="workspaceGlobalMenu${id}" name="${WORKSPACE_COMPONENTS_NAME}" value='${variable.name} = ' ${UNIVERSAL_WORKSPACE_ID}="${id}">`;
    html += `            <input type="hidden" id="variableId${id}" value='${variable.id}'>`;
    html += `            <input type="hidden" name="mainOperationsType" value='${mainCodeTypes.attribution}'>`;
    html += `            <div class="row">`;
    html += `                <div class="col-9 pt-2 text-center" style="border-right: 1px solid #646464;">`;
    html += `                    <h6>${variable.name} = </h6>`;
    html += `                </div>`;
    html += `                <div class="col-3 text-center" style="border-left: 1px solid #646464;">`;
    html += `                    <button type="button" class="btn btn-danger" onclick="deleteVariableFromMain(${id})">X</button>`;
    html += `                </div>`;
    html += `            </div>`;
    html += `        </div>`;
    html += `    </div>`;
    html += `</div>`;

    $main.append(html);

    variable.attributions.push(document.getElementById(`workspaceVariableDiv${id}`));
}

function deleteVariableFromMain(id = null) {
    $(`#workspaceVariableDiv${id}`).remove();
}

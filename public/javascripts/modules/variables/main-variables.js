const UNIVERSAL_WORKSPACE_ID = "universalworkspaceid";
const WORKSPACE_COMPONENTS_NAME = "workspaceComponents";

function addVariableToMain({id = null, variable = {name: "", type: "String", value: ""}, afterComponentWithId = null}) {
    let html = ``;
    let code = mountCodeFromVariable(variable);

    html += `<div class="col-3 p-2 m-2" style="background-color: #a6a6a6; border: 1px solid #646464" id="workspaceVariableDiv${id}">`;
    html += `    <input type="hidden" id="workspaceGlobalMenu${id}" name="${WORKSPACE_COMPONENTS_NAME}" value='${code}' ${UNIVERSAL_WORKSPACE_ID}="${id}">`;
    html += `    <div class="row">`;
    html += `        <div class="col-10 pt-2" style="border-right: 1px solid #646464;">`;
    html += `           <h6>${code}</h6>`;
    html += `        </div>`;
    html += `        <div class="col-2 pl-2 pr-1" style="border-left: 1px solid #646464;">`;
    html += `            <button type="button" class="btn btn-danger" onclick="deleteVariableFromMain(${id})">X</button>`;
    html += `        </div>`;
    html += `    </div>`;
    html += `</div>`;

    if (afterComponentWithId == null) {
        $main.append(html);
    } else {
        $(html).insertAfter(`#workspaceVariableDiv${afterComponentWithId}`);
    }
}

function deleteVariableFromMain(id = null) {
    $(`#workspaceVariableDiv${id}`).remove();
}
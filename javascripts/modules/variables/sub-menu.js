function buildVariablesSubmenu() {
    subMenuOptionsTitleH3.innerText = `Variáveis`;

    let body = ``;

    body += `<hr />`;
    body += `<div class="row">`;
    body += `  <div class="col-md-12 text-center">`;
    body += `      <button type="button" class="btn btn-info" onclick="addVariable()">Adicionar</button>`;
    body += `  </div>`;
    body += `</div>`;
    body += `<hr />`;

    let allWorkspaceComponents = $(
        `input[type="hidden"][name="${WORKSPACE_COMPONENTS_NAME}"]`
    );

    // Place after manipulation
    body += `<div class="p-3 text-center">`;
    body += `    <h5>Disponíveis</h5>`;
    body += `</div>`;
    for (let i = 0; i < variables.length; i++) {
        body += `<div class="row p-3 text-center variable-available-sub-menu" id="subMenuOptionVariable${variables[i].id}">`;
        body += `   <div class="col-md-4">`;
        body += `       <h5>${variables[i].name}</h5>`;
        body += `   </div>`;
        body += `   <div class="col-md-8">`;
        body += `       <div class="col-md-8">`;
        body += `           <select class="form-control" id="placeVariableAfter${i}">`;
        body += `               <option value="" disabled>Adicionar após</option>`;
        for (let i = 0; i < allWorkspaceComponents.length; i++) {
            body += `<option value="${allWorkspaceComponents[i].attributes.universalworkspaceid.value}">${allWorkspaceComponents[i].value}</option>`;
        }
        body += `           </select>`;
        body += `       </div>`;
        body += `   </div>`;
        body += `</div>`;
        body += `<div class="row p-3">`;
        body += `    <div class="col-6 text-center">`;
        body += `        <button type="button" class="btn btn-info" onclick="positionVariableAfter(${i})">Posicionar</button>`;
        body += `    </div>`;
        body += `    <div class="col-6 text-center">`;
        body += `        <button type="button" class="btn btn-danger" onclick="deleteVariable(${i}, 'subMenuOptionVariable${variables[i].id}')">Excluir</button>`;
        body += `    </div>`;
        body += `</div>`;
    }

    body += `<hr />`;

    // Value attribution manipulation
    body += `<div class="p-3 text-center">`;
    body += `    <h5>Atribuir</h5>`;
    body += `</div>`;
    body += `<div>`;
    body += `   <div class="row p-3 variable-attribution-sub-menu">`;
    body += `       <div class="col-md-10" class="text-center">`;
    body += `           <select class="form-control" id="variableToBeAttributed">`;
    for (let i = 0; i < variables.length; i++) {
        body += `               <option value="${i}">${variables[i].name}</option>`;
    }
    body += `           </select>`;
    body += `       </div>`;
    body += `       <div class="col-md-2 align-content-center">`;
    body += `           <h5>=</h5>`;
    body += `       </div>`;
    body += `   </div>`;
    body += `   <div class="row p-4">`;
    body += `       <div class="col-md-12 text-center">`;
    body += `           <button type="button" class="btn btn-info" onclick="attributeVariable()">Posicionar</button>`;
    body += `       </div>`;
    body += `   </div>`;
    body += `</div>`;

    subMenuOptionsBody.innerHTML = body;
    subMenuOptions.style.display = 'inline';
}

function positionVariableAfter(variableIndex) {
    let placeAfter = $(`#placeVariableAfter${variableIndex} :selected`).val();

    if (placeAfter !== "") {
        addVariableToMain({
            id: universalId.next(),
            variable: variables[variableIndex],
            afterComponentWithId: placeAfter,
        });
    } else {
        addVariableToMain({
            id: universalId.next(),
            variable: variables[variableIndex],
        });
    }

    subMenuOptions.style.display = "none";
}

function attributeVariable() {
    let variableToBeAttributed = document.getElementById("variableToBeAttributed");

    attributeValueToMain({
        id: universalId.next(),
        variable: variables[variableToBeAttributed.value],
    });

    hideSubMenu();
}

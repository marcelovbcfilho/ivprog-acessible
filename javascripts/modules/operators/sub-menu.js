function buildOperationsSubMenu() {
    subMenuOptionsTitleH3.innerText = `Operações`;

    let body = ``;

    let allWorkspaceComponents = $(
        `input[type="hidden"][name="${WORKSPACE_COMPONENTS_NAME}"]`
    );

    body += `<hr />`;

    // Value attribution manipulation
    body += `<div class="p-3 text-center">`;
    body += `    <h5>Atribuir</h5>`;
    body += `</div>`;
    body += `<div>`;
    body += `   <div class="row p-3 operation-sub-menu">`;
    body += `       <div class="col-md-5 text-center">`;
    body += `           <select class="form-control" id="firstOperationSubMenuVariable">`;
    for (let i = 0; i < variables.length; i++) {
        body += `               <option value="${i}">${variables[i].name}</option>`;
    }
    body += `           </select>`;
    body += `       </div>`;
    body += `       <div class="col-2 text-center">`;
    body += `           <select class="form-control" id="operationTypeSubMenu">`;
    for (let i = 0; i < operators.length; i++) {
        body += `               <option value="${operators[i].value}">${operators[i].operator}</option>`;
    }
    body += `           </select>`;
    body += `       </div>`;
    body += `       <div class="col-md-5 text-center">`;
    body += `           <select class="form-control" id="secondOperationSubMenuVariable">`;
    for (let i = 0; i < variables.length; i++) {
        body += `               <option value="${i}">${variables[i].name}</option>`;
    }
    body += `           </select>`;
    body += `       </div>`;
    body += `    </div>`;
    body += `    <div class="row">`;
    body += `        <select class="form-control" id="placeOperationAt">`;
    body += `            <option value="" disabled>Adicionar após</option>`;
    for (let i = 0; i < allWorkspaceComponents.length; i++) {
        body += `<option value="${allWorkspaceComponents[i].attributes.universalworkspaceid.value}">${allWorkspaceComponents[i].value}</option>`;
    }
    body += `           </select>`;
    body += `    </div>`;
    body += `    <div class="row p-4">`;
    body += `        <div class="col-md-12 text-center">`;
    body += `            <button type="button" class="btn btn-info" onclick="placeOperationAt()">Posicionar</button>`;
    body += `        </div>`;
    body += `    </div>`;
    body += `</div>`;

    body += `<hr />`;

    // Add operator to main
    body += `<div class="p-3 text-center">`;
    body += `    <h5>Operador</h5>`;
    body += `</div>`;
    body += `<div class="row text-center">`;
    body += `    <div class="col-4">`;
    body += `    </div>`;
    body += `    <div class="col-4">`;
    body += `        <select class="form-control" id="operatorTypeSubMenu">`;
    for (let i = 0; i < operators.length; i++) {
        body += `            <option value="${operators[i].value}">${operators[i].operator}</option>`;
    }
    body += `        </select>`;
    body += `    </div>`;
    body += `    <div class="col-4">`;
    body += `    </div>`;
    body += `</div>`;
    body += `<div>`;
    body += `    <div class="row p-3">`;
    body += `        <select class="form-control" id="placeOperatorAt">`;
    body += `            <option value="" disabled>Adicionar após</option>`;
    for (let i = 0; i < allWorkspaceComponents.length; i++) {
        body += `<option value="${allWorkspaceComponents[i].attributes.universalworkspaceid.value}">${allWorkspaceComponents[i].value}</option>`;
    }
    body += `           </select>`;
    body += `    </div>`;
    body += `    <div class="row p-4">`;
    body += `        <div class="col-md-12 text-center">`;
    body += `            <button type="button" class="btn btn-info" onclick="placeOperatorAt()">Posicionar</button>`;
    body += `        </div>`;
    body += `    </div>`;
    body += `</div>`;

    subMenuOptionsBody.innerHTML = body;
    showSubMenu();
}
const $code = $("#code");
const $main = $("#main");
const $functions = $("#functions");


function addCodeToScreen({
    code = "Some code",
}) {
    let html = ``;
    html += `<div class="row code-line">`;
    html += `   <div class="col-1 line-number" id="mainLine"><span>${getCurrentMainLineNumber()}</span></div>`;
    html += `   <div class="col-11 line-code" id="mainCode"><span>${code}</span></div>`;
    html += `</div>`;
    $code.append(html);
}

function addFunctionToScreen({
    name = "functionName",
}) {

}

function getCurrentMainLineNumber() {
    // TO DO: Find a way to know in wath line the main code is
    return $(".code-line").length + 1;
}
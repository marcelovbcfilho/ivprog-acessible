const $code = $("#code");
const $main = $("#main");
const $functions = $("#functions");

let universalId = 0;

function getCurrentMainLineNumber() {
    // TO DO: Find a way to know in wath line the main code is
    return $(".code-line").length + 1;
}
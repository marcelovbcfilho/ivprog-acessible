const $code = $("#code");
const $workspace = $("#workspace");
const $main = $("#main");
const $functions = $("#functions");
const trashSound = new Audio("media/sounds/trash.mp3");

const mainCodeTypes = {
    variable: "VARIABLE",
    operation: "OPERATION",
    attribution: "ATTRIBUTION",
    operator: "OPERATOR"
};

// Sub menu elements

let universalId = {
    current: 0,
    next: function () {
        this.current = this.current + 1;
        return this.current;
    }
};

function getCurrentMainLineNumber() {
    // TO DO: Find a way to know in wath line the main code is
    return $(".code-line").length + 1;
}

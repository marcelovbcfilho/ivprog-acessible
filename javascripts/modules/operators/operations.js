const operators = [
    {
        name: "Soma",
        operator: "+",
        value: "SUM"
    },
    {
        name: "Subtração",
        operator: "-",
        value: "MINUS"
    },
    {
        name: "Multiplicação",
        operator: "*",
        value: "MULTIPLICATION"
    },
    {
        name: "Divisão",
        operator: "/",
        value: "DIVISION"
    },
    {
        name: "Potência",
        operator: "^",
        value: "POTENTIATION"
    },
    {
        name: "Raíz Quadrada",
        operator: "\u221A",
        value: "SQUARE_ROOT"
    }
];

function getOperationByValue(value) {
    for (let i = 0; i < operators.length; i++) {
        if (operators[i].value === value)
            return operators[i];
    }

    return null;
}
const dataTypes = {
    String: 'String',
    byte: 'Byte',
    short: 'Short',
    int: 'Int',
    long: 'Long',
    float: 'Float',
    double: 'Double',
    boolean: 'Boolean',
    char: 'Char'
};

function getVariableTypeBarrier(dataType) {
    console.log("Getting barrier for type: " + dataType);

    switch (dataType) {
        case 'String':
            return "\"";
        case 'char':
            return "\'";
        default:
            return "";
    }
}
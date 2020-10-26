function getOperationById(id) {
    for (let i = 0; i < operations.length; i++) {
        if (operations[i].id == id )
            return operations[i];
    }

    return null;
}
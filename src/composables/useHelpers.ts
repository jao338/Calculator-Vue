export const useHelpers = () => {
    const resetArray = (): Array<string> => [];

    // Não funciona como esperado. ** FINALIZAR **
    function applySquareRoot(values: (string|number)[]): (string|number)[] {
        const newValues: (string | number)[] = ['sqrt', '('];

        for (const item of values) {
            if (item !== 'sqrt') {
                newValues.push(item);
            }
        }

        values = newValues.push(')');
        return values
    }

    return {
        resetArray,
        applySquareRoot,
    }
}

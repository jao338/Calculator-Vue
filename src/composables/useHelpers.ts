export const useHelpers = () => {
    const resetArray = (): Array<string> => [];

    function applySquareRoot(values: (string|number)[]): (string|number)[] {
        const newValues: (string | number)[] = ['sqrt', '('];

        for (const item of values) {
            if (item !== 'sqrt') {
                newValues.push(item);
            }
        }

        newValues.push(')');
        values = newValues;
        return values
    }

    return {
        resetArray,
        applySquareRoot,
    }
}

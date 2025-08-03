import {evaluate} from "mathjs";
import {z} from "zod";
import {type Grid} from "./Interface";
import {Colors} from "../../components/Enums";
import {ref} from "vue";
import {useHelpers} from "../../composables/useHelpers";

export function useService() {
    const specialChars: string[] = getSpecialChars();
    const allowedKeys: string[] = getAllowedKeys()
    const values = ref<(string | number)[]>([]);

    const {resetArray, applySquareRoot} = useHelpers();

    function evaluateExpression(values: (string | number)[]): number | string | boolean {
        const ExpressionSchema = z.array(z.union([z.string(), z.number()]));

        const validated = ExpressionSchema.safeParse(values)
        if (!validated.success) return false

        try {
            const raw = values
                .map(v => v.toString())
                .join('')
            const result = evaluate(raw)

            if (!isFinite(Number(result))) return 'Divisão por zero'
            if (isNaN(Number(result))) return 'Resultado indefinido'
            return result
        } catch (error) {
            return 'Expressão inválida';
        }
    }

    function getGridItems(): Grid[][] {
        return [
            [
                {value: 'CE', label: 'CE', color: Colors.bgBlue, action: clearEntry},
                {value: 7, label: '7'},
                {value: 4, label: '4'},
                {value: 1, label: '1'},
                {value: 0, label: '0'},
            ],
            [
                {value: 'C', label: 'C', color: Colors.bgBlue, action: clearAllData},
                {value: 8, label: '8'},
                {value: 5, label: '5'},
                {value: 2, label: '2'},
                {value: '.', label: ',', color: Colors.bgBlue},
            ],
            [
                {value: 'backspace', label: '⌫', color: Colors.bgRed, action: clearLastValue},
                {value: 9, label: '9'},
                {value: 6, label: '6'},
                {value: 3, label: '3'},
                {value: '%', label: '%', color: Colors.bgBlue},
            ],
            [
                {value: '/', label: '/', color: Colors.bgBlue},
                {value: '*', label: 'x', color: Colors.bgBlue},
                {value: '-', label: '-', color: Colors.bgBlue},
                {value: '+', label: '+', color: Colors.bgBlue},
            ],
            [
                {value: 'sqrt', label: '√', color: Colors.bgBlue},
                {value: '^2', label: 'x²', color: Colors.bgBlue},
                {value: '=', label: '=', color: Colors.bgGreen, action: execute},
            ],
        ]
    }

    function getAllowedKeys(): string[] {
        return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', '*', '/', '%', '.', 'enter', 'backspace', '(', ')', 'escape']
    }

    function getSpecialChars(): string[] {
        return ['+', '-', '*', '/', '%', '^2', 'sqrt'];
    }

    function clearAllData(): void {
        values.value = resetArray();
    }

    function clearEntry(): void {
        values.value.findIndex(valor => specialChars.includes(valor as string)) == -1 ? values.value = resetArray() : null

        const lastInvalidIndex = [...values.value]
            .map((valor, idx) => ({valor, idx}))
            .reverse()
            .find(({valor}) =>
                typeof valor === 'string' &&
                specialChars.includes(valor) &&
                valor.length === 1
            )?.idx;

        if (lastInvalidIndex !== undefined) {
            values.value = values.value.slice(0, lastInvalidIndex);
        }
    }

    function clearLastValue(): void {
        values.value.pop();
    }

    function execute(): void {
        if (values.value.length > 0) {
            if (evaluateExpression(values.value)) {
                const result: string = evaluateExpression(values.value) as string
                values.value = String(result).split('')
            }
        }
    }

    function concatToValues(val: string | number, action?: () => void): void {
        const isFirstValue = values.value.length === 0;
        const isSpecialChar = specialChars.includes(val as string);

        if (isFirstValue && isSpecialChar) {
            return;
        }

        if (action) {
            action();
            return;
        }

        switch (val) {
            case 'sqrt':
                values.value = applySquareRoot(values.value);
                return;
            case 'backspace':
                clearLastValue();
                return;
            case 'enter':
                execute();
                return;
            case 'escape':
                clearAllData();
                return;
            default:
                values.value.push(val);
                return;
        }
    }

    return {
        getGridItems,
        values,
        allowedKeys,
        specialChars,
        concatToValues,
    }
}

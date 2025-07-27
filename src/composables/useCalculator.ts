import { evaluate } from 'mathjs'
import { z } from 'zod'

const ExpressionSchema = z.array(z.union([z.string(), z.number()]))

export function useCalculator() {
    function evaluateExpression(values: (string | number)[]): number | string | boolean {
        const validated = ExpressionSchema.safeParse(values)
        if (!validated.success) return false

        try {
            const raw = values
                .map(v => v.toString())
                .join('')

            const result = evaluate(raw)

            console.log(result)

            if (!isFinite(Number(result))) return 'Divisão por zero'
            if (isNaN(Number(result))) return 'Resultado indefinido'

            return result
        } catch (error) {
            return false
        }
    }

    return {
        evaluateExpression
    }
}

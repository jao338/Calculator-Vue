export interface Grid {
    value: string | number,
    label: string | number,
    color?: string,
    action?: () => void|number
}

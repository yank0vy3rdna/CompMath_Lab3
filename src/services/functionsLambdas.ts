const functions: { int: { lambda: (x: number) => number; label: string; } } = {
// @ts-ignore
    0: {
        lambda: (x: number) => 0,
        label: 'Ничего не выбрано',
        phi: (x: number) => 0,
        der: (x: number) => 0,
        der_2: (x: number) => 0
    },
    1: {
        lambda: (x: number) => 3 * x * x * x + 1.7 * x * x - 15.42 * x + 6.89,
        label: '3𝑥^3+1,7𝑥^2−15,42𝑥+6,89',
        phi: (x: number) => (3 * x * x * x + 1.7 * x * x + 6.89) / 15.42,
        der: (x: number) => 9 * x * x + 3.4 * x - 15.42,
        der_2: (x: number) => 18 * x + 3.4
    },
    2: {
        lambda: (x: number) => Math.sin(x) + Math.cos(x) - x,
        label: 'sin(x)+cos(x)-x',
        phi: (x: number) => Math.sin(x) + Math.cos(x),
        der: (x: number) => -Math.sin(x) + Math.cos(x) - 1,
        der_2: (x: number) => -Math.sin(x) - Math.cos(x)
    },
    3: {
        lambda: (x: number) => x * x * x - x + 4,
        label: 'x^3-x+4',
        phi: (x: number) => x * x * x + 4,
        der: (x: number) => 3 * x * x - 1,
        der_2: (x: number) => 6 * x
    },
}

export function getFunctionLambda(selectedFunction: number) {
    // @ts-ignore
    return functions[selectedFunction];
}

export function getSelectList() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // @ts-ignore
    const list: [{ value: number, label: string }] = []
    for (let i in functions) {
        // @ts-ignore
        list.push({value: i, label: functions[i].label})
    }
    return list
}
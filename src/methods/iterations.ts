function round(num: number) {
    return Math.round(num * 1000) / 1000
}

function Iterations(
    selectedFunction: { lambda: (x: number) => number, der_2: (x: number) => number, der: (x: number) => number, phi: (x: number) => number, label: string },
    left: number,
    right: number,
    epsilon: number,
    x_null: number) {
    const data: any[] = []

    let lambda = -1 / Math.max(selectedFunction.der(left), selectedFunction.der(right));
    let q = Math.max(Math.abs(1 + lambda * selectedFunction.der(left)), Math.abs(1 + lambda * selectedFunction.der(right)))
    if (q >= 1){
        return {
            headers: ["Error"],
            data: [{"Error": "Условие сходимости нарушено"}]
        }
    }
    let x_prev = x_null
    let x_current = selectedFunction.phi(x_prev)
    let number = 1
    while (Math.abs(x_prev - x_current) > epsilon || number === 1) {
        data.push({
            '№': number,
            'x_k': round(x_prev),
            'x_{k+1}': round(x_current),
            'f(x_{k+1})': round(selectedFunction.lambda(x_current)),
            'phi(x_{k+1})': round(selectedFunction.phi(x_current)),
            '|x_k-x_{k+1}|': Math.abs(x_prev - x_current)
        })
        x_prev = x_current
        x_current = selectedFunction.phi(x_prev)
        number++
    }
    return {
        headers: ['№', 'x_k', 'x_{k+1}', 'f(x_{k+1})', 'phi(x_{k+1})', '|x_k-x_{k+1}|'],
        data: data
    }
}

export default Iterations;
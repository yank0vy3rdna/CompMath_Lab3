function round(num: number) {
    return Math.round(num * 1000) / 1000
}

function Secants(
    selectedFunction: { lambda: (x: number) => number, der_2: (x: number) => number, der: (x: number) => number, phi: (x: number) => number, label: string },
    left: number,
    right: number,
    epsilon: number,
    x_null: number) {
    const data: any[] = []
    let x_pprev = x_null
    let x_prev = x_null + Math.abs(left - right) / 3
    let x_current = 1000000
    let number = 1
    while (Math.abs(x_pprev - x_prev) > epsilon) {
        x_current = x_prev - (x_prev - x_pprev) * selectedFunction.lambda(x_prev) / (selectedFunction.lambda(x_prev) - selectedFunction.lambda(x_pprev))
        data.push({
            '№': number,
            'x_{k-1}': round(x_pprev),
            'f(x_{k-1})': round(selectedFunction.lambda(x_pprev)),
            'x_k': round(x_prev),
            'f(x_k)': round(selectedFunction.lambda(x_prev)),
            'x_{k+1}': round(x_current),
            'f(x_{k+1})': round(selectedFunction.lambda(x_current)),
            '|x_k-x_{k+1}|': Math.abs(x_prev - x_current)
        })
        x_pprev = x_prev
        x_prev = x_current
        number++
    }
    return {
        headers: ['№', 'x_{k-1}', 'f(x_{k-1})', 'x_k', 'f(x_k)', 'x_{k+1}', 'f(x_{k+1})', '|x_k-x_{k+1}|'],
        data: data
    }
}

export default Secants;
function round(num: number) {
    return Math.round(num * 1000) / 1000
}

function Hordes(
    selectedFunction: { lambda: (x: number) => number, der_2: (x: number) => number, der: (x: number) => number, phi: (x: number) => number, label: string },
    left: number,
    right: number,
    epsilon: number,
    x_null: number) {
    const data: any[] = []
    let a = left
    let b = right
    let x_prev = 100000
    let flag = false
    let first_der = selectedFunction.der(a)
    let first_der_2 = selectedFunction.der_2(a)
    for (let i = a; i < b; i += 0.01) {
        let der = selectedFunction.der(i)
        let der_2 = selectedFunction.der_2(i)
        if (der * first_der < 0 || der_2 * first_der_2 < 0) {
            flag = true
            break
        }
    }
    if (selectedFunction.lambda(a) * selectedFunction.lambda(b) > 0)
        flag = true
    if (flag)
        return {
            headers: ["Error"],
            data: [{"Error": "Условия сходимости нарушены"}]
        }

    let x_current
    if (selectedFunction.lambda(a) * selectedFunction.der_2(a) > 0)
        x_current = a
    else
        x_current = b
    let number = 1
    while (Math.abs(x_prev - x_current) > epsilon) {
        x_prev = x_current
        let fa = selectedFunction.lambda(a)
        let fb = selectedFunction.lambda(b)
        x_current = a - (b - a) * selectedFunction.lambda(a) / (selectedFunction.lambda(b) - selectedFunction.lambda(a))
        let fx = selectedFunction.lambda(x_current)
        let abs_ab = Math.abs(a - b)
        data.push({
            '№': number,
            'a': round(a),
            'b': round(b),
            'x': round(x_current),
            'f(a)': round(fa),
            'f(b)': round(fb),
            'f(x)': round(fx),
            '|a-b|': round(abs_ab)
        })
        if (x_current * fa > 0)
            b = x_current
        else
            a = x_current
        if (number > 2000)
            return {
                headers: ["Error"],
                data: [{"Error": "Количество итераций превысило допустимое количество"}]
            }
        number++
    }
    return {
        headers: ['№', 'a', 'b', 'x', 'f(a)', 'f(b)', 'f(x)', '|a-b|'],
        data: data
    }
}

export default Hordes;
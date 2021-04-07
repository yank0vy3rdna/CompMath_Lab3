function Trapezoid(
    selectedFunction: { lambda: (x: number) => number, der_2: (x: number) => number, der: (x: number) => number, phi: (x: number) => number, label: string },
    left: number,
    right: number,
    epsilon: number) {
    let a = left
    let b = right
    let answ = 0
    let prev_answ = 100000000
    let n = 2
    while (Math.abs(prev_answ - answ) > epsilon) {
        n = n * 2
        prev_answ = answ
        answ = 0
        const step = (b - a) / n
        for (let i = a + step; i < b; i += step) {
            answ += selectedFunction.lambda(i)
        }
        answ = step / 2 * (selectedFunction.lambda(a) + selectedFunction.lambda(b) + 2 * answ)
        console.log(answ, n)
    }

    return {
        headers: ['Answer', 'n'],
        data: [{'Answer': answ, 'n': n}]
    }
}

export default Trapezoid;
function Simpson(
    selectedFunction: { lambda: (x: number) => number, der_2: (x: number) => number, der: (x: number) => number, phi: (x: number) => number, label: string },
    left: number,
    right: number,
    epsilon: number) {
    let a = left
    let b = right
    let answ = 0
    let prev_answ = 1000
    let n = 2
    while ( Math.abs(prev_answ - answ) > epsilon) {
        n = n * 2
        prev_answ = answ
        answ = 0
        const step = (b - a) / n
        let counter = 0
        for (let i = a; i <= b; i += step) {
            if (counter == 0 || counter == n)
                answ += selectedFunction.lambda(i)
            else if (counter > 0 && counter % 2 == 1 && counter < n) {
                answ += selectedFunction.lambda(i) * 4
            }
            else if (counter > 0 && counter % 2 == 0 && counter < n) {
                answ += selectedFunction.lambda(i) * 2
            }
            counter++
        }
        answ = step/3*answ
    }

    return {
        headers: ['Answer', 'n'],
        data: [{'Answer': answ, 'n': n}]
    }
}

export default Simpson;
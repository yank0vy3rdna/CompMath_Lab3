import {getFunctionLambda} from "./functionsLambdas";

function generateDataForPlot(selectedFunction: number, settings: { left: number, right: number }) {
    // @ts-ignore
    const functionLambda = getFunctionLambda(selectedFunction).lambda
    const x = []
    const y = []
    const diff = Math.abs(settings.left - settings.right) / 3
    for (let i = settings.left - diff; i < settings.right + diff; i += 0.01) {
        x.push(i)
        y.push(functionLambda(i))
    }
    return [x, y]
}

export default generateDataForPlot

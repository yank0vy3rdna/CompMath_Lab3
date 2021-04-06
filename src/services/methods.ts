import Hordes from "../methods/hordes";
import Secants from "../methods/secants";
import Iterations from "../methods/iterations";

const methods = [
    {
        value: 0, label: "Ничего не выбрано", method: () => {
            return {
                headers: [],
                data: []
            }
        }
    },
    {value: 1, label: "Метод хорд", method: Hordes},
    {value: 2, label: "Метод секущих", method: Secants},
    {value: 3, label: "Метод простых итераций", method: Iterations},
]

export function getMethodsSelect() {
    return methods
}

export function getMethodByValue(value: number) {
    for (let i in methods) {
        if (methods[i].value === value) {
            return methods[i]
        }
    }
    return methods[0]
}
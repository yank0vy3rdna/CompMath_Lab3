import RectanglesLeft from "../methods/RectanglesLeft";
import RectanglesRight from "../methods/RectanglesRight";
import RectanglesCenter from "../methods/RectanglesCenter";
import Trapezoid from "../methods/Trapezoid";
import Simpson from "../methods/Simpson";

const methods = [
    {
        value: 0, label: "Ничего не выбрано", method: () => {
            return {
                headers: [],
                data: []
            }
        }
    },
    {value: 1, label: "Метод прямоугольников(левые)", method: RectanglesLeft},
    {value: 2, label: "Метод прямоугольников(правые)", method: RectanglesRight},
    {value: 3, label: "Метод прямоугольников(средние)", method: RectanglesCenter},
    {value: 4, label: "Метод трапеций", method: Trapezoid},
    {value: 5, label: "Метод Симпсона", method: Simpson},
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
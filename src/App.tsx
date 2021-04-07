import React, {useState} from 'react';
import './App.css';
import PlotItem from './components/PlotItem';
import SelectItem from "./components/Select";
import generateDataForPlot from "./services/generateDataForPlot";
import {getFunctionLambda, getSelectList} from "./services/functionsLambdas";
// @ts-ignore
import NumericInput from "react-numeric-input";
import {getMethodByValue, getMethodsSelect} from "./services/methods";
import Table from "./components/DynamicTable";
import SettingsFile from "./components/SettingsFile";

function App() {
    const selectFunctionsList = getSelectList()
    const selectMethodsList = getMethodsSelect()
    const [selectedFunction, setSelectedFunction] = useState(selectFunctionsList[0]);
    const [selectedMethod, setSelectedMethod] = useState(selectMethodsList[0]);
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(2);
    const [epsilon, setEpsilon] = useState(0.001);

    if (left > right)
        setLeft(right)
    if (right < left)
        setRight(left)
    let x, y;
    [x, y] = generateDataForPlot(selectedFunction.value, {left: left, right: right})

    const functionLambda = getFunctionLambda(selectedFunction.value)
    const method = getMethodByValue(selectedMethod.value)
    const resultOfCalc = method.method(functionLambda, left, right, epsilon)


    return (
        <div className="App">
            <h3>Лабораторная работа №3 по вычислительной математике. Крюков Андрей, P3214</h3>
            <table className="App">
                <tr>
                    <td>Выбор функции:</td>
                    <td><SelectItem onSelectHandler={setSelectedFunction} value={selectedFunction}
                                    options={selectFunctionsList}/></td>
                </tr>
                <tr>
                    <td>Выбор метода:</td>
                    <td><SelectItem onSelectHandler={setSelectedMethod} value={selectedMethod}
                                    options={selectMethodsList}/></td>
                </tr>
                <tr>
                    <td>Выбор нижнего предела интегрирования:</td>
                    <td>
                        <NumericInput step={0.001} precision={3} value={left}
                                      onChange={setLeft} max={right}/>
                    </td>
                </tr>
                <tr>
                    <td>Выбор верхнего предела интегрирования:</td>
                    <td>
                        <NumericInput step={0.001} precision={3} value={right}
                                      onChange={setRight} min={left}/>
                    </td>
                </tr>
                <tr>
                    <td>Выбор epsilon:</td>
                    <td>
                        <NumericInput step={0.001} precision={3} value={epsilon}
                                      onChange={setEpsilon} min={0.001}/>
                    </td>
                </tr>
            </table>
            <SettingsFile setSettings={(text: string)=>{
                try {
                    let obj = JSON.parse(text)
                    if (!('left' in obj)){
                        throw SyntaxError("Bad file")
                    }
                    if (!('right' in obj)){
                        throw SyntaxError("Bad file")
                    }
                    if (!('epsilon' in obj)){
                        throw SyntaxError("Bad file")
                    }
                    if (!('xnull' in obj)){
                        throw SyntaxError("Bad file")
                    }
                    setLeft(obj.left)
                    setRight(obj.right)
                    setEpsilon(obj.epsilon)
                }catch (e){
                    alert("File is not correct")
                }
            }}/>
            <PlotItem x={x} y={y}/>
            <Table data={resultOfCalc.data} header={resultOfCalc.headers}/>
        </div>
    );
}

export default App;

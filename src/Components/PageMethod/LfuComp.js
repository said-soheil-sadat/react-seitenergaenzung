import React, {useState, useEffect} from 'react';
import {getNumberFromParent} from "../../Constants/MethodConst";
import {createEmptyArray} from "../../Constants/MethodConst";

function LfuComp(props) {

    const [pageArray, setPageArray] = useState(createEmptyArray(props));

    useEffect(() => {
        const arr = Array.from({length: props.pageSize}, () => Array.from({length: 0}, () => null));
        for (let i = 0; i < arr.length; i++) {
            arr[i][0] = {value: 0, age: 0, hits: 0};
        }
        setPageArray(arr);
    }, [props.pageSize]);

    function addNumber() {
        let addedNumber = false;
        let copyPageArray = [...pageArray];

        for (let i = 0; i < copyPageArray.length; i++) {
            let lastPage = copyPageArray[i].length - 1;
            if (copyPageArray[i][lastPage].value === getNumberFromParent(props)) {
                addedNumber = true;
                copyPageArray[i] = [...copyPageArray[i], {
                    value: copyPageArray[i][lastPage].value,
                    age: copyPageArray[i][lastPage].age + 1,
                    hits: copyPageArray[i][lastPage].hits + 1
                }];
            }
        }

        if (!addedNumber) {
            for (let i = 0; i < copyPageArray.length; i++) {
                let lastPage = copyPageArray[i].length - 1;
                if (copyPageArray[i][lastPage].value === 0 && !addedNumber) {
                    addedNumber = true;
                    copyPageArray[i] = [...copyPageArray[i], {
                        value: getNumberFromParent(props),
                        age: 0,
                        hits: 1
                    }];
                }
            }
        }

        if (!addedNumber) {
            let replaceIndex = 0;
            let minHits = copyPageArray[0][copyPageArray[0].length - 1].hits;
            let maxAge = copyPageArray[0][copyPageArray[0].length - 1].age;


            for (let i = 1; i < copyPageArray.length; i++) {
                let lastPage = copyPageArray[i].length - 1;
                if (copyPageArray[i][lastPage].hits < minHits) {
                    minHits = copyPageArray[i][lastPage].hits;
                    replaceIndex = i;
                    maxAge = copyPageArray[i][lastPage].age;
                } else if (copyPageArray[i][lastPage].hits === minHits) {
                    if (copyPageArray[i][lastPage].age > maxAge) {
                        replaceIndex = i;
                        maxAge = copyPageArray[i][lastPage].age;
                    }
                }
            }
            copyPageArray[replaceIndex] = [...copyPageArray[replaceIndex], {
                value: getNumberFromParent(props),
                age: 0,
                hits: 1
            }];
        }

        for (let i = 0; i < copyPageArray.length; i++) {
            let lastPage = copyPageArray[i].length - 1;
            if (copyPageArray[i][lastPage].value !== getNumberFromParent(props)) {
                if (copyPageArray[i][lastPage].value !== 0) {
                    copyPageArray[i] = [...copyPageArray[i], {
                        value: copyPageArray[i][lastPage].value,
                        age: copyPageArray[i][lastPage].age + 1,
                        hits: copyPageArray[i][lastPage].hits
                    }];
                } else {
                    copyPageArray[i] = [...copyPageArray[i], {
                        value: 0,
                        age: 0,
                        hits: 0
                    }];
                }

            }
        }


        setPageArray(copyPageArray);
    }


    return (
        <div>LFU COMP
            <br/>
            <table key="lfutable">
                <tbody key="tableBody">
                <tr key="test1">
                    <td>Page</td>
                    {pageArray[0].map((x, index) => <td key={index + 400}>V | A | H</td>)}
                </tr>
                {pageArray.map((item, index) =>
                    <tr key={index + 200}>
                        <td key={index + 100}>{index + 1}</td>
                        {item.map((inputValues, indexTD) => <td
                            key={indexTD + 1000}>{inputValues.value} | {inputValues.age} | {inputValues.hits}</td>)}
                    </tr>)}

                <tr key="msRow">
                    <td key="msCount">ms</td>
                </tr>

                </tbody>
            </table>
            <button onClick={addNumber}> Click Me</button>

        </div>


    );
}

export default LfuComp;

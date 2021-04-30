import React, {useEffect, useState} from 'react';
import {createEmptyArray, getNumberFromParent} from "../../Constants/MethodConst";


function SecChanceComp(props) {
    const [pageArray, setPageArray] = useState(createEmptyArray(props));
    const [indexIterator, setIndexIterator] = useState(0);

    useEffect(() => {
        const arr = Array.from({length: props.pageSize}, () => Array.from({length: 0}, () => null));
        for (let i = 0; i < arr.length; i++) {
            arr[i][0] = {value: 0, secondChance: false};
        }
        setPageArray(arr);
        setIndexIterator(0);
    }, [props.pageSize]);

    function addNumber() {
        let copyOfPages = [...pageArray];
        let addedNumber = false;
        let startIndex = indexIterator;
        let secChanceCheck = [];
        for (let i = 0; i < copyOfPages.length; i++) {
            if (copyOfPages[i][copyOfPages[i].length - 1].value === getNumberFromParent(props)) {
                copyOfPages[i] = [...copyOfPages[i], {
                    value: copyOfPages[i][copyOfPages[i].length - 1].value,
                    secondChance: true
                }];
                addedNumber = true;
                startIndex = i + 1;
            }
            secChanceCheck.push(copyOfPages[i][copyOfPages[i].length - 1].secondChance);
        }

        while (!addedNumber) {
            if (startIndex >= pageArray.length) {
                startIndex = 0;
            }
            if (secChanceCheck[startIndex]) {
                secChanceCheck[startIndex] = false;
            } else {
                copyOfPages[startIndex] = [...copyOfPages[startIndex], {
                    value: getNumberFromParent(props),
                    secondChance: false
                }];
                addedNumber = true;
            }
            startIndex++;
        }
        for (let i = 0; i < copyOfPages.length; i++) {
            if (copyOfPages[i][copyOfPages[i].length - 1].value !== getNumberFromParent(props)) {
                copyOfPages[i] = [...copyOfPages[i], {
                    value: copyOfPages[i][copyOfPages[i].length - 1].value,
                    secondChance: secChanceCheck[i]
                }];
            }
        }
        setIndexIterator(startIndex);
        setPageArray(copyOfPages);
    }


    return (
        <div>SECOND CHANCE

            <br/>
            <table key="secchancetable">
                <tbody key="tableBody">
                <tr key="test1">
                    <td>Page</td>
                    {pageArray[0].map((x, index) => <td key={index + 400}>Val | SC</td>)}
                </tr>
                {pageArray.map((item, index) =>
                    <tr key={index + 200}>
                        <td key={index + 100}>{index + 1}</td>
                        {item.map((inputValues, indexTD) => <td
                            key={indexTD + 1000}>{inputValues.value} | {JSON.stringify(inputValues.secondChance)}</td>)}
                    </tr>)}

                <tr key="msRow">
                    <td key="msCount">ms</td>
                </tr>

                </tbody>
            </table>

            <button onClick={addNumber}> click me</button>
        </div>
    );
}

export default SecChanceComp;
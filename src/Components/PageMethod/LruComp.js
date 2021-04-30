import React, {useEffect, useState} from 'react';
import {createEmptyArray, getNumberFromParent} from "../../Constants/MethodConst";

function LruComp(props) {

    const [pageArray, setPageArray] = useState(createEmptyArray(props));


    useEffect(() => {
        const arr = Array.from({length: props.pageSize}, () => Array.from({length: 0}, () => null));
        for (let i = 0; i < arr.length; i++) {
            arr[i][0] = {value: 0};
        }
        setPageArray(arr);
    }, [props.pageSize]);


    function addNumber() {
        let lastPageInputs = [];

        //push numbers into lastPageInputs Array, avoid 0 and duplicate added Number
        for (let i = 0; i < pageArray.length; i++) {
            if (pageArray[i][pageArray[i].length - 1].value !== 0 && pageArray[i][pageArray[i].length - 1].value !== getNumberFromParent(props)) {
                lastPageInputs.push(pageArray[i][pageArray[i].length - 1].value);
            }
        }
        //push added Number on last array slot
        lastPageInputs.push(getNumberFromParent(props));
        //if length of lastPageInputs is not equal to pagesize then add 0 until it is
        if (lastPageInputs.length < pageArray.length) {
            for (let i = lastPageInputs.length; i < pageArray.length; i++) {
                lastPageInputs.push(0);
            }
        }

        //if lastPageInputs length is bigger than pageArray remove first array object
        if (lastPageInputs.length > pageArray.length) {
            lastPageInputs = lastPageInputs.slice(1);
        }

        let copyOfPageList = [...pageArray];

        for (let i = 0; i < copyOfPageList.length; i++) {
            copyOfPageList[i] = [...copyOfPageList[i], {value: lastPageInputs[i]}];
        }

        setPageArray(copyOfPageList);

    }

    return (
        <div>LRU COMP
            <table key="lrutable">
                <tbody key="tableBody">
                <tr key="test1">
                    <td>Page</td>
                    {pageArray[0].map((x, index) => <td key={index + 400}>Value</td>)}
                </tr>
                {pageArray.map((item, index) =>
                    <tr key={index + 200}>
                        <td key={index + 100}>{index + 1}</td>
                        {item.map((inputValues, indexTD) => <td
                            key={indexTD + 1000}>{inputValues.value}</td>)}
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

export default LruComp;

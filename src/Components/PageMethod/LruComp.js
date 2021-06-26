import React, {useEffect, useState} from 'react';
import {createEmptyArray} from "../../Constants/MethodConst";
import {hitCounter} from "../../Constants/MainConst";

function LruComp(props) {

    const [pageArray, setPageArray] = useState(createEmptyArray(props));
    const [counter, setCounter] = useState({...hitCounter});
    const [performanceArray, setPerformanceArray] = useState([]);


    const resetValues = (x) => {
        setPerformanceArray([x]);
        setCounter({...hitCounter});
    }


    useEffect(() => {
        const t0 = performance.now();
        const arr = Array.from({length: props.pageSize}, () => Array.from({length: 0}, () => null));
        for (let i = 0; i < arr.length; i++) {
            arr[i][0] = {value: 0};
        }
        setPageArray(arr);
        const t1 = performance.now();
        resetValues((t1 - t0).toFixed(3));
    }, [props.pageSize]);


    function addNumber() {
        const t0 = performance.now();
        let lastPageInputs = [];
        let copyPerfArray = [...performanceArray];
        let duplicateNumber = false;
        let copyCounter = {...counter};

        //push numbers into lastPageInputs Array, avoid 0 and duplicate added Number
        for (let i = 0; i < pageArray.length; i++) {
            if (pageArray[i][pageArray[i].length - 1].value === props.getNumber) {
                duplicateNumber = true;
            }
            if (pageArray[i][pageArray[i].length - 1].value !== 0 && pageArray[i][pageArray[i].length - 1].value !== props.getNumber) {
                lastPageInputs.push(pageArray[i][pageArray[i].length - 1].value);
            }
        }

        if (duplicateNumber) {
            copyCounter.hits++;
        } else {
            copyCounter.miss++;
        }


        //push added Number on last array slot
        lastPageInputs.push(props.getNumber);
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
        setCounter(copyCounter);
        setPageArray(copyOfPageList);
        const t1 = performance.now();
        copyPerfArray.push((t1 - t0).toFixed(3))
        setPerformanceArray(copyPerfArray);
    }

    return (
        <div>
            <br/>
            <table key="lrutable" border={2}>
                <tbody key="tableBody">
                <tr key="page_tr">
                    <td key={"page_td"}>Page</td>
                    {pageArray[0].map((x, index) => <td key={"td_1_" + index}>Value</td>)}
                </tr>
                {pageArray.map((item, index) =>
                    <tr key={"tr_1_" + index}>
                        <td>{index + 1}</td>
                        {item.map((inputValues, index2) => <td key={"td_2_" + index2}>{inputValues.value}</td>)}
                    </tr>)}
                <tr key="msRow">
                    <td key="msCount">ms</td>
                    {performanceArray.map((ms, indexMs) => <td key={"td_3_" + indexMs}>{ms}</td>)}
                </tr>

                </tbody>
            </table>
            <br/>
            <table key={"t_counter"} border={1}>
                <tbody key={"tbody_counter"}>
                <tr key={"tr_hits"}>
                    <td key={"td_hits"}>Hits</td>
                    <td key={"td_hit_count"}>{counter.hits}</td>
                </tr>
                <tr key={"tr_miss"}>
                    <td key={"td_miss"}>Misses</td>
                    <td key={"td_miss_count"}>{counter.miss}</td>
                </tr>
                </tbody>
            </table>
            <br/>

            <button onClick={addNumber}>Zahl einfügen</button>

        </div>
    );
}

export default LruComp;

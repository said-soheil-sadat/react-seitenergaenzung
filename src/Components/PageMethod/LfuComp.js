import React, {useState, useEffect} from 'react';
import {createEmptyArray} from "../../Constants/MethodConst";
import {hitCounter} from "../../Constants/MainConst";

function LfuComp(props) {

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
            arr[i][0] = {value: 0, age: 0, hits: 0};
        }
        setPageArray(arr);
        const t1 = performance.now();
        resetValues((t1 - t0).toFixed(3));
    }, [props.pageSize]);

    function addNumber() {
        const t0 = performance.now();
        let copyPerfArray = [...performanceArray];
        let addedNumber = false;
        let copyPageArray = [...pageArray];
        let copyCounter = {...counter};

        for (let i = 0; i < copyPageArray.length; i++) {
            let lastPage = copyPageArray[i].length - 1;
            if (copyPageArray[i][lastPage].value === props.getNumber) {
                addedNumber = true;
                copyCounter.hits++;
                copyPageArray[i] = [...copyPageArray[i], {
                    value: copyPageArray[i][lastPage].value,
                    age: copyPageArray[i][lastPage].age + 1,
                    hits: copyPageArray[i][lastPage].hits + 1
                }];
            }
        }

        if (!addedNumber) {
            copyCounter.miss++;
            for (let i = 0; i < copyPageArray.length; i++) {
                let lastPage = copyPageArray[i].length - 1;
                if (copyPageArray[i][lastPage].value === 0 && !addedNumber) {
                    addedNumber = true;
                    copyPageArray[i] = [...copyPageArray[i], {
                        value: props.getNumber,
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
                value: props.getNumber,
                age: 0,
                hits: 1
            }];
        }

        for (let i = 0; i < copyPageArray.length; i++) {
            let lastPage = copyPageArray[i].length - 1;
            if (copyPageArray[i][lastPage].value !== props.getNumber) {
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
        setCounter(copyCounter);
        setPageArray(copyPageArray);
        const t1 = performance.now();
        copyPerfArray.push((t1 - t0).toFixed(3))
        setPerformanceArray(copyPerfArray);
    }


    return (
        <div>
            <br/>
            <table key="lfutable" border={2}>
                <tbody key="tableBody">
                <tr key="page_tr">
                    <td key={"page_td"}>Page</td>
                    {pageArray[0].map((x, index) => <React.Fragment key={"rc_1_" + index}>
                        <td key={"td_1_" + index}>Val</td>
                        <td key={"td_2_" + index}>Hits</td>
                    </React.Fragment>)}
                </tr>
                {pageArray.map((item, index) =>
                    <tr key={"tr_1_" + index}>
                        <td key={"td_3_" + index}>{index + 1}</td>
                        {item.map((inputValues, index2) => <React.Fragment key={"rc_2_" + index2}>
                            <td key={"td_4_" + index2}>{inputValues.value}</td>
                            <td key={"td_5_" + index2}>{inputValues.hits}</td>
                        </React.Fragment>)}
                    </tr>)}

                <tr key="msRow">
                    <td key="msCount">ms</td>
                    {performanceArray.map((ms, indexMs) => <td key={"td_6_" + indexMs} colSpan={2}>{ms}</td>)}
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

export default LfuComp;

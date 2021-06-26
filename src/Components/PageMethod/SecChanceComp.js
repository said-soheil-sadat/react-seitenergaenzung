import React, {useEffect, useState} from 'react';
import {createEmptyArray} from "../../Constants/MethodConst";
import {hitCounter} from "../../Constants/MainConst";


function SecChanceComp(props) {
    const [pageArray, setPageArray] = useState(createEmptyArray(props));
    const [indexIterator, setIndexIterator] = useState(0);
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
            arr[i][0] = {value: 0, secondChance: false};
        }
        setPageArray(arr);
        setIndexIterator(0);
        const t1 = performance.now();
        resetValues((t1 - t0).toFixed(3));
    }, [props.pageSize]);


    function addNumber() {
        const t0 = performance.now();
        let copyOfAllPages = [...pageArray];
        let copyPerfArray = [...performanceArray];
        let copyCounter = {...counter};
        for (let i = 0; i < copyOfAllPages.length; i++) {
            copyOfAllPages[i] = [...copyOfAllPages[i], {...copyOfAllPages[i][copyOfAllPages[i].length - 1]}];
        }
        let isDuplicate = false;
        for (let i = 0; i < copyOfAllPages.length; i++) {
            if (copyOfAllPages[i][copyOfAllPages[i].length - 1].value === props.getNumber) {
                copyOfAllPages[i][copyOfAllPages[i].length - 1].secondChance = true
                isDuplicate = true
                setIndexIterator(i + 1);
                copyCounter.hits++;
            }
        }

        if (!isDuplicate) {
            copyCounter.miss++;
            let hadEmpty = false;
            for (let i = 0; i < copyOfAllPages.length; i++) {
                if (copyOfAllPages[i][copyOfAllPages[i].length - 1].value === 0 && !hadEmpty) {
                    copyOfAllPages[i][copyOfAllPages[i].length - 1].value = props.getNumber;
                    hadEmpty = true;
                    setIndexIterator(i + 1);
                }
            }

            if (!hadEmpty) {
                let replacedPage = false;
                let iterator = indexIterator;
                while (!replacedPage) {
                    if (iterator >= copyOfAllPages.length) {
                        iterator = 0;
                    }
                    let lastPage = copyOfAllPages[iterator].length - 1;
                    if (copyOfAllPages[iterator][lastPage].secondChance) {
                        copyOfAllPages[iterator][lastPage].secondChance = false
                    } else {
                        copyOfAllPages[iterator][lastPage].value = props.getNumber;
                        replacedPage = true;
                    }
                    iterator++;
                }
                setIndexIterator(iterator);
            }

        }

        setPageArray(copyOfAllPages);
        setCounter(copyCounter);
        const t1 = performance.now();
        copyPerfArray.push((t1 - t0).toFixed(3))
        setPerformanceArray(copyPerfArray);
    }


    return (
        <div>
            <br/>
            <table key="secchancetable" border={2}>
                <tbody key="tableBody">
                <tr key="page_tr">
                    <td key={"page_td"}>Page</td>
                    {pageArray[0].map((x, index) => <React.Fragment key={"rc_1_" + index}>
                        <td key={"td_1_" + index}>Val</td>
                        <td key={"td_2_" + index}>SC</td>
                    </React.Fragment>)}
                </tr>
                {pageArray.map((item, index) =>
                    <tr key={"tr_1_" + index}>
                        <td key={"td_3_" + index}>{index + 1}</td>
                        {item.map((inputValues, index2) => <React.Fragment key={"rd_2_" + index2}>
                            <td key={"td_4_" + index}>{inputValues.value}</td>
                            <td key={"td_5_" + index}>{JSON.stringify(inputValues.secondChance)}</td>
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

export default SecChanceComp;

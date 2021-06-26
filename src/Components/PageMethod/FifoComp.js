import React, {useState, useEffect} from 'react';
import {hitCounter} from "../../Constants/MainConst";
import {createEmptyArray} from "../../Constants/MethodConst";


function FifoComp(props) {

    // const createEmptyArray = (props) => {
    //     return Array.from({length: props.pageSize}, () => Array.from({length: 0}, () => null))
    // }

    const [pageArray, setPageArray] = useState(createEmptyArray(props));
    const [counter, setCounter] = useState({...hitCounter});
    const [performanceArray, setPerformanceArray] = useState([]);

    // check props.pageSize for changes. if change happened, then update page array. will be run on first mount.

    const resetValues = (x) => {
        setPerformanceArray([x]);
        setCounter({...hitCounter});
    }

    useEffect(() => {
        const t0 = performance.now();
        const arr = Array.from({length: props.pageSize}, () =>
            Array.from({length: 0}, () => null));
        for (let i of arr) {
            i[0] = {value: 0, age: 0}
        }
        setPageArray(arr);
        const t1 = performance.now();
        resetValues((t1 - t0).toFixed(3));
    }, [props.pageSize]);

    const findNumberInArray = (pages) => {
        let positionOfNumber = 255;
        for (let i = 0; i < pages.length; i++) {
            const lastPage = pages[i].length - 1;
            if (pages[i][lastPage].value === props.getNumber) {
                positionOfNumber = i;
                break;
            }
        }
        return positionOfNumber;
    }

    const findEmptyPage = (pages) => {
        let positionOfEmptyPage = 255;
        for (let i = 0; i < pages.length; i++) {
            const lastPage = pages[i].length - 1;
            if (pages[i][lastPage].value === 0 && positionOfEmptyPage === 255) {
                positionOfEmptyPage = i;
                break;
            }
        }
        return positionOfEmptyPage;
    }


    const findOldestNumberInPages = (pages) => {
        let age = 0;
        let positionOfOldestNumber = 255;
        for (let i = 0; i < pages.length; i++) {
            const lastPage = pages[i].length - 1;
            if (pages[i][lastPage].age > age) {
                age = pages[i][lastPage].age;
                positionOfOldestNumber = i;
            }
        }
        return positionOfOldestNumber;
    }

    const replaceNumberOfPage = () => {
        let pageToReplace = 255;
        let copyCounter = {...counter};
        if (findNumberInArray(pageArray) === 255) {
            copyCounter.miss++;
            if (findEmptyPage(pageArray) !== 255) {
                pageToReplace = findEmptyPage(pageArray);
            } else if (findOldestNumberInPages(pageArray) !== 255) {
                pageToReplace = findOldestNumberInPages(pageArray);
            }
        } else {
            copyCounter.hits++;
        }
        setCounter(copyCounter);
        return pageToReplace;
    }

    const addNumber = () => {
        const t0 = performance.now();
        let copyPerfArray = [...performanceArray];
        let copyOfAllPages = [...pageArray];
        let pageToReplace = replaceNumberOfPage();

        for (let i = 0; i < copyOfAllPages.length; i++) {
            const lastPage = copyOfAllPages[i].length - 1;
            if (i === pageToReplace) {
                copyOfAllPages[i] = [...copyOfAllPages[i], {
                    value: props.getNumber,
                    age: 0
                }];
            } else {
                if (copyOfAllPages[i][lastPage].value !== 0) {
                    copyOfAllPages[i] = [...copyOfAllPages[i], {
                        value: copyOfAllPages[i][lastPage].value,
                        age: copyOfAllPages[i][lastPage].age + 1
                    }]
                } else {
                    copyOfAllPages[i] = [...copyOfAllPages[i], {
                        value: copyOfAllPages[i][lastPage].value,
                        age: 0
                    }]
                }
            }
        }
        setPageArray(copyOfAllPages);
        const t1 = performance.now();
        copyPerfArray.push((t1 - t0).toFixed(3))
        setPerformanceArray(copyPerfArray);
    }


    return (
        <div>
            <br/>
            <table key="fifoTable" border={2}>
                <tbody key="tableBody">
                <tr key="tablehead">
                    <td key={"page_td"}>Page</td>
                    {pageArray[0].map((x, index) =>
                        <React.Fragment key={"rc_1_" + index}>
                            <td key={"td_1_" + index}>Val</td>
                            <td key={"td_2_" + index}>Age</td>
                        </React.Fragment>)}
                </tr>
                {pageArray.map((item, index) =>
                    <tr key={"tr_1_" + index}>
                        <td key={"td_3_" + index}>{index + 1}</td>
                        {item.map((inputValues, index) =>
                            <React.Fragment key={"rc_2_" + index}>
                                <td key={"td_4_" + index}>{inputValues.value}</td>
                                <td key={"td_5_" + index}>{inputValues.age}</td>
                            </React.Fragment>)}
                    </tr>)}
                <tr key="msRow">
                    <td key={"msCount"}>ms</td>
                    {performanceArray.map((ms, indexMs) =>
                        <td key={"td_6_" + indexMs} colSpan={2}>{ms}</td>)}
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

export default FifoComp;

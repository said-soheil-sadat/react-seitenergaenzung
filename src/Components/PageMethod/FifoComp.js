import React, {useState, useEffect} from 'react';
import {getNumberFromParent} from "../../Constants/MethodConst";

function FifoComp(props) {

    const createEmptyArray = (props) => {
        return Array.from({length: props.pageSize}, () => Array.from({length: 0}, () => null))
    }

    const [pageArray, setPageArray] = useState(createEmptyArray(props));

// check props.pageSize for changes. if change happened, then update page array. will be run on first mount.

    useEffect(() => {
        const arr = Array.from({length: props.pageSize}, () => Array.from({length: 0}, () => null));
        for (let i of arr) {
            i[0] = {value: 0, age: 0}
        }
        setPageArray(arr);
    }, [props.pageSize]);


// function showArray() {
//     console.log(pageArray);
// }


    const findNumberInArray = (pages) => {
        let positionOfNumber = 255;
        for (let i = 0; i < pages.length; i++) {
            const lastPage = pages[i].length - 1;
            if (pages[i][lastPage].value === getNumberFromParent(props)) {
                positionOfNumber = i;
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
        if (findNumberInArray(pageArray) === 255) {
            if (findEmptyPage(pageArray) !== 255) {
                pageToReplace = findEmptyPage(pageArray);
            } else if (findOldestNumberInPages(pageArray) !== 255) {
                pageToReplace = findOldestNumberInPages(pageArray);
            }
        }
        return pageToReplace;
    }

    function addNumber() {
        let copyOfAllPages = [...pageArray];
        let pageToReplace = replaceNumberOfPage();

        for (let i = 0; i < copyOfAllPages.length; i++) {
            const lastPage = copyOfAllPages[i].length - 1;
            if (i === pageToReplace) {
                copyOfAllPages[i] = [...copyOfAllPages[i], {
                    value: getNumberFromParent(props),
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
    }


    return (
        <div>
            <h1>FIFO COMP</h1>
            <table key="fifoTable">
                <tbody key="tableBody">
                <tr key="test1">
                    <td>Page</td>
                    {pageArray[0].map((x, index) => <td key={index + 400}>Val|Age</td>)}
                </tr>
                {pageArray.map((item, index) =>
                    <tr key={index + 200}>
                        <td key={index + 100}>{index + 1}</td>
                        {item.map((inputValues, index) => <td
                            key={index + 1000}>{inputValues.value} | {inputValues.age}</td>)}
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

export default FifoComp;
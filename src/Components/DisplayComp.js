import React from 'react';
import {fillPageOption} from "../Constants/MainConst";
import FifoComp from "./PageMethod/FifoComp";
import LfuComp from "./PageMethod/LfuComp";
import LruComp from "./PageMethod/LruComp";
import SecChanceComp from "./PageMethod/SecChanceComp";

function DisplayComp(props) {

    const pageSize = props.pageSize;
    const pageMethod = props.pageMethod;

    const inputNumbers = () => {
        let x = [];
        for (let i = 1; i <= 9; i++) {
            x.push(i);
        }
        return x;
    }

    const addNumberRef = React.createRef();


    return (
        <div>
            <h3>This is the Display Component, you selected {pageMethod} Method with {pageSize} pages.</h3>
            <br/>

            {props.pageMethod === "fifo" ? <FifoComp getNumber={addNumberRef} pageSize={pageSize}/> : ""}
            {props.pageMethod === "lfu" ? <LfuComp getNumber={addNumberRef} pageSize={pageSize}/> : ""}
            {props.pageMethod === "lru" ? <LruComp getNumber={addNumberRef} pageSize={pageSize}/> : ""}
            {props.pageMethod === "secChance" ? <SecChanceComp getNumber={addNumberRef} pageSize={pageSize}/> : ""}

            Select your input:
            <select ref={addNumberRef}>
                {inputNumbers().map(i =>
                    fillPageOption("input_", i))}
            </select>
            <br/>

            {/*<button onClick={handleNumber}>Add Number</button>*/}


        </div>
    );
}

export default DisplayComp;
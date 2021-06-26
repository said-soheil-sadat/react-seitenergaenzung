import React, {useState} from 'react';
import {fillPageOption, inputNumbers} from "../Constants/MainConst";
import FifoComp from "./PageMethod/FifoComp";
import LfuComp from "./PageMethod/LfuComp";
import LruComp from "./PageMethod/LruComp";
import SecChanceComp from "./PageMethod/SecChanceComp";

function DisplayComp(props) {

    const [addNumber, setAddNumber] = useState(inputNumbers()[0]);
    const updateAddNumber = (e) => {
        setAddNumber(parseInt(e.target.value));
    }

    return (
        <div>

            {props.pageMethod === "fifo" ? <FifoComp getNumber={addNumber} pageSize={props.pageSize}/> : ""}
            {props.pageMethod === "lfu" ? <LfuComp getNumber={addNumber} pageSize={props.pageSize}/> : ""}
            {props.pageMethod === "lru" ? <LruComp getNumber={addNumber} pageSize={props.pageSize}/> : ""}
            {props.pageMethod === "secChance" ? <SecChanceComp getNumber={addNumber} pageSize={props.pageSize}/> : ""}

            Select your input:
            <select onChange={updateAddNumber}>
                {inputNumbers().map(i =>
                    fillPageOption("input_", i))}
            </select>
            <br/>
        </div>
    );
}

export default DisplayComp;

import React from "react";

export const pageMethodsConst = [
    {id: "fifo", display: "FIFO"},
    {id: "lfu", display: "LFU"},
    {id: "lru", display: "LRU"},
    {id: "secChance", display: "Second Chance"}
];

export const pageSizeConst = {
    min: 2,
    max: 5
};

export const makePageSizeOptionsConst = () => {
    let x = [];
    for (let i = pageSizeConst.min; i <= pageSizeConst.max; i++) {
        x.push(i);
    }
    return x;
}

export const makeMethodOption = (item) => {
    return <option key={item.id} value={item.id}>{item.display}</option>
}

export const fillPageOption = (prefix, i) => {
    const keyId = prefix + i;
    return <option key={keyId} value={i}>{i}</option>;
}


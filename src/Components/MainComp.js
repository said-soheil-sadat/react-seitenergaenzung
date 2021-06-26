import React, {useState} from "react";
import {
    pageMethodsConst,
    pageSizeConst,
    makePageSizeOptionsConst,
    fillPageOption,
    makeMethodOption
} from "../Constants/MainConst";
import DisplayComp from "./DisplayComp";

const MainComp = () => {

    const [selectedPageSize, updatePageSize] = useState(pageSizeConst.min);
    const [selectedPageMethod, updatePageMethod] = useState(pageMethodsConst[0].id);

    const updatePageSizeOnChange = (e) => {
        updatePageSize(e.target.value);
    }
    const updatePageMethodOnChange = (e) => {
        updatePageMethod(e.target.value);
    }

    return <div>
        <h1>Seitenergänzungsstrategie mit React.js</h1>

        Methode wählen:
        <select onChange={updatePageMethodOnChange}>
            {pageMethodsConst.map(method =>
                makeMethodOption(method))}
        </select>

        <br/>

        Seitenanzahl wählen:
        <select onChange={updatePageSizeOnChange}>
            {makePageSizeOptionsConst().map(i =>
                fillPageOption("page_", i))}
        </select>

        <DisplayComp pageSize={selectedPageSize} pageMethod={selectedPageMethod}/>

    </div>
}

export default MainComp;

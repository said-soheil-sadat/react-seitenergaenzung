export function getNumberFromParent(props) {
    return props.getNumber.current.value;
}

export const createEmptyArray = (props) => {
    return Array.from({length: props.pageSize}, () => Array.from({length: 0}, () => null));
}

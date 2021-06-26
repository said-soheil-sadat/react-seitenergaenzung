export const createEmptyArray = (props) => {
    return Array.from({length: props.pageSize}, () =>
        Array.from({length: 0}, () => null));
}



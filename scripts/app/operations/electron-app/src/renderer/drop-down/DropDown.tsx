const DropDownComponent = (props: { title: string, name: string, value: string, list: string[], handleChange: any }) => {

    return (
        <label>
            {props.title}:
            <select name={props.name} value={props.value} onChange={props.handleChange}>
                {props.list.map((value) => (
                    <option value={value}>{value}</option>
                ))}
            </select>
        </label>
    );
}

export default DropDownComponent;
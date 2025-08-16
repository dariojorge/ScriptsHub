const CheckBoxComponent = (props: { title: string, name: string, checked: boolean, handleChange: any }) => {

    return (
        <label className="checkbox-label">
            {props.title}:
            <input
                type="checkbox"
                name={props.name}
                checked={props.checked}
                onChange={props.handleChange}
            />
        </label>
    );
}

export default CheckBoxComponent;
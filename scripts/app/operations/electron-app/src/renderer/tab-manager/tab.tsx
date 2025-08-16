import { getId } from "../utils/utils";
import "./tab.scss"

const id = getId();

const TabComponent = (props: { activeTab: boolean; type: string; setActiveTab: any; tabRefs: any}) => {
    return (
        <div
            className={`tab-button ${props.activeTab ? 'active' : 'none'}`}
            id={id}
            onClick={props.setActiveTab}
            ref={(el) => {props.tabRefs.current[props.type] = el;}}
        >
            {props.type}
        </div>
    )
}

export default TabComponent;
import { useState } from "react"

export const DropDown = (props) => {
    const [show, setShow] = useState(false)
    return <div className="drop">
        <input 
            type="text"
            onFocus={() => setShow(true)}
            // onBlur={() => () => setTimeout(() => setShow(false),1000)}
        />
        {
            show && 
            <div className="list">
                {
                    props.items.map((elm,i) => {
                        return <div key = {i} onClick = {() => {
                            props.onFilter(elm)
                            setShow(false)
                            }}>
                            {elm}
                        </div>
                    })
                }
            </div>
        }
    </div>
}
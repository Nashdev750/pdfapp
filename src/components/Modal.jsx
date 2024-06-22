import { useState } from "react"

const Modal = ({setopen, addother})=>{
    const [error, setError] = useState(false)
    const [folder, setFolder] = useState('')

    const validateInput = (input)=>{
        const regex = /^[a-zA-Z0-9 ]+$/;
        let valid = false
        if(regex.test(input) && input.trim()!=''){
            setError(false)
            valid = true
        }else{
            setError(true)
            valid = false
        }
        return valid
      }

      const submit = ()=>{
        if(validateInput(folder)){
         addother(folder)
         setFolder('')
        }
      }
    return <div className="modal" onClick={e=>setopen(false)}>
         <div className="modal-body" onClick={e=>e.stopPropagation()}>
            {error &&
             <p style={{color:'tomato'}}>Only alphanumeric characters are allowed</p>
            }
            <label htmlFor="">Folder Name</label>
            <input
            value={folder}
            onChange={e=>{
                setFolder(e.target.value)
                validateInput(e.target.value)
            }}
             type="text" placeholder="Enter Folder Name" />
            <div className="actions">
                <button disabled = {error || folder.trim()==''} onClick={submit}>Ok</button>
                <button onClick={e=>setopen(false)}>Close</button>
            </div>
         </div>
    </div>
}

export default Modal
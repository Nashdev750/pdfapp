

const Navbar = ({clear,setImage,inputs,image})=>{
    return <div className="navbar">
        <div className="nav">
            <div className="logo">
                <span>OpenMCA</span>
            </div>
            <div className="links">
                <button onClick={clear}>Clear</button>
                {image &&
                    <button onClick={e=>setImage()}>Hide</button>
                }
                {/* <span>{folder}</span> */}
            </div>
        </div>
    </div>
}

export default Navbar
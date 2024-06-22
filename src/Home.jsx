
import { useEffect, useRef, useState } from 'react';
import './App.css';
import Input from './components/Input';
import axios from 'axios';
import { URI, getDates, getdate } from './utils/getdate';
// import io from 'socket.io-client';
import Modal from './components/Modal';
import Navbar from './components/Navbar';

// const socket = io('https://www.openmca.com',{path:'/io/'});



function Home() {
  const [folder, setFolder] = useState()
  const [folders, setFolders] = useState([])
  const [inputs, setInputs] = useState()
  const [customer, setCustomer] = useState('')
  // form data
  const [files, setFiles] = useState({})
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState()
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState()
  

  

  // get files
  const getFls = (files)=>{
    if(!files?.length > 0) return
    axios.post(URI+'files',{folders:files,customer:customer+"_"+getdate()})
    .then(res=>{
       setInputs({...res.data})
    })
    .catch(err=>{
      // console.log(err)
    })
  }

  // useEffect(()=>{
  //   // Event listener for 'progress' event
  //   socket.on('data', (data) => {
  //     if(data.message =='end'){
  //       getFls(folders)
  //     }else{
  //       if(data.message.includes('Done')){
  //         getFls(folders)
  //         setTimeout(()=>{setMessage()},4000)
  //       }
  //       setMessage(data.message)
  //     }
  //   });
  // },[])
  useEffect(()=>{
    if(!message) return
    if(message.includes('Done')){
      getFls(folders)
    }
  },[message])

  useEffect(()=>{
    const files = [getDates(4),getDates(3),getDates(2),getDates(1)]
    setFolders(files)
  },[])
  useEffect(()=>{
    getFls(folders)
  },[folders])

 
  

  const clear = ()=>{
    const ok = window.confirm('Are you sure you want to clear?, page will be reset!')
    if(!ok) return
    const files = [getDates(4),getDates(3),getDates(2),getDates(1)]
    setInputs()
    setImage()
    setCustomer('')
    setFolders([...files])
    setFiles(prev=>{
      for(let x in prev){
        prev[x] = []
      }
      return {...prev}
    })
    
  }

  const uploadfiles = ()=>{
       if(!customer) return alert('Please provide customer name')
       const regex = /^[a-zA-Z0-9 ]+$/;
       if(!(regex.test(customer) && customer.trim()!='')){
        return alert('Please provide valid customer name, only alphanumeric characters are allowed!')
       }
       let kys = Object.keys(inputs)
       let first = true
       
       for (let i = 0; i < kys.length; i++) {
        let fls = inputs[kys[i]]
         if(fls[0] > 0){
          first = false
         } 
       }
       if(first){
        for (let i = 0; i < kys.length; i++) {
          // if(i>=4) break
          let fls = files[kys[i]]?.length || 0
           if(fls < 1 && getDates(4)!=kys[i] ){
              console.log(getDates(4))
              console.log(kys[i])
              return alert("No files selected for "+kys[i])
           } 
         }
       }
       let count = 0
       for (let i = 0; i < kys.length; i++) {
        let fls = files[kys[i]]?.length || 0
         if(fls > 0){
            count++
         } 
       }
       if(count==0) return
       const av = []
       const formData = new FormData()
       for (let i = 0; i < kys.length; i++) {
         const pdfs = files[kys[i]] || []
         for(let j = 0; j < pdfs?.length;j++){
           formData.append(kys[i], pdfs[j]);
           av.push(kys[i])
         } 
       }
       formData.append('folders', av);
       formData.append('customer', customer+"_"+getdate());

       setLoading(true)
       axios.post(URI+'upload',formData)
       .then(res=>{
         setLoading(false)
         setFiles({})
         getFls(folders)
        alert("Scan Complete")
       })
       .catch(err=>{
        console.log(err)
        setLoading(false)
       })

  }

  const removeFile = (e,folder)=>{
    e.stopPropagation()
    if(!folder) return
    setFiles(prev=>{
      delete prev[folder]
      return {...prev}
    })
    setFolder();
    setImage()
  }

  const addother = (name)=>{
    const data = {}
    data[name] = [0,0,''] 
    setFolders(pre=>{
      pre.push(name)
      return [...pre]
    })
    setInputs(prev=>{
      return{ ...prev,...data}
    })
  }


  
  return (
    <>
    <Navbar clear={clear} setImage={setImage} image={image} inputs={inputs} />
    {open &&
       <Modal
        setopen={setOpen}
        addother={addother}
       />
    }
    <div className="container">
      {message &&
       <div className="messages" onClick={e=>{setMessage();getFls(folders)}}><span>{message}</span></div>
      }
      <div className="left" style={{width:`${image?'':'100%'}`}}>

      
      {/* ENTER MERCHANT NAME */}
      <div className='plus'>
        <input
         type='text'
         style={{width:'100%',padding:'10px'}}
         value={customer}
         onChange={e=>{
          setCustomer(e.target.value.replaceAll(/[^a-zA-Z0-9 ]/g, ''))
        }}
         placeholder='ENTER MERCHANT NAME'
        />
      </div>
      { inputs &&
        folders?.map((folder, i)=>(
          <Input 
            key={i} 
            folder={folder} 
            folders={folders} 
            files = {inputs[folder] || ''} 
            setFiles={setFiles}
            getFls={getFls}
            toupload = {files}
            customer={customer+"_"+getdate()}
            setImage = {setImage}
            setFolder = {setFolder}
            removeFile = {removeFile}
          />
        ))
      }
      <div className='plus'>
        <div className="btn" role='button' onClick={e=>setOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
        </div>
      </div>
      <div className='plus'>
        <button disabled = {loading} onClick={uploadfiles}>SCAN</button>
      </div>
      </div>
      {/* {image && */}
      <div className="right" style={{visibility:`${image?'':'hidden'}`,position:`${image?'':'absolute'}`}}>
        <div className="pdfview">
          <div
           style={{width:'100%',padding:'20px',display:'flex',gap:'10px',alignItems:'center'}}
          >
           {/* <button onClick={clear}>Clear</button>
           <button onClick={e=>setImage()}>Hide</button> */}
           <span>{folder}</span>
           {/* <button onClick={e=>{removeFile();setFolder();setImage()}}>Remove</button> */}
          </div>
            {/* <embed ref = {embedref} src={image+'&navpanes=0'} width="100%" height="100%" type="application/pdf"></embed> */}
            <iframe id='pdfIframe' src={image} frameborder="0" width="100%" height="100%"></iframe>
        </div>
       </div>
       {/* } */}
    </div>
    </>
  );
}

export default Home;

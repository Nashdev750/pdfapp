import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { URI } from '../utils/getdate';

const Input = ({folder,folders,files,setFiles,toupload,getFls,customer,setImage,setFolder,removeFile})=>{

  const fileInput1Ref = useRef(null);
  const [active, setActive] = useState(false)
  const [loading, setLoading] = useState(false)
  const [keywords, setKeywords] = useState('Results')
  

  useEffect(()=>{
    setKeywords(files[2])
  },[files])


  const handleDrop = (e,folder) => {
    setActive(true)
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFiles(files,folder);
  };

  const handleFileSelect = (e, folder) => {
    const files = e.target.files;
    handleFiles(files,folder);
  };

  const handleFiles = (fils,folder) => {
    if(toupload[folder]?.length>0) return alert('Only one file allowed ')
    setActive(false)
    const files_to = []
    // Handle the files here
    for (let i = 0; i < fils.length; i++) {
      const file = fils[i];
      let name  = file.name.split('.')
      if(name[name.length - 1] == 'pdf' || name[name.length - 1] == 'PDF') {
        files_to.push(file)
        break
      }
      
    }
    setFiles(prev=>{
      const c = {...prev}
      if(folder in c){
        c[folder] = [...c[folder],...files_to]
      }else{
        c[folder] = [...files_to]
      }
      return {...c}
    })
  };
  

  const runFiles = (folder)=>{
    setLoading(true)
    axios.post(URI+'process',{folder,customer})
    .then(res=>{
      setLoading(false)
      if(res.data?.image){
        alert('Failed to process image file')
      }else{
        getFls(folders)
      }
    })
    .catch(err=>{
      console.log(err)
      setLoading(false)
    })
  }

  const selectPDF = (folder, customer)=>{
    if(!customer && !toupload[folder]?.length>0) return
    
    if(toupload[folder]?.length>0){
      const ur = URL.createObjectURL(toupload[folder][0])
      setImage(ur)
      setFolder(folder)
      return
    }
    const url = URI+'getpdf?folder='+folder+'&customer='+customer
    axios.get(url)
    .then(res=>{
      setImage(url)
      setFolder(folder)
    })
    .catch(err=>{
      console.log(err)
    })
    
  }

  const deletepdf = (folder,customer)=>{
    const url = URI+'delete?folder='+folder+'&customer='+customer
    axios.get(url)
    .then(res=>{
      setImage()
      setFolder()
      getFls(folders)
      fileInput1Ref.current.value=''
    })
    .catch(err=>{
      console.log(err)
    })
  }

    return <div key={folder} className="month">
       {toupload[folder]?.length>0 &&
        <div role='button' onClick={e=>{removeFile(e, folder);fileInput1Ref.current.value=''}} className="rm">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
      </svg>
      </div>
       }
       {files[0]>0 &&
        <div role='button' onClick={e=>deletepdf(folder, customer)} className="rm">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
      </svg>
      </div>
       }
       
    <label className={`drop ${active?'active':''}`}
      
      onDrop={e=>handleDrop(e,folder)}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={e=>setActive(true)}
      onDragLeave={e=>setActive(false)}
      type="label" htmlFor={folder}>

     {(files[0]>0 || toupload[folder]?.length>0)
      ?<svg
      onMouseOver={e=>selectPDF(folder,customer)}
      xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512"><path d="M64 464H96v48H64c-35.3 0-64-28.7-64-64V64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V288H336V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16zM176 352h32c30.9 0 56 25.1 56 56s-25.1 56-56 56H192v32c0 8.8-7.2 16-16 16s-16-7.2-16-16V448 368c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24H192v48h16zm96-80h32c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H304c-8.8 0-16-7.2-16-16V368c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H320v96h16zm80-112c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16s-7.2 16-16 16H448v32h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H448v48c0 8.8-7.2 16-16 16s-16-7.2-16-16V432 368z"/></svg>
      :<svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 640 512"><path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"/></svg>
     }
     
     <span>{folder}{toupload[folder]?.length>0? " "+toupload[folder].length+' selected':''}</span>
     <input
        type="file"
        id={folder}
        style={{visibility:'hidden'}}
        ref={fileInput1Ref}
        onChange={(e) => handleFileSelect(e, folder)}

      />
      {files[0]>0 &&
        <button disabled={loading} className='run' onClick={e=>runFiles(folder)}>RUN</button>
      }
    </label>
    <textarea cols="30" rows="10" className='results' onChange={e=>setKeywords(e.target.value)} value={keywords}>{keywords}</textarea>
     
  </div>
  
}

export default Input
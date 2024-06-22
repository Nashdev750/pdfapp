import { useEffect, useState } from "react"
import { URI, getDates } from "../utils/getdate"
import axios from "axios"
import { Document, Page } from 'react-pdf';
import { Link } from "react-router-dom";

const List = ()=>{
    const [files, setFiles] = useState({})

    useEffect(()=>{
      const folders = getDates()
      axios.post(URI+'list',{folders})
      .then(res=>{
        setFiles(res.data)
      })
    },[])

    const [pdf, setPdf] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
  
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }
    const selectPDF = (folder, pdf)=>{
      const url = URI+'getpdf?folder='+folder+'&pdf_name='+pdf
      console.log(url)
      setPdf(url)
    }
    return <><Link to={'/'} style={{padding:'20px'}}>Back</Link><div className="list_container">
              
              <div className="list">
              {Object.keys(files).map((ky, i)=>(
                <>
                <h2 id = {ky}>{ky}</h2>
                 <div key={i} className="items">
                    {files[ky].map((file, i)=>(
                      <div onClick={e=>selectPDF(ky,file)} className="item" key={i}>{file}</div>
                    ))}
                 </div>
                 </>
              ))}
              </div>
              <div className="view">
                <div className="pdf">
                {pdf &&
                  <>
                  <embed src={pdf+'&navpanes=0'} width="100%" height="100%" type="application/pdf"></embed>
                  </>
                }
                </div>
              </div>
           </div></>
}

export default List
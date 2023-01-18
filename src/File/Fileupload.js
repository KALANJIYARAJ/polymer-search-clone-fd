import React, { useState } from 'react'


function Fileupload() {
    const [ file, setFile] = useState();

    function handleFile(event){
        setFile(event.target.files[0]);
        // console.log(event.target.files[0]);
    }

    function handleUpload(){
       const formData = new FormData();
       console.log(formData);
       formData.append('file', file)
       fetch(
        'url',
        {
            method:"POST",
            body: formData
        }
       ).then((response)=> response.json()).then(
        (result) => {
            console.log('success', result)
        }
       ).catch(error => {
       console.log("Error:",error)
       })
        
       }
       console.log(file);

  return (
    <div>
        <h1>React js File upload Tutorial</h1>
        <form onSubmit={handleUpload}>
        <input type="file" name = 'file' onChange={handleFile} />
        <button>Upload</button>
        </form>
        </div>
  )
}

export default Fileupload

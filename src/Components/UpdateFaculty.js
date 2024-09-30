import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { app } from '../config/Firebase';
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from 'firebase/storage';

const UpdateFaculty = () => {

    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    const [name, setName] = useState(location.state.facultyName);
    const [phone, setPhone] = useState(location.state.phoneNumber);
    const [selectedFile, setSelectedFile] = useState(null);
    

    const handleFileSubmit = async (event)=>{
        event.preventDefault();
        if(selectedFile){
            const db = getFirestore(app);
        const storage = getStorage(app);

        const myRef = storageRef(storage, 'faculty',location.state.id);
        await uploadBytes(myRef, selectedFile);

        const imageUrl = await getDownloadURL(myRef);

        const docRef = doc(db,'faculty',location.state.id);
        try {
            await updateDoc(docRef,{
                facultyName: name,
                phoneNumber: phone,
                imageUrl: imageUrl
            })
            .then(res=>{
                navigate('/facultylist')
            })
        } catch (error) {
            console.log(error)
            
        }
        }else{
            const db = getFirestore(app);
            const docRef = doc(db,'faculty',location.state.id);
            try {
                await updateDoc(docRef,{
                    facultyName: name,
                    phoneNumber: phone,
                })
                .then(res=>{
                    navigate('/facultylist')
                })
            } catch (error) {
                console.log(error)
            }
        }
        
    }

    const handleFileChange = (e)=>{
        const file = e.target.files[0];
        setSelectedFile(file); 
    }
    

  return (
    <div>
        <h1>UpdateFaculty</h1>
        <form onSubmit={handleFileSubmit}>
            <input value={name} onChange={(e)=>{setName(e.target.value)}} type='text' placeholder='Faculty Name' />
            <input value={phone} onChange={(e)=>{setPhone(e.target.value)}} type='number' placeholder='Phone Number' />
            <input onChange={handleFileChange} type='file' />
            <button>update</button>
        </form>
    </div>
  )
}

export default UpdateFaculty
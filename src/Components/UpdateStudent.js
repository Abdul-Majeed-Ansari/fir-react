import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {getDatabase, ref, update} from 'firebase/database';
import {getStorage, ref as storageRef, uploadBytes, getDownloadURL} from 'firebase/storage';
import { app } from '../config/Firebase';

const UpdateStudent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedFile, setSelectedFile] = useState(null);
    const [admNo, setAdmNo] = useState(location.state[0]);
    const [name, setName] = useState(location.state[1].studentName);
    const [phone, setPhone] = useState(location.state[1].phoneNumber);

    const submitHandler = async (event) =>{
        event.preventDefault();
        if(selectedFile){
            const db = getDatabase(app);
        const storage = getStorage(app);

        const myRef = storageRef(storage, `images/${admNo}`);
        await uploadBytes(myRef, selectedFile);
        const imageUrl = await getDownloadURL(myRef);
        console.log(imageUrl);
        

        const studentRef = ref(db, `student/${location.state[0]}`);
        update(studentRef, {
            studentName: name,
            phoneNumber: phone,
            imageUrl: imageUrl
        })
        .then(res=>{
            navigate('/studentlist')
        })
        .catch(err=>{
            console.log(err)
        })
        }else{
            const db = getDatabase(app);

            const studentRef = ref(db, `student/${location.state[0]}`);
            update(studentRef, {
                studentName: name,
                phoneNumber: phone,
            })
            .then(res=>{
                navigate('/studentlist')
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
        
    const handleFileChange = (event) =>{
        const file = event.target.files[0];
        console.log(file);
        setSelectedFile(file);
    }

  return (
    <>
        <form onSubmit={submitHandler}>
            <input disabled value={admNo} onChange={(e)=>setAdmNo(e.target.value)} type='number' placeholder='Admission No' />
            <input value={name} onChange={(e)=>{setName(e.target.value)}} type='text' placeholder='Student Name' />
            <input value={phone} onChange={(e)=>{setPhone(e.target.value)}} type='number' placeholder='Phone Number' />
            <input onChange={handleFileChange} type='file' />
            <button type='submit'>Update</button>
        </form>
    </>
  )
}

export default UpdateStudent
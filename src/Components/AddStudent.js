import React, { useState } from 'react';
import {getDatabase, ref, set} from 'firebase/database';
import {getStorage, ref as storageRef, uploadBytes, getDownloadURL} from 'firebase/storage'
import { app } from '../config/Firebase';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {

    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [admNo, setAdmNo] = useState(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState(null);

    const submitHandler = async (event) =>{
        event.preventDefault();

        const db = getDatabase(app);
        const storage = getStorage(app);

        const myRef = storageRef(storage, `images/${admNo}`);
        await uploadBytes(myRef, selectedFile);
        const imageUrl = await getDownloadURL(myRef);
        console.log(imageUrl);

        set(ref(db, 'student/'+admNo),{
            studentName: name,
            phoneNumber: phone,
            imageURL: imageUrl
        })
        .then(res=>{
            navigate('/dashboard/studentlist')
        })
        .catch(err=>{
            console.log(err);
            
        })
    }

    const handleFileChange = (event) =>{
        const file = event.target.files[0];
        setSelectedFile(file);
    }

  return (
    <>
        <form onSubmit={submitHandler}>
            <input onChange={(e)=>setAdmNo(e.target.value)} type='number' placeholder='Admission No' />
            <input onChange={(e)=>setName(e.target.value)} type='text' placeholder='Student Name' />
            <input onChange={(e)=>setPhone(e.target.value)} type='number' placeholder='Phone Number' />
            <input onChange={handleFileChange} type='file' />
            <button type='submit'>Submit</button>
        </form>
    </>
  )
}

export default AddStudent
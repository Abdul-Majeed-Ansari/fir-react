import React, { useState } from 'react';
import {getFirestore, collection, addDoc} from 'firebase/firestore';
import {getStorage, ref as storageRef, uploadBytes, getDownloadURL} from 'firebase/storage'
import { app } from '../config/Firebase';
import { useNavigate } from 'react-router-dom';

const AddFaculty = () => {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileSubmit = async (event) =>{
        event.preventDefault();
        console.log(name, phone);
        const db = getFirestore(app);
        const storage = getStorage(app)
        const myRef = storageRef(storage, 'faculty');

        await uploadBytes(myRef, selectedFile);
        const imageUrl = await getDownloadURL(myRef)

        await addDoc(collection(db, 'faculty'),{
            facultyName: name,
            phoneNumber: phone,
            imageUrl: imageUrl
        })
        .then(res=>{
            navigate('/facultylist');
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const handleFileChange = (event)=>{
        const file = event.target.files[0];
        setSelectedFile(file);
    }

  return (
    <div>
        <h1>AddFaculty</h1>
        <form onSubmit={handleFileSubmit}>
            <input onChange={(e)=>{setName(e.target.value)}} type='text' placeholder='Faculty Name' />
            <input onChange={(e)=>{setPhone(e.target.value)}} type='number' placeholder='Phone Number' />
            <input onChange={handleFileChange} type='file' />
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default AddFaculty
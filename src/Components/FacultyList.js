import React, { useEffect, useState } from 'react';
import {getFirestore, collection, getDocs, doc, deleteDoc} from 'firebase/firestore';
import { app } from '../config/Firebase';
import { useNavigate } from 'react-router-dom';
import { deleteObject, getStorage, ref as storageRef } from 'firebase/storage';

const FacultyList = () => {

    const navigate = useNavigate();

    const [facultyData, setFacultyData] = useState([])

    useEffect(()=>{
        getData();
    },[])

    const getData = async () =>{
        const db = getFirestore(app);
        const facultyRef = collection(db, 'faculty');
        const snapshot = await getDocs(facultyRef);
        const data = snapshot.docs.map(doc=>({
            id:doc.id,
            ...doc.data()
        }))
        setFacultyData(data);
    }

    const deleteData = (id) =>{
        const db = getFirestore(app);
        const storage = getStorage(app);
        const imageRef = storageRef(storage, 'faculty',id);

        const dataRef = doc(db, 'faculty',id);
        deleteDoc(dataRef);
        deleteObject(imageRef);
        getData();
    }

  return (
    <div>
        <h1>FacultyList</h1>
        {
            facultyData.map(faculty=>{
                return(
                    <div key={faculty.id}>
                        <img src={faculty.imageUrl} style={{width:'20%'}} alt='' />
                        <p>{faculty.facultyName} {faculty.phoneNumber}</p>
                        <button onClick={()=>{deleteData(faculty.id)}}>Delete</button>
                        <button onClick={()=>navigate('/updatefaculty', {state:faculty})}>update</button>
                    </div>
                )
            })
        }
    </div>
  )
}

export default FacultyList
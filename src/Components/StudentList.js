import React, { useEffect, useState } from 'react';
import {getDatabase, onValue, ref, remove} from 'firebase/database'
import { app } from '../config/Firebase';
import { useNavigate } from 'react-router-dom';

const StudentList = () => {

    const navigate = useNavigate();
    const [studentData, setStudentData] = useState('');

    useEffect(()=>{
        const db = getDatabase(app);
        const studentRef = ref(db, 'student/');
        onValue(studentRef, (snapshot)=>{
            const data = snapshot.val();
            setStudentData(data);
        })

    },[]);

    const deleteData = (key) =>{
        const db = getDatabase(app);
        const studentRef = ref(db, 'student/'+key);
        remove(studentRef);
    }

  return (
    <div>
        Student List
        {studentData && (
            <div>
                {Object.entries(studentData).map(([key, value])=>
                    <div key={key}>
                        {console.log(value)}
                        <img style={{width:'20%'}} src={value.imageURL} alt='img'/>
                        <p>{value.studentName} {value.phoneNumber}</p>
                        <button onClick={()=>deleteData(key)}>Delete</button>
                        <button onClick={()=>navigate('/updatestudent', {state:[key, value]})}>update</button>
                    </div>
                )}
            </div>
        )}
    </div>
  )
}

export default StudentList
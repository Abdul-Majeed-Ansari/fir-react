import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Dashobard = () => {
  return (
    <div style={{display:'flex', flexDirection:'row', height:'100vh'}}>
        <div style={{width:'20%', backgroundColor:'royalblue'}}>
            <Link to='/dashboard/addstudent' style={{display:'block', color:'white'}}>Add Student</Link>
            <Link to='/dashboard/studentlist'  style={{display:'block', color:'white'}}>Student List</Link>
            <Link to='/dashboard/addfaculty' style={{display:'block', color:'white'}}>Add Faculty</Link>
            <Link to='/dashboard/facultylist' style={{display:'block', color:'white'}}>Faculty List</Link>
        </div>

        <div style={{width:'80%'}}>
            <Outlet />
        </div>
    </div>
  )
}

export default Dashobard
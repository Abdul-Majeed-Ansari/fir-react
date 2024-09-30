import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Dashobard from './Components/Dashobard';
import AddStudent from './Components/AddStudent';
import StudentList from './Components/StudentList';
import UpdateStudent from './Components/UpdateStudent';
import AddFaculty from './Components/AddFaculty';
import FacultyList from './Components/FacultyList';
import UpdateFaculty from './Components/UpdateFaculty';
import SignUp from './Components/SignUp';
import Login from './Components/Login';

function App() {
  const myRouter = createBrowserRouter([
    {path:'signup', Component:SignUp},
    {path:'login', Component:Login},
    {path:'/dashboard', Component: Dashobard, children:[
      {path:'', Component:StudentList},
      {path:'/dashboard/addstudent', Component:AddStudent},
      {path:'/dashboard/studentlist', Component:StudentList},
      {path:'/dashboard/updatestudent', Component:UpdateStudent},
      {path:'/dashboard/addfaculty', Component:AddFaculty},
      {path:'/dashboard/facultylist', Component: FacultyList},
      {path:'/dashboard/updatefaculty', Component:UpdateFaculty}
    ]}
  ])
  return (
    <>
    <RouterProvider router={myRouter} />
    </>
  );
}

export default App;

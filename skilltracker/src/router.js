
import { createBrowserRouter } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import AddCourse from './pages/AddCourse';
import EditSkill from './pages/EditSkill';
import SkillDetails from './pages/SkillDetails';
import CalendarView from './pages/CalendarView'
import Signup from './pages/Signup';
import Login from './pages/Login';
import Courselist from './pages/Courselist'

const router = createBrowserRouter([
    { path: '/', element: <Signup/> },
    { path: 'login/', element: <Login/> },
    { path: 'dashboard/', element: <Dashboard/> },
    { path: '/courselist/:id', element: <Courselist/> },
    { path: 'courselist/:id/add', element: <AddCourse /> },
    { path: 'edit/:id', element: <EditSkill/> },
    { path: 'skilldetails/:id', element: <SkillDetails/> },
    { path: 'calendarview/', element: <CalendarView/> }

]);

export default router;
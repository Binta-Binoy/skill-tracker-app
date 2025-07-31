
import { createBrowserRouter } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import AddSkill from './pages/AddSkill';
import EditSkill from './pages/EditSkill';
import SkillDetails from './pages/SkillDetails';
import Summary from './pages/Summary';
import CalendarView from './pages/CalendarView'
import Signup from './pages/Signup';
import Login from './pages/Login';
import SkillList from './pages/SkillList'

const router = createBrowserRouter([
    { path: '/', element: <Signup/> },
    { path: 'login/', element: <Login/> },
    { path: 'dashboard/', element: <Dashboard/> },
    { path: 'skilllist/', element: <SkillList/> },
    { path: 'add/', element: <AddSkill/> },
    { path: 'edit/', element: <EditSkill/> },
    { path: 'skilldetails/', element: <SkillDetails/> },
    { path: 'summary/', element: <Summary/> },
    { path: 'calendarview/', element: <CalendarView/> }

]);

export default router;
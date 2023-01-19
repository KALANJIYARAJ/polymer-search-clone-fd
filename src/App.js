import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import './App.css';
import '../node_modules/bootstrap-icons/bootstrap-icons.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./Login/Login";
import Forgot from "./Login/Forgot";
import Signup from "./Login/Signup";
import Reset from "./Login/Reset";
import PortalLayout from "./Portal/PortalLayout";
import Modal from "./Models/Modal";
import SourceModal from "./Models/SourceModal";
import Remove from "./Remove";
import AllApps from "./Data/AllApps";
import Favorites from "./Data/Favorites";
import Shared from "./Data/Shared";
import Trash1 from "./Data/Trash1";
import View from "./Filter/View";
import { SettingModal } from "./Models/SettingModal";



function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/logout" element={<Remove />}></Route>
        <Route path="/forgot" element={<Forgot />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/reset/:userId" element={<Reset />}></Route>
        <Route path="/portal" element={<PortalLayout />}>
        <Route path="modal" element={<Modal />}></Route>
        <Route path="setting" element={<SettingModal />}></Route>
        <Route path="addsource" element={<SourceModal />}></Route>
        <Route path="all-apps" element={<AllApps />}></Route>
        <Route path="favorites" element={<Favorites />}></Route>
        <Route path="shared" element={<Shared />}></Route>
        <Route path="trash" element={<Trash1/>}></Route>
        </Route>
        <Route path="/ploymerview" element={<View/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


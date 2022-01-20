import './App.css';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import StudentiManagement from "./pages/studenti-management/StudentiManagement";
import CorsiManagement from "./pages/corsi-management/CorsiManagement";
import FrequenzeManagement from './pages/frequenze-management/FrequenzeManagement';
import Sidebar from './core/components/Sidebar';
import Header from './core/components/header/Header';
import { initializeIcons } from '@fluentui/font-icons-mdl2';

function App() {
  initializeIcons();
  //CertificateIcon ESISTEEEE
    return (
    <>

      <div className="app-container">
        <HashRouter>
          <Header/>
          <div className="side-nav">
            <Sidebar/>
          </div>
          <div className="main">
            <Routes>
              <Route path="/studenti" element={<StudentiManagement/>}/>
              <Route path="/corsi" element={<CorsiManagement/>}/>
              <Route path="/frequenze" element={<FrequenzeManagement/>}/>
            </Routes>
          </div>
        </HashRouter>
      </div>
    </>
  );
}

export default App;

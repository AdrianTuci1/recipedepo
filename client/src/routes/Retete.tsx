import { useState } from "react";
import MainContent from "../components/MainContent";
import '../styles/retete.scss'; // Import the SCSS file
import SideBar from "../components/SideBar";


const Retete = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggle = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="main-content">
      <div className="barz">
      <SideBar isOpen={sidebarOpen} onToggle={handleToggle} />
      </div>
      <div className="content">
      <MainContent />
      </div>
    </div>
  );
};

export default Retete;

import { Outlet } from 'react-router-dom';
import '../styles/profilepage.scss'
import ProfileMenu from '../components/ProfileMenu';

function Layout() {
  return (
    <>
    <div className="pagepro">
      <ProfileMenu />
      <div className="prof-content">
        <Outlet />
      </div>
    </div>
    </>
  )
}

export default Layout;
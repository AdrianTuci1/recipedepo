import { NavLink } from 'react-router-dom';

const ProfileMenu = () => {
  const sidebarItems = [
    { label: 'RETETELE MELE', path: '' },
    { label: 'PLAN ALIMENTAR', path: 'plan' },
    { label: 'FAVORITE', path: 'favorite' },
    { label: 'STATISTICI', path: 'statistici' },
    { label: 'MENIU DIGITAL', path: 'meniudigital' },
    // Add more items for different sections
  ];

  return (
    <div className="pannel" style={{ display: 'flex', justifyContent: 'center', }}>
      <ul className='options' style={{ listStyle: 'none'}}>
        {sidebarItems.map((item) => (
          <li key={item.label}>
            <NavLink to={item.path}>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileMenu;

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, updateUser } from '../redux/authSlice';
import { getAuthToken, getAuthUser } from '../redux/storage';
import '../styles/usersettings.scss'; // Import SCSS for styling
import toast from 'react-hot-toast';

interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  image: string;
}

const UserSettings: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState({
    username: false,
    email: false,
    phoneNumber: false,
  });

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const authUser = getAuthUser();
      const authToken = getAuthToken();

      if (!authUser) {
        setError('Unauthorized');
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/${authUser.id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        const data = await response.json();
        setUser(data);
        setUsername(data.username);
        setEmail(data.email);
        setPhoneNumber(data.phoneNumber);
      } catch (err) {
        setError('Failed to fetch user data');
      }
    };

    fetchUser();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleUpdateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    if (user) {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('phoneNumber', phoneNumber);
      if (image) {
        formData.append('image', image);
      }

      try {
        await dispatch(updateUser(user.id, formData) as any);
        setError('User information updated successfully');
        toast.success('Datele au fost actualizate!')
      } catch (error: any) {
        setError(error.message);
        toast.error('A aparut o problema.')
      } finally {
        setIsLoading(false);
        setIsEditing({
          username: false,
          email: false,
          phoneNumber: false,
        });
      }
    }
  };

  const handleLogout = () => {
    dispatch(logout() as any);
    navigate('/');
  };

  const handleEdit = (field: string) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleCancel = (field: string) => {
    setIsEditing({ ...isEditing, [field]: false });

    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setPhoneNumber(user.phoneNumber);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }
  

  return (
    <div className="user-settings-container">
      <h1>SETARI</h1>
      <div className="user-settings-content">
        <div className="user-settings-image">
          <img
            src={image ? URL.createObjectURL(image) : `${import.meta.env.VITE_API_BASE_URL}${user.image}`}
            alt="Profile"
            className="profile-image"
          />
          <input
            type="file"
            id="image"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <button type="button" className="btn btn-upload" onClick={handleUploadClick}>
            UPLOAD IMAGE
          </button>
        </div>
        <form onSubmit={handleUpdateUser} className="user-settings-form">
          <div className="form-group">
            <label htmlFor="username">NUME</label>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={!isEditing.username}
            />
            {!isEditing.username ? (
              <button type="button" className="btnz btn-edit" onClick={() => handleEdit('username')}>
                Edit
              </button>
            ) : (
              <button type="button" className="btnz btn-cancel" onClick={() => handleCancel('username')}>
                Cancel
              </button>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email">EMAIL</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={!isEditing.email}
            />
            {!isEditing.email ? (
              <button type="button" className="btnz btn-edit" onClick={() => handleEdit('email')}>
                Edit
              </button>
            ) : (
              <button type="button" className="btnz btn-cancel" onClick={() => handleCancel('email')}>
                Cancel
              </button>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">TEL.</label>
            <input
              type="text"
              id="phoneNumber"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              disabled={!isEditing.phoneNumber}
            />
            {!isEditing.phoneNumber ? (
              <button type="button" className="btnz btn-edit" onClick={() => handleEdit('phoneNumber')}>
                Edit
              </button>
            ) : (
              <button type="button" className="btnz btn-cancel" onClick={() => handleCancel('phoneNumber')}>
                Cancel
              </button>
            )}
          </div>
          <button type="submit" className="btn btn-primary upd" disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update'}
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
      <div className="centerz">
      <button onClick={handleLogout} className="btn logout">
        Logout
      </button>
      </div>
    </div>
  );
};

export default UserSettings;

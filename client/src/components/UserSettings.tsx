import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { logout, updateUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/usersettings.scss'; // Import SCSS for styling

const UserSettings: React.FC = () => {
  const userFromState = useSelector((state: RootState) => state.auth.user);
  const [user, setUser] = useState(userFromState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
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
    if (!user) {
      const storedUser = JSON.parse(localStorage.getItem('auth_user') || '{}');
      setUser(storedUser);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setEmail(user.email || '');
      setPhoneNumber(user.phoneNumber || '');
    }
  }, [user]);

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
      } catch (error: any) {
        setError(error.message);
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
      setUsername(user.username || '');
      setEmail(user.email || '');
      setPhoneNumber(user.phoneNumber || '');
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
      <h1>User Settings</h1>
      <div className="user-settings-content">
        <div className="user-settings-image">
          <img
            src={image ? URL.createObjectURL(image) : user.image}
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
            Upload Image
          </button>
        </div>
        <form onSubmit={handleUpdateUser} className="user-settings-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
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
              <button type="button" className="btn btn-edit" onClick={() => handleEdit('username')}>
                Edit
              </button>
            ) : (
              <button type="button" className="btn btn-cancel" onClick={() => handleCancel('username')}>
                Cancel
              </button>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
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
              <button type="button" className="btn btn-edit" onClick={() => handleEdit('email')}>
                Edit
              </button>
            ) : (
              <button type="button" className="btn btn-cancel" onClick={() => handleCancel('email')}>
                Cancel
              </button>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
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
              <button type="button" className="btn btn-edit" onClick={() => handleEdit('phoneNumber')}>
                Edit
              </button>
            ) : (
              <button type="button" className="btn btn-cancel" onClick={() => handleCancel('phoneNumber')}>
                Cancel
              </button>
            )}
          </div>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update'}
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
      <button onClick={handleLogout} className="btn btn-secondary">
        Logout
      </button>
    </div>
  );
};

export default UserSettings;


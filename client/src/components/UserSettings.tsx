import React, { useState } from 'react';
import '../styles/usersettings.scss';

interface UserSettings {
  userId: string; // Unique user identifier
  fullName: string;
  email: string;
  phone: string;
  verified: boolean;
  profileImage?: string; // Optional profile image URL
}

const dummyUser: UserSettings = {
  userId: 'user123',
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1234567890',
  verified: true,
  profileImage: 'https://picsum.photos/200',
};

const UserSettingsPage: React.FC = () => {
  const [user, setUser] = useState<UserSettings>(dummyUser);
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  // We don't need updatedUser for ID change

  const verificationStatus = user.verified ? 'Verified' : 'Not Verified';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Simulate image upload (replace with your actual logic)
    console.log('Image uploaded:', event.target.files?.[0].name);
  };

  const handleSaveSettings = () => {
    // Update UI with other edited values (if any)
    // Update logic would normally go here (commented out)
    // setUser(user); // Assuming successful update
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    // Implement logic to delete account (replace with your backend logic)
    console.log('Deleting account...');
    // After successful deletion, you can redirect to login page or handle it differently
  };

  return (
    <div className="user-settings">
      <h2>User Settings</h2>
      <div className="profile-info">
        <img src={user.profileImage} alt="Profile Image" style={{width:'50px'}}/>
        {isEditing && (
          <label htmlFor="profileImage">
            Update Image
            <input type="file" id="profileImage" onChange={handleImageUpload} />
          </label>
        )}
      </div>
      <div className="user-details">
        <p>
          <b>User ID:</b>
          {isEditing ? (
            <input
              type="text"
              name="userId"
              value={user.userId}
              onChange={handleChange}
            />
          ) : (
            user.userId
          )}
        </p>
        <p>
          <b>Full Name:</b>
          {isEditing ? (
            <input
              type="text"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
            />
          ) : (
            user.fullName
          )}
        </p>
        <p>
          <b>Email:</b>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          ) : (
            user.email
          )}
        </p>
        <p>
          <b>Phone Number:</b>
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              value={user.phone}
              onChange={handleChange}
            />
          ) : (
            user.phone
          )}
        </p>
        <p>
          <b>Verification Status:</b> {verificationStatus}
        </p>
      </div>
      <div className="actions">
        {isEditing ? (
          <button onClick={handleSaveSettings}>Save Settings</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit Settings</button>
        )}
      </div>
      <div className="danger-zone">
        <h2>Danger Zone</h2>
        <p className="warning">Deleting your account is permanent and cannot be undone.</p>
        <button
          className="delete-account-button"
          disabled={isConfirmingDelete}
          onClick={() => setIsConfirmingDelete(true)}
        >
          Delete Account
        </button>
        {isConfirmingDelete && (
          <div className="delete-confirmation">
            <p>Are you sure you want to delete your account?</p>
            <button onClick={handleDeleteAccount}>Yes, Delete</button>
          </div>)}
        </div>
    </div>
  );
};

export default UserSettingsPage;

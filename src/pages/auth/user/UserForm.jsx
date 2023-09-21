import React from 'react';
import { useTranslation } from 'react-i18next';

const UserForm = ({ user, setUser }) => {

  const { t } = useTranslation();
 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setUser({ ...user, [name]: newValue });
  };

  return (
    <>
      <div>
        <label>{t('user.first_name')}:</label>
        <input type="text" name="first_name" value={user.first_name || ''} onChange={handleChange} />
      </div>
      <div>
        <label>{t('user.last_name')}:</label>
        <input type="text" name="last_name" value={user.last_name || ''} onChange={handleChange} />
      </div>
      <div>
        <label>{t('user.gender')}:</label>
        <input type="text" name="gender" value={user.gender || ''} onChange={handleChange} />
      </div>
      <div>
        <label>{t('user.phone')}:</label>
        <input type="tel" name="phone" value={user.phone || ''} onChange={handleChange} />
      </div>
      <div>
        <label>{t('user.birthday')}:</label>
        <input type="date" name="birthday" value={user.birthday || ''} onChange={handleChange} />
      </div>
      <div>
        <label>{t('user.email')}:</label>
        <input type="email" name="email" value={user.email || ''} onChange={handleChange} />
      </div>
      <div>
        <label>{t('user.password')}:</label>
        <input type="password" name="password" value={user.password || ''} onChange={handleChange} />
      </div>
      <div>
        <label>{t('user.password_confirmation')}:</label>
        <input
          type="password"
          name="password_confirmation"
          value={user.password_confirmation || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>{t('user.locale')}:</label>
        <input type="text" name="locale" value={user.locale || ''} onChange={handleChange} />
      </div>
      <div>
        <label>{t('user.keep_logging')}:</label>
        <input
          type="checkbox"
          name="keep_logging"
          checked={user.keep_logging || false}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default UserForm;

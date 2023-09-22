import React from 'react';
import { useTranslation } from 'react-i18next';

const UserForm = ({ user, setUser }) => {

  const { t } = useTranslation();
 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    if (setUser) {
      setUser({ ...user, [name]: newValue });
    }
  };

  return (
    <>
      <div className="container w-75">
        <div className="form-outline mb-2">
          <label className="form-label" htmlFor="first_name">{t('user.first_name')}</label>
          <input type="text" name="first_name" value={user?.first_name || ''} onChange={handleChange} className="form-control" id="first_name" disabled={!setUser} />
        </div>
        <div className="form-outline mb-2">
          <label className="form-label" htmlFor="last_name">{t('user.last_name')}</label>
          <input type="text" name="last_name" value={user?.last_name || ''} onChange={handleChange} className="form-control" id="last_name" disabled={!setUser} />
        </div>
        <div className="form-outline mb-2 form-group">
          <label className="form-label" htmlFor="gender">{t('user.gender')}</label>
          <select className="form-control" id="gender" name="gender" value={user?.gender || ''} onChange={handleChange} disabled={!setUser}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-outline mb-2">
          <label className="form-label" htmlFor="phone">{t('user.phone')}</label>
          <input type="tel" name="phone" value={user?.phone || ''} onChange={handleChange} className="form-control" id="phone" disabled={!setUser} />
        </div>
        <div className="form-outline mb-2">
          <label className="form-label" htmlFor="birthday">{t('user.birthday')}</label>
          <input type="date" name="birthday" value={user?.birthday || ''} onChange={handleChange} className="form-control" id="birthday" disabled={!setUser} />
        </div>
        <div className="form-outline mb-2">
          <label className="form-label" htmlFor="email">{t('user.email')}</label>
          <input type="email" name="email" value={user?.email || ''} onChange={handleChange} className="form-control" id="email" disabled={!setUser} />
        </div>
        {setUser &&
          <>
            <div className="form-outline mb-2">
              <label className="form-label" htmlFor="password">{t('user.password')}</label>
              <input type="password" name="password" value={user?.password || ''} onChange={handleChange} className="form-control" id="password" disabled={!setUser} />
            </div>
            <div className="form-outline mb-2">
              <label className="form-label" htmlFor="password_confirmation">{t('user.password_confirmation')}</label>
              <input
                type="password"
                name="password_confirmation"
                value={user?.password_confirmation || ''}
                onChange={handleChange}
                className="form-control" 
                id="password_confirmation"
                disabled={!setUser} 
              />
            </div>
        </>
        }
        <div className="form-outline mb-2 form-group">
          <label className="form-label" htmlFor="locale">{t('user.locale')}</label>
          <select className="form-control" id="locale" name="locale" value={user?.locale || ''} onChange={handleChange} disabled={!setUser}>
            <option value="en">English (en)</option>
            <option value="fr">French (fr)</option>
          </select>
        </div>
        <div className="form-check mb-2">
          <label className="form-check-label" htmlFor="keep_logging">{t('user.keep_logging')}</label>
          <input
            type="checkbox"
            name="keep_logging"
            checked={user?.keep_logging || false}
            onChange={handleChange}
            className="form-check-input"
            id="keep_logging"
            disabled={!setUser} 
          />
        </div>
      </div>
    </>
  );
};

export default UserForm;

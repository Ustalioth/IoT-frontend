import React from "react";
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import MyNavBar from "components/navbar/MyNavBar";
import UserForm from "pages/auth/user/UserForm";

const Profile = () => {
    const { t } = useTranslation();

    const user = useSelector((state) => state.auth.user);

    return (
        <>
            <MyNavBar />
            <h1>{t('profile.title')}</h1>
            <form>
                <UserForm user={user} setUser={null} />
            </form> 
        </>
    );
}

export default Profile;
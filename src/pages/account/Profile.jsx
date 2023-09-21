import React from "react";
import { useTranslation } from 'react-i18next';
import MyNavBar from "components/navbar/MyNavBar";

const Profile = () => {
    const { t } = useTranslation();

    return (
        <>
            <MyNavBar />
            <h1>{t('profile.title')}</h1>  
        </>
        
    );
}

export default Profile;
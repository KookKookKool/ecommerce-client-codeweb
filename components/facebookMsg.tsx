"use client";
import { FacebookProvider, CustomChat } from 'react-facebook';
const facebookmsg = () => {
    return (
        <FacebookProvider appId="1824479285054247" chatSupport>
            <CustomChat pageId="156304428518500" minimized={true} />
        </FacebookProvider>
    );
};

export default facebookmsg;
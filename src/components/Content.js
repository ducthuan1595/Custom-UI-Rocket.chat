import React, { useEffect, useState } from 'react';

import { StoreContext } from '../store';
import Chat from './content/Chat';
import Home from './content/Home';
import History from './content/History';
import { API_URL, ROLE_MENTOR } from '../util/util';
import instance from '../config/axios';

function Content() {
    const {activeMenu, admin, currentUser} = StoreContext();
    const [listUser, setListUser] = useState([]);
    const [usersActive, setUserActive] = useState([]);

    useEffect(() => {
        const getUserList = async() => {
            if(admin) {
                const res = await fetch(`${API_URL}/api/v1/roles.getUsersInRole?role=${ROLE_MENTOR}`, {
                    method: 'GET',
                    headers: {
                        'X-Auth-Token': admin.authToken,
                        'X-User-Id': admin.userId
                    }
                });
                const data = await res.json();
                if(data.success) {
                    for(let i = 0; i < data.users.length; i++) {
                        const responseInfo = await fetch(`${API_URL}/api/v1/users.info?username=${data.users[i].username}`, {
                            method: 'GET',
                            headers: {
                                'X-Auth-Token': admin.authToken,
                                'X-User-Id': admin.userId
                            }
                        });
                        const infoUser = await responseInfo.json();
                        const response = await fetch(`${API_URL}/api/v1/users.getAvatar?username=${data.users[i].username}`)
                        infoUser.user.avatar = response.url;
                        data.users[i] = infoUser.user;
                    }
                    console.log('mentor list', data.users);
                    const users = data.users.filter(user => user.status !== "offline");
                    setUserActive(users);
                    setListUser(data.users)
                }
            }
        }
        getUserList();
    }, [admin])

    let content = <Home usersActive={usersActive} />

    if(activeMenu === 'chat') {
        content = <Chat />
    }

    if(activeMenu === 'history') {
        content = <History />
    }

    return (
        <div className='h-screen w-full'>
            {content}
        </div>
    );
}

export default Content;
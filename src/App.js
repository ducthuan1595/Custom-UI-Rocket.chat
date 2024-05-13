import { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';

import Content from './components/Content';
import SideBar from './components/SideBar';
import { API_URL, AccountAdmin } from './util/util';
import './App.css';
import { StoreContext } from './store';

function App() {
  const {setAdmin, setCurrentUser} = StoreContext();

  const login = (user) => {
    const hashedPassword = CryptoJS.SHA256(user.password).toString(CryptoJS.enc.Hex);

    const promise = new Promise((resolve, reject) => {
      try{
        fetch(`${API_URL}/api/v1/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "user": user.username,
            "password": {
              "digest": hashedPassword,
              "algorithm": "sha-256"
          }
          })
        })
        .then((res) => res.json())
        .then((data) => {
          console.log({data});
          if(data.status === 'success') {
            resolve(data.data);
          }
        }).catch((err) => {
          console.log(err);
        })
      }catch(err) {
        console.error(err);
      }
    });
    return promise;
  }

  useEffect(() => {
    const verify = async() => {
      const admin = await login(AccountAdmin);
      if(admin) {
        setAdmin(admin);
      }
     const user = await login({
        username: 'user1',
        password: '1234'
      });
      if(user) {
        setCurrentUser(user);
      }
    }
    verify()
  }, [setCurrentUser, setAdmin])

  return (
    <div className="flex h-screen">
      <SideBar />
      <Content />
    </div>
  );
}

export default App;

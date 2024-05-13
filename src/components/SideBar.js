import React from 'react';

import { StoreContext } from '../store';

function SideBar() {
    const { setActiveMenu, activeMenu, currentUser } = StoreContext();

    console.log({currentUser});

    return (
        <div className='w-0 md:w-1/4 h-screen divide-y bg-[#2F343D] flex flex-col justify-between'>
            <div className='flex justify-between items-center p-5'>
                <div className='w-[25px] relative'>
                    <img className='rounded' src={currentUser?.me.avatarUrl} alt={currentUser?.me.username} />
                    <i className="fa-solid fa-circle absolute bottom-[-1px] right-[-1px] text-[10px] border rounded-full border-black text-[green]"></i>
                </div>
                {/* Menu */}
                <ul className='flex justify-center items-center gap-5 text-white'>
                    <li onClick={() => {
                        setActiveMenu('home')
                    }} className='cursor-pointer'><i className="fa-solid fa-house text[25px]"></i></li>
                    <li onClick={() => {
                        setActiveMenu('history')
                    }} className='cursor-pointer'><i className="fa-regular fa-window-restore text[25px]"></i></li>
                </ul>
            </div>

            {/* footer */}
            <div className='p-5'>
                <div className='w-16'>
                    <img src='https://funix.edu.vn/wp-content/uploads/2021/11/site-logo.png?x44328' alt='logo' />
                </div>
                <div className='font-semibold text-[10px] text-white pt-2'>Powered by Funix</div>
            </div>
        </div>
    );
}

export default SideBar;
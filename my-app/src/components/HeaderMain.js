import React from 'react';
import { useAuth } from '../contexts/authContext';

const HeaderMain = () => {
    const { user, setUser } = useAuth();
    console.log(user);
    return (
        <div className='p-4 bg-white shadow-md flex items-center justify-center'>
            {user ? (<div className='flex items-center gap-x-3'>
                <img className='w-10 h-10 rounded-full object-cover' src={user.avatar}></img>
                <span className='text-sm font-medium'>Welcome back! <strong>{user.fullname}</strong></span>
            </div>) : (<span className='text-sm font-medium'>Welcome</span>)}
            <button className='p-2 rounded-md bg-gray-300 text-black ml-auto' onClick={() => setUser(null)}>Sign out</button>
        </div>
    );
};

export default HeaderMain;
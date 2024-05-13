import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { StoreContext } from '../../store';
import instance from '../../config/axios';
import { API_URL, TYPE } from '../../util/util';
import { createRoom, joinRoom } from '../../actions/livechat';

const courses = [
    'NodeJS',
    'ReactJS',
    'Website',
    'Javascript'
]

function Home({usersActive}) {

    const {setActiveMenu, currentUser, admin, setVisitor} = StoreContext();

    const [select, setSelect] = useState('');
    const [question, setQuestion] = useState('');
    const [isRoom, setIsRoom] = useState(false);
    const [mentors, setMentors] = useState(usersActive)
    
    useLayoutEffect(() => {
        setMentors(usersActive)
    }, [usersActive])

    useEffect(() => {
        const createAgents = async() => {
            // create agents
            console.log({mentors});
            for(let mentor of mentors) {
                const response = await fetch(`${API_URL}/api/v1/livechat/users/${TYPE}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Auth-Token': admin.authToken,
                        'X-User-Id': admin.userId
                    },
                    body: JSON.stringify({
                        "username": mentor.username,
                    })
                });
                
                const data = await response.json();
                if(data.success) {
                    await registerVisitor();
                }
            }
    
        }

        // register visitor
        const registerVisitor = async() => {
            // create agents
            const response = await fetch(`${API_URL}/api/v1/livechat/visitor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': currentUser.authToken,
                    'X-User-Id': currentUser.userId
                },
                body: JSON.stringify({
                    "visitor": {
                        "name": select,
                        "token": currentUser.me._id,
                        "username": currentUser.me.username
                    },
                })
            });
            
            const data = await response.json();
            if(data.success) {
                setVisitor(data.visitor);
                await createRoom(data.visitor.token);
                return;
            }
        }


        if(isRoom) {
            createAgents();
        }
    }, [isRoom])
    
    const handleSelect = (name) => {
        setSelect(name);
        const data = usersActive.filter(user => {
            const courses = user.bio.split(',');
            const filterCourse =  courses.some(course => course.toLowerCase().trim() === name.toLowerCase().trim())
            if(filterCourse) {
                return user;
            }
        })
        setMentors(data);
    }
    
    const handleRemoveMentor = (id) => {
        const data = [...mentors];
        let result = data.filter(user => user._id !== id);
        setMentors(result);
    }
    
    const handleSearch = async() => {
        console.log('search mentor');
        setIsRoom(true)
        // setActiveMenu('chat');
        
    }

    return (
        <div className=''>
            <div className='text-2xl font-bold p-5 bg-[#F7F8FA]'>Ask Mentor</div>
            <div className='p-5 w-fit'>
                <label className='font-semibold text-lg'>Lựa chọn môn học(*)</label>
                <div className="form-selects pt-1">
                    <div className="form-select border">
                        <span class="select">
                            {select ? select : "Chọn môn học"}
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" fill="none">
                        <path d="M9 1L5 5L1 1" stroke="#979797" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div className="form-options">
                        {courses.map(course => <div key={course} className="option" onClick={() => handleSelect(course)}>{course}</div>)}
                    </div>
                </div>
            </div>
            <div className="px-5 pt-2">
                <label class="font-semibold text-lg">
                    Câu hỏi?(*)
                </label>
                <div className="">
                    <textarea rows={5} className='py-2 px-5 rounded w-full border outline-none' placeholder='Gõ câu hỏi của ban.' onChange={(e) => setQuestion(e.target.value)} />
                </div>
            </div>

            <div className="px-5 pt-2">
                <label class="font-semibold text-lg">
                    Mentors
                </label>
                {/* list mentor */}
                <div className='py-2 px-5 flex items-center flex-wrap gap-3'>
                    {select && mentors.map(user => {
                        return (
                            <div key={user._id} className='p-2 rounded flex items-center gap-2 bg-[#C0C0C0] cursor-pointer' onClick={() => handleRemoveMentor(user._id)}>
                                <img className='w-[25px] rounded' src={user.avatar} alt={user.username} />
                                <p>{user.username}</p>
                                <i className="fa-solid fa-xmark"></i>
                            </div>
                        )
                    })}
                </div>

            </div>

            <div className='text-center pt-2'>
                <button onClick={handleSearch} disabled={select !== '' && question !== '' ? false : true} className='text-lg text-white rounded py-2 px-8 bg-red-500 hover:cursor-pointer hover:opacity-70 disabled:opacity-70 disabled:pointer-events-none'>Ask Mentor</button>
            </div>
        </div>
    );
}

export default Home;
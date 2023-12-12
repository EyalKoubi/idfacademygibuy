"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from 'next-auth';
import useUserRequestCourseStore from '@/app/_contexts/requestsCoursesContext';
import { CourseData } from '@/app/types';
import useUserStore from '@/app/_contexts/userContext';
import { GeneralTexts } from '@/HebrewStrings/Texts';

const Page = () => {
    const [pendingRegistrations, setPendingRegistrations] = useState<User[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<{[userId: string]: string}>({});
    const {userRequestsCourses,removeRequestUserCourse}=useUserRequestCourseStore();
    const {user,addUserCourse}=useUserStore();
    // useEffect(() => {
    //     // Fetch pending registrations when component mounts
    //     axios.get("/api/getPermissionRequests")
    //         .then(response => {
    //             setPendingRegistrations(response.data);
    //         })
    //         .catch(error => console.error(error));
    // }, []);

    const answerRequestCourse = (userCurrent:any,course:CourseData,answerType:string) => {
        const formData=new FormData();
        formData.append("userId",userCurrent.id)
        formData.append("course",JSON.stringify(course))
        formData.append("answerType",answerType)
        //const courseId = selectedCourse[userId]; // Get the selected course for the userCurrent
        axios.post(`/api/answerRequestCourse`,formData)
            .then(() => {
                removeRequestUserCourse(userCurrent,course)
                if(userCurrent.id===user.id&&answerType==="Accept")//if we approve request to my self
                    addUserCourse(course)
            })
            .catch(error => console.error(error));
    };

   

    const handleCourseSelection = (userId: string, courseId: string) => {
        setSelectedCourse({ ...selectedCourse, [userId]: courseId });
    };

    return (
        <div>
            <h1>Permission Manager</h1>
            <ul>
                {userRequestsCourses.map(userRequestCourse => (
                    <li key={userRequestCourse.user.id}>
                        <div className='flex '>
                            <div className='m-3'>
                            {userRequestCourse.user.name} - {userRequestCourse.user.email}
                            </div>
                            <div className='m-3'>
                            {userRequestCourse.course.name}
                            </div>
                            <div className='m-3'>
                        <button onClick={() => answerRequestCourse(userRequestCourse.user,userRequestCourse.course,"Accept")}>{GeneralTexts.accept}</button>
                        </div>
                        <div className='m-3'>
                        <button onClick={() => answerRequestCourse(userRequestCourse.user,userRequestCourse.course,"Reject")}>{GeneralTexts.reject}</button>
                        </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Page;

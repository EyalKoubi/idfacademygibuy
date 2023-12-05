"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from 'next-auth';
import useUserRequestCourseStore from '@/app/_contexts/requestsCoursesContext';

const Page = () => {
    const [pendingRegistrations, setPendingRegistrations] = useState<User[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<{[userId: string]: string}>({});
    const {userRequestsCourses}=useUserRequestCourseStore();
    // useEffect(() => {
    //     // Fetch pending registrations when component mounts
    //     axios.get("/api/getPermissionRequests")
    //         .then(response => {
    //             setPendingRegistrations(response.data);
    //         })
    //         .catch(error => console.error(error));
    // }, []);

    const approveRegistration = (userId: string,courseId:string) => {
        //const courseId = selectedCourse[userId]; // Get the selected course for the user
        axios.post(`/api/approveUserForCourse`, { userId, courseId })
            .then(() => {
                // Update the list to remove the approved user
                setPendingRegistrations(pendingRegistrations.filter(user => user.id !== userId));
            })
            .catch(error => console.error(error));
    };

    const rejectRegistration = (userId: string,courseId:string) => {
        axios.post(`/api/rejectUser/${userId}`)
            .then(() => {
                // Update the list to remove the rejected user
                setPendingRegistrations(pendingRegistrations.filter(user => user.id !== userId));
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
                       
                        <button onClick={() => approveRegistration(userRequestCourse.user.id,userRequestCourse.course.id)}>Approve</button>
                        <button onClick={() => rejectRegistration(userRequestCourse.user.id,userRequestCourse.course.id)}>Reject</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Page;

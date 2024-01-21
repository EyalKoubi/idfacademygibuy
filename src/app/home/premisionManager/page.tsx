"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from 'next-auth';
import useUserRequestCourseStore from '@/app/_contexts/requestsCoursesContext';
import { CourseData } from '@/app/types';
import useUserStore from '@/app/_contexts/userContext';
import { GeneralTexts } from '@/HebrewStrings/Texts';
import { Badge, Button, Checkbox, Mask, Table } from 'react-daisyui';
const Page = () => {
    const [pendingRegistrations, setPendingRegistrations] = useState<User[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<{[userId: string]: string}>({});
    const {userRequestsCourses,removeRequestUserCourse}=useUserRequestCourseStore();
    const {user,userCourses,addUserCourse}=useUserStore();

    const answerRequestCourse = (userCurrent:any,course:CourseData,answerType:string) => {
        const formData=new FormData();
        formData.append("userId",userCurrent.id)
        formData.append("course",JSON.stringify(course))
        formData.append("answerType",answerType)
        axios.post(`/api/answerRequestCourse`,formData)
            .then(() => {
                removeRequestUserCourse(userCurrent,course)
                if(userCurrent.id===user.id&&answerType==="Accept")//if we approve request to my self
                    addUserCourse(course)
                    console.log(userCourses)
            })
            .catch(error => console.error(error));
    };

   

    const handleCourseSelection = (userId: string, courseId: string) => {
        setSelectedCourse({ ...selectedCourse, [userId]: courseId });
    };

    return (
        <div className="overflow-x-auto align-middle">
          <Table className="rounded-box bg-gray-500">
            <Table.Head>
              <span>User Name</span>
              <span>Email</span>
              <span>Course Name</span>
              <span>Action</span>
            </Table.Head>
    
            <Table.Body>
              {userRequestsCourses.map((userRequestCourse) => (
                <Table.Row key={userRequestCourse.user.id}>
                  <span>{userRequestCourse.user.name}</span>
                  <span>{userRequestCourse.user.email}</span>
                  <span>{userRequestCourse.course.name}</span>
                  <span>
                    <Button
                      color="success"
                      size="xs"
                      onClick={() =>
                        answerRequestCourse(
                          userRequestCourse.user,
                          userRequestCourse.course,
                          'Accept'
                        )
                      }
                    >
                      {GeneralTexts.accept}
                    </Button>
                    <Button
                      color="error"
                      size="xs"
                      onClick={() =>
                        answerRequestCourse(
                          userRequestCourse.user,
                          userRequestCourse.course,
                          'Reject'
                        )
                      }
                    >
                      {GeneralTexts.reject}
                    </Button>
                  </span>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      );
    }

export default Page;

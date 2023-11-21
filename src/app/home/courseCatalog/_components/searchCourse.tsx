"use client"
import React, { useState, useEffect } from 'react';
interface searchCourseProps{ 
    searchTerm:string,
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}
const SearchCourse: React.FC<searchCourseProps> = ({ searchTerm,setSearchTerm }) => {


  return (
    <>
    <input 
    type="search" 
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="form-input border border-black "
    placeholder="Search courses..."
  />
  <div className='flex flex-col'>
    <div>
    {/* need to add functionality in the future  */}
      <p>סתר קורסים אליהם אתה רשום</p>
    </div>
    <div>
    <input 
      type="checkbox" 
    // value={}
    // onChange={(e) => setSearchTerm(e.target.value)}
      className="form-input"
  />
  </div>
  </div>
  </>
  );
};

export default SearchCourse;
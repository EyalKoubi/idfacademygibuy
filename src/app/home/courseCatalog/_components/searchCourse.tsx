"use client"
import React, { useState, useEffect } from 'react';
interface searchCourseProps{ 
    searchTerm:string,
    filterType:string,
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
    
    setFilterType:React.Dispatch<React.SetStateAction<string>>
    setDateRange: React.Dispatch<React.SetStateAction<{
      start: string;
      end: string;
  }>>
}
const SearchCourse: React.FC<searchCourseProps> = ({ searchTerm,filterType,setSearchTerm,setFilterType,setDateRange }) => {

  return (
    <>
      <select onChange={(e) => setFilterType(e.target.value)} className="form-select">
        <option value="name">Search by Name</option>
        <option value="date">Search by Date Range</option>
      </select>
      <input 
        type="search" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-input border border-black "
        placeholder="Search courses..."
      />
    {filterType==="date"&&
      <div className='flex flex-col'>
        {/* Date range inputs */}
        <p>please choose date range</p>
        <div >
        <p>From:</p>
        <input 
          type="date" 
          onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
          className="form-input"
        />
         </div>
         <div>
          <p>To:</p>
        <input 
          type="date" 
          onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
          className="form-input"
        />
        </div>
      </div>}
    </>
  );
};

export default SearchCourse;
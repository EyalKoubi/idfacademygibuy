"use client"
import React, { useState, useEffect } from 'react';
import {Badge, Button, Indicator, Input, Join, Select} from "react-daisyui"
interface SearchCourseProps{ 
    searchTerm:string,
    filterType:string,
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
    
    setFilterType:React.Dispatch<React.SetStateAction<string>>
    setDateRange: React.Dispatch<React.SetStateAction<{
      start: string;
      end: string;
  }>>
}

  const SearchCourse: React.FC<SearchCourseProps> = ({
    searchTerm,
    filterType,
    setSearchTerm,
    setFilterType,
    setDateRange,
  }) => {
    return (
      <Join>
        <div>
          <div>
            <Input
              className="join-item" // You may need to adjust this class name based on your design library
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col"> {/* Wrap the Select and date range inputs in a flex column */}
          <Select
            className="join-item" // You may need to adjust this class name based on your design library
            onChange={(e) => setFilterType(e.target.value)}
          >
            <Select.Option value={""}>
              Options
            </Select.Option>
            <Select.Option value={"name"}>Name</Select.Option>
            <Select.Option value={"date"}>Date</Select.Option>
          </Select>
          {filterType === "date" && (
            <div className="flex flex-row items-center">
              {/* Date range inputs */}
              <div>
                <p>From:</p>
                <input
                  type="date"
                  onChange={(e) =>
                    setDateRange((prev) => ({ ...prev, start: e.target.value }))
                  }
                  className="form-input"
                />
              </div>
              <div>
                <p>To:</p>
                <input
                  type="date"
                  onChange={(e) =>
                    setDateRange((prev) => ({ ...prev, end: e.target.value }))
                  }
                  className="form-input"
                />
              </div>
            </div>
          )}
        </div>
      </Join>
    );
                }
  
  export default SearchCourse;
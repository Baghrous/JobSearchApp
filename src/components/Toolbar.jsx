import React, { useState, useEffect } from "react";
import { Input, Select, Button } from "antd";
import "./Toolbar.css";
import {
  searchJobs,
  filterJobsBycategory,
  sortJobs,
  resetFilteredJobs,
} from "../store/actions";
import { useDispatch } from "react-redux";

const { Option } = Select;

function Toolbar() {

    const [filters, setFilters] = useState({
      searchQuery: "",
      sortOption: "creationDate",
      categoryOption: "All Categories",
    });
  const dispatch = useDispatch();

  const saveUserFilters = (filters) => {
    localStorage.setItem("userFilters", JSON.stringify(filters));
  };

  const loadUserFilters = () => {
    const filters = localStorage.getItem("userFilters");
    return filters ? JSON.parse(filters) : null;
  };

  const handleSearchChange = (value) => {
     const updatedFilters = { ...filters, searchQuery: value };
     setFilters(updatedFilters);
     dispatch(searchJobs(value));
     saveUserFilters(updatedFilters);
   };
 
   const handleSortChange = (value) => {
     const updatedFilters = { ...filters, sortOption: value };
     setFilters(updatedFilters);
     dispatch(sortJobs(value));
     saveUserFilters(updatedFilters);
   };

   const handleCategoryFilter = (value) => {
     const updatedFilters = { ...filters, categoryOption: value };
     setFilters(updatedFilters);
     dispatch(filterJobsBycategory(value));
     saveUserFilters(updatedFilters);
   };

   const handleReset = () => {
     const defaultFilters = {
       searchQuery: "",
       sortOption: "creationDate",
       categoryOption: "All Categories",
     };
     setFilters(defaultFilters);
     dispatch(resetFilteredJobs());
     saveUserFilters(defaultFilters);
   };
    useEffect(() => {
      const loadedFilters = loadUserFilters();
      if (loadedFilters) {
        setFilters(loadedFilters);
      }
    }, []);


  return (
    <div className="toolbar">
      <Input.Search
        placeholder="Search jobs..."
        value={filters.searchQuery}
        onChange={(e) => handleSearchChange(e.target.value)}
        enterButton
      />

      <Select
        style={{ width: "300px" }}
        defaultValue="creationDate"
        value={filters.sortOption}
        onChange={handleSortChange}
      >
        <Option value="creationDate">Sort by Creation Date</Option>
        <Option value="name">Sort by Name</Option>
        <Option value="category">Sort by Category</Option>
        {/* Add more sorting options as needed */}
      </Select>

      <Select
        style={{ width: "300px" }}
        defaultValue="All Categories"
        value={filters.categoryOption}
        onChange={handleCategoryFilter}
      >
        <Option value="All Categories">All Categories</Option>
        <Option value="AI / Research & Development">
          AI / Research & Development
        </Option>
        <Option value="Artificial Intelligence">Artificial Intelligence</Option>
        <Option value="Financial Services">Financial Services</Option>
        <Option value="Human Resources">Human Resources</Option>
        <Option value="Software Engineering">Software Engineering</Option>
      </Select>

      <Button type="default" onClick={handleReset}>
        Reset Filters
      </Button>
    </div>
  );
}

export default Toolbar;

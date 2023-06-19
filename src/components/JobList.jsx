import React, { useEffect, useState } from "react";
import { Pagination, Spin, Empty, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, setFilteredJobs } from "../store/actions";
import JobCard from "./JobCard";
import "./JobList.css";

function JobList() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading);

  const filteredJobs = useSelector((state) => state.filteredJobs);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);

  useEffect(() => {
    const storedTotalJobs =
      parseInt(localStorage.getItem("totalJobs"), 10) || 0;
    setTotalJobs(storedTotalJobs);
  }, []);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  useEffect(() => {
    const storedFilteredJobs = JSON.parse(localStorage.getItem("filteredJobs"));
    if (storedFilteredJobs) {
      dispatch(setFilteredJobs(storedFilteredJobs));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("filteredJobs", JSON.stringify(filteredJobs));
    setTotalPages(Math.ceil(filteredJobs.length / 10));
  }, [filteredJobs]);

  const handlePagination = (pageNumber) => {
    setPage(pageNumber);
  };

  const getDisplayedJobs = () => {
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    return filteredJobs.slice(startIndex, endIndex);
  };

  if (error) {
    return <Alert type="error" message={error} />;
  }

  return (
    <div>
      {loading ? (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      ) : (
        <>
          {filteredJobs.length > 0 ? (
            <div className="job-list">
              {getDisplayedJobs().map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <Empty />
          )}

          {totalPages > 1 && (
            <div className="pagination">
              <Pagination
                current={page}
                total={totalJobs}
                onChange={handlePagination}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default JobList;

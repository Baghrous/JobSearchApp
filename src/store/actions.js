import ApiService from "../services/ApiService";

export const FETCH_JOBS_REQUEST = "FETCH_JOBS_REQUEST";
export const FETCH_JOBS_SUCCESS = "FETCH_JOBS_SUCCESS";
export const FETCH_JOBS_FAILURE = "FETCH_JOBS_FAILURE";
export const SEARCH_JOBS = "SEARCH_JOBS";
export const FILTER_JOBS_BY_CATEGORY = "FILTER_JOBS_BY_CATEGORY";
export const SET_FILTERED_JOBS = "SET_FILTERED_JOBS";
export const SORT_JOBS = "SORT_JOBS";
export const RESET_FILTERED_JOBS = "RESET_FILTERED_JOBS";

;
export const fetchJobsRequest = () => ({
  type: FETCH_JOBS_REQUEST,
});

export const searchJobs = (searchQuery) => ({
  type: SEARCH_JOBS,
  payload: searchQuery ,
});

export const filterJobsBycategory = (category) => ({
  type: FILTER_JOBS_BY_CATEGORY,
  payload: category,
});

export const sortJobs = (sortBy) => ({
  type: SORT_JOBS,
  payload: sortBy,
});

export const fetchJobsSuccess = (jobs) => ({
  type: FETCH_JOBS_SUCCESS,
  payload: jobs,
});


export const fetchJobsFailure = (error) => ({
  type: FETCH_JOBS_FAILURE,
  payload: error,
});

export const fetchJobs = () => {
  return async (dispatch) => {
    dispatch(fetchJobsRequest());
  
    const response = await ApiService.fetchJobs();
    if (typeof response === "string") {
            dispatch(fetchJobsFailure(response));
          } else {
         dispatch(fetchJobsSuccess(response.data.jobs));
      }
    }
};
export const resetFilteredJobs = () => ({
  type: RESET_FILTERED_JOBS,
});

export const setFilteredJobs = (filteredJobs) => ({
  type: SET_FILTERED_JOBS,
  payload: filteredJobs,
});

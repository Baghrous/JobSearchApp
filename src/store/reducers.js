import {
  FETCH_JOBS_REQUEST,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILURE,
  SEARCH_JOBS,
  SET_FILTERED_JOBS,
  SORT_JOBS,
  FILTER_JOBS_BY_CATEGORY,
  RESET_FILTERED_JOBS,
} from "./actions";

const initialState = {
  jobs: [],
  filteredJobs: [],
  loading: false,
  error: null,
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOBS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_JOBS_SUCCESS:
      return {
        ...state,
        jobs: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_JOBS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_FILTERED_JOBS:
      return {
        ...state,
        filteredJobs: action.payload,
      };
    case RESET_FILTERED_JOBS:
      return {
        ...state,
        filteredJobs: state.jobs,
      };

    case SEARCH_JOBS:
      return {
        ...state,
        searchQuery: action.payload,
        filteredJobs: state.jobs.filter((job) =>
          job.name.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    case SORT_JOBS:
      let sortedJobs;
      switch (action.payload) {
        case "creationDate":
          sortedJobs = state.filteredJobs
            .slice()
            .sort((a, b) =>
              a.creationDate && b.creationDate
                ? a.creationDate.localeCompare(b.creationDate)
                : 0
            );
          break;
        case "name":
          sortedJobs = state.filteredJobs
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "category":
          sortedJobs = state.filteredJobs.slice().sort((a, b) => {
            const categoryA = a.tags.find((tag) => tag.name === "category");
            const categoryB = b.tags.find((tag) => tag.name === "category");
            const valueA = categoryA ? categoryA.value : "";
            const valueB = categoryB ? categoryB.value : "";
            return valueA.localeCompare(valueB);
          });
          break;
        default:
          sortedJobs = state.filteredJobs;
      }
      return {
        ...state,
        filteredJobs: sortedJobs,
      };

    case FILTER_JOBS_BY_CATEGORY:
      if (action.payload === "All Categories") {
        return {
          ...state,
          filteredJobs: state.jobs,
        };
      } else {
        return {
          ...state,
          filteredJobs: state.jobs.filter((job) =>
            job.tags.some(
              (tag) => tag.name === "category" && tag.value === action.payload
            )
          ),
        };
      }

    default:
      return state;
  }
};

export default reducer;

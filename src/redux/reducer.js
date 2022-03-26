import {
  ADD_TODO_LOADING,
  ADD_TODO_SUCCESS,
  GET_TODO_LOADING,
  GET_TODO_SUCCESS,
  DEL_TODO
} from "./actionTypes";

const init = {
  data: [],
  loading: false,
  isError: false,
};

export const todoReducer = (state = init, { type, payload }) => {
  switch (type) {
    case ADD_TODO_LOADING:
      return { ...state, loading: true };
    case ADD_TODO_SUCCESS:
      return { ...state, loading: false };
    case GET_TODO_LOADING:
      return { ...state, loading: true };
    case GET_TODO_SUCCESS:
      return { ...state, data: payload, loading: false };

      case DEL_TODO:
        const delFunctionality = state.data.filter((e)=> e.id !== payload);
        return {
            ...state,
            loading: false, // optional
            data: delFunctionality
        }

    default:
      return { ...state };
  }
};

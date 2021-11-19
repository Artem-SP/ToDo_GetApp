
let localStorageData = JSON.parse(localStorage.getItem("toDo"))
const defaultState = (localStorage.length ? {toDo: localStorageData} :  {toDo: []})

const GET_TODO = "GET_TODO";
const ADD_TODO = "ADD_TODO";
const CHANGE_TODO = "CHANGE_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const SETDONE_TODO = "SETDONE_TODO";

export const toDoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_TODO:
      return { ...state, toDo: [action.payload] };

    case ADD_TODO:
      return { ...state, toDo: [...state.toDo, action.payload] };

    case REMOVE_TODO:
      return {
        ...state,
        toDo: state.toDo.filter((toDo) => toDo.id !== action.payload)
      };

    case CHANGE_TODO:
      return {
        ...state,
        toDo: state.toDo.map((toDo) => {
          if (toDo.id === action.payload.toEditeID) {
            toDo.title = action.payload.title;
          }
               return toDo;
        })
      };

      case SETDONE_TODO:
        return {
          ...state,
          toDo: state.toDo.map((toDo) => {
            if (toDo.id === action.payload) {
              toDo.done = !(toDo.done);
            }
                 return toDo;
          })
        };


    default:
      return state;
  }
};

export const getToDoAction = (payload) => ({ type: GET_TODO, payload });
export const addToDoAction = (payload) => ({ type: ADD_TODO, payload });
export const changeToDoAction = (payload) => ({ type: CHANGE_TODO, payload });
export const removeToDoAction = (payload) => ({ type: REMOVE_TODO, payload });
export const setDoneToDoAction = (payload) => ({ type: SETDONE_TODO, payload });




let localStorageData = JSON.parse(localStorage.getItem("toDo"))
// const defaultState = {toDo: []}
const defaultState = (localStorage.length ? {toDo: localStorageData} :  {toDo: []})

const ADD_TODO = "ADD_TODO";
const CHANGE_TODO = "CHANGE_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const SETDONE_TODO = "SETDONE_TODO";

export const toDoReducer = (state = defaultState, action) => {
  switch (action.type) {

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

export const addToDoActionCreator = (payload) => ({ type: ADD_TODO, payload });
export const changeToDoActionCreator = (payload) => ({ type: CHANGE_TODO, payload });
export const removeToDoActionCreator = (payload) => ({ type: REMOVE_TODO, payload });
export const setDoneToDoActionCreator = (payload) => ({ type: SETDONE_TODO, payload });



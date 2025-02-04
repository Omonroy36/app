const initialState = {
  modules: [
    {
      title: 'Read',
      text: 'Introduction to the pre-work',
      icon: 'verified',
      status: 'inactive',
    },
    {
      title: 'Practice',
      text: 'Practice pre-work',
      icon: 'book',
      status: 'active',
    },
    {
      title: 'Practice',
      text: 'Star wars',
      icon: 'verified',
      status: 'finished',
    },
  ],
  contextState: {
    cohortProgram: [],
    taskTodo: [],
  },
};

const moduleMapReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_STATUS':
      return {
        ...state,
        modules: action.payload,
      };
    case 'CHANGE_CONTEXT_STATE':
      return {
        ...state,
        contextState: action.payload,
      };
    // case 'CHANGE_SINGLE_TASK_STATUS':
    //   return {
    //     ...state,
    //     contextState: {
    //       ...state.contextState,
    //       taskTodo: action.payload,
    //     },
    //   };
    default:
      return state;
  }
};
export default moduleMapReducer;

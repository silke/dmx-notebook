const state = {
  title: '',
  content: '',
};

const actions = {

  setTitle (_, title) {
    //console.log('changing title...', title);
    state.title = title;
  },
 
  setContent (_, content) {
    //console.log('changing content...', content);
    state.content = content;
  }, 
  
  resetNote () {
    state.title = '';
    state.content = '';
  },

  saveNote ({dispatch}) {
    console.log('Saving note...');
    if(!state.title){ //if there's no title set the current date as the title
      dispatch('setTitle', getters.getDate());
    };
    dispatch('createNote', {
      value: state.title,
      content: state.content
    });
    dispatch('resetNote');
  },
};

const getters = {
  getDate: () => {
    return (new Date()).toDateString();
  },
};

export default {
  state,
  actions,
  getters
};

import Vue from 'vue';
import Vuex from 'vuex';
import { MessageBox } from 'element-ui';
import dm5 from 'dm5';

Vue.use(Vuex);

const state = {

  object: undefined,        // The selected Topic/Assoc/TopicType/AssocType.
                            // This object is displayed in detail panel. Its ID appears in the browser URL.
                            // Undefined if there is no selection or a multi-selection.

  writable: undefined,      // True if the current user has WRITE permission for the selected object.

  popupVisible: false,
  noteStatus: 0,

};

const actions = {

  emptyDisplay () {
    // console.log('emptyDisplay');
    state.object = undefined;
  },

  displayPopupAnimation (_, success) {
    if(success === null){
      state.popupVisible = true;
    }
    else {
        if(success === true){
          state.noteStatus = 1;
        }
        else if(success === false){
          state.noteStatus = -1;
        }
        state.popupVisible = true;
        setTimeout(() => {
            state.popupVisible = false;
            setTimeout(() => state.noteStatus = 0, 1000);
        }, 1300);
    };
  },

  submit ({dispatch}, object) {
    object.update().then(object => {
      dispatch('_processDirectives', object.directives);
    });
  },

  createNote ({dispatch}, {value, content}) {
    // Note: for value integration to work at least all identity fields must be filled
    const noteType = dm5.typeCache.getTopicType('dmx.notes.note');
    // Create a new topic model with the note topic type and place the user input into it's 
    // title and text children
    const noteModel = new dm5.Topic(noteType.newTopicModel(value)).fillChildren();
    noteModel.children['dmx.notes.text'].value = content;
    const res = dm5.restClient.createTopic(noteModel);
    dispatch('displayPopupAnimation', null);
    //Artificial delay for testing loading animation
    setTimeout(() => {
        res.then(note => {
          console.log('Created', note);
          dispatch('displayPopupAnimation', true);
        }, fail => {
            console.log('Creating note failed');
            dispatch('displayPopupAnimation', false);
        });
    }, 2000);
  },

  loggedIn () {
    initWritable();
  },

  loggedOut () {
    initWritable();
  },

  // WebSocket messages

  _processDirectives (_, directives) {
    console.log(`Mobile: processing ${directives.length} directives`, directives);
    directives.forEach(dir => {
      switch (dir.type) {
      case "UPDATE_TOPIC":
        displayObjectIf(new dm5.Topic(dir.arg));
        break;
      case "DELETE_TOPIC":
        unselectIf(dir.arg.id);
        break;
      case "UPDATE_ASSOCIATION":
        displayObjectIf(new dm5.Assoc(dir.arg));
        break;
      case "DELETE_ASSOCIATION":
        unselectIf(dir.arg.id);
        break;
      };
    });
  }
};

const getters = {

  // Recalculate "object" once the underlying type changes.
  // The detail panel updates when a type is renamed.
  object: state => {
    // console.log('object getter', state.object, state.object && state.typeCache.topicTypes[state.object.uri])
    // ### FIXME: the asCompDef() approach does not work at the moment. Editing an comp def would send an
    // update model with by-URI players while the server expects by-ID players.
    return state.object && (state.object.isType()    ? state.object.asType() :
                            state.object.isCompDef() ? state.object.asCompDef() :
                            state.object)
    // logical copy in createDetail()/updateDetail() (topicmap-model.js of dm5-cytoscape-renderer module)
  }
}

const store = new Vuex.Store({
  state,
  actions,
  getters
});

export default store;


// copy in cytoscape-view.js (module dm5-cytoscape-renderer)
// TODO: unify selection models (see selection.js in dmx-topicmaps module)
function size (idLists) {
  return idLists.topicIds.length + idLists.assocIds.length
}

//

function initWritable () {
   state.object && _initWritable()
}

function _initWritable () {
  state.object.isWritable().then(writable => {
    state.writable = writable
  })
}

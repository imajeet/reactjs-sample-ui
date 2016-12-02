import { merge } from 'lodash';

import {
    SET_CURRENT_NODE,
    SET_ROOT_NODE,
    ADD_CHILD_NODES,
    DELETE_NODE,
    CREATE_NODE,
    ATTACH_FILE,
} from '../actions/tree_actions';

const defaultState = {
  root: {},
  currentNode: {}
};

const FileTreeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_CURRENT_NODE:
            return merge({}, state, {currentNode: action.currentNode});
        case SET_ROOT_NODE:
            return merge({}, state, { root: action.root });
        case ADD_CHILD_NODES:
            action.childNodes.forEach((child) => {
                action.parentNode.addChild(child);
            });
            return merge({}, state, { root: state.root });
        case CREATE_NODE:
            action.parentNode.addChild(action.childNode);
            return state;
        case DELETE_NODE:
            action.node.parent.removeChild(action.node);
            return state;
        case ATTACH_FILE:
            action.node.item = action.newDoc;
            return state;
        default:
            return state;
    }
};

export default FileTreeReducer;
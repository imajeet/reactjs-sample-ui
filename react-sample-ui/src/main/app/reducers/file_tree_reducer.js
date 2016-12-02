import { merge } from 'lodash';

import {
    SET_CURRENT_NODE,
    SET_ROOT_NODE,
    ADD_CHILD_NODES,
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
        default:
            return state;
    }
};

export default FileTreeReducer;
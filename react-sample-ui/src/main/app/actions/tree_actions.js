import NuxeoUtils from '../utils/nuxeo_utils';
import TreeNode from '../tree_node/tree_node';
import DocumentStore from '../data/document_store';

export const SET_CURRENT_NODE = "SET_CURRENT_NODE";
export const SET_ROOT_NODE = "SET_ROOT_NODE";
export const ADD_CHILD_NODES = "ADD_CHILD_NODES";
export const DELETE_NODE = "DELETE_NODE";
export const CREATE_NODE = "CREATE_NODE";
export const ATTACH_FILE = "ATTACH_FILE";


export function setCurrentNode(node) {
    return {
        type: SET_CURRENT_NODE,
        currentNode: node
    }
}

export function setRootNode() {
    return (dispatch) => {
        NuxeoUtils.crudUtil({
            success: (doc) => {
                let rootNode = new TreeNode(doc);
                dispatch({type: SET_ROOT_NODE, root: rootNode});
                dispatch(setCurrentNode(rootNode));
                fetchChildren(rootNode)(dispatch);
            }
        })
    }
}

export function fetchChildren(node) {
    return (dispatch) => {
            NuxeoUtils.crudUtil({
                path: node.item.uid,
                adapter: 'children',
                success: (docs) => {
                    let childNodes = docs.entries.map((entry) => {
                        return new TreeNode(entry)
                    });
                    dispatch({
                        type: ADD_CHILD_NODES,
                        parentNode: node,
                        childNodes: childNodes
                    })
                }
            });

    }
}

export function deleteDocument(node, callback){
    return (dispatch) => {
        NuxeoUtils.crudUtil({
                method: "delete",
                path: node.item.uid,
                success: (doc) => {
                    dispatch({
                        type: DELETE_NODE,
                        node: node
                    });
                    if (callback) {
                       callback();
                    }
            }
        })
    }
}


export function createDocument(parentNode, doc, callback){
    return (dispatch) => {
        NuxeoUtils.crudUtil({
            method: "create",
            path: parentNode.item.uid,
            data: doc,
            success: (doc) => {
                let childNode = new TreeNode(doc);
                dispatch({
                    type: CREATE_NODE,
                    parentNode: parentNode,
                    childNode: childNode,
                });
                dispatch(setCurrentNode(parentNode));
                if (callback) {
                    callback()
                }
            }
        })
    }
}

export function attachFile(node, upload, callback) {
    return function(dispatch) {
        let success = (newDoc) => {
            dispatch({
                type: ATTACH_FILE,
                node: node,
                newDoc: newDoc,
            });
            if (callback) {
                callback();
            }
        };
        NuxeoUtils.attachFile(node, upload, success);
    }
}


const TreeActions = {

    editDocument(node, doc){
        let success = (doc) => {
        };
        let path = node.item.uid;
        NuxeoUtils.crudUtil({
           type: 'update',
           path:  path,
           data:  doc,
           success: success
        });
    },

    attachFile(node, upload) {
        let success = (res) => {
            node.item = res;
            TreeActions.setWorkingNode(node);
        };
        NuxeoUtils.attachFile(node, upload, success);
    },

};

["acl", "workflow", "task", "audit"].forEach((adapter) => {
   TreeActions[`get${adapter}`] = (node) => {
       let success = (res) => {
           DocumentStore.setProperty(node, res, adapter);
       };

       let path = node.item.uid;
       NuxeoUtils.crudUtil({
          method:"get",
          path: path,
          adapter: `${adapter}`,
          success: success
       });
   }
});

export default TreeActions;
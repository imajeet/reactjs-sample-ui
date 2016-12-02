import NuxeoUtils from '../utils/nuxeo_utils';
import TreeNode from '../tree_node/tree_node';
import DocumentStore from '../data/document_store';

export const SET_CURRENT_NODE = "SET_CURRENT_NODE";
export const SET_ROOT_NODE = "SET_ROOT_NODE";
export const ADD_CHILD_NODES = "ADD_CHILD_NODES";


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




const TreeActions = {
    deleteDocument(node){
        let path = node.item.uid;
        let success = (doc) => {
            DocumentStore.deleteChild(node.parent, node);
        };
       NuxeoUtils.crudUtil({
           method: "delete",
           path: path,
           success: success
       });
    },

    createDocument(node, doc, success){
        let finalDoc = {
            "entity-type": "document",
            "name":`${doc.title}`,
            "type": `${doc.type}`,
        };

        let path = node.item.uid;
        NuxeoUtils.crudUtil({
            method: "create",
            path: path,
            data: finalDoc,
            success: success

        });
    },

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
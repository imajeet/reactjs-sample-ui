import { connect } from 'react-redux';
import { setCurrentNode, setRootNode, fetchChildren } from '../../actions/tree_actions';
import { flashErrors } from '../../actions/error_actions';

import FileTree from './file_tree.jsx';
import MainView from './main_view.jsx';
import RightMainView from './right_main_view';
import AttachFile from './right_main_view_components/attach_file';
import CreateDocumentForm from './right_main_view_components/create_document_form';
import EditDocument from './right_main_view_components/edit_document';
import FileView from './right_main_view_components/file_view';
import FolderView from './right_main_view_components/folder_view';
import ShowACL from './right_main_view_components/show_acl';
import ShowAudit from './right_main_view_components/show_audit';
import ShowTask from './right_main_view_components/show_task';
import ShowWorkFlow from './right_main_view_components/show_workflow';

const mapStateToProps = ({ fileTree }) => ({
    fileTree: fileTree
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentNode: (node) => dispatch(setCurrentNode(node)),
    flashErrors: (errors) => dispatch(flashErrors(errors)),
    setRootNode: (rootNode) => dispatch(setRootNode(rootNode)),
    dispatch: (action) => dispatch(action),
    fetchChildren: (parentNode) => dispatch(fetchChildren(parentNode))
});


export var DocumentViewContainers = [
    MainView,
    RightMainView,
    FileView,
    FolderView,
].reduce((acc, component) => {
    acc[`${component.name}Container`] = connect(mapStateToProps, mapDispatchToProps)(component);
    return acc;
}, {});




import React from 'react';
import { fetchChildren } from '../../actions/tree_actions';
import DocumentTypeConstants from '../../constants/document_type_constants';

class FileTree extends React.Component {
  constructor(props) {
    super(props);
  }

  _showChildren(e) {
    e.stopPropagation();
    let node = this.props.node;
    if (node.showChildren && node === this.props.currentNode) {
      node.showChildren = false;
    } else {
      node.showChildren = true;
      if (Object.keys(node.children).length === 0){
        this.props.dispatch(fetchChildren(node))
      }
      this.props.setCurrentNode(node);
    }
    this.forceUpdate();
  }

  render() {
    let workingNode = this.props.currentNode;
    let node = this.props.node;
    let containers = DocumentTypeConstants.containers.concat(DocumentTypeConstants.defaultContainers);
    let subFiles;
    let showChildren;
    let highlightWorking;
    if (workingNode === node) {
      highlightWorking = 'highlight-working';
    }

    if (node.showChildren) {
      let keys = Object.keys(node.children);
      if (containers.includes(node.item.type)) {
        showChildren = 'show-children';
      }
      subFiles = keys.map((childId) => {
        return (
          <li key={childId}>
            <FileTree
                node={node.children[childId]}
                setCurrentNode={this.props.setCurrentNode}
                currentNode={this.props.currentNode}
                dispatch={this.props.dispatch}
            />
          </li>
        );
      });
    }

    let title;
    if (node.item.type === 'Root') {
      title = "Root";
    } else {
      title = node.item.title;
    }
    return (
      <div className={`file-tree-view`} >
           <div className="file-tree-title-wrapper" onClick={this._showChildren.bind(this)}>
             <div className={`${node.item.type} ${showChildren}`}></div>
             <div className={`file-tree-title ${highlightWorking}`} >
               {title}
             </div>
           </div>
        <ul>
          {subFiles}
        </ul>
      </div>
    );
  }
}

export default FileTree

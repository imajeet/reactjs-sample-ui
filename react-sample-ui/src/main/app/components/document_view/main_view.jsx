import React from 'react';
// store
import DocumentStore from '../../data/document_store.js';
// components



//containers
import { FileTreeContainer, RightMainViewContainer } from './document_view_container';

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: DocumentStore.getUser(),
    };
  }

  componentDidMount() {
    this.props.setRootNode();
  }

  render() {
    let tree;
    let workingNode;
    let currentNode = this.props.fileTree.currentNode;
    if (this.props.fileTree.root.item) {
      tree = (
        <FileTreeContainer
            node={this.props.fileTree.root}
            setCurrentNode={this.props.setCurrentNode}
            currentNode={currentNode}
            dispatch={this.props.dispatch}
        />
      );
    }

    if (currentNode.item) {
      workingNode = <RightMainViewContainer/>;
    }

    return (
      <div className="main-wrapper">
        <div className="side-panel-wrapper">
          <div className="side-panel-profile">
            {this.state.user.id}
          </div>
          {tree}
        </div>
        <div className="right-main-view-wrapper">
          {workingNode}
        </div>
      </div>
    );
  }
}

export default MainView;

import React from 'react';
import TreeActions from '../../../actions/tree_actions.js';

class ShowWorkFlow extends React.Component {
    constructor(props){
        super(props);
        TreeActions.getworkflow(this.props.currentNode);
    }

    render() {
        let node = this.props.currentNode;
        let string = JSON.stringify(node.workflow);
        return (
            <div className="right-main-view-show-working-button">
                {string}
            </div>
        )
    }
}

module.exports = ShowWorkFlow;
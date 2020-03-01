import { observer } from "mobx-react";
import { NodeStore } from "../../stores/NodeStore";
import "./NodeView.scss";
import React = require("react");

interface IProps {
    store: NodeStore;
}

@observer
export class TopBar extends React.Component<IProps> {

    private _isPointerDown = false;
    public _showLinkButton = document.getElementById("showlink");


    constructor(props){
        super(props);
        this.removeNode = this.removeNode.bind(this);
        this.linkNode = this.linkNode.bind(this);
        this.showLink = this.showLink.bind(this);
        this.state = {isLinked: false}

    }

    onPointerDown = (e: React.PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        this._isPointerDown = true;

        this.props.store.Collection.Nodes.forEach(node => {
            node.zIndex = 1000;
        });
        this.props.store.zIndex = 2000;

        document.removeEventListener("pointermove", this.onPointerMove);
        document.addEventListener("pointermove", this.onPointerMove);
        document.removeEventListener("pointerup", this.onPointerUp);
        document.addEventListener("pointerup", this.onPointerUp);
    }

    onPointerUp = (e: PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        this._isPointerDown = false;
        document.removeEventListener("pointermove", this.onPointerMove);
        document.removeEventListener("pointerup", this.onPointerUp);
    }

    onPointerMove = (e: PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        if (!this._isPointerDown) {
            return;
        }
        this.props.store.X += e.movementX;
        this.props.store.Y += e.movementY;
    }

    removeNode (e: React.MouseEvent<HTMLInputElement>) {
        //getting rid of the node from all its linked node's linked node list
        this.props.store.LinkedNodes.forEach(node => {
            for( var i = 0; i < node.LinkedNodes.length; i++){ 
                if (node.LinkedNodes[i] == this.props.store) {
                    node.LinkedNodes.splice(i, 1); 
                }
            }
        });
        this.props.store.Collection.RemoveNodes(this.props.store);
    }

    linkNode (e: React.MouseEvent<HTMLInputElement>) {

        if (this.props.store.Linkable == "LINK"){
            this.props.store.Collection.CreateLink(this.props.store);
        } else if (this.props.store.Linkable == "UNLINK"){
            this.props.store.Collection.UnLink();
        }

        if (this.props.store.Collection.Link.length == 1 && this.props.store.Collection.Link[0] == this.props.store){
            this.props.store.Linkable = "UNLINK";
        }

    }

    showLink (e: React.MouseEvent<HTMLInputElement>) {
        if (this.props.store.LinkedNodes.length != 0) {
            this.props.store.Collection.ShowLink(this.props.store);
        }
    }

    render() {
        let store = this.props.store;
        return (
        <div className="top" style = {{background: store.barColor}} onPointerDown={this.onPointerDown}>
            <button id = "link_node" className = "linkButton" onClick = {this.linkNode.bind(this)}>{store.Linkable}</button>
            <button id = "showlink" className = "showLinkButton" onClick = {this.showLink.bind(this)}>ShowLink</button>
            <button className = "exitButton" onClick = {this.removeNode.bind(this)}>×</button>
        </div>
        
        );
    }
}

import { observer } from "mobx-react";
import { NodeCollectionStore } from "../../stores/NodeCollectionStore";
import { CollectionNodeStore } from "../../stores/CollectionNodeStore";
import { FreeFormCanvas } from "../freeformcanvas/FreeFormCanvas";
import { TopBar } from "./TopBar";
import React = require("react");
import "./NodeView.scss";

export interface IProps {
    store: CollectionNodeStore;
}

@observer
export class CollectionNodeView extends React.Component<IProps> {

    constructor(props) {
        super(props)
        this.bringToFront = this.bringToFront.bind(this)
    }

    bringToFront = (e: React.PointerEvent): void => {
        e.stopPropagation();
        this.props.store.Collection.Nodes.forEach(node => {
            node.zIndex = 1000;
        });
        this.props.store.zIndex = 2000;
    }

    render() {
        let store = this.props.store;
        return (
            <div className="node text-node" style={{ transform: store.Transform, zIndex: store.zIndex, height: store.Height, width: store.Width }}onPointerDown={this.bringToFront} >
                <TopBar store={store}/>
                <div className="scroll-box">
                    <div className="content">
                        <FreeFormCanvas store={new NodeCollectionStore()} />                    
                    </div>
                </div>
            </div>
        );
    }
}
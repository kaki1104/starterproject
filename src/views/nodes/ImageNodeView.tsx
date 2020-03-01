import { observer } from "mobx-react";
import { ImageNodeStore } from "../../stores/ImageNodeStore";
import { TopBar } from "./TopBar";
import React = require("react");
import "./NodeView.scss";
import "./VideoNodeView.scss";

interface IProps {
    store: ImageNodeStore;
}

@observer
export class ImageNodeView extends React.Component<IProps> {

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
            <div className="node text-node" style={{ transform: store.Transform, zIndex: store.zIndex, height: store.Height, width: store.Width}}onPointerDown={this.bringToFront} >
                <TopBar store={store} />
                <div className="scroll-box">
                    <div className="content">
                        <h3 className="title">{store.Title}</h3>
                        <img src={store.Url} alt="Andy"/>
                    </div>
                </div>
            </div>
        );
    }
}
import { observer } from "mobx-react";
import { VideoNodeStore } from "../../stores/VideoNodeStore";
import "./NodeView.scss";
import { TopBar } from "./TopBar";
import "./VideoNodeView.scss";
import React = require("react");

interface IProps {
    store: VideoNodeStore; 
}

@observer
export class VideoNodeView extends React.Component<IProps> {

    constructor(props) {
        super(props)
        this.bringToFront = this.bringToFront.bind(this)
    }

    bringToFront = (e: React.PointerEvent): void => {
        e.stopPropagation();
        this.props.store.Collection.BringToFront(this.props.store);
    }

    render() {
        let store = this.props.store;
        return (
            <div className="node text-node" style={{ transform: store.Transform, zIndex: store.zIndex, height: store.Height, width: store.Width }}onPointerDown={this.bringToFront} >
                <TopBar store={store} />
                <div className="scroll-box">
                    <div className="content">
                        <h3 className="title">{store.Title}</h3>
                        <video src={store.Url} controls />
                    </div>
                </div>
            </div>
        );
    }
}
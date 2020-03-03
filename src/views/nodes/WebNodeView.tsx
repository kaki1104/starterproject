import { observer } from "mobx-react";
import { WebNodeStore } from "../../stores/WebNodeStore";
import { TopBar } from "./TopBar";
import React = require("react");
import "./NodeView.scss";

interface IProps {
    store: WebNodeStore; 
}

@observer
export class WebNodeView extends React.Component<IProps> {

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
                        <iframe name="Framename" src={store.Url} width="400" 
                                height="200" scrolling="auto" className="frame-area" allowFullScreen>
                        </iframe>
                    </div>
                </div>
            </div>
        );
    }
}
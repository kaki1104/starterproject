import { observer } from "mobx-react";
import { NodeCollectionStore } from "../../stores/NodeCollectionStore";
import { StaticTextNodeStore } from "../../stores/StaticTextNodeStore";
import { VideoNodeStore } from "../../stores/VideoNodeStore";
import { ImageNodeStore } from "../../stores/ImageNodeStore";
import { WebNodeStore } from "../../stores/WebNodeStore";
import { PDFNodeStore } from "../../stores/PDFNodeStore";
import { TextNodeView } from "../nodes/TextNodeView";
import { VideoNodeView } from "../nodes/VideoNodeView";
import { ImageNodeView } from "../nodes/ImageNodeView";
import { WebNodeView } from "../nodes/WebNodeView";
import { PDFNodeView } from "../nodes/PDFNodeView";
import { CollectionNodeView } from "../nodes/CollectionNodeView";
import { CollectionNodeStore } from "../../stores/CollectionNodeStore";
import "./FreeFormCanvas.scss";
import React = require("react");

interface IProps {
    store: NodeCollectionStore
}

@observer
export class NodeContainer extends React.Component<IProps> {

    render() {
        return (
            <div className="node-container" style={{display:'grid', gridTemplateColumns: '1fr 1fr'}}>
                {this.props.store.Nodes.map(nodeStore => {
                    if (nodeStore instanceof StaticTextNodeStore) {
                        return (<TextNodeView key={nodeStore.Id} store={nodeStore as StaticTextNodeStore} />)
                    } else if (nodeStore instanceof VideoNodeStore) {
                        return (<VideoNodeView key={nodeStore.Id} store={nodeStore as VideoNodeStore} />)
                    } else if (nodeStore instanceof ImageNodeStore) {
                        return (<ImageNodeView key={nodeStore.Id} store={nodeStore as ImageNodeStore} />)
                    } else if (nodeStore instanceof WebNodeStore) {
                        return (<WebNodeView key={nodeStore.Id} store={nodeStore as WebNodeStore} />)
                    } else if (nodeStore instanceof PDFNodeStore) {
                        return (<PDFNodeView key={nodeStore.Id} store={nodeStore as PDFNodeStore} />)
                    } else if (nodeStore instanceof CollectionNodeStore) {
                        return (<CollectionNodeView key={nodeStore.Id} store={nodeStore as NodeCollectionStore} />)
                    }
                })}
            </div>
        );
    }
}
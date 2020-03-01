import { observer } from "mobx-react";
import { PDFNodeStore } from "../../stores/PDFNodeStore";
import { TopBar } from "./TopBar";
import { Document, Page } from 'react-pdf';
import React = require("react");
import "./NodeView.scss";

interface IProps {
    store: PDFNodeStore;
}

@observer
export class PDFNodeView extends React.Component<IProps> {

    constructor(props) {
        super(props)
        this.bringToFront = this.bringToFront.bind(this)
    }


    state = {
        numPages: null,
        pageNumber: 1,
    }

    bringToFront = (e: React.PointerEvent): void => {
        e.stopPropagation();
        this.props.store.Collection.Nodes.forEach(node => {
            node.zIndex = 1000;
        });
        this.props.store.zIndex = 2000;
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    }


    render() {
        const { pageNumber } = this.state;
        let store = this.props.store;
        return (
            <div className="node text-node" style={{ transform: store.Transform, zIndex: store.zIndex, height: store.Height, width: store.Width }}onPointerDown={this.bringToFront} >
                <TopBar store={store}/>
                <div className="scroll-box">
                    <div className="content">
                        <h3 className="title">{store.Title}</h3>
                        <Document file = {store.Url}
                        onLoadSuccess={this.onDocumentLoadSuccess}>
                            <Page pageNumber={pageNumber} />
                        </Document>
                    </div>
                </div>
            </div>
        );
    }
}
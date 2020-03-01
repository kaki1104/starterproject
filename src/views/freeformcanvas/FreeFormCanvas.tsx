import { observer } from "mobx-react";
import { NodeCollectionStore } from "../../stores/NodeCollectionStore";
import { NodeContainer } from "./NodeContainer";
import { StaticTextNodeStore } from '../../stores/StaticTextNodeStore';
import { VideoNodeStore } from '../../stores/VideoNodeStore';
import { ImageNodeStore } from '../../stores/ImageNodeStore';
import { WebNodeStore } from '../../stores/WebNodeStore';
import { PDFNodeStore } from '../../stores/PDFNodeStore';
import { CollectionNodeStore } from "../../stores/CollectionNodeStore";
import React = require("react");
import "./FreeFormCanvas.scss";

interface IProps {
    store: NodeCollectionStore
}

let nodes = []

@observer
export class FreeFormCanvas extends React.Component<IProps> {

    private _isPointerDown: boolean;

    constructor(props){
        super(props);
        this.addTextNode= this.addTextNode.bind(this);
        this.addVideoNode= this.addVideoNode.bind(this);
        this.addImageNode= this.addImageNode.bind(this);
        this.addWebNode= this.addWebNode.bind(this);
        this.addPDFNode= this.addPDFNode.bind(this);
        this.addCollectionNode= this.addCollectionNode.bind(this);
        this.gridView = this.gridView.bind(this);
        this.clearNodes = this.clearNodes.bind(this);
        this.zoomDefault = this.zoomDefault.bind(this);
        this.zoomIn = this.zoomIn.bind(this);
        this.zoomOut = this.zoomOut.bind(this);
        this.showAllLinks = this.showAllLinks.bind(this);
    }

    onPointerDown = (e: React.PointerEvent): void => {
        e.stopPropagation();
        e.preventDefault();
        this._isPointerDown = true;
        this.props.store.Nodes.forEach(node => {
            node.barColor = "#E98074";
        });
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

    onWheel = (e: React.WheelEvent): void => {
        e.stopPropagation();
        if (e.deltaY < 0 && this.props.store.Scale >= 0.1){
            this.props.store.Scale -= 0.01
        }else if (e.deltaY > 0 && this.props.store.Scale <= 3){
            this.props.store.Scale += 0.01
        }
    }

    addTextNode (e: React.MouseEvent<HTMLInputElement>) {
        nodes.push(new StaticTextNodeStore({ X: Math.random() * 300, Y: Math.random() * 300, Collection: this.props.store, Title: "Text Node Title", Text: "Some text :))" }));
        this.props.store.AddNodes(nodes);
        nodes = [];
    }

    addVideoNode (e: React.MouseEvent<HTMLInputElement>) {
        nodes.push(new VideoNodeStore({ X: Math.random() * 300, Y: Math.random() * 300, Collection: this.props.store, Title: "Video Node Title", Url: "http://cs.brown.edu/people/peichman/downloads/cted.mp4" }));
        this.props.store.AddNodes(nodes);
        nodes = [];
    }

    addImageNode (e: React.MouseEvent<HTMLInputElement>) {
        nodes.push(new ImageNodeStore({ X: Math.random() * 300, Y: Math.random() * 300, Collection: this.props.store, Title: "Image Node Title", Url: "https://cs.brown.edu/events/25th-anniversary/images/chairs/avd_2_now.jpg" }));        
        this.props.store.AddNodes(nodes);
        nodes = [];
    }

    addWebNode (e: React.MouseEvent<HTMLInputElement>) {
        nodes.push(new WebNodeStore({ X: Math.random() * 300, Y: Math.random() * 300, Collection: this.props.store, Title: "Web Title", Url: "https://bbc.com" }));        
        this.props.store.AddNodes(nodes);
        nodes = [];
    }

    addPDFNode (e: React.MouseEvent<HTMLInputElement>) {
        nodes.push(new PDFNodeStore({ X: Math.random() * 300, Y: Math.random() * 300, Collection: this.props.store, Title: "PDF Title", Url: "https://cs.brown.edu/courses/cs015/docs/CS15Missive2019.pdf" }));        
        this.props.store.AddNodes(nodes);
        nodes = [];
    }

    addCollectionNode (e: React.MouseEvent<HTMLInputElement>) {
        nodes.push(new CollectionNodeStore({ X: Math.random() * 300, Y: Math.random() * 300, Collection: this.props.store}));        
        this.props.store.AddNodes(nodes);
        nodes = [];
    }

    gridView (e: React.MouseEvent<HTMLInputElement>) {
        if (document.getElementById("grid-free").innerHTML == "Grid"){
            var i = 0;
            var x = window.innerWidth / 3
            var y = window.innerHeight / 2
            this.props.store.Nodes.forEach(node => {
                node.StoreX = node.X;
                node.StoreY = node.Y;
                node.StoreHeight = node.Height;
                node.StoreWidth = node.Width;
                node.X = (i%3) * x;
                node.Y = (Math.floor(i/3)) * y;
                node.Width = x;
                node.Height = y;
                i += 1;
                document.getElementById("grid-free").innerHTML = "Free";
            });
        } else if (document.getElementById("grid-free").innerHTML == "Free"){
            this.props.store.Nodes.forEach(node => {
                node.X = node.StoreX;
                node.Y = node.StoreY;
                node.Width = node.StoreWidth;
                node.Height = node.StoreHeight;
                document.getElementById("grid-free").innerHTML = "Grid";
            });
        }

    }

    clearNodes (e: React.MouseEvent<HTMLInputElement>) {
        this.props.store.Nodes.splice(0, this.props.store.Nodes.length); 
    }

    zoomDefault (e: React.MouseEvent<HTMLInputElement>) {
        this.props.store.Scale = 1;
    }

    zoomIn (e: React.MouseEvent<HTMLInputElement>) {
        if (this.props.store.Scale <= 3){
            this.props.store.Scale += 0.05
        }
    }

    zoomOut (e: React.MouseEvent<HTMLInputElement>) {
        if (this.props.store.Scale >= 0.1){
            this.props.store.Scale -= 0.05
        }
    }

    showAllLinks (e: React.MouseEvent<HTMLInputElement>) {
        this.props.store.ShowAllLinks();
    }

    render() {
        let store = this.props.store;
        return (
            <div id = "canvascont" className="freeformcanvas-container" onPointerDown={this.onPointerDown} onWheel={this.onWheel}>
                <div className="btn-group">
                    <button id = "textbutt" className ="textNodeButton" onClick={this.addTextNode}>Text</button>
                    <button className ="videoNodeButton" onClick={this.addVideoNode}>Video</button>
                    <button className ="imageNodeButton" onClick={this.addImageNode}>Image</button>
                    <button className ="webNodeButton" onClick={this.addWebNode}>Website</button>
                    <button className ="pdfNodeButton" onClick={this.addPDFNode}>PDF</button>
                    <button className ="collectionNodeButton" onClick={this.addCollectionNode}>Collection</button>
                    <button className ="showAllLinks" onClick={this.showAllLinks}>Links</button>
                    <button id = "grid-free" className ="gridView" onClick={this.gridView}>Grid</button>
                    <button className ="clearNodes" onClick={this.clearNodes}>Clear</button>
                    <button id = "zoom-default" className ="defaultscale" onClick={this.zoomDefault}>Default</button>
                    <button id = "zoom-in" className ="zoomIn" onClick={this.zoomIn}>+</button>
                    <button id = "zoom-out" className ="zoomOut" onClick={this.zoomOut}>-</button>
                </div>
                <div className="freeformcanvas" style={{transform: store.Transform }}>
                    <NodeContainer store={store} />
                </div>
            </div>
        );
    }
}

import { observer } from "mobx-react";
import { StaticTextNodeStore } from "../../stores/StaticTextNodeStore";
import { TopBar } from "./TopBar";
import React = require("react");
import ReactQuill, {Quill} from 'react-quill';
import "./NodeView.scss";
import 'react-quill/dist/quill.snow.css';


interface IProps {
    store: StaticTextNodeStore;
}

interface IState {
    text: string;
}

@observer
export class TextNodeView extends React.Component<IProps, IState> {

    _isPointerDown = false;

    constructor(props) {
        super(props)
        this.state = {text: '' } // You can also pass a Quill Delta here
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(value) {
        this.setState({text: value })
    }

    bringToFront = (e: React.PointerEvent): void => {
        e.stopPropagation();
        this.props.store.Collection.BringToFront(this.props.store);
    }

    render() {
        let store = this.props.store;
        return (
            <div className= "node text-node" style={{transform: store.Transform, zIndex: store.zIndex, height: store.Height, width: store.Width}} onPointerDown={this.bringToFront} >
                <TopBar store={store} />
                <div className="scroll-box">
                    <div className="content">
                        <h3 className="title">{store.Title} </h3>
                        <ReactQuill className = "textEditor" value={this.state.text} onChange={this.handleChange}/>
                    </div>
                </div>
            </div>
        );
    }
}
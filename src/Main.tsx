import * as React from 'react';
import * as ReactDOM from 'react-dom';
import "./Main.scss";
import { NodeCollectionStore } from './stores/NodeCollectionStore';
import { RootStore } from './stores/RootStore';
import { FreeFormCanvas } from './views/freeformcanvas/FreeFormCanvas';


export const mainNodeCollection = new NodeCollectionStore();

ReactDOM.render((
    <div>
        <h1>Dash Web</h1>
        <FreeFormCanvas store={mainNodeCollection} />
    </div>), 

    document.getElementById('root')
    );

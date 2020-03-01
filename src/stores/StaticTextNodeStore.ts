import { observable } from "mobx";
import { NodeStore } from "./NodeStore";
import ReactQuill, { Quill } from 'react-quill';

export class StaticTextNodeStore extends NodeStore {

    constructor(initializer: Partial<StaticTextNodeStore>) {
        super();
        Object.assign(this, initializer);
    }

    @observable
    public Title: string = "";

    @observable
    public Text: string = "";
}
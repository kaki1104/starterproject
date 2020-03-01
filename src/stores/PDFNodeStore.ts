import { observable } from "mobx";
import { NodeStore } from "./NodeStore";

export class PDFNodeStore extends NodeStore {

    constructor(initializer: Partial<PDFNodeStore>) {
        super();
        Object.assign(this, initializer);
    }

    @observable
    public Title: string;

    @observable
    public Url: string;

}
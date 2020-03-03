import { observable } from "mobx";
import { NodeStore } from "./NodeStore";

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
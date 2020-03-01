import { observable } from "mobx";
import { NodeStore } from "./NodeStore";

export class WebNodeStore extends NodeStore {

    constructor(initializer: Partial<WebNodeStore>) {
        super();
        Object.assign(this, initializer);
    }

    @observable
    public Title: string;

    @observable
    public Url: string;

}
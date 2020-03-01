import { observable } from "mobx";
import { NodeStore } from "./NodeStore";

export class CollectionNodeStore extends NodeStore {

    constructor(initializer: Partial<CollectionNodeStore>) {
        super();
        Object.assign(this, initializer);
    }
}
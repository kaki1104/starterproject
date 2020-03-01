import { computed, observable, action } from "mobx";
import { Utils } from "../Utils";
import {NodeCollectionStore} from "./NodeCollectionStore";

export class NodeStore {

    public Id: string = Utils.GenerateGuid();

    @observable
    public X: number = 0;

    @observable
    public Y: number = 0;

    @observable
    public Width: number = 300;

    @observable
    public Height: number= 300;

    @observable
    public StoreX: number;

    @observable
    public StoreY: number;

    @observable
    public StoreWidth: number;

    @observable
    public StoreHeight: number;

    @observable 
    public zIndex: number = 1000;

    @observable
    public barColor: string = "#E98074";

    @observable
    public Collection: NodeCollectionStore;

    @observable
    public LinkedNodes: NodeStore[] = new Array<NodeStore>();

    @observable
    public Linkable: string = "LINK";

    @computed
    public get Transform(): string {
        return "translate(" + this.X + "px, " + this.Y + "px)";
    }
}
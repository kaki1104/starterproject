import { computed, observable, action } from "mobx";
import { NodeStore } from "./NodeStore";

export class NodeCollectionStore extends NodeStore {

    constructor() {
        super();
    }

    @observable
    public Scale: number = 1;

    @observable
    public Nodes: NodeStore[] = new Array<NodeStore>();

    @observable
    public Link: NodeStore[] = new Array<NodeStore>();

    @observable
    public LinkList: Array<NodeStore>[] = new Array<Array<NodeStore>>();

    @computed
    public get Transform(): string {
        return "translate(" + this.X + "px," + this.Y + "px) scale(" + this.Scale + "," + this.Scale + ")";
    }

    @action
    public CreateLink(store: NodeStore): void {
        if (this.Link.length == 0){
            this.Link.push(store);
        }else if (this.Link.length == 1){
            this.Link.push(store);
            this.Link[0].LinkedNodes.push(this.Link[1])
            this.Link[0].Linkable = "LINK";
            this.Link[1].LinkedNodes.push(this.Link[0])

            this.LinkList.push(this.Link);
            this.Link = []
        }
        console.log("The link list: "+ this.LinkList)
        // console.log("First element of linked list: "+ this.LinkList[0])
    }

    @action
    public UnLink(): void {
        this.Link[0].Linkable = "LINK";
        this.Link = [];
    }

    @action
    public ShowLink(store: NodeStore): void {
        let randColor = this.getRandomColor();
        store.barColor = randColor
        store.zIndex = 3000;
        store.LinkedNodes.forEach(node => {
            let randnum = Math.floor(Math.random() * (100)) + 50;
            node.X = store.X + randnum;
            node.Y = store.Y + randnum;
            node.barColor = randColor;
            node.zIndex = 2500;
        });
    }

    @action
    public ShowAllLinks(): void {
        this.LinkList.forEach(link => {
            this.ShowLink(link[0]);
        });
    }

    public getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    @action
    public AddNodes(stores: NodeStore[]): void {
        stores.forEach(store => this.Nodes.push(store));
        console.log(this.Nodes);
    }

    @action
    public RemoveNodes(store: NodeStore): void {
        //removing all link that contains the node
        for( var i = 0; i < this.LinkList.length; i++){ 
            if (this.LinkList[i][0] == store || this.LinkList[i][1] == store){
                this.LinkList.splice(i,1);
            }
        }
        //removing the node from the collection
        for( var i = 0; i < this.Nodes.length; i++){ 
            if (this.Nodes[i] === store) {
              this.Nodes.splice(i, 1); 
            }
        }
    }


}
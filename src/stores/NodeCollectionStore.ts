import { computed, observable, action } from "mobx";
import { NodeStore } from "./NodeStore";
import { SELECTED_NODE_ZINDEX, BACKGROUND_NODE_ZINDEX, LINKED_NODE_ZINDEX, MIN_LINK_POS, MAX_LINK_POS } from "../Constants";

export class NodeCollectionStore extends NodeStore {

    constructor() {
        super();
    }

    @observable
    public Scale: number = 1;

    @observable
    public Nodes: NodeStore[] = new Array<NodeStore>();

    @observable //array that stores a pair of nodes
    public Link: NodeStore[] = new Array<NodeStore>();

    @observable //array that stores pairs of nodes
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
            //keeping track of linked nodes for individual nodes as well
            this.Link[0].LinkedNodes.push(this.Link[1])
            this.Link[0].Linkable = "LINK";
            this.Link[1].LinkedNodes.push(this.Link[0]) 
            this.LinkList.push(this.Link); //pushing the pair to the list of links
            this.Link = []
        }
    }

    @action
    public UnLink(): void {
        this.Link[0].Linkable = "LINK";
        this.Link = [];
    }

    @action
    public ShowLink(store: NodeStore): void {
        //assign a random color to a pair so that you can see the link visually
        let randColor = this.getRandomColor();
        store.barColor = randColor
        store.zIndex = LINKED_NODE_ZINDEX;
        store.LinkedNodes.forEach(node => {
            let randnum = Math.floor(Math.random() * (MAX_LINK_POS-MIN_LINK_POS))+MIN_LINK_POS;
            node.X = store.X + randnum;
            node.Y = store.Y - randnum;
            node.barColor = randColor;
            node.zIndex = SELECTED_NODE_ZINDEX -randnum;
        });
    }

    @action
    public ShowAllLinks(): void {
        this.LinkList.forEach(link => {
            this.ShowLink(link[0]);
        });
    }

    //function that generates a random color
    public getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    //adding nodes to the collection
    @action
    public AddNodes(stores: NodeStore[]): void {
        stores.forEach(store => this.Nodes.push(store));
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

    @action
    public BringToFront(store: NodeStore): void {
        this.Nodes.forEach(node => {
            node.zIndex = BACKGROUND_NODE_ZINDEX;
        });
        store.zIndex = SELECTED_NODE_ZINDEX;
    }


}
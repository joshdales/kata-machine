interface Node<T> {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
}

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    prepend(item: T): void {
        const node: Node<T> = { value: item, next: this.head };
        this.length++;

        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        this.head.prev = node;
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            throw new Error("uh oh! something has gone wrong");
        } else if (idx === this.length) {
            this.append(item);
            return;
        } else if (idx === 0) {
            this.prepend(item);
            return;
        }
        this.length++;

        const curr = this.getNodeAt(idx) as Node<T>;
        const node: Node<T> = { value: item, next: curr, prev: curr?.prev };

        if (node.next) {
            node.next.prev = node;
        }

        if (node.prev) {
            node.prev.next = node;
        }
    }

    append(item: T): void {
        const node: Node<T> = { value: item, prev: this.tail };
        this.length++;

        if (!this.tail) {
            this.tail = this.head = node;
            return;
        }

        this.tail.next = node;
        this.tail = node;
    }

    remove(item: T): T | undefined {
        let curr = this.head;
        for (let i = 0; curr && i < this.length; ++i) {
            if (curr.value === item) {
                break;
            }
            curr = curr.next;
        }

        if (!curr) {
            return;
        }

        return this.removeNode(curr);
    }

    get(idx: number): T | undefined {
        return this.getNodeAt(idx)?.value;
    }

    removeAt(idx: number): T | undefined {
        const node = this.getNodeAt(idx);
        if (!node) {
            return;
        }

        return this.removeNode(node);
    }

    private getNodeAt(idx: number): Node<T> | undefined {
        let curr = this.head;
        for (let i = 0; curr && i < idx; ++i) {
            curr = curr.next;
        }

        return curr;
    }

    private removeNode(node: Node<T>): T {
        this.length--;
        if (this.length === 0) {
            this.head = this.tail = undefined;
            return node.value;
        }

        if (node?.next) {
            node.next.prev = node.prev;
        }

        if (node?.prev) {
            node.prev.next = node.next;
        }

        if (node === this.head) {
            this.head = node.next;
        }

        if (node === this.tail) {
            this.tail = node.prev;
        }

        node.prev = node.next = undefined;

        return node.value;
    }
}

interface Node<T> {
    value: T;
    next?: Node<T>;
}

export default class SinglyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    prepend(item: T): void {
        this.length++;
        const node = { value: item, next: this.head };
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            throw new Error("uh oh");
        } else if (idx === 0) {
            this.prepend(item);
            return;
        } else if (idx === this.length) {
            this.append(item);
            return;
        }

        const [prev, curr] = this.getNodeAt(idx);

        if (!curr) {
            return;
        }

        const node = { value: item, next: curr.next };

        if (prev) {
            prev.next = node;
        }

        this.length++;
    }

    append(item: T): void {
        this.length++;
        const node = { value: item };
        if (!this.tail) {
            this.tail = this.head = node;
        }

        this.tail.next = node;
        this.tail = node;
    }

    remove(item: T): T | undefined {
        let prev = this.head;
        let curr = this.head;
        for (let i = 0; curr && i < this.length; ++i) {
            if (curr.value === item) {
                break;
            }
            prev = curr;
            curr = curr.next;
        }

        if (!curr) {
            return;
        }

        return this.removeNode(curr, prev);
    }

    get(idx: number): T | undefined {
        const [_, curr] = this.getNodeAt(idx);

        return curr?.value;
    }

    removeAt(idx: number): T | undefined {
        const [prev, curr] = this.getNodeAt(idx);
        if (!curr) {
            return;
        }

        return this.removeNode(curr, prev);
    }

    getNodeAt(idx: number): [Node<T> | undefined, Node<T> | undefined] {
        let prev = this.head;
        let curr = this.head;
        for (let i = 0; curr && i < idx; ++i) {
            prev = curr;
            curr = curr.next;
        }

        return [prev, curr];
    }

    private removeNode(
        node: Node<T>,
        prev: Node<T> | undefined,
    ): T | undefined {
        this.length--;
        if (this.length === 0) {
            this.head = this.tail = undefined;
            return node.value;
        }

        if (this.head === node) {
            this.head = node.next;
        }

        if (this.tail === node) {
            this.tail = prev;
        }

        if (prev) {
            prev.next = node.next;
        }

        return node.value;
    }
}

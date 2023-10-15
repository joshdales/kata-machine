interface Node<T> {
    value: T;
    prev?: Node<T>;
}

export default class Stack<T> {
    public length: number;
    private head?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
    }

    push(item: T): void {
        const node = { value: item } as Node<T>;
        this.length++;

        if (!this.head) {
            this.head = node;

            return;
        }

        node.prev = this.head;
        this.head = node;
    }

    pop(): T | undefined {
        if (!this.head) {
            return undefined;
        }

        this.length = Math.max(0, this.length - 1);
        const head = this.head;
        this.head = head.prev;

        return head.value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}

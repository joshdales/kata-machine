export default class MinHeap {
    public length: number;
    private data: number[];

    constructor() {
        this.length = 0;
        this.data = [];
    }

    insert(value: number): void {
        this.data[this.length] = value;
        this.heapifyUp(this.length);
        this.length++;
    }

    delete(): number {
        if (this.length === 0) {
            return -1;
        }
        const out = this.data[0];
        this.length--;

        if (this.length === 1) {
            this.data = [];
            return out;
        }

        this.data[0] = this.data[this.length];
        this.heapifyDown(0);

        return out;
    }

    private heapifyUp(idx: number): void {
        if (idx === 0) {
            return;
        }

        const p = this.parent(idx);
        const v = this.data[idx];
        const parentValue = this.data[p];

        if (parentValue > v) {
            this.data[idx] = parentValue;
            this.data[p] = v;
            this.heapifyUp(p);
        }
    }

    private heapifyDown(idx: number): void {
        const lIdx = this.leftChild(idx);
        if (idx >= this.length || lIdx >= this.length) {
            return;
        }
        const rIdx = this.rightChild(idx);
        const lValue = this.data[lIdx];
        const rValue = this.data[rIdx];
        const v = this.data[idx];

        if (lValue > rValue && v > rValue) {
            this.data[idx] = rValue;
            this.data[rIdx] = v;
            this.heapifyDown(rIdx);
        } else if (rValue > lValue && v > lValue) {
            this.data[idx] = lValue;
            this.data[lIdx] = v;
            this.heapifyDown(lIdx);
        }
    }

    /**
     * Get the index of the parent for a node.
     * @param idx index of current item
     * @returns index of the parent item
     */
    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }

    private leftChild(idx: number): number {
        return idx * 2 + 1;
    }

    private rightChild(idx: number): number {
        return idx * 2 + 2;
    }
}

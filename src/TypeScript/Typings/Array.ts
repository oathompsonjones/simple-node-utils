Array.prototype.filterByCount = function (this: any[], occurances: number): any[] {
    const arr: any[] = [];
    this.forEach((value: any) => {
        if (this.getCount(value) === occurances) {
            arr.push(value);
        }
    });
    return arr;
};

Array.prototype.getModes = function (this: any[]): any[] {
    if (this.length === 0) return [];

    const modeMap: any = {};
    let maxCount: number = 1;
    let modes: any[] = [];

    for (const element of this) {
        if (!modeMap[element.id ? element.id : element]) modeMap[element.id ? element.id : element] = 1;
        else modeMap[element.id ? element.id : element]++;

        if (modeMap[element.id ? element.id : element] > maxCount) {
            modes = [element];
            maxCount = modeMap[element.id ? element.id : element];
        } else if (modeMap[element.id ? element.id : element] === maxCount) {
            modes.push(element);
            maxCount = modeMap[element.id ? element.id : element];
        }
    }

    return modes;
};

Array.prototype.getCount = function (this: any[], value: any): number {
    let valueCount: number = 0;
    this.forEach((arr) => {
        if (arr === value) valueCount++;
    });
    return valueCount;
};

Array.prototype.removeDuplicates = function (this: any[]): any[] {
    return [...new Set(this)];
};

Array.prototype.toListString = function (this: string[]): string {
    let string: string = "";

    for (let i = 0; i < this.length; i++) {
        string += this[i];
        if (i === this.length - 2) {
            string += " and ";
        } else if (i === this.length - 1) {
            string += ". ";
        } else {
            string += ", ";
        }
    }

    return string;
};

interface Array<T> {
    filterByCount(occurances: number): any[];
    getModes(): any[];
    getCount(value: any): number;
    removeDuplicates(): any[];
    toListString(): string;
}
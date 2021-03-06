import "../";

Date.prototype.getTimes = function (): { day: string; date: string; month: string; year: string; hours: string; minutes: string; seconds: string; milliseconds: string; } {
    const minutes: string = (this.getUTCMinutes() <= 9 ? `0${this.getUTCMinutes()}` : this.getUTCMinutes()).toString();
    const seconds: string = (this.getUTCSeconds() <= 9 ? `0${this.getUTCSeconds()}` : this.getUTCSeconds()).toString();
    const milliseconds: string = (this.getUTCMilliseconds() <= 9 ? `00${this.getUTCMilliseconds()}` : this.getUTCMilliseconds() <= 99 ? `0${this.getMilliseconds()}` : this.getUTCMilliseconds()).toString();
    const day: string = this.getUTCDay() === 0 ? "Sunday" : this.getUTCDay() === 1 ? "Monday" : this.getUTCDay() === 2 ? "Tuesday" : this.getUTCDay() === 3 ? "Wednesday" : this.getUTCDay() === 4 ? "Thursday" : this.getUTCDay() === 5 ? "Friday" : "Saturday";
    const time = { day, date: this.getUTCDate().toString(), month: (this.getUTCMonth() + 1).toString(), year: this.getUTCFullYear().toString(), hours: this.getUTCHours().toString(), minutes, seconds, milliseconds };
    return time;
};

Date.prototype.toUptimeString = function (times: ("y" | "mo" | "w" | "d" | "h" | "m" | "s" | "ms" | "full" | "clean")[] = []): string {
    const weeks: number = Math.floor((this.getUTCDate() - 1) / 7);
    if (!times.length) {
        if ((this.getUTCFullYear() - 1970) > 0) return `${this.getUTCFullYear() - 1970}y, ${this.getUTCMonth()}mo, ${weeks}w, ${(this.getUTCDate() - 1) % 7}d`;
        if (this.getUTCMonth() > 0) return `${this.getUTCMonth()}mo, ${weeks}w, ${(this.getUTCDate() - 1) % 7}d, ${this.getUTCHours()}h`;
        if (weeks > 0) return `${weeks}w, ${(this.getUTCDate() - 1) % 7}d, ${this.getUTCHours()}h`;
        if (((this.getUTCDate() - 1) % 7) > 0) return `${this.getUTCDate() - 1}d, ${this.getUTCHours()}h, ${this.getUTCMinutes()}m`;
        if (this.getUTCHours() > 0) return `${this.getUTCHours()}h, ${this.getUTCMinutes()}m, ${this.getUTCSeconds()}s`;
        if (this.getUTCMinutes() > 0) return `${this.getUTCMinutes()}m, ${this.getUTCSeconds()}s, ${this.getUTCMilliseconds()}ms`;
        if (this.getUTCSeconds() > 0) return `${this.getUTCSeconds()}s, ${this.getUTCMilliseconds()}ms`;
        return `${this.getUTCMilliseconds()}ms`;
    }
    const arr: string[] = [];
    const clean: boolean = times.includes("clean");
    if (times.includes("full")) times = ["y", "mo", "w", "d", "h", "m", "s", "ms"];
    if (times.includes("y") && (clean ? (this.getUTCFullYear() - 1970) > 0 : true)) arr.push(`${this.getUTCFullYear() - 1970}y`);
    if (times.includes("mo") && (clean ? this.getUTCMonth() > 0 : true)) arr.push(`${this.getUTCMonth()}mo`);
    if (times.includes("w") && (clean ? weeks > 0 : true)) arr.push(`${weeks}w`);
    if (times.includes("d") && (clean ? ((this.getUTCDate() - 1) % 7) > 0 : true)) arr.push(`${(this.getUTCDate() - 1) % 7}d`);
    if (times.includes("h") && (clean ? this.getUTCHours() > 0 : true)) arr.push(`${this.getUTCHours()}h`);
    if (times.includes("m") && (clean ? this.getUTCMinutes() > 0 : true)) arr.push(`${this.getUTCMinutes()}m`);
    if (times.includes("s") && (clean ? this.getUTCSeconds() > 0 : true)) arr.push(`${this.getUTCSeconds()}s`);
    if (times.includes("ms") && (clean ? this.getUTCMilliseconds() > 0 : true)) arr.push(`${this.getUTCMilliseconds()}ms`);
    return arr.join(", ");
};
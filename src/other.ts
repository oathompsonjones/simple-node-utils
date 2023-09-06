/**
 * Takes in an string representing an amount of time and returns the equivalent number of milliseconds.
 *
 * @example `"5m"` => 5 minutes => `300000`
 * @example `"1h,5m"` => 1 hour and 5 minutes => `3900000`
 * @param {string} str The string representation of an amount of time.
 * @returns {(number | null)} The number of milliseconds, or null if the input is invalid.
 */
export function parseTime(str: string): number | null {
    const regExp: { [time in "day" | "hour" | "millisecond" | "minute" | "month" | "second" | "week" | "year"]: RegExp } = {
        day: /(\d+)d(ay)?s?/igu,
        hour: /(\d+)h((ou)?r)?s?/igu,
        millisecond: /(\d+)m(illiseconds?|s)/igu,
        minute: /(\d+)m(in(ute)?s?)?/igu,
        month: /(\d+)mo(nth)?s?/igu,
        second: /(\d+)s(ec(ond)?)?s?/igu,
        week: /(\d+)w((ee)?k)?s?/igu,
        year: /(\d+)y((ea)?r)?s?/igu
    };
    const values: { [time in "day" | "hour" | "millisecond" | "minute" | "month" | "second" | "week" | "year"]: number } = {
        day: 24 * 60 * 60 * 1e3,
        hour: 60 * 60 * 1e3,
        millisecond: 1,
        minute: 60 * 1e3,
        month: 365.25 / 12 * 24 * 60 * 60 * 1e3,
        second: 1e3,
        week: 7 * 24 * 60 * 60 * 1e3,
        year: 365.25 * 24 * 60 * 60 * 1e3
    };

    const times: string[] = str.replace(/\s/gu, "").split(",");
    if (!times.some((time) => time.match(regExp.year) !== null ||
        time.match(regExp.month) !== null ||
        time.match(regExp.week) !== null ||
        time.match(regExp.day) !== null ||
        time.match(regExp.hour) !== null ||
        time.match(regExp.minute) !== null ||
        time.match(regExp.second) !== null ||
        time.match(regExp.millisecond) !== null))
        return null;

    let ms = 0;
    times.forEach((time) => {
        if (time.match(regExp.millisecond) !== null)
            ms += values.millisecond * parseInt(time.match(regExp.millisecond)?.[0] ?? "0", 10);
        else if (time.match(regExp.month) !== null)
            ms += values.month * parseInt(time.match(regExp.month)?.[0] ?? "0", 10);
        else if (time.match(regExp.minute) !== null)
            ms += values.minute * parseInt(time.match(regExp.minute)?.[0] ?? "0", 10);
        else if (time.match(regExp.second) !== null)
            ms += values.second * parseInt(time.match(regExp.second)?.[0] ?? "0", 10);
        else if (time.match(regExp.hour) !== null)
            ms += values.hour * parseInt(time.match(regExp.hour)?.[0] ?? "0", 10);
        else if (time.match(regExp.day) !== null)
            ms += values.day * parseInt(time.match(regExp.day)?.[0] ?? "0", 10);
        else if (time.match(regExp.week) !== null)
            ms += values.week * parseInt(time.match(regExp.week)?.[0] ?? "0", 10);
        else if (time.match(regExp.year) !== null)
            ms += values.year * parseInt(time.match(regExp.year)?.[0] ?? "0", 10);
    });
    return ms;
}

/**
 * A memoisation function to wrap around other functions.
 *
 * @template ArgsType The argument types of the function to be wrapped.
 * @template ReturnType The return type of the function to be wrapped.
 * @param {(...args: ArgsType[]) => ReturnType} func The function to be wrapped.
 * @param {Record<string, unknown>} [cache={}] The cache object, this should be ommitted in most cases.
 * @returns {(...args: ArgsType[]) => ReturnType} The same output as the wrapped function.
 */
export function memoise<ArgsType, ReturnType>(
    func: (...args: ArgsType[]) => ReturnType, cache: Record<string, unknown> = {}
): (...args: ArgsType[]) => ReturnType {
    return (...args: ArgsType[]): ReturnType => (cache[JSON.stringify(args)] ??= func(...args)) as ReturnType;
}

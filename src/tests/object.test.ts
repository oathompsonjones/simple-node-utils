import { describe, expect, test } from "vitest";
import { isEqual } from "../object.js";

describe("isEqual", () => {
    const func = (): string => "test";

    test("should return true when comparing the same function reference", () => {
        expect(isEqual(func, func)).toBe(true);
    });
    test("should return false when comparing different function references", () => {
        expect(isEqual(func, (): string => "test")).toBe(false);
        expect(isEqual((): string => "test", (): string => "test")).toBe(false);
    });
    test("should give the same results as the === operator for primitives", () => {
        expect(isEqual<number | string>("3", 1)).toBe(false);
        expect(isEqual(undefined, undefined)).toBe(true);
        expect(isEqual(true, true)).toBe(true);
        expect(isEqual(false, false)).toBe(true);
        expect(isEqual(true, false)).toBe(false);
        expect(isEqual(false, true)).toBe(false);
        expect(isEqual(3, 3)).toBe(true);
        expect(isEqual(3, 1)).toBe(false);
        expect(isEqual(3n, 3n)).toBe(true);
        expect(isEqual(3n, 1n)).toBe(false);
        expect(isEqual("3", "3")).toBe(true);
        expect(isEqual("3", "1")).toBe(false);
        expect(isEqual(null, null)).toBe(true);
        expect(isEqual(null, 0)).toBe(false);
        expect(isEqual(0, null)).toBe(false);
        expect(isEqual(Symbol("Hello, world!"), Symbol("Hello, world!"))).toBe(true);
        expect(isEqual(Symbol("Hello, world!"), Symbol("Goodbye, world!"))).toBe(false);
    });
    test("should return true when comparing arrays with the same values in the same order", () => {
        expect(isEqual([1, 2, 3, 4, 5], [1, 2, 3, 4, 5])).toBe(true);
        expect(isEqual([1, 2, 3, 4, 5], [5, 4, 3, 2, 1])).toBe(false);
    });
    test("should return true when comparing objects with the same top-level keys and values", () => {
        expect(isEqual({ key1: "value1", key2: "value2" }, { key1: "value1", key2: "value2" })).toBe(true);
        expect(isEqual({ key1: "value1", key2: "value2" }, { key1: "value1", key2: "value2", key3: "value3" })).toBe(false);
    });
    test("should return true when comparing objects with the same deep keys and values", () => {
        expect(isEqual({ key1: { subKey1: 0 }, key2: "value2" }, { key1: { subKey1: 0 }, key2: "value2" })).toBe(true);
        expect(isEqual({ key1: { subKey1: 0 }, key2: "value2" }, { key1: { subKey1: 0 }, key2: { subKey2: 0 } })).toBe(false);
        expect(isEqual({ key1: { subKey1: 0 }, key2: "value2" }, { key1: { subKey1: 1 }, key2: "value2" })).toBe(false);
    });
    test("should return false when comparing objects where one has an undefined value and the has no key", () => {
        expect(isEqual({ key1: undefined }, {})).toBe(false);
        expect(isEqual({}, { key1: undefined })).toBe(false);
    });
    test("should return true when comparing objects where one has an undefined value and the other has no key, " +
        "and ignoreUndefined is true", () => {
        expect(isEqual({ key1: undefined }, {}, true)).toBe(true);
        expect(isEqual({}, { key1: undefined }, true)).toBe(true);
    });
});

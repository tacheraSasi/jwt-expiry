import pkg, { greet, sum } from "../src/index";

describe("minimal library", () => {
  describe("greet", () => {
    it("greets the world by default", () => {
      expect(greet()).toBe("Hello, world!");
    });

    it("greets a provided name", () => {
      expect(greet("Alice")).toBe("Hello, Alice!");
    });
  });

  describe("sum", () => {
    it("returns 0 with no args", () => {
      expect(sum()).toBe(0);
    });

    it("sums numbers", () => {
      expect(sum(1, 2, 3)).toBe(6);
      expect(sum(-1, 1)).toBe(0);
    });
  });

  it("default export exposes greet and sum", () => {
    expect(typeof pkg.greet).toBe("function");
    expect(typeof pkg.sum).toBe("function");
    expect(pkg.greet()).toBe("Hello, world!");
  });
});

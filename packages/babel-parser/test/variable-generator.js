import { parse } from "../lib/index.js";

function getParser(code) {
  return () =>
    parse(code, { sourceType: "module", plugins: ["doExpressions"] });
}

describe("VariableGenerator", function () {
  it("should parse", function () {
    expect(
      getParser(`let foo = do {
      let* x = f;
      const* y = g;
      var* z = h;
      x * tmp
    };`)(),
    ).toMatchSnapshot();
  });
});

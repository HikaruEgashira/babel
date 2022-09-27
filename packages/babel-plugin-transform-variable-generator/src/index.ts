import { declare } from "@babel/helper-plugin-utils";
import syntaxDoExpressions from "@babel/plugin-syntax-do-expressions";
import { types as t } from "@babel/core";

export default declare(api => {
  api.assertVersion(7);

  return {
    name: "transform-variable-generator",
    inherits: syntaxDoExpressions,
    visitor: {
      BlockStatement(path) {
        const [id, ...rest] = path.node.body;
        if (
          t.isVariableDeclaration(id) &&
          t.isIdentifier(id.declarations[0].id) &&
          id.generator
        ) {
          delete id.generator;
          path.replaceWith(
            t.blockStatement([
              t.returnStatement(
                t.callExpression(id.declarations[0].init, [
                  t.arrowFunctionExpression(
                    [id.declarations[0].id],
                    t.blockStatement(rest),
                  ),
                ]),
              ),
            ]),
          );
        }
      },
    },
  };
});

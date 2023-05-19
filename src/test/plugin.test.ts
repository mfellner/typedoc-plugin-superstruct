import outdent from "outdent";
import {
  Application,
  DeclarationReflection,
  ProjectReflection,
  TSConfigReader,
} from "typedoc";
import { test, expect, beforeAll } from "vitest";
import { load } from "../plugin";

let project: ProjectReflection;

beforeAll(() => {
  const app = new Application();
  app.options.addReader(new TSConfigReader());
  app.bootstrap({
    entryPoints: ["src/testdata/infer.ts"],
  });
  load(app);

  project = app.convert()!;
  expect(project).toBeDefined();
});

test("infer.ts", () => {
  const typeDeclaration = project.getChildByName(
    "MyType"
  ) as DeclarationReflection;
  expect(typeDeclaration.toStringHierarchy()).toEqual(outdent`
        TypeAlias MyType:Object
          TypeLiteral __type
            Property opt:string
            Property other:{ arr: number[]; }
            Property prop:string
    `);

  const schemaDeclaration = project.getChildByName(
    "MyStruct"
  ) as DeclarationReflection;
  expect(schemaDeclaration.toStringHierarchy()).toEqual(
    "Variable MyStruct:Struct<MyType>"
  );
});

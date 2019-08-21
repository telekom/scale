import { newSpecPage } from "@stencil/core/testing";
import { Tag } from "./tag";

describe("Tag", () => {
  let element;
  beforeEach(async () => {
    element = new Tag();
  });

  it("should match snapshot", async () => {
    const page = await newSpecPage({
      components: [Tag],
      html: `<t-tag>Label</t-tag>`
    });
    expect(page.root).toMatchSnapshot();
  });

  it("should handle variant css class", () => {
    element.variant = "basic";
    expect(element.getCssClassMap()).toContain("tag--variant-basic");
  });
});

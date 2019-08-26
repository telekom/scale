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

  it("should have class variant primary", () => {
    element.variant = "primary";
    expect(element.getCssClassMap()).toContain("tag--variant-primary");
  });

  it("should render pill tag", () => {
    element.pill = true;
    expect(element.getCssClassMap()).toContain("tag--pill");
  });

  it("should have a link", async () => {
    const page = await newSpecPage({
      components: [Tag],
      html: `<t-tag link="#">Label</t-tag>`
    });
    expect(page.root).toMatchSnapshot();
  });
});

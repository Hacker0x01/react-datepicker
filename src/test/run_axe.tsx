import axe from "axe-core";

const wrapper = document.createElement("main");
document.body.appendChild(wrapper);

export function runAxe(domNode: Node): Promise<void> {
  wrapper.appendChild(domNode);
  return axe
    .run(domNode)
    .then(({ violations }) => {
      expect(violations).toHaveLength(0);
    })
    .finally(() => wrapper.removeChild(domNode));
}

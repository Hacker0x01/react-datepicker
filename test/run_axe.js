import axe from "axe-core";

const wrapper = document.createElement("main");
document.body.appendChild(wrapper);

export function runAxe(domNode) {
  wrapper.appendChild(domNode);
  return axe
    .run(domNode)
    .then(({ violations }) => {
      assert(violations.length === 0, JSON.stringify(violations, null, 2));
    })
    .finally(() => wrapper.removeChild(domNode));
}

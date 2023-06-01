export function getKey(key, shiftKey = false) {
  let event = null;
  switch (key) {
    case "Backspace":
      event = { key, code: 8, which: 8 };
    case "Tab":
      event = { key, code: 9, which: 9 };
    case "Enter":
      event = { key, code: 13, which: 13 };
    case "Escape":
      event = { key, code: 27, which: 27 };
    case " ":
      event = { key, code: 32, which: 32 };
    case "PageUp":
      event = { key, keyCode: 33, which: 33 };
    case "PageDown":
      event = { key, keyCode: 34, which: 34 };
    case "End":
      event = { key, keyCode: 35, which: 35 };
    case "Home":
      event = { key, keyCode: 36, which: 36 };
    case "ArrowLeft":
      event = { key, code: 37, which: 37 };
    case "ArrowRight":
      event = { key, code: 39, which: 39 };
    case "ArrowUp":
      event = { key, code: 38, which: 38 };
    case "ArrowDown":
      event = { key, code: 40, which: 40 };
    case "x":
      event = { key, code: 88, which: 88 };
  }
  if (!event) {
    throw new Error("Unknown key :" + key);
  }
  return { ...event, shiftKey };
}

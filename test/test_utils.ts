import { KeyType } from "../src/date_utils";

interface KeyEvent {
  key: string;
  keyCode?: number;
  code?: number;
  which: number;
}

export function getKey(key: KeyType, shiftKey: boolean = false) {
  let event: KeyEvent = null as unknown as KeyEvent;
  switch (key) {
    case KeyType.Backspace:
      event = { key, code: 8, which: 8 };
      break;
    case KeyType.Tab:
      event = { key, code: 9, which: 9 };
      break;
    case KeyType.Enter:
      event = { key, code: 13, which: 13 };
      break;
    case KeyType.Escape:
      event = { key, code: 27, which: 27 };
      break;
    case KeyType.Space:
      event = { key, code: 32, which: 32 };
      break;
    case KeyType.PageUp:
      event = { key, keyCode: 33, which: 33 };
      break;
    case KeyType.PageDown:
      event = { key, keyCode: 34, which: 34 };
      break;
    case KeyType.End:
      event = { key, keyCode: 35, which: 35 };
      break;
    case KeyType.Home:
      event = { key, keyCode: 36, which: 36 };
      break;
    case KeyType.ArrowLeft:
      event = { key, code: 37, which: 37 };
      break;
    case KeyType.ArrowRight:
      event = { key, code: 39, which: 39 };
      break;
    case KeyType.ArrowUp:
      event = { key, code: 38, which: 38 };
      break;
    case KeyType.ArrowDown:
      event = { key, code: 40, which: 40 };
      break;
    case KeyType.X:
      event = { key, code: 88, which: 88 };
      break;
  }
  if (!event) {
    throw new Error("Unknown key :" + key);
  }
  return { ...event, shiftKey };
}

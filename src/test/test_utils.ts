import { fireEvent } from "@testing-library/react";

import { KeyType } from "../date_utils";

interface KeyEvent {
  key: string;
  code: number;
  which: number;
}

export function getKey(key: KeyType, shiftKey = false) {
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
      event = { key, code: 33, which: 33 };
      break;
    case KeyType.PageDown:
      event = { key, code: 34, which: 34 };
      break;
    case KeyType.End:
      event = { key, code: 35, which: 35 };
      break;
    case KeyType.Home:
      event = { key, code: 36, which: 36 };
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
    case "x" as KeyType:
      event = { key, code: 88, which: 88 };
      break;
  }
  if (!event) {
    throw new Error("Unknown key :" + key);
  }
  return { ...event, shiftKey };
}

export const range = (from: number, to: number): number[] => {
  const list: number[] = [];
  for (let i = from; i < to; i++) {
    list.push(i);
  }
  return list;
};

export const getRandomMonthExcludingCurrent = (): number => {
  const currentMonth = new Date().getMonth();

  let randomMonth;
  do {
    randomMonth = Math.floor(Math.random() * 12);
  } while (randomMonth === currentMonth);

  return randomMonth;
};

export const openDateInput = (container: Element) => {
  const dateInput = container.querySelector("input")!;
  fireEvent.focus(dateInput);
};

export const gotoNextView = (container: Element) => {
  const calendar = container.querySelector(".react-datepicker")!;
  const nextButton = calendar.querySelector(
    ".react-datepicker__navigation--next",
  )!;
  fireEvent.click(nextButton);
};

export const safeQuerySelector = <T extends HTMLElement = HTMLElement>(
  container: HTMLElement,
  selector: string,
): T => {
  const element = container.querySelector(selector);
  if (element) {
    return element as T;
  }

  throw new Error(`Element with selector '${selector}' not found`);
};

export const safeQuerySelectorAll = <T extends HTMLElement = HTMLElement>(
  container: HTMLElement,
  selector: string,
  minExpected: number = 1,
): T[] => {
  const elements = Array.from(container.querySelectorAll(selector)) as T[];

  if (!elements.length) {
    throw new Error(`Element with selector '${selector}' not found`);
  }
  if (elements.length < minExpected) {
    throw new Error(
      `Expected at least ${minExpected} element(s) for selector '${selector}'.  Only ${elements.length} found`,
    );
  }

  return elements;
};

let _resizeObserverCallbackFn: ResizeObserverCallback | null;

export const getResizeObserverCallback = () => _resizeObserverCallbackFn;

export const setupMockResizeObserver = () => {
  const mockObserve = jest.fn();
  const mockDisconnect = jest.fn();
  const mockUnobserve = jest.fn();

  const ResizeObserverMock = jest.fn((fn) => {
    _resizeObserverCallbackFn = fn;

    return {
      observe: mockObserve,
      disconnect: () => {
        _resizeObserverCallbackFn = null;
        mockDisconnect();
      },
      unobserve: jest.fn(),
    };
  });

  global.ResizeObserver = ResizeObserverMock;

  return {
    observe: mockObserve,
    disconnect: mockDisconnect,
    unobserve: mockUnobserve,
  };
};

export class SafeElementWrapper<T extends HTMLElement> {
  constructor(private element: T) {}

  getElement(): T {
    return this.element;
  }

  safeQuerySelector<E extends HTMLElement = HTMLElement>(
    selector: string,
  ): SafeElementWrapper<E> {
    const element = this.element.querySelector(selector) as E;
    if (element) {
      return new SafeElementWrapper<E>(element);
    }

    throw new Error(`Element with selector '${selector}' not found`);
  }

  safeQuerySelectorAll<E extends HTMLElement = HTMLElement>(
    selector: string,
    minExpected = 1,
  ): SafeElementWrapper<E>[] {
    const elements = Array.from(this.element.querySelectorAll(selector)) as E[];

    if (!elements.length) {
      throw new Error(`Element with selector '${selector}' not found`);
    }
    if (elements.length < minExpected) {
      throw new Error(
        `Expected at least ${minExpected} element(s) for selector '${selector}'.  Only ${elements.length} found`,
      );
    }

    return elements.map((element) => new SafeElementWrapper<E>(element));
  }
}

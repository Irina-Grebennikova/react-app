type JSONValue = string | number | boolean | { [x: string]: JSONValue } | JSONValue[];

const prefix = 'breeds';

class LocalStore {
  public static getItem<T>(key: string): T | null {
    const value = localStorage.getItem(`${prefix}-${key}`);

    if (value === null) {
      return null;
    }

    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  }

  public static setItem(key: string, value: JSONValue): void {
    const stringValue = JSON.stringify(value);

    localStorage.setItem(`${prefix}-${key}`, stringValue);
  }

  public static removeItem(key: string): void {
    localStorage.removeItem(`${prefix}-${key}`);
  }
}

export { LocalStore };

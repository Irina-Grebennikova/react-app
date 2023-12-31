type JSONValue = string | number | boolean | { [x: string]: JSONValue } | JSONValue[];

const KEY_PREFIX = 'breeds';

class LocalStore {
  public static getItem<T>(key: string): T | null {
    const value = localStorage.getItem(`${KEY_PREFIX}-${key}`);

    if (value === null) {
      return null;
    }

    try {
      return typeof value === 'string' ? (value as T) : (JSON.parse(value) as T);
    } catch {
      return null;
    }
  }

  public static setItem(key: string, value: JSONValue): void {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);

    localStorage.setItem(`${KEY_PREFIX}-${key}`, stringValue);
  }

  public static removeItem(key: string): void {
    localStorage.removeItem(`${KEY_PREFIX}-${key}`);
  }
}

export { LocalStore, KEY_PREFIX };

import { expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const script = readFileSync(new URL('../src/lib/theme.js', import.meta.url), 'utf8');

test('native theme survives storage failure, follows system preferences and syncs tabs', () => {
  for (const blocked of [false, true]) {
    let saved = 'dark';
    let dark;
    const handlers = {};
    const system = {
      matches: false,
      addEventListener: (_, callback) => {
        handlers.system = callback;
      }
    };
    class Element {
      closest() {
        return true;
      }
    }
    const root = {
      classList: {
        toggle: (_, value) => {
          dark = value;
        },
        contains: () => dark
      },
      style: {}
    };
    runInNewContext(script, {
      matchMedia: () => system,
      Element,
      localStorage: {
        getItem: () => {
          if (blocked) throw new Error('blocked');
          return saved;
        },
        setItem: (_, value) => {
          if (blocked) throw new Error('blocked');
          saved = value;
        }
      },
      document: {
        documentElement: root,
        addEventListener: (name, callback) => {
          handlers[name] = callback;
        }
      },
      window: {
        addEventListener: (name, callback) => {
          handlers[name] = callback;
        }
      },
      location: { pathname: '/', hostname: 'localhost' }
    });
    expect(dark).toBe(!blocked);
    handlers.click({ target: new Element() });
    expect(dark).toBe(blocked);
    expect(root.style.colorScheme).toBe(blocked ? 'dark' : 'light');
    handlers.storage({ key: 'mode-watcher-mode', newValue: 'system' });
    expect(dark).toBe(false);
    system.matches = true;
    handlers.system();
    expect(dark).toBe(true);
    handlers.storage({ key: 'mode-watcher-mode', newValue: 'light' });
    handlers.system();
    expect(dark).toBe(false);
    expect(handlers.load).toBeUndefined();
  }
});

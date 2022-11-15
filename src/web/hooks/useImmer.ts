import { useCallback, useState } from 'react';
import produce, { freeze, Draft } from 'immer';
export type DraftFunction<S> = (draft: Draft<S>) => void;
export type Updater<S> = (update: S | DraftFunction<S>) => void;
export type ImmerHooks<S> = [S, Updater<S>];
export function useImmer<S = unknown>(initValue: S | (() => S)): ImmerHooks<S>;

export function useImmer(initValue: unknown) {
  const [val, setVal] = useState(
    freeze(typeof initValue === 'function' ? initValue() : initValue, true)
  );
  return [
    val,
    useCallback(update => {
      if (typeof update === 'function') {
        setVal(produce(update));
      } else {
        setVal(freeze(update));
      }
    }, []),
  ];
}

import { atom, useAtom } from 'jotai';
import { atomWithImmer, useImmerAtom } from 'jotai/immer';
import { TezosToolkit, WalletProvider } from '@taquito/taquito';
import { StoreType } from '@type/index';
const storeInit: StoreType = {};
const store = atomWithImmer(storeInit);

export { store };

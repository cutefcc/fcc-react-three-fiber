import create from 'zustand/vanilla';
// 解决Re-render 问题，当然也可以不用中间件，直接用immer
import { immer } from 'zustand/middleware/immer';

// test zustand/vanilla 不依赖react
const DEFAULT_STORE = {
  name: 'cutefcc',
  age: 31,
  arr: [1234],
};

// const store = create(() => ({ ...DEFAULT_STORE }));
// 引入zustand/middleware/immer 就可以解决 Re-render 问题
const store = create(immer<typeof DEFAULT_STORE>(() => ({ ...DEFAULT_STORE })));
const { getState, setState, subscribe, destroy } = store;

function changeState() {
  console.log('changeState');
  // setState({
  //   name: "cutefcc-new" + Math.random(),
  // });
  // 这样写 会触发Re-render 是bad case, 引入zustand/middleware/immer 就可以解决这个问题
  // setState({ name: "cutefcc", age: 31 });
  // 这样写是good case
  setState(draft => {
    // immer 的好处，⬇️这样写 只会render 一次
    draft.name = 'cutefcc';
    draft.age = 31;
    // 数组也是 zustand 的一个坑，这样会Re-render
    // draft.arr = [1234];
  });
}
function handleAddZustandAge() {
  setState(draft => {
    draft.age = draft.age + 1;
  });
}
// subscribe((draft) => {
//   console.log(draft);
// });
export { getState, setState, subscribe, destroy, changeState, handleAddZustandAge, store };

// 自己写immer 不用zustand 的中间件
// const useStore = create<{
//   lush: { forest: { contains: { a: string } } };
//   clearForest: (data: string) => void;
// }>((set) => ({
//   lush: { forest: { contains: { a: "bear" } } },
//   clearForest: (data: string) =>
//     set(
//       produce((state) => {
//         state.lush.forest.contains.a = data;
//       })
//     ),
// }));

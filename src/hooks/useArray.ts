import React from "react";
import { cloneDeep } from "lodash";

function useArray<T>(initialValue?: T[]) {
  const [array, setArray] = React.useState<T[]>(initialValue || []);

  const push = (item: T) => setArray((prev) => [...prev, item]);

  const update = (index: number, item: T) => {
    setArray((prev) => {
      const newArray = cloneDeep(prev);
      newArray[index] = item;
      return newArray;
    });
  };

  const remove = (index: number) => {
    setArray((prev) => {
      const newArray = cloneDeep(prev);
      newArray.splice(index, 1);
      return newArray;
    });
  };

  const clear = () => {
    setArray([]);
  };

  return {
    array,
    push,
    update,
    remove,
    clear,
  };
}

export default useArray;

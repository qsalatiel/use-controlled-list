import { useCallback, useState } from "react";

export interface UseControlledListParams<ItemType> {
  defaultValues: ItemType[];
  getId: (item: ItemType) => string | number;
  onAdd?: (item: ItemType) => void;
  onRemove?: (item: ItemType) => void;
  onUpdate?: (list: ItemType[]) => void;
}

export interface UseControlledListMethods<ItemType> {
  add: (item: ItemType) => void;
  remove: (item: ItemType) => void;
  set: (values: ItemType[] | []) => void;
}

export type UseControllerListReturn<ItemType> = [
  list: ItemType[],
  methods: UseControlledListMethods<ItemType>
];

export const useControlledList = <T>({
  defaultValues,
  getId,
  onAdd,
  onRemove,
  onUpdate,
}: UseControlledListParams<T>): UseControllerListReturn<T> => {
  const [list, updateList] = useState<T[]>(defaultValues);

  const set = useCallback((values) => {
    updateList(values);
  }, []);

  const add = useCallback(
    (item) => {
      const updatedList = [...list, item];

      updateList(updatedList);
      if (onAdd) onAdd(item);
      if (onUpdate) onUpdate(updatedList);
    },
    [list, onAdd, onUpdate]
  );

  const remove = useCallback(
    (item) => {
      const updatedList = list.filter(
        (listItem) => getId(listItem) !== getId(item)
      );

      updateList(updatedList);
      if (onRemove) onRemove(item);
      if (onUpdate) onUpdate(updatedList);
    },
    [list, onRemove, getId, onUpdate]
  );

  return [list, { add, remove, set }];
};

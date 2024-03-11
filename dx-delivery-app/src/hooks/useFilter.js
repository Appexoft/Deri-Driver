import React, {useState, useMemo, useCallback} from 'react';
import {SelectInput} from '@components';

const useFilter = ({
  arrayOfItems = [],
  onStateOpen = () => {},
  label,
  initialValue = [],
  multiple = true,
  disabled,
  error,
  searchable = false,
  onlySelect,
  placeholder = '',
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [items, setItems] = useState(arrayOfItems);

  const selectedItemWithLabel = useMemo(
    () =>
      Array.isArray(value)
        ? value.map(_value => items.find(item => item.id === _value))
        : items.find(item => item.id === value),
    [items, value],
  );

  const removeItem = useCallback(
    item => {
      if (Array.isArray(value)) {
        return setValue(value.filter(_item => _item !== item));
      }
      setValue(null);
    },
    [value],
  );

  const SelectInputItem = () => {
    return (
      <SelectInput
        label={label}
        open={open}
        onOpen={onStateOpen}
        setOpen={setOpen}
        value={value}
        setValue={setValue}
        items={items}
        setItems={setItems}
        zIndex={2000}
        zIndexInverse={2000}
        searchable={searchable}
        selectedItemWithLabel={selectedItemWithLabel}
        removeItem={removeItem}
        multiple={multiple}
        disabled={disabled}
        error={error}
        onlySelect={onlySelect}
        placeholder={placeholder}
      />
    );
  };

  return {
    SelectInputItem,
    open,
    setOpen,
    value: useMemo(() => value, [value]),
    setValue,
    items,
    setItems,
    activeItem: selectedItemWithLabel,
  };
};

export default useFilter;

import { memo, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { Select } from 'antd';

interface CustomSelectProps {
  prefix?: ReactNode | null;
  options: { label: string; value: string; searchText?: string }[];
  defaultValue?: { label: string; value: string } | undefined;
  value?: { label: string; value: string } | undefined;
  onChange?: (value: string) => void;
  loading?: boolean;
  className?: string;
  showSearch?: boolean;
  placeholder?: string;
}

function CustomSelect({
  prefix = null,
  options,
  defaultValue,
  value,
  onChange,
  loading,
  className,
  showSearch = true,
  placeholder,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownVisibility = useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

  const filterOption = useCallback(
    (input: string, option?: { label: string; value: string; searchText?: string }) => {
      if (!option) return false;

      const searchTarget = option.searchText || option.label;
      return searchTarget.toLowerCase().includes(input.toLowerCase());
    },
    []
  );

  return (
    <div>
      <Select
        showSearch={showSearch}
        filterOption={filterOption}
        optionFilterProp="children"
        placeholder={placeholder}
        prefix={prefix}
        suffixIcon={<i className={`${isOpen ? `icon-up-dir` : 'icon-down-dir'} text-lg`} />}
        className={`${className} min-w-[200px]`}
        onDropdownVisibleChange={handleDropdownVisibility}
        defaultValue={defaultValue?.value}
        value={value?.value}
        loading={loading}
        options={options}
        onChange={onChange}
        notFoundContent="No results found"
      />
    </div>
  );
}

CustomSelect.displayName = 'CustomSelect';

export default memo(CustomSelect);

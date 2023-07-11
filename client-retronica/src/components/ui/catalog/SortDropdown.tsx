import { Dispatch, FC, SetStateAction } from 'react';
import { EnumProductSort } from 'types/product.interface';

interface ISortDropdown {
  sortType: EnumProductSort;
  setSortType: Dispatch<SetStateAction<EnumProductSort>>;
}

const SortDropdown: FC<ISortDropdown> = ({ sortType, setSortType }) => {
  return (
    <div className="mb-6 text-right">
      <select
        className="appearance-none rounded-full bg-primary px-4 py-1 text-center shadow-sm"
        value={sortType}
        onChange={e => setSortType(e.target.value as any)}
      >
        {(
          Object.keys(EnumProductSort) as Array<keyof typeof EnumProductSort>
        ).map(key => {
          return (
            <option key={key} value={EnumProductSort[key]}>
              {EnumProductSort[key]}
            </option>
          );
        })}
        <option value="all"></option>
      </select>
    </div>
  );
};

export default SortDropdown;

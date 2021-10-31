import { ChangeEventHandler, FC, useEffect, useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';

import useDebounce from '../hooks/useDebounce';
import { Country } from 'src/types/Country';

const QUERY = gql`
  query Countries($code: String!) {
    countries(filter: { code: { eq: $code } }) {
      code
      name
      emoji
    }
  }
`;

type Countries = Pick<Country, 'code' | 'name' | 'emoji'>[];

type QueryReturnType = {
  countries: Countries;
};

type QueryVars = {
  code: string;
};

type SearchProps = { onSelect: (code: string) => void };

const Search: FC<SearchProps> = ({ onSelect }) => {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 300);

  const [getCountries, { data }] = useLazyQuery<QueryReturnType, QueryVars>(
    QUERY
  );

  useEffect(() => {
    if (debouncedValue === '') return;

    getCountries({
      variables: { code: debouncedValue },
    });
  }, [debouncedValue, getCountries]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = (code: string) => {
    onSelect(code);
    setValue('');
  };

  return (
    <div className="relative mb-2">
      <input
        className="border rounded-sm w-full"
        onChange={handleChange}
        value={value}
      />

      {data && value !== '' ? (
        <SearchOptions countries={data.countries} onSelect={handleSelect} />
      ) : null}
    </div>
  );
};

type SearchOptionsProps = {
  countries: Countries;
  onSelect: (code: string) => void;
};

const SearchOptions: FC<SearchOptionsProps> = ({ countries, onSelect }) => {
  const handleClick = (code: string) => () => {
    onSelect(code);
  };

  return (
    <div className="absolute bg-white w-full shadow mt-2">
      {countries.map((country) => (
        <span
          onClick={handleClick(country.code)}
          key={country.code}
          className="block px-2 py-1 cursor-pointer hover:bg-gray-200"
        >
          {country.emoji} {country.name}
        </span>
      ))}
    </div>
  );
};

export default Search;

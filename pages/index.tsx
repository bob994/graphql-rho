import { useEffect, useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import Search from '@components/Search';
import { Country } from 'src/types/Country';
import Info from '@components/Info';

const QUERY = gql`
  query Country($code: ID!) {
    country(code: $code) {
      code
      name
      emoji
      native
      continent {
        name
      }
      languages {
        name
        native
      }
      phone
    }
  }
`;

type QueryReturnType = {
  country: Country;
};

type QueryVars = {
  code: string;
};

export default function Home() {
  const [getCountry, { data }] = useLazyQuery<QueryReturnType, QueryVars>(
    QUERY
  );
  const [value, setValue] = useState('');

  useEffect(() => {
    if (value === '') return;

    getCountry({ variables: { code: value } });
  }, [value, getCountry]);

  const selectCountry = (code: string) => {
    setValue(code);
  };

  return (
    <div className="h-screen w-screen flex items-center flex-col pt-8">
      <h1 className="mb-2 text-3xl">Country list</h1>

      <div className="border rounded p-4 mb-8 w-1/3">
        <span className="mb-2">
          Search for the country and get info about it:
        </span>

        <Search onSelect={selectCountry} />

        {data?.country ? <Info country={data.country} /> : null}
      </div>
    </div>
  );
}

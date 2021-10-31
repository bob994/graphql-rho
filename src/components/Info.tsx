import { FC } from 'react';
import { Country } from 'src/types/Country';

type Props = {
  country: Country;
};

const Info: FC<Props> = ({ country }) => {
  return (
    <div>
      <hr className="mb-4" />

      <h2 className="text-2xl text-center mb-2">
        {`You selected ${country.emoji} ${country.name} - ${country.native} ${country.emoji} to learn more about`}
      </h2>

      <div className="text-justify">
        {`${country.name} is country located in ${country.continent.name}. `}

        <br />

        {`They are speaking ${country.languages
          .map((lang) => lang.native)
          .join(', ')} and if you want to phone them, please use ${
          country.phone
        } as a prefix.`}
      </div>
    </div>
  );
};

export default Info;

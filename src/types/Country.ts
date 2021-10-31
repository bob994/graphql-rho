type Continent = {
  name: string;
};

type Language = {
  name: string;
  native: string;
};

export type Country = {
  code: string;
  name: string;
  emoji: string;
  native: string;
  continent: Continent;
  languages: Language[];
  phone: string;
};

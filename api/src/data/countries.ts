export type Country = {
  id: string;
  name: string;
  regionId: string;
  difficulty: 1 | 2 | 3;
  flag: string;
  questionPackId: string;
};

export const countries: Country[] = [
  {
    id: "germany",
    name: "Tyskland",
    regionId: "central-europe",
    difficulty: 1,
    flag: "🇩🇪",
    questionPackId: "germany",
  },
  {
    id: "austria",
    name: "Österrike",
    regionId: "central-europe",
    difficulty: 2,
    flag: "🇦🇹",
    questionPackId: "austria",
  },
  {
    id: "france",
    name: "Frankrike",
    regionId: "western-europe",
    difficulty: 1,
    flag: "🇫🇷",
    questionPackId: "france",
  },
  {
    id: "belgium",
    name: "Belgien",
    regionId: "western-europe",
    difficulty: 2,
    flag: "🇧🇪",
    questionPackId: "belgium",
  },
  {
    id: "romania",
    name: "Rumänien",
    regionId: "eastern-europe",
    difficulty: 2,
    flag: "🇷🇴",
    questionPackId: "romania",
  },
  {
    id: "ukraine",
    name: "Ukraina",
    regionId: "eastern-europe",
    difficulty: 2,
    flag: "🇺🇦",
    questionPackId: "ukraine",
  },
  {
    id: "canada",
    name: "Kanada",
    regionId: "north-america",
    difficulty: 2,
    flag: "🇨🇦",
    questionPackId: "canada",
  },
  {
    id: "usa",
    name: "USA",
    regionId: "north-america",
    difficulty: 1,
    flag: "🇺🇸",
    questionPackId: "usa",
  },
  {
    id: "sweden",
    name: "Sverige",
    regionId: "norden",
    difficulty: 1,
    flag: "🇸🇪",
    questionPackId: "sweden",
  },
  {
    id: "norway",
    name: "Norge",
    regionId: "norden",
    difficulty: 2,
    flag: "🇳🇴",
    questionPackId: "norway",
  },
  {
    id: "denmark",
    name: "Danmark",
    regionId: "norden",
    difficulty: 1,
    flag: "🇩🇰",
    questionPackId: "denmark",
  },
  {
    id: "finland",
    name: "Finland",
    regionId: "norden",
    difficulty: 2,
    flag: "🇫🇮",
    questionPackId: "finland",
  },
  {
    id: "iceland",
    name: "Island",
    regionId: "norden",
    difficulty: 3,
    flag: "🇮🇸",
    questionPackId: "iceland",
  },
];

export type Question = {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: number; // Index i answers, räknat från 0.
};

export type QuestionPack = {
  id: string;
  requiredCorrectAnswers: number;
  questions: Question[];
};

// Fråge-id:n ska vara unika i hela API:t.
export const questionPacks: QuestionPack[] = [
  {
    id: "germany",
    requiredCorrectAnswers: 2,
    questions: [
      {
        id: 11,
        question: "Vad heter Tysklands huvudstad?",
        answers: ["Hamburg", "Berlin", "München", "Bonn"],
        correctAnswer: 1,
      },
      {
        id: 12,
        question: "Vilka färger har Tysklands flagga?",
        answers: [
          "Blått, vitt och rött",
          "Grönt, vitt och rött",
          "Svart, rött och gult",
          "Rött och vitt",
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "austria",
    requiredCorrectAnswers: 2,
    questions: [
      {
        id: 13,
        question: "Vad heter Österrikes huvudstad?",
        answers: ["Wien", "Salzburg", "Graz", "Innsbruck"],
        correctAnswer: 0,
      },
      {
        id: 14,
        question: "Vilken bergskedja täcker en stor del av Österrike?",
        answers: ["Anderna", "Himalaya", "Pyrenéerna", "Alperna"],
        correctAnswer: 3,
      },
    ],
  },
  {
    id: "france",
    requiredCorrectAnswers: 2,
    questions: [
      {
        id: 15,
        question: "Vad heter Frankrikes huvudstad?",
        answers: ["Lyon", "Paris", "Nice", "Marseille"],
        correctAnswer: 1,
      },
      {
        id: 16,
        question: "I vilken fransk stad står Eiffeltornet?",
        answers: ["Paris", "Bordeaux", "Lille", "Toulouse"],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: "belgium",
    requiredCorrectAnswers: 2,
    questions: [
      {
        id: 17,
        question: "Vad heter Belgiens huvudstad?",
        answers: ["Antwerpen", "Gent", "Bryssel", "Brygge"],
        correctAnswer: 2,
      },
      {
        id: 18,
        question: "Vilket av dessa länder gränsar till Belgien?",
        answers: ["Spanien", "Italien", "Portugal", "Nederländerna"],
        correctAnswer: 3,
      },
    ],
  },
  {
    id: "romania",
    requiredCorrectAnswers: 2,
    questions: [
      {
        id: 19,
        question: "Vad heter Rumäniens huvudstad?",
        answers: ["Budapest", "Bukarest", "Sofia", "Belgrad"],
        correctAnswer: 1,
      },
      {
        id: 20,
        question: "Vilket hav har Rumänien kust mot?",
        answers: ["Östersjön", "Nordsjön", "Svarta havet", "Röda havet"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "ukraine",
    requiredCorrectAnswers: 2,
    questions: [
      {
        id: 21,
        question: "Vad heter Ukrainas huvudstad?",
        answers: ["Kyiv", "Lviv", "Odesa", "Charkiv"],
        correctAnswer: 0,
      },
      {
        id: 22,
        question: "Vilka färger har Ukrainas flagga?",
        answers: [
          "Rött och vitt",
          "Grönt och gult",
          "Svart och rött",
          "Blått och gult",
        ],
        correctAnswer: 3,
      },
    ],
  },
  {
    id: "canada",
    requiredCorrectAnswers: 2,
    questions: [
      {
        id: 23,
        question: "Vad heter Kanadas huvudstad?",
        answers: ["Toronto", "Vancouver", "Ottawa", "Montréal"],
        correctAnswer: 2,
      },
      {
        id: 24,
        question: "Vilket löv finns på Kanadas flagga?",
        answers: ["Eklöv", "Lönnlöv", "Björklöv", "Asplöv"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "usa",
    requiredCorrectAnswers: 2,
    questions: [
      {
        id: 25,
        question: "Vad heter USA:s huvudstad?",
        answers: ["New York", "Los Angeles", "Chicago", "Washington, D.C."],
        correctAnswer: 3,
      },
      {
        id: 26,
        question: "I vilken amerikansk stad finns Frihetsgudinnan?",
        answers: ["New York", "Boston", "Miami", "Seattle"],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: "sweden",
    requiredCorrectAnswers: 2,
    questions: [
      {
        id: 1,
        question: "Vad heter Sveriges huvudstad?",
        answers: ["Stockholm", "Göteborg", "Malmö", "Uppsala"],
        correctAnswer: 0,
      },
      {
        id: 6,
        question: "Vilka färger har Sveriges flagga?",
        answers: [
          "Rött och vitt",
          "Blått och gult",
          "Grönt och vitt",
          "Blått och vitt",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "norway",
    requiredCorrectAnswers: 2,
    questions: [
      {
        id: 2,
        question: "Vad heter Norges huvudstad?",
        answers: ["Bergen", "Oslo", "Trondheim", "Stavanger"],
        correctAnswer: 1,
      },
      {
        id: 7,
        question: "Vilket land delar en lång landgräns med Norge i öster?",
        answers: ["Island", "Danmark", "Sverige", "Tyskland"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "denmark",
    requiredCorrectAnswers: 2,
    questions: [
      {
        id: 3,
        question: "Vad heter Danmarks huvudstad?",
        answers: ["Odense", "Århus", "Köpenhamn", "Ålborg"],
        correctAnswer: 2,
      },
      {
        id: 8,
        question: "Vilket land gränsar Danmark till i söder?",
        answers: ["Norge", "Finland", "Polen", "Tyskland"],
        correctAnswer: 3,
      },
      {
        id: 27,
        question: "Vad kallas smarta människor i danmark?",
        answers: ["Aliens", "Turister", "Smarta människor", "Män i skor"],
        correctAnswer: 1,
      },
      {
        id: 28,
        question: "Vad är det bästa med Danmark?",
        answers: ["Pølse", "Svenska turister", "Danskar", "Bron till Sverige"],
        correctAnswer: 3,
      },
      {
        id: 29,
        question: "Vad heter 'intelligent' på danska?",
        answers: [
          "Smarthet",
          "Intelligens",
          "Det finns inget ord för det",
          "Utländsk",
        ],
        correctAnswer: 2,
      },
      {
        id: 30,
        question: "Vad kallar man en nykter dansk?",
        answers: ["En nykterist", "En myt", "En skojare", "Vet ej."],
        correctAnswer: 1,
      },
      {
        id: 31,
        question: "Vad heter 'tivoli' på danska?",
        answers: ["", "Hemma", "", ""],
        correctAnswer: 1,
      },
      {
        id: 32,
        question: "",
        answers: ["", "", "", ""],
        correctAnswer: 2,
      },
      {
        id: 33,
        question: "",
        answers: ["", "", "", ""],
        correctAnswer: 0,
      },
      {
        id: 34,
        question: "",
        answers: ["", "", "", ""],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: "finland",
    requiredCorrectAnswers: 2,
    questions: [
      {
        id: 4,
        question: "Vad heter Finlands huvudstad?",
        answers: ["Åbo", "Tammerfors", "Uleåborg", "Helsingfors"],
        correctAnswer: 3,
      },
      {
        id: 9,
        question: "Vad kallas Finland ofta?",
        answers: [
          "De tusen sjöarnas land",
          "Den gröna ön",
          "Solens rike",
          "Ökenlandet",
        ],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: "iceland",
    requiredCorrectAnswers: 2,
    questions: [
      {
        id: 5,
        question: "Vad heter Islands huvudstad?",
        answers: ["Reykjavík", "Oslo", "Helsingfors", "Tórshavn"],
        correctAnswer: 0,
      },
      {
        id: 10,
        question: "I vilket hav ligger Island?",
        answers: ["Stilla havet", "Atlanten", "Indiska oceanen", "Medelhavet"],
        correctAnswer: 1,
      },
    ],
  },
];

export const questions: Question[] = questionPacks.flatMap(
  (pack) => pack.questions,
);

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
    requiredCorrectAnswers: 6,
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
      {
        id: 67,
        question: "Vilken tysk stad tar Oktoberfest så seriöst att festen börjar redan i september?",
        answers: ["Berlin", "München", "Bremen", "Dresden"],
        correctAnswer: 1,
      },
      {
        id: 68,
        question: "Vilken flod rinner genom Köln?",
        answers: ["Donau", "Elbe", "Rhen", "Seine"],
        correctAnswer: 2,
      },
      {
        id: 69,
        question: "Vad kallas den tyska motorvägen, där vissa sträckor saknar generell hastighetsgräns?",
        answers: ["Autobahn", "Autostrada", "Route 66", "Snabbspåret"],
        correctAnswer: 0,
      },
      {
        id: 70,
        question: "Vilken tysk stad delades av en mur fram till 1989?",
        answers: ["Hamburg", "Frankfurt", "Stuttgart", "Berlin"],
        correctAnswer: 3,
      },
      {
        id: 71,
        question: "Vad heter Tysklands valuta?",
        answers: ["D-mark", "Euro", "Schweizerfranc", "Krona"],
        correctAnswer: 1,
      },
      {
        id: 72,
        question: "Vilket tyskt bakverk ser ut som en knut och trivs med grovt salt?",
        answers: ["Croissant", "Churro", "Brezel", "Scone"],
        correctAnswer: 2,
      },
      {
        id: 73,
        question: "Vilken tysk stad förknippas med Brandenburger Tor?",
        answers: ["Berlin", "Köln", "Leipzig", "Hannover"],
        correctAnswer: 0,
      },
      {
        id: 74,
        question: "Vilket hav har Tyskland kust mot, förutom Nordsjön?",
        answers: ["Medelhavet", "Svarta havet", "Norska havet", "Östersjön"],
        correctAnswer: 3,
      },
    ],
  },
  {
    id: "austria",
    requiredCorrectAnswers: 8,
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
      {
        id: 75,
        question: "Vilken flod rinner genom Wien?",
        answers: ["Rhen", "Donau", "Seine", "Po"],
        correctAnswer: 1,
      },
      {
        id: 76,
        question: "Vilken kompositör föddes i Salzburg?",
        answers: ["Mozart", "Beethoven", "Chopin", "Vivaldi"],
        correctAnswer: 0,
      },
      {
        id: 77,
        question: "Vad heter Österrikes högsta berg?",
        answers: ["Zugspitze", "Mont Blanc", "Grossglockner", "Matterhorn"],
        correctAnswer: 2,
      },
      {
        id: 78,
        question: "Vilken klassisk dessert från Wien består av chokladkaka med aprikosmarmelad?",
        answers: ["Tiramisu", "Crème brûlée", "Pavlova", "Sachertårta"],
        correctAnswer: 3,
      },
      {
        id: 79,
        question: "Vilken valuta används i Österrike?",
        answers: ["Schilling", "Euro", "Franc", "Krona"],
        correctAnswer: 1,
      },
      {
        id: 80,
        question: "Vilket land gränsar INTE till Österrike?",
        answers: ["Schweiz", "Ungern", "Spanien", "Slovenien"],
        correctAnswer: 2,
      },
      {
        id: 81,
        question: "Vilken österrikisk stad var värd för vinter-OS både 1964 och 1976?",
        answers: ["Innsbruck", "Salzburg", "Graz", "Linz"],
        correctAnswer: 0,
      },
      {
        id: 82,
        question: "Vad heter det panerade köttstycke som Wien gärna tar åt sig äran för?",
        answers: ["Falafel", "Gulasch", "Raclette", "Wienerschnitzel"],
        correctAnswer: 3,
      },
    ],
  },
  {
    id: "france",
    requiredCorrectAnswers: 6,
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
      {
        id: 83,
        question: "Vilken fransk stad är känd för sin filmfestival?",
        answers: ["Lyon", "Cannes", "Nantes", "Dijon"],
        correctAnswer: 1,
      },
      {
        id: 84,
        question: "Vad heter floden som rinner genom Paris?",
        answers: ["Loire", "Rhône", "Seine", "Garonne"],
        correctAnswer: 2,
      },
      {
        id: 85,
        question: "Vilket museum i Paris får besökare att köa för en ganska liten Mona Lisa?",
        answers: ["Louvren", "Prado", "Uffizierna", "Rijksmuseum"],
        correctAnswer: 0,
      },
      {
        id: 86,
        question: "Vilket land delar Frankrikes europeiska fastland en gräns med?",
        answers: ["Portugal", "Nederländerna", "Österrike", "Spanien"],
        correctAnswer: 3,
      },
      {
        id: 87,
        question: "Vilken fransk region gav mousserande vin ett namn som andra gärna lånar?",
        answers: ["Normandie", "Champagne", "Bretagne", "Provence"],
        correctAnswer: 1,
      },
      {
        id: 88,
        question: "Vad heter bergskedjan mellan Frankrike och Spanien?",
        answers: ["Alperna", "Karpaterna", "Pyrenéerna", "Appenninerna"],
        correctAnswer: 2,
      },
      {
        id: 89,
        question: "Vilken cykeltävling brukar avslutas i Paris?",
        answers: ["Tour de France", "Giro d'Italia", "Vasaloppet", "Paris–Roubaix"],
        correctAnswer: 0,
      },
      {
        id: 90,
        question: "Vilken valuta används i Frankrike?",
        answers: ["Franc", "Pund", "Krona", "Euro"],
        correctAnswer: 3,
      },
    ],
  },
  {
    id: "belgium",
    requiredCorrectAnswers: 8,
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
      {
        id: 91,
        question: "Vilka tre språk är officiella i Belgien?",
        answers: ["Franska, spanska och tyska", "Nederländska, franska och tyska", "Nederländska, engelska och franska", "Franska, italienska och tyska"],
        correctAnswer: 1,
      },
      {
        id: 92,
        question: "I vilken belgisk stad finns Atomium?",
        answers: ["Bryssel", "Brygge", "Liège", "Namur"],
        correctAnswer: 0,
      },
      {
        id: 93,
        question: "Vilken belgisk stad är känd för sina kanaler och medeltida stadskärna?",
        answers: ["Charleroi", "Mons", "Brygge", "Hasselt"],
        correctAnswer: 2,
      },
      {
        id: 94,
        question: "Vad heter den lilla kissande statyn som blivit en stor sevärdhet i Bryssel?",
        answers: ["Den lille havfrue", "Pinkelprinsen", "Petit Pis", "Manneken Pis"],
        correctAnswer: 3,
      },
      {
        id: 95,
        question: "Vilket hav har Belgien en kort kust mot?",
        answers: ["Östersjön", "Nordsjön", "Medelhavet", "Svarta havet"],
        correctAnswer: 1,
      },
      {
        id: 96,
        question: "Vad heter bergsområdet i sydöstra Belgien?",
        answers: ["Alperna", "Pyrenéerna", "Ardennerna", "Karpaterna"],
        correctAnswer: 2,
      },
      {
        id: 97,
        question: "Vilken belgisk stad är berömd för sin diamanthandel?",
        answers: ["Antwerpen", "Gent", "Oostende", "Leuven"],
        correctAnswer: 0,
      },
      {
        id: 98,
        question: "Vilken valuta används i Belgien?",
        answers: ["Franc", "Pund", "Krona", "Euro"],
        correctAnswer: 3,
      },
    ],
  },
  {
    id: "romania",
    requiredCorrectAnswers: 8,
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
      {
        id: 99,
        question: "Vilken bergskedja går som en båge genom Rumänien?",
        answers: ["Alperna", "Karpaterna", "Anderna", "Pyrenéerna"],
        correctAnswer: 1,
      },
      {
        id: 100,
        question: "Vilken flod bildar ett stort delta vid Rumäniens kust?",
        answers: ["Donau", "Rhen", "Volga", "Nilen"],
        correctAnswer: 0,
      },
      {
        id: 101,
        question: "Vilket område i Rumänien förknippas med Dracula?",
        answers: ["Bretagne", "Toscana", "Transsylvanien", "Bayern"],
        correctAnswer: 2,
      },
      {
        id: 102,
        question: "Vilket språk är Rumäniens officiella språk?",
        answers: ["Ungerska", "Ryska", "Bulgariska", "Rumänska"],
        correctAnswer: 3,
      },
      {
        id: 103,
        question: "Vilken valuta används i Rumänien?",
        answers: ["Euro", "Leu", "Forint", "Zloty"],
        correctAnswer: 1,
      },
      {
        id: 104,
        question: "Vilken rumänsk stad ligger nära Svarta havet och har landets största hamn?",
        answers: ["Brașov", "Sibiu", "Constanța", "Cluj-Napoca"],
        correctAnswer: 2,
      },
      {
        id: 105,
        question: "Vilket land gränsar till Rumänien i väster?",
        answers: ["Ungern", "Frankrike", "Grekland", "Österrike"],
        correctAnswer: 0,
      },
      {
        id: 106,
        question: "Vad heter den berömda slingrande bergsvägen i Rumänien?",
        answers: ["Route 66", "Amalfikusten", "Autobahn", "Transfăgărășan"],
        correctAnswer: 3,
      },
    ],
  },
  {
    id: "ukraine",
    requiredCorrectAnswers: 8,
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
      {
        id: 107,
        question: "Vilken flod rinner genom Kyiv?",
        answers: ["Donau", "Dnepr", "Volga", "Rhen"],
        correctAnswer: 1,
      },
      {
        id: 108,
        question: "Vilket hav ligger söder om Ukraina?",
        answers: ["Svarta havet", "Östersjön", "Nordsjön", "Kaspiska havet"],
        correctAnswer: 0,
      },
      {
        id: 109,
        question: "Vilken ukrainsk stad är känd för sin operabyggnad och sin historiska stadskärna?",
        answers: ["Odesa", "Dnipro", "Lviv", "Zaporizjzja"],
        correctAnswer: 2,
      },
      {
        id: 110,
        question: "Vad heter den ukrainska rödbetssoppan som även grannländer gärna gör anspråk på?",
        answers: ["Gazpacho", "Minestrone", "Bouillabaisse", "Borsjtj"],
        correctAnswer: 3,
      },
      {
        id: 111,
        question: "Vilken valuta används i Ukraina?",
        answers: ["Rubel", "Hryvnia", "Zloty", "Euro"],
        correctAnswer: 1,
      },
      {
        id: 112,
        question: "Vilken bergskedja sträcker sig genom västra Ukraina?",
        answers: ["Alperna", "Uralbergen", "Karpaterna", "Kaukasus"],
        correctAnswer: 2,
      },
      {
        id: 113,
        question: "Vilket land gränsar till Ukraina i väster?",
        answers: ["Polen", "Frankrike", "Sverige", "Georgien"],
        correctAnswer: 0,
      },
      {
        id: 114,
        question: "Vad kallas ukrainska påskägg med intrikata mönster?",
        answers: ["Pierogi", "Blini", "Paska", "Pysanky"],
        correctAnswer: 3,
      },
    ],
  },
  {
    id: "canada",
    requiredCorrectAnswers: 8,
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
      {
        id: 115,
        question: "Vilka två språk är officiella på federal nivå i Kanada?",
        answers: ["Engelska och spanska", "Engelska och franska", "Franska och tyska", "Engelska och inuitiska"],
        correctAnswer: 1,
      },
      {
        id: 116,
        question: "Vilket känt vattenfall ligger vid gränsen mellan Kanada och USA?",
        answers: ["Niagarafallen", "Victoriafallen", "Iguazúfallen", "Angel Falls"],
        correctAnswer: 0,
      },
      {
        id: 117,
        question: "Vilken kanadensisk provins har franska som enda officiella språk?",
        answers: ["Ontario", "Alberta", "Québec", "Manitoba"],
        correctAnswer: 2,
      },
      {
        id: 118,
        question: "Vilket djur är en officiell symbol för Kanada och bygger bättre dammar än de flesta ingenjörer?",
        answers: ["Älg", "Isbjörn", "Lodjur", "Bäver"],
        correctAnswer: 3,
      },
      {
        id: 119,
        question: "Vilket hav ligger väster om Kanada?",
        answers: ["Atlanten", "Stilla havet", "Indiska oceanen", "Nordsjön"],
        correctAnswer: 1,
      },
      {
        id: 120,
        question: "I vilken kanadensisk stad finns CN Tower?",
        answers: ["Vancouver", "Ottawa", "Toronto", "Calgary"],
        correctAnswer: 2,
      },
      {
        id: 121,
        question: "Vad heter Kanadas största provins till ytan?",
        answers: ["Québec", "Ontario", "Alberta", "British Columbia"],
        correctAnswer: 0,
      },
      {
        id: 122,
        question: "Vilken sport förknippas särskilt med puck, klubba och kanadensiska vintrar?",
        answers: ["Cricket", "Baseboll", "Rugby", "Ishockey"],
        correctAnswer: 3,
      },
    ],
  },
  {
    id: "usa",
    requiredCorrectAnswers: 6,
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
      {
        id: 123,
        question: "Hur många delstater har USA?",
        answers: ["48", "50", "52", "51"],
        correctAnswer: 1,
      },
      {
        id: 124,
        question: "Vilken delstat är känd för Grand Canyon?",
        answers: ["Florida", "Nevada", "Arizona", "Texas"],
        correctAnswer: 2,
      },
      {
        id: 125,
        question: "I vilken stad ligger Hollywood, där drömmar får en egen skylt?",
        answers: ["Los Angeles", "Las Vegas", "San Francisco", "Chicago"],
        correctAnswer: 0,
      },
      {
        id: 126,
        question: "Vilket hav ligger öster om USA:s fastland?",
        answers: ["Stilla havet", "Indiska oceanen", "Norra ishavet", "Atlanten"],
        correctAnswer: 3,
      },
      {
        id: 127,
        question: "Vilket amerikanskt landmärke har porträtt av fyra presidenter uthuggna i berg?",
        answers: ["Grand Canyon", "Mount Rushmore", "Golden Gate-bron", "Empire State Building"],
        correctAnswer: 1,
      },
      {
        id: 128,
        question: "Vilken delstat ligger längst norrut i USA?",
        answers: ["Washington", "Maine", "Alaska", "Montana"],
        correctAnswer: 2,
      },
      {
        id: 129,
        question: "Vad heter USA:s valuta?",
        answers: ["Dollar", "Euro", "Pund", "Peso"],
        correctAnswer: 0,
      },
      {
        id: 130,
        question: "Vilken amerikansk stad brukar kallas 'The Big Apple'?",
        answers: ["Boston", "Seattle", "Miami", "New York"],
        correctAnswer: 3,
      },
    ],
  },
  {
    id: "sweden",
    requiredCorrectAnswers: 6,
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
      {
        id: 43,
        question: "Vilken är Sveriges största sjö?",
        answers: ["Vättern", "Vänern", "Mälaren", "Hjälmaren"],
        correctAnswer: 1,
      },
      {
        id: 44,
        question: "Vilken är Sveriges största ö?",
        answers: ["Öland", "Orust", "Gotland", "Fårö"],
        correctAnswer: 2,
      },
      {
        id: 45,
        question: "Vad heter Sveriges högsta berg?",
        answers: ["Kebnekaise", "Åreskutan", "Sarektjåkkå", "Helags"],
        correctAnswer: 0,
      },
      {
        id: 46,
        question: "Vilken är Sveriges näst största stad?",
        answers: ["Malmö", "Uppsala", "Västerås", "Göteborg"],
        correctAnswer: 3,
      },
      {
        id: 47,
        question: "Vilken stad på Gotland är känd för sin medeltida ringmur?",
        answers: ["Kalmar", "Visby", "Karlskrona", "Norrköping"],
        correctAnswer: 1,
      },
      {
        id: 48,
        question: "Vilken valuta använder Sverige?",
        answers: ["Euro", "Danska kronor", "Svenska kronor", "Norska kronor"],
        correctAnswer: 2,
      },
      {
        id: 49,
        question: "Vilket landskap ligger längst söderut i Sverige?",
        answers: ["Halland", "Blekinge", "Småland", "Skåne"],
        correctAnswer: 3,
      },
      {
        id: 50,
        question: "Vilken bro förbinder Malmö med Köpenhamn?",
        answers: ["Öresundsbron", "Ölandsbron", "Stora Bältbron", "Höga Kusten-bron"],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: "norway",
    requiredCorrectAnswers: 8,
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
      {
        id: 35,
        question:
          "Vad heter de smala havsvikar där havet smugit in mellan bergen?",
        answers: ["Deltan", "Fjordar", "Laguner", "Kanaler"],
        correctAnswer: 1,
      },
      {
        id: 36,
        question: "Vad heter Norges högsta berg?",
        answers: ["Glittertind", "Preikestolen", "Trolltunga", "Galdhøpiggen"],
        correctAnswer: 3,
      },
      {
        id: 37,
        question: "Vilken valuta använder Norge?",
        answers: ["Norska kronor", "Euro", "Svenska kronor", "Danska kronor"],
        correctAnswer: 0,
      },
      {
        id: 38,
        question:
          "Vilken norsk ögrupp ligger så långt norrut att isbjörnar kan dyka upp?",
        answers: ["Lofoten", "Färöarna", "Svalbard", "Åland"],
        correctAnswer: 2,
      },
      {
        id: 39,
        question: "Vilka två länder gränsar Norge till, förutom Sverige?",
        answers: [
          "Danmark och Finland",
          "Finland och Ryssland",
          "Ryssland och Island",
          "Finland och Estland",
        ],
        correctAnswer: 1,
      },
      {
        id: 40,
        question:
          "Vilken norsk ögrupp är känd för dramatiska berg och fiskebyar?",
        answers: ["Svalbard", "Åland", "Färöarna", "Lofoten"],
        correctAnswer: 3,
      },
      {
        id: 41,
        question:
          "Vilken norsk stad är så känd för regn att regnjackan får jobba övertid?",
        answers: ["Bergen", "Tromsø", "Oslo", "Kristiansand"],
        correctAnswer: 0,
      },
      {
        id: 42,
        question: "Vilket hav ligger utanför Lofoten?",
        answers: ["Nordsjön", "Barents hav", "Norska havet", "Östersjön"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "denmark",
    requiredCorrectAnswers: 6,
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
        answers: [
          "Karusellkontoret",
          "Hemma",
          "Nöjesministeriet",
          "Rutsjebanehuset",
        ],
        correctAnswer: 1,
      },
      {
        id: 32,
        question: "På vilken ö ligger Köpenhamn?",
        answers: ["Fyn", "Bornholm", "Själland", "Gotland"],
        correctAnswer: 2,
      },
      {
        id: 33,
        question: "Vad heter Danmarks stora halvö?",
        answers: ["Jylland", "Själland", "Fyn", "Bornholm"],
        correctAnswer: 0,
      },
      {
        id: 34,
        question: "Vilken bro förbinder Danmark med Sverige?",
        answers: [
          "Öresundsbron",
          "Stora Bältbron",
          "Lilla Bältbron",
          "Ölandsbron",
        ],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: "finland",
    requiredCorrectAnswers: 8,
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
      {
        id: 51,
        question: "Vilken valuta använder Finland?",
        answers: ["Finska mark", "Svenska kronor", "Euro", "Norska kronor"],
        correctAnswer: 2,
      },
      {
        id: 52,
        question: "Vad heter Finlands största sjö?",
        answers: ["Saimen", "Päijänne", "Enare träsk", "Ule träsk"],
        correctAnswer: 0,
      },
      {
        id: 53,
        question: "Vad heter Finlands nordligaste landskap?",
        answers: ["Nyland", "Satakunta", "Egentliga Finland", "Lappland"],
        correctAnswer: 3,
      },
      {
        id: 54,
        question: "Vilken finsk stad marknadsförs som jultomtens hemstad?",
        answers: ["Åbo", "Rovaniemi", "Tammerfors", "Uleåborg"],
        correctAnswer: 1,
      },
      {
        id: 55,
        question: "Vilken vik ligger Helsingfors vid?",
        answers: ["Bottenviken", "Finska viken", "Rigabukten", "Bengaliska viken"],
        correctAnswer: 1,
      },
      {
        id: 56,
        question: "Vilken självstyrande ögrupp tillhör Finland?",
        answers: ["Färöarna", "Svalbard", "Lofoten", "Åland"],
        correctAnswer: 3,
      },
      {
        id: 57,
        question: "Vilket land gränsar Finland till i öster?",
        answers: ["Ryssland", "Estland", "Danmark", "Polen"],
        correctAnswer: 0,
      },
      {
        id: 58,
        question: "Vilket språk är officiellt i Finland, förutom finska?",
        answers: ["Norska", "Danska", "Svenska", "Isländska"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "iceland",
    requiredCorrectAnswers: 10,
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
      {
        id: 59,
        question: "Vilka kontinentalplattor möts vid Þingvellir?",
        answers: [
          "Den afrikanska och den eurasiska",
          "Den nordamerikanska och den eurasiska",
          "Den nordamerikanska och den sydamerikanska",
          "Den antarktiska och den eurasiska",
        ],
        correctAnswer: 1,
      },
      {
        id: 60,
        question: "Vad heter Islands största glaciär?",
        answers: ["Langjökull", "Mýrdalsjökull", "Vatnajökull", "Eyjafjallajökull"],
        correctAnswer: 2,
      },
      {
        id: 61,
        question: "Vilken gejser på Island får regelbundna utbrott?",
        answers: ["Strokkur", "Geysir", "Hekla", "Gullfoss"],
        correctAnswer: 0,
      },
      {
        id: 62,
        question: "Vilket vattenfall ingår i Gyllene cirkeln?",
        answers: ["Dettifoss", "Skógafoss", "Seljalandsfoss", "Gullfoss"],
        correctAnswer: 3,
      },
      {
        id: 63,
        question: "Vad heter Islands högsta bergstopp?",
        answers: ["Hekla", "Esja", "Hvannadalshnúkur", "Galdhøpiggen"],
        correctAnswer: 2,
      },
      {
        id: 64,
        question: "Vilken isländsk vulkan fick Europas flygtrafik att ta en oplanerad paus 2010?",
        answers: ["Katla", "Eyjafjallajökull", "Hekla", "Fagradalsfjall"],
        correctAnswer: 1,
      },
      {
        id: 65,
        question: "På vilken halvö ligger Islands internationella flygplats Keflavík?",
        answers: ["Snæfellsnes", "Tröllaskagi", "Vatnsnes", "Reykjanes"],
        correctAnswer: 3,
      },
      {
        id: 66,
        question: "Vilken valuta använder Island?",
        answers: ["Isländska kronor", "Euro", "Danska kronor", "Norska kronor"],
        correctAnswer: 0,
      },
    ],
  },
];

export const questions: Question[] = questionPacks.flatMap(
  (pack) => pack.questions,
);

// 10 questions per pack
// difficulty 1 -> 6/10
// difficulty 2 -> 8/10
// difficulty 3 -> 10/10

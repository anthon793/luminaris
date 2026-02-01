export const people = [
  {
    id: '1',
    name: 'Albert Einstein',
    category: 'Science',
    country: 'Germany',
    lat: 51.1657,
    lng: 10.4515,
    bio: 'Theoretical physicist known for developing the theory of relativity, which revolutionized our understanding of space, time, gravity, and the universe.',
    period: '1879–1955',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg/220px-Einstein_1921_by_F_Schmutzer_-_restoration.jpg'
  },
  {
    id: '2',
    name: 'Nelson Mandela',
    category: 'Activism',
    country: 'South Africa',
    lat: -30.5595,
    lng: 22.9375,
    bio: 'Anti-apartheid revolutionary and political leader who served as the first president of South Africa from 1994 to 1999.',
    period: '1918–2013',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Nelson_Mandela_1994.jpg/220px-Nelson_Mandela_1994.jpg'
  },
  {
    id: '3',
    name: 'Frida Kahlo',
    category: 'Arts',
    country: 'Mexico',
    lat: 19.4326,
    lng: -99.1332,
    bio: 'Mexican painter known for her many portraits, self-portraits, and works inspired by the nature and artifacts of Mexico.',
    period: '1907–1954',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Frida_Kahlo%2C_by_Guillermo_Kahlo.jpg/220px-Frida_Kahlo%2C_by_Guillermo_Kahlo.jpg'
  },
  {
    id: '4',
    name: 'Marie Curie',
    category: 'Science',
    country: 'Poland',
    lat: 52.2297,
    lng: 21.0122,
    bio: 'Physicist and chemist who conducted pioneering research on radioactivity. She was the first woman to win a Nobel Prize.',
    period: '1867–1934',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Marie_Curie_1903.jpg/220px-Marie_Curie_1903.jpg'
  },
  {
    id: '5',
    name: 'Wolfgang Amadeus Mozart',
    category: 'Music',
    country: 'Austria',
    lat: 47.8095,
    lng: 13.0550,
    bio: 'Prolific and influential composer of the Classical period. He created over 600 works of symphonic, concertante, chamber, operatic, and choral music.',
    period: '1756–1791',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Wolfgang-amadeus-mozart_1.jpg/220px-Wolfgang-amadeus-mozart_1.jpg'
  },
  {
    id: '6',
    name: 'Martin Luther King Jr.',
    category: 'Activism',
    country: 'USA',
    lat: 33.7490,
    lng: -84.3880,
    bio: 'American Baptist minister and activist who became the most visible spokesperson and leader in the civil rights movement.',
    period: '1929–1968',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Martin_Luther_King%2C_Jr..jpg/220px-Martin_Luther_King%2C_Jr..jpg'
  },
  {
    id: '7',
    name: 'Mahatma Gandhi',
    category: 'Activism',
    country: 'India',
    lat: 21.7679,
    lng: 78.8718,
    bio: 'Indian lawyer, anti-colonial nationalist, and political ethicist who employed nonviolent resistance to lead the successful campaign for India\'s independence.',
    period: '1869–1948',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Mahatma-Gandhi-studio-1931.jpg/220px-Mahatma-Gandhi-studio-1931.jpg'
  },
  {
    id: '8',
    name: 'Leonardo da Vinci',
    category: 'Arts',
    country: 'Italy',
    lat: 43.7696,
    lng: 11.2558,
    bio: 'Italian polymath of the High Renaissance who was active as a painter, draughtsman, engineer, scientist, theorist, sculptor, and architect.',
    period: '1452–1519',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Leonardo_da_Vinci_-_presumed_self-portrait_-_WGA12798.jpg/220px-Leonardo_da_Vinci_-_presumed_self-portrait_-_WGA12798.jpg'
  },
  {
    id: '9',
    name: 'Cleopatra VII',
    category: 'Politics',
    country: 'Egypt',
    lat: 31.2001,
    lng: 29.9187,
    bio: 'Queen of the Ptolemaic Kingdom of Egypt from 51 to 30 BC, and its last active ruler.',
    period: '69–30 BC',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Kleopatra-VII.-Altes-Museum-Berlin1.jpg/220px-Kleopatra-VII.-Altes-Museum-Berlin1.jpg'
  },
  {
    id: '10',
    name: 'Malala Yousafzai',
    category: 'Activism',
    country: 'Pakistan',
    lat: 34.0151,
    lng: 71.5249,
    bio: 'Pakistani female education activist and the 2014 Nobel Peace Prize laureate.',
    period: '1997–Present',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Malala_Yousafzai_2015.jpg/220px-Malala_Yousafzai_2015.jpg'
  }
];

export const categories = [...new Set(people.map(p => p.category))];

const randomMovieQuotes = [
  "Come on Francis, you are better than this!",
  "Strange things are afoot at the Circle-K",
  "Great Scott!!",
  "Say my name...",
  "I am the one who knocks",
  "I know a guy... Who knows a guy who knows another guy..."
];

const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
}

export const getRandomMovieQuote = () => {
  return randomMovieQuotes[getRandomInt(randomMovieQuotes.length)];
}

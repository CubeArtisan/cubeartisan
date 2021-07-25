export const calculateBotPick = (drafterState) => ({
  cardOracleIds: [
    "9056eba4-612b-4e82-8689-fe098241b007",
    "7060f2c8-fca0-4b7a-bddf-37682f434596",
    "4c702b96-3288-435d-9154-5b7454419896",
    "ea1eb902-a23c-44ff-9169-19baf71de238",
    "9965d9c5-2ebf-4a6c-930e-55c5890979be",
    "7ea71a36-8fa8-4ba3-9cb1-7fc6917c3ddd",
    "efe3204d-2013-47a1-ad68-adfbb2d0be8f",
    "2987c385-011a-4032-a516-a46d1e9dc9e8",
    "f60fb81a-969a-476c-a227-5231bbed4ad4",
    "e55d9377-f89a-41e5-a094-730d6f24caf0",
    "1de1b591-a73f-4974-b507-8c63e07a0868",
    "7a51780a-fa28-4ee0-94c7-4330800ca9cb",
    "104386d9-93b4-4a18-86d5-68718b474f4a",
    "91fbb25b-8521-483f-88b0-77778d25f7fd",
    "158a6225-a246-4fd6-aa57-0df8067b4383",
  ], // Oracle/Gatherer IDs of all the cards referenced in this object
  picked: [0, 1, 2], // Indices of the oracle IDs of the card this player has picked so far this draft.
  seen: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // Indices of the oracle IDs of all the cards this player has seen this draft, including duplicates.
  basics: [10, 11, 12, 13, 14], // Indices of the oracle IDs for the set of basics the drafter has access to unlimited copies of.
  cardsInPack: [7, 8, 9], // Indices of the oracle IDs for the cards in the current pack.
  packNum: 0, // 0-Indexed pack number
  numPacks: 3, // How many packs will this player open
  pickNum: 4, // 0-Indexed pick number from this pack (so this will be the 5th card they've picked since opening the first pack of the draft).
  numPicks: 15, // How many cards were in the pack when it was opened.
  seed: 37, // A random seed for the randomized portions of the algorithm, best not to use a constant, is reproducible if this is known.
  options: options, // These make it so if you're handling these differently you can track the parameters that were given.
  chosenOption: 0, // The index in the options array that the bot thinks is best.
  scores: [
    // Scores for each option with explanations.
    {
      score: 0.7685, // Score for the card in the range [0, 1].
      lands: [
        0, 0, 0, 7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 2,
      ], // number of lands for each color combination (you can get the color combinations in canoncial order from the COLOR_COMBINATIONS export).
      oracleResults: [
        // Scores from each oracle that are combined to give the total score. Can be used to show explanations for the descisions.
        {
          title: "Rating", // Display ready name for this oracle.
          tooltip: "The rating based on the current land combination.", // Display ready tooltip describing the oracle.
          weight: 0.3576, // Relative weight of the oracle compared to the other oracles. All are non-negative and sum to 1.
          value: 0.468, // Score from the oracle in the range [0, 1].
          per_card: [0.532, 0.404], // Score for each card in the option individually (some oracles don't care about the card in the pack and will only have 1 item here regardless of the number in the option).
        },
      ],
    },
  ],
  recognized: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 1 if the card is in the data the draftbots understand or 0 if it is not recognized (same as result of testRecognized).
});
export const calculateBotPickFromOptions = (drafterState, options) =>
  calculateBotPick(drafterState);
export const initializeDraftbots = (url) => true;
export const testRecognized = (oracleIds) => oracleIds.map(() => true);
export const terminateDraftbots = () => true;
export const restartDraftbots = (url) => true;
export const startPool = (numWorkers, url) => true;

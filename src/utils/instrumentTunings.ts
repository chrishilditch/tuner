export interface Note {
  name: string;
  frequency: number;
}

export interface Tuning {
  name: string;
  notes: Note[];
}

export interface Instrument {
  name: string;
  tunings: Tuning[];
}

const noteLowE = { name: "E", frequency: 41.203 };
const noteLowA = { name: "A", frequency: 55 };
const noteLowD = { name: "D", frequency: 73.416 };
const noteE = { name: "E", frequency: 82.41 };
const noteG2 = { name: "G", frequency: 97.999 };
const noteA = { name: "A", frequency: 110 };
const noteD = { name: "D", frequency: 146.83 };
const noteG = { name: "G", frequency: 196 };
const noteHighA = { name: "A", frequency: 220 };
const noteB = { name: "B", frequency: 246.94 };
const noteHighD = { name: "B", frequency: 293.66 };
const noteHighE = { name: "E", frequency: 329.63 };

const baseTuning: Tuning = {
  name: "Standard",
  notes: [noteLowE, noteLowA, noteLowD, noteG2],
};

const tuning: Tuning = {
  name: "Standard",
  notes: [noteE, noteA, noteD, noteG, noteB, noteHighE],
};

const dropDTuning: Tuning = {
  name: "Drop D",
  notes: [noteLowD, noteA, noteD, noteG, noteB, noteHighE],
};

const dadgadTuning: Tuning = {
  name: "DADGAD",
  notes: [noteLowD, noteA, noteD, noteG, noteHighA, noteHighD],
};

export const baseTunings: Tuning[] = [baseTuning];

export const guitarTunings: Tuning[] = [tuning, dropDTuning, dadgadTuning];

export const instruments = [
  { name: "Guitar", tunings: guitarTunings },
  { name: "Bass", tunings: baseTunings },
];

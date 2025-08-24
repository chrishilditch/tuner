import { useEffect, useState } from "react";
import { useGetNote } from "../../../hooks/useGetNote";
import { CiMicrophoneOn } from "react-icons/ci";
import Display from "./display";
import {
  instruments,
  type Instrument,
  type Tuning,
  type Note,
} from "../../../utils/instrumentTunings";
import Select from "../../designSystem/select";
import Button from "../../designSystem/button";
import IconButton from "../../designSystem/iconButton";

export const Tuner = () => {
  const [activeInstrument, setActiveInstrument] = useState<Instrument>(
    instruments[0]
  );
  const [activeTuning, setActiveTuning] = useState<Tuning>(
    activeInstrument.tunings[0]
  );
  const [activeNote, setActiveNote] = useState<Note>(activeTuning.notes[0]);

  const { start, stop, pitch, targetState, active } = useGetNote();

  /**
   * Automatically advance to the next note when the current note is hit.
   */
  useEffect(() => {
    if (targetState === "hit") {
      const tuningIndex = activeTuning.notes.findIndex(
        (note) => note.frequency === activeNote.frequency
      );
      const nextNote =
        activeTuning.notes[(tuningIndex + 1) % activeTuning.notes.length];
      stop();
      setActiveNote(nextNote);
      start(nextNote.frequency);
    }
  }, [targetState, activeTuning, activeNote, stop, start]);

  const handleInstrumentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedInstrumentName = event.target.value;
    const selectedInstrument = instruments.find(
      (instrument) => instrument.name === selectedInstrumentName
    )!;
    const newTuning = selectedInstrument.tunings[0];

    stop();
    setActiveInstrument(selectedInstrument);
    setActiveTuning(newTuning);
    setActiveNote(newTuning.notes[0]);
    start(newTuning.notes[0].frequency);
  };

  const handleTuningChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTuning = event.target.value;
    const newTuning = activeInstrument.tunings.find(
      (tuning) => tuning.name === selectedTuning
    )!;

    stop();
    setActiveTuning(newTuning);
    setActiveNote(newTuning.notes[0]);
    start(newTuning.notes[0].frequency);
  };

  const handleNoteChange = (note: Note) => {
    stop();
    setActiveNote(note);
    start(note.frequency);
  };

  return (
    <div className="flex items-center flex-col gap-4">
      <div className="relative">
        <Display pitch={pitch} activeNote={activeNote} />
        {!active && (
          <div className="bg-tuner-dark-turquoise/25 absolute top-0 left-0 w-full h-full flex items-center justify-center rounded-md">
            <IconButton onClick={() => start(activeNote.frequency)}>
              <CiMicrophoneOn size={64} />
              <span>Start listening</span>
            </IconButton>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        {activeTuning.notes.map((note, index) => {
          return (
            <Button
              key={index}
              variant={
                activeNote.frequency === note.frequency
                  ? "turquoise"
                  : "dark-turquoise"
              }
              onClick={() => {
                handleNoteChange(note);
              }}
              data-testid={
                activeNote.frequency === note.frequency
                  ? `note-${note.name}--active`
                  : `note-${note.name}--inactive`
              }
              progress={
                activeNote.frequency === note.frequency
                  ? targetState === undefined
                    ? 0
                    : targetState === "hit"
                      ? 100
                      : targetState * 10
                  : undefined
              }
            >
              <strong className="relative z-2">{note.name}</strong>
            </Button>
          );
        })}
      </div>

      <div className="flex gap-2">
        <Select
          id="instrument-select"
          data-testid="instrument-select"
          value={activeInstrument.name}
          onChange={handleInstrumentChange}
        >
          {instruments.map((instrument) => (
            <option key={instrument.name} value={instrument.name}>
              Instrument: {instrument.name}
            </option>
          ))}
        </Select>
        <Select
          id="tuning-select"
          data-testid="tuning-select"
          value={activeTuning.name}
          onChange={handleTuningChange}
        >
          {activeInstrument.tunings.map((tuning) => (
            <option key={tuning.name} value={tuning.name}>
              Tuning: {tuning.name}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default Tuner;

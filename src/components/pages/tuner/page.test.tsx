import { expect, test, vi, beforeEach } from "vitest";
import { render } from "vitest-browser-react";
import Tuner from "./page";
import {
  mockGetUserMedia,
  mockAudioContext,
} from "../../../testUtils/audioContext";

vi.mock("pitchy", () => {
  return {
    PitchDetector: {
      forFloat32Array: vi.fn(() => ({
        findPitch: vi.fn(() => [82]),
      })),
    },
  };
});

Object.defineProperty(window.navigator, "mediaDevices", {
  value: {
    getUserMedia: mockGetUserMedia,
  },
});

beforeEach(() => {
  window.AudioContext = mockAudioContext;
});

test("basic render test", async () => {
  const { getByText } = render(<Tuner />);

  await expect.element(getByText("Start listening")).toBeInTheDocument();
});

test("tunes E note, and auto-progresses to the A note", async () => {
  const { getByText, getByTestId } = render(<Tuner />);

  await expect.element(getByText("Start listening")).toBeInTheDocument();
  await getByText("Start listening").click();

  await expect.element(getByTestId("note-E--active")).toBeInTheDocument();
  await expect.element(getByTestId("note-A--inactive")).toBeInTheDocument();
  await expect.element(getByTestId("active-0")).toBeInTheDocument();
  await expect.element(getByTestId("inactive-3")).toBeInTheDocument();

  await expect.element(getByTestId("note-E--inactive")).toBeInTheDocument();
  await expect.element(getByTestId("note-A--active")).toBeInTheDocument();
  await expect.element(getByTestId("active--11")).toBeInTheDocument();
  await expect.element(getByTestId("inactive-0")).toBeInTheDocument();
});

test("change note", async () => {
  const { getByText } = render(<Tuner />);

  await expect.element(getByText("Start listening")).toBeInTheDocument();
  await getByText("D", { exact: true }).click();
  await expect.element(getByText("146.83")).toBeInTheDocument();

  await getByText("B", { exact: true }).click();
  await expect.element(getByText("246.94")).toBeInTheDocument();
});

test("change instrument", async () => {
  const { getByText, getByTestId } = render(<Tuner />);

  await expect.element(getByText("Start listening")).toBeInTheDocument();

  await getByTestId("instrument-select").selectOptions("Instrument: Bass");
  await expect.element(getByText("41.203")).toBeInTheDocument();

  await getByText("D", { exact: true }).click();
  await expect.element(getByText("73.416")).toBeInTheDocument();
});

test("change tuning", async () => {
  const { getByText, getByTestId } = render(<Tuner />);

  await expect.element(getByText("Start listening")).toBeInTheDocument();

  await getByTestId("tuning-select").selectOptions("Tuning: Drop D");
  await expect.element(getByText("73.416")).toBeInTheDocument();
});

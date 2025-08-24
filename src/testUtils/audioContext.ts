import { vi } from "vitest";

const mockConnect = vi.fn();

const mockCreateAnalyser = vi.fn(() => {
  return {
    connect: mockConnect,
    getFloatTimeDomainData: vi.fn(),
  };
});

export const mockAudioContext = vi.fn(() => {
  return {
    createAnalyser: mockCreateAnalyser,
    createMediaStreamSource: vi.fn(() => ({
      connect: vi.fn(),
    })),
  };
}) as unknown as typeof window.AudioContext;

export const mockGetUserMedia = vi.fn(async () => {
  return new Promise<void>((resolve) => {
    resolve();
  });
});

import { RefObject } from "react";
import { createMachine } from "xstate";

export const videoPlayerMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QDcCWEwHsAKAbAhgJ5gBOAdAA74CuskAxNgDICCAmgNoAMAuoqBUyxUAF1SYAdvxAAPRAEZ5AdjIA2ABxKArABoQhBQBZVAXxN60GHAWLkKN1BKj0AygBUA8tm58kIQcJiktJyCPJcAExqmrr6iOqGZFpm5iASmBjwfpZYeESk0gGi4lJ+oQC08qoAnHoGCOUAzGYW6Lk2pJQ0dBCFQsXBZYiVEfJ18Spc6o0zs3ONhi0gOdb5dg5OfYElIYiNXInyEbH11VpJ0-PziylAA */ // cspell: disable-line
    id: "videoPlayer",
    initial: "paused",
    context: {},
    states: {
      paused: {
        entry: "stop",
        on: {
          PLAY: "playing",
        },
      },
      playing: {
        entry: "play",
        on: {
          STOP: "paused",
        },
      },
    },
  },
  {
    actions: {
      stop: (context) => {
        console.log("STOP");
      },
      play: (context) => {
        console.log("PLAY");
      },
    },
  }
);

import { createMachine } from "xstate";

export const waterMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QHcCGAXMAnAdAGwEsBHAVwIgGIAxAJQFE6AtOgbQAYBdRUABwHtYBdAT4A7biAAeiACwycANgCsCgExKANCACeiAMxsFOJQF8TWtJlyFS5CgAk6AQQAq7LkhD9BwsROkIAIwAHApauggAnHo4bEpsCYlJbIFmFhjYOAQAxmAOzm6cEt5CIuKeASFhOoiqMqnmIJaZUKiw+a7uxQKlfhWyMkbRAOyaNVExccnTemlNGbit7bQMzF2eJb7loJXDwbGBKurhiIGRc824PHhtALao1PRMrEUbPVv+snqqODJ6oycguc5qI+BA4BJLt0fGVPggALTVCKI-bxRLDNTRSIyJSzRqXfDEMgQaG9bZSWSqQHRWKmfELLK5UkffoIPSBH4hAHjVR6eRsYJ6IXCkXsi4MpbM2GsgzyBTBbkRSJsWKC0Xq8VWHDXO6oKV9HaIJS4xTHcY0qbTJJ4sxAA */
  id: "water",
  initial: "liquid",
  states: {
    liquid: {
      on: {
        FREEZE: {
          target: "ice",
        },
        HEAT: {
          target: "gas",
        },
      },
      entry: () => {},
      exit: () => {},
    },
    ice: {
      on: {
        HEAT: {
          target: "liquid",
        },
      },
    },
    gas: {
      on: {
        HEAT: {
          target: "plasma",
        },
        FREEZE: {
          target: "liquid",
        },
      },
    },
    plasma: {
      on: {
        FREEZE: "gas",
      },
    },
  },
});

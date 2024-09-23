import { actions, assign, createMachine, send } from "xstate";

const DELAY = 1000;

const { cancel } = actions;

export const searchMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5SzAQwE4GMAWBiAKgJoAKAogNoAMAuoqAA4D2sAlgC4uMB2dIAHogCcAZgB0ADkGUAbACYArABoQAT0SzhARlEB2eZUqb5C8TskyAvheUoMOXAGVSAQQBKAYQASVWkhBNWDm5eAQR5HWU1BE0AFkoraxAuRgg4XlssbF4A9k4eP1DBSMQAWmkrGzRM0RYIABswbOZc4ILEcNFhKTklVURxbXkKkAycUVHsFi4oJsC8kMRNAd0BhWLouNF9AyMTM26EiyA */
    predictableActionArguments: true,
    id: "search",
    initial: "idle",
    schema: {
      context: {} as {
        phrase: string;
        result: number | undefined;
      },
      events: {} as
        | { type: "TYPE"; data: string }
        | { type: "SEARCH"; data: undefined },
    },
    context: {
      phrase: "",
      result: undefined,
    },
    on: {
      TYPE: {
        actions: ["setPhrase", "cancelSearchEvent", "sendSearchEvent"],
      },
      SEARCH: {
        target: ".searching",
      },
    },
    states: {
      idle: {},
      searching: {
        invoke: {
          src: "search",
          onDone: {
            actions: "setResult",
            target: "idle",
          },
          onError: {
            target: "idle",
          },
        },
      },
    },
  },
  {
    actions: {
      setPhrase: assign({
        phrase: (_, event) => {
          if (event.type === "TYPE") {
            return event.data;
          }

          return "";
        },
      }),
      cancelSearchEvent: cancel("searchEvent"),
      sendSearchEvent: send(
        { type: "SEARCH" },
        {
          id: "searchEvent",
          delay: DELAY,
        }
      ),
      setResult: assign({
        result: (_, event) => {
          if (event.type === "SEARCH") {
            return Math.random();
          }

          return undefined;
        },
      }),
    },
    services: {
      search: async () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(Math.random());
          }, DELAY);
        });
      },
    },
  }
);

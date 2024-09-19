import { assign, createMachine } from "xstate";
import { invoke } from "xstate/lib/actionTypes";

interface FetchMachineContext {
  data: string[];
}

export const fetchMachine = createMachine<FetchMachineContext>(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QDMwBcDGALAxAMQFEAVAYQAkBtABgF1FQAHAe1gEs1WmA7ekAD0QAWAEwAaEAE9EARiqCAdAFYAvsvGpMWeQzBcIrLlBwRuYeQYBuTANZmN2bbv2GElphgCGHbtRq-ezGzePEj8iADMwgCc8sJU4dLCiuJSCFHS8gDsKmog9lo6egZGYABOpUyl2gA2XsiVALby+Y5FLm6ewb7+oYHsnCGgAgiRMXEJSSkyilSxOblcTBBwvPkBLP3cvMMAtABsUwj7quroDqwQ1WDrQQPbQmKSMns5p5qtzlA3m4NhCNJ7A5PBAADgyrzyZy0sAArhgMHB4L0NsF7ghBJlZuEolQ9pNgTishCWmUKqVvqjQsMMVicXjksDpIIxvNlEA */ // cspell: disable-line
    predictableActionArguments: true,
    id: "fetch",
    initial: "idle",
    context: {
      data: ["Init data..."],
    },
    on: {
      FETCH: {
        target: "pending",
      },
    },
    states: {
      idle: {},
      pending: {
        on: {
          FETCH: undefined,
        },
        invoke: {
          src: "fetch",
          onDone: {
            target: "success",
            actions: "setData",
          },
          onError: {
            target: "error",
          },
        },
      },
      success: {},
      error: {},
    },
  },
  {
    actions: {
      setData: assign({
        data: (_, event) => event.data,
        // data: (context, event) => [...context.data, ...event.data],
      }),
    },
    services: {
      fetch: async () => {
        return new Promise<string[]>((resolve, reject) => {
          setTimeout(() => {
            const random = Math.random();

            if (random > 0.5) {
              resolve(["A", "B", "C"]);
            } else {
              reject();
            }
          }, 1000);
        });
      },
    },
  }
);

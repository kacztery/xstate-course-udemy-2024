"use client";

import { useMachine } from "@xstate/react";

import { waterMachine } from "../../machines/waterMachine";

export default function Home() {
  const [state, send] = useMachine(waterMachine);

  return (
    <main>
      <h1>XState works!</h1>

      <p>
        Initial state: <strong>{JSON.stringify(state.value)}</strong>.
      </p>

      <button
        type="button"
        onClick={() =>
          send({
            type: "HEAT",
          })
        }
      >
        HEAT
      </button>

      <button
        type="button"
        onClick={() =>
          send({
            type: "FREEZE",
          })
        }
      >
        FREEZE
      </button>
    </main>
  );
}

"use client";

import { useMachine } from "@xstate/react";

import { searchMachine } from "../../machines/searchMachine";
import { log } from "console";

export default function Home() {
  const [state, send] = useMachine(searchMachine);

  const { phrase, result } = state.context;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    send({ type: "TYPE", data: e.target.value });
  };

  return (
    <main>
      <h1>XState works! Search Machine!</h1>

      <p>
        State: <strong>{JSON.stringify(state.value)}</strong>.
      </p>

      <p>
        Phrase: <strong>{phrase}</strong>.
      </p>

      <p>
        Result: <strong>{result}</strong>
      </p>

      <input value={phrase} onChange={handleOnChange} />
    </main>
  );
}

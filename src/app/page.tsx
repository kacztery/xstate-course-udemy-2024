"use client";

import { useMachine } from "@xstate/react";
import { fetchMachine } from "../../machines/fetchMachine";

export default function Home() {
  const [state, send] = useMachine(fetchMachine);

  return (
    <main>
      <h1>XState works! Fetch Machine!</h1>

      {state.matches("pending") && <p>Fetching data...</p>}

      {state.matches("success") && (
        <ul>
          {state.context.data.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}

      {state.matches("error") && <p>Error...</p>}

      <br />
      <button type="button" onClick={() => send("FETCH")}>
        Fetch
      </button>
    </main>
  );
}

import { RefObject } from "react";
import { createMachine } from "xstate";

type videoPlayerMachineVideoOptions = {
  autoplay: boolean;
};

export const videoPlayerMachine = (
  videoRef: RefObject<HTMLVideoElement>,
  { autoplay }: videoPlayerMachineVideoOptions = { autoplay: false }
) =>
  createMachine(
    {
      /** @xstate-layout N4IgpgJg5mDOIC5QDcCWEwHsAKAbAhgJ5gBOAdAK4B2A1lZgO5UDEA2gAwC6ioADprFQAXVJio8QAD0QBGAGwAmMgFZFygDQhCiBXJll2ADgDMps+d0BfS5rQYcBYuWp1GLVjO5IQ-QSLES0ggy7MYqaprawTKGZObx5jLWtuhYeESkZLz4FLCQzNgAMgCCAJocXnwCwqLi3kHKMspkhgAsxgDsGlqyxvoAnINDw0MdySB2aY6ZvI6oVFDMAMoAKgDy2BUSvjUB9YiNzW2d3VGG+srWNiD0GPDekw4ZJNvV-nWgQQC0cpGIP+NHuknJRaPQmK8-LVAohWgo-ggFMolP15HJ0RjMcZAakniDsrlIJDdh8pIg+v0yE0Ij0ECYyK0Rkz+mNrkDpuRZkR5lBie8YQg5B19ApzkiEfTGczhqzrEA */ // cspell: disable-line
      predictableActionArguments: true,
      id: "videoPlayer",
      initial: "unknown",
      context: { videoRef },
      states: {
        unknown: {
          always: [
            {
              target: "playing",
              cond: "shouldAutoplay",
            },
            {
              target: "paused",
            },
          ],
        },
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

          if (context.videoRef.current) {
            context.videoRef.current.pause();
          }
        },
        play: (context) => {
          console.log("PLAY");

          if (context.videoRef.current) {
            context.videoRef.current.play();
          }
        },
      },
      guards: {
        shouldAutoplay: () => autoplay,
      },
    }
  );

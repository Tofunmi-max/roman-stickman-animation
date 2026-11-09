import React from "react";
import { Composition } from "remotion";
import { RomanRepublicRise } from "./roman-republic-rise";

export const RemotionRoot: React.FC = () => (
  &lt;Composition
    id="RomanRepublicRise"
    component={RomanRepublicRise}
    durationInFrames={1350}
    fps={30}
    width={1080}
    height={1920}
  /&gt;
);

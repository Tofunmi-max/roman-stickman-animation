import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";

const GOLD = "#e6b85c";
const PARCHMENT = "#d9c69b";
const RED = "#8f2929";

const scenes = [
  { start: 0, end: 180, title: "ROME WAS RULED BY KINGS", sub: "A city on the banks of the Tiber", bg: "#29231f" },
  { start: 180, end: 390, title: "A KING WHO WOULD NOT LISTEN", sub: "Tarquinius Superbus seized power", bg: "#30201f" },
  { start: 390, end: 600, title: "A CITY REACHES ITS LIMIT", sub: "The story of Lucretia sparks outrage", bg: "#201e25" },
  { start: 600, end: 825, title: "THE PEOPLE RISE", sub: "Brutus leads the revolt", bg: "#25252b" },
  { start: 825, end: 1125, title: "A REPUBLIC IS BORN", sub: "Traditionally dated to 509 BC", bg: "#202a2a" },
  { start: 1125, end: 1350, title: "THE STORY OF ROME BEGINS", sub: "Power. Ambition. War. Legacy.", bg: "#191d25" }
];

const StickFigure: React.FC&lt;{
  x: number; y: number; scale?: number; color?: string;
  shield?: boolean; spear?: boolean; cape?: boolean;
}&gt; = ({ x, y, scale = 1, color = "#eee6d5", shield = false, spear = false, cape = false }) =&gt; (
  &lt;g transform={`translate(${x} ${y}) scale(${scale})`} stroke={color} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none"&gt;
    {cape &amp;&amp; &lt;path d="M-8 -42 L-42 45 L-5 35 Z" fill={RED} stroke="none" /&gt;}
    &lt;circle cx="0" cy="-68" r="22" fill={color} stroke="none" /&gt;
    &lt;path d="M0 -43 L0 35 M0 -22 L-30 4 M0 -22 L30 4 M0 35 L-25 78 M0 35 L25 78" /&gt;
    {shield &amp;&amp; &lt;rect x="-52" y="-25" width="30" height="58" rx="5" fill={RED} stroke={GOLD} strokeWidth="4" /&gt;}
    {spear &amp;&amp; &lt;path d="M48 -100 L48 72 M38 -91 L48 -108 L58 -91" stroke={GOLD} strokeWidth="5" /&gt;}
  &lt;/g&gt;
);

const Helmet: React.FC&lt;{ x: number; y: number }&gt; = ({ x, y }) =&gt; (
  &lt;g transform={`translate(${x} ${y})`}&gt;
    &lt;path d="M-27 0 Q-28 -42 0 -47 Q28 -42 27 0 Z" fill={GOLD} stroke="#6e4c24" strokeWidth="4" /&gt;
    &lt;path d="M0 -45 Q-5 -72 0 -82 Q10 -65 8 -44" fill={RED} stroke={RED} strokeWidth="5" /&gt;
  &lt;/g&gt;
);

export const RomanRepublicRise: React.FC = () =&gt; {
  const frame = useCurrentFrame();
  const scene = scenes.find((item) =&gt; frame &gt;= item.start &amp;&amp; frame &lt; item.end) ?? scenes[5];
  const localFrame = frame - scene.start;
  const sceneLength = scene.end - scene.start;
  const progress = interpolate(localFrame, [0, sceneLength], [0, 1], { extrapolateRight: "clamp" });
  const opacity = interpolate(localFrame, [0, 16, sceneLength - 16, sceneLength], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const zoom = interpolate(localFrame, [0, sceneLength], [1, 1.1], { easing: Easing.inOut(Easing.quad), extrapolateRight: "clamp" });
  const shake = frame &gt;= 600 &amp;&amp; frame &lt; 825 ? Math.sin(frame * 1.8) * 5 : 0;
  const leadX = 260 + progress * 100;
  const secondX = 650 - progress * 75;

  return (
    &lt;AbsoluteFill style={{ backgroundColor: scene.bg, color: "white", fontFamily: "Arial, sans-serif", overflow: "hidden" }}&gt;
      &lt;AbsoluteFill style={{ opacity: 0.15, backgroundImage: "radial-gradient(#d6bd8b 1px, transparent 1px)", backgroundSize: "34px 34px" }} /&gt;
      &lt;svg
        width="100%" height="100%" viewBox="0 0 1080 1920"
        style={{ position: "absolute", transform: `translateX(${shake}px) scale(${zoom})` }}
      &gt;
        &lt;path d="M0 1320 Q250 1240 540 1320 T1080 1300 L1080 1920 L0 1920 Z" fill="#111318" /&gt;
        &lt;g opacity="0.45" fill="none" stroke={GOLD} strokeWidth="8"&gt;
          &lt;path d="M120 1320 L120 880 Q120 790 210 790 Q300 790 300 880 L300 1320" /&gt;
          &lt;path d="M780 1320 L780 880 Q780 790 870 790 Q960 790 960 880 L960 1320" /&gt;
          &lt;path d="M70 1320 H1010" /&gt;
        &lt;/g&gt;
        &lt;g transform={`translate(0 ${Math.sin(frame / 18) * 7})`}&gt;
          &lt;StickFigure x={leadX} y={1310} scale={1.7} color="#eee6d5" shield={frame &gt; 600} spear={frame &gt; 600} cape /&gt;
          &lt;Helmet x={leadX} y={1190} /&gt;
          &lt;StickFigure x={secondX} y={1320} scale={1.5} color={GOLD} shield={frame &gt; 600} spear={frame &gt; 600} /&gt;
          &lt;Helmet x={secondX} y={1200} /&gt;
          {Array.from({ length: 7 }, (_, index) =&gt; (
            &lt;StickFigure key={index} x={100 + index * 145} y={1580 + (index % 2) * 45} scale={0.9} color={index % 2 ? GOLD : "#d6d0c3"} shield={frame &gt; 600} spear={frame &gt; 600} /&gt;
          ))}
        &lt;/g&gt;
        {frame &gt; 825 &amp;&amp; (
          &lt;g opacity="0.65" stroke={GOLD} strokeWidth="5" fill="none"&gt;
            &lt;path d="M540 600 L540 1000 M470 660 L610 660 M490 660 L490 820 M590 660 L590 820" /&gt;
          &lt;/g&gt;
        )}
      &lt;/svg&gt;
      &lt;div style={{ position: "absolute", top: 390, left: 70, right: 70, textAlign: "center", opacity, transform: `translateY(${(1 - progress) * 40}px)` }}&gt;
        &lt;div style={{ fontSize: 24, letterSpacing: 6, color: GOLD, fontWeight: 800, marginBottom: 28 }}&gt;ROMAN HISTORY • EPISODE 01&lt;/div&gt;
        &lt;div style={{ fontSize: 66, lineHeight: 1.05, fontWeight: 900, textTransform: "uppercase", textShadow: "0 8px 30px #000" }}&gt;{scene.title}&lt;/div&gt;
        &lt;div style={{ fontSize: 29, color: PARCHMENT, marginTop: 28, letterSpacing: 2 }}&gt;{scene.sub}&lt;/div&gt;
      &lt;/div&gt;
      &lt;div style={{ position: "absolute", bottom: 110, left: 70, right: 70 }}&gt;
        &lt;div style={{ height: 5, background: "#ffffff30", borderRadius: 9 }}&gt;
          &lt;div style={{ height: 5, width: `${(frame / 1349) * 100}%`, background: GOLD, borderRadius: 9 }} /&gt;
        &lt;/div&gt;
        &lt;div style={{ display: "flex", justifyContent: "space-between", marginTop: 18, fontSize: 19, color: PARCHMENT, letterSpacing: 3 }}&gt;
          &lt;span&gt;THE REPUBLIC RISES&lt;/span&gt;&lt;span&gt;509 BC&lt;/span&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/AbsoluteFill&gt;
  );
};

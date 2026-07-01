import { ImageResponse } from "next/og";

export const alt = "Jakub Dyrszka AI Product Builder";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#efeee8",
          color: "#18181b",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 48,
          fontFamily: "Arial",
          border: "16px solid #18181b",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}>
          <span>PORTFOLIO / PL EN</span>
          <span>AI PRODUCT BUILDER</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 138,
            fontWeight: 900,
            letterSpacing: -4,
            lineHeight: 0.86,
          }}
        >
          <span>Jakub</span>
          <span>Dyrszka</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30 }}>
          <span>AI & Logic driven products</span>
          <span>Architecture & Systems craft</span>
        </div>
      </div>
    ),
    size,
  );
}

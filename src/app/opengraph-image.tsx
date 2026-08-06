import { ImageResponse } from "next/og";

export const alt = "Pixiekitty — Enter the Signal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 64,
        color: "#fff8fc",
        background: "radial-gradient(circle at 72% 48%, #f40091 0%, #5b0638 22%, #170710 58%)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 4 }}>
        <span>TRANSMISSION 001</span>
        <span style={{ color: "#78efff" }}>DREAM MODE: ON</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 130, fontWeight: 900, letterSpacing: -9, lineHeight: 0.88, color: "#ff5dbb" }}>
          PIXIEKITTY
        </div>
        <div style={{ display: "flex", marginTop: 32, fontSize: 30, color: "#ffd2eb" }}>
          A tiny machine for big feelings.
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, letterSpacing: 3 }}>
        <span style={{ color: "#b6ff3b" }}>ENTER THE SIGNAL →</span>
        <span>PIXIE DUST · 2026</span>
      </div>
    </div>,
    size,
  );
}

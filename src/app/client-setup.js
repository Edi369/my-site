"use client";

export function Selection() {
  return (
    <style jsx>{`
      ::selection {
        background-color: #ff0000;
        color: #ffffff;
      }
    `}</style>
  );
}

export default function ClientSetup() {
  return (
    <>
      <Selection />
    </>
  );
}
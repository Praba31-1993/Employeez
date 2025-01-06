"use client"
export function Expensestotalsummary({ showsummarycards }: any) {
  return (
    <>
      <div
        className="d-flex  align-items-center"
        onClick={showsummarycards}
        style={{ cursor: "pointer" }}
      >
        <div className="round mr-2"></div>
        <p className="para mb-0 unselectcolor">Total amount (Summary view):</p>
      </div>
    </>
  );
}

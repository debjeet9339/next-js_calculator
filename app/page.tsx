"use client";

import { useState } from "react";

export default function Home() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleCalculate = async (operation: string) => {
    setError("");
    setResult(null);

    if (num1 === "" || num2 === "") {
      setError("Please enter both numbers");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          num1: Number(num1),
          num2: Number(num2),
          operation,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setResult(data.result);
    } catch (err) {
      setError("Failed to connect to backend");
    }
  };

  const handleReset = () => {
    setNum1("");
    setNum2("");
    setResult(null);
    setError("");
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Next.js + Flask Calculator
            </h1>
            <p className="mt-3 text-sm text-slate-300 sm:text-base">
              A simple full-stack calculator using Next.js for the frontend and Flask for the backend.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">
                First Number
              </label>
              <input
                type="number"
                placeholder="Enter first number"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                className="w-full rounded-xl border border-slate-600 bg-slate-900/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Second Number
              </label>
              <input
                type="number"
                placeholder="Enter second number"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                className="w-full rounded-xl border border-slate-600 bg-slate-900/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
              />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            <button
              onClick={() => handleCalculate("add")}
              className="rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Add
            </button>

            <button
              onClick={() => handleCalculate("subtract")}
              className="rounded-xl bg-blue-500 px-4 py-3 font-semibold transition hover:bg-blue-400"
            >
              Subtract
            </button>

            <button
              onClick={() => handleCalculate("multiply")}
              className="rounded-xl bg-violet-500 px-4 py-3 font-semibold transition hover:bg-violet-400"
            >
              Multiply
            </button>

            <button
              onClick={() => handleCalculate("division")}
              className="rounded-xl bg-emerald-500 px-4 py-3 font-semibold transition hover:bg-emerald-400"
            >
              Division
            </button>

            <button
              onClick={() => handleCalculate("module")}
              className="rounded-xl bg-amber-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-amber-400"
            >
              Modulus
            </button>

            <button
              onClick={() => handleCalculate("exponent")}
              className="rounded-xl bg-pink-500 px-4 py-3 font-semibold transition hover:bg-pink-400"
            >
              Exponent
            </button>

            <button
              onClick={handleReset}
              className="rounded-xl border border-slate-500 bg-slate-800 px-4 py-3 font-semibold transition hover:bg-slate-700"
            >
              Reset
            </button>
          </div>

          {(result !== null || error) && (
            <div className="mt-8">
              {result !== null && (
                <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-5">
                  <p className="text-sm text-emerald-300">Calculation Result</p>
                  <h2 className="mt-1 text-2xl font-bold text-white">
                    {result}
                  </h2>
                </div>
              )}

              {error && (
                <div className="mt-4 rounded-2xl border border-red-400/30 bg-red-500/10 p-5">
                  <p className="text-sm font-medium text-red-300">Error</p>
                  <p className="mt-1 text-white">{error}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
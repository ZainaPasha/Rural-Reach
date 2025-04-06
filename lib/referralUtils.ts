import Papa from "papaparse";

export async function fetchHospitalData() {
  const response = await fetch(
    "https://raw.githubusercontent.com/ZainaPasha/Referral-System/refs/heads/main/hospital_data_fully_standardized.csv"
  );
  const csvText = await response.text();

  const parsedData = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
  });

  return parsedData.data;
}

export function labelEncode(data: string, uniqueValues: string[]) {
  return uniqueValues.indexOf(data);
}

export function encodeEmergencyCases(data: keyof typeof mapping) {
  const mapping = { Low: 2, Moderate: 1, High: 0 };
  return mapping[data] ?? -1;
}

export function encodeResourceAvailability(data: keyof typeof mapping) {
  const mapping = { Adequate: 2, Limited: 1, Critical: 0 };
  return mapping[data] ?? -1;
}

export function normalizeScores(hospitalsWithScores: { score: number }[]) {
  if (!hospitalsWithScores.length) return [];

  const scores = hospitalsWithScores.map((h) => h.score);
  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);

  return hospitalsWithScores.map((hospital) => ({
    ...hospital,
    score:
      minScore === maxScore
        ? 50
        : ((hospital.score - minScore) / (maxScore - minScore)) * 99 + 1,
  }));
}

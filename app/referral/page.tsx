"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as tf from "@tensorflow/tfjs";
import Papa from "papaparse";

import {
  fetchHospitalData,
  labelEncode,
  encodeEmergencyCases,
  encodeResourceAvailability,
  normalizeScores,
} from "@/lib/referralUtils";

// Define a type for hospital data
interface HospitalData {
  division: string;
  section: string;
  nearest_gov_hospital: string;
  emergency_cases: string;
  resource_availability: string;
}

const ReferralPage = () => {
  const [divisions, setDivisions] = useState<string[]>([]);
  const [sections, setSections] = useState<string[]>([]);
  const [division, setDivision] = useState<string>("");
  const [section, setSection] = useState<string>("");
  const [hospitals, setHospitals] = useState<
    {
      hospital: string;
      score: number;
      emergencyCases: string;
      resourceAvailability: string;
    }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadDropdowns = async () => {
      const data = (await fetchHospitalData()) as HospitalData[];
      if (!data.length) return;

      const uniqueDivisions = Array.from(
        new Set(data.map((item) => item.division))
      );
      setDivisions(uniqueDivisions);
    };

    loadDropdowns();
  }, []);

  useEffect(() => {
    const loadSections = async () => {
      if (!division) return;

      const data = (await fetchHospitalData()) as HospitalData[];
      const filteredSections = Array.from(
        new Set(
          data
            .filter((item) => item.division === division)
            .map((item) => item.section)
        )
      );

      setSections(filteredSections);
    };

    loadSections();
  }, [division]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = (await fetchHospitalData()) as HospitalData[];
    const divisionUnique = Array.from(
      new Set(data.map((item) => item.division))
    );
    const sectionUnique = Array.from(new Set(data.map((item) => item.section)));
    const hospitalUnique = Array.from(
      new Set(data.map((item) => item.nearest_gov_hospital))
    );

    const encodedUserInput = [
      labelEncode(division, divisionUnique),
      labelEncode(section, sectionUnique),
    ];

    const modelUrl =
      "https://raw.githubusercontent.com/ZainaPasha/Referral-System/refs/heads/main/model.json";
    const model = await tf.loadLayersModel(modelUrl);

    let hospitalsWithScores: {
      hospital: string;
      score: number;
      emergencyCases: string;
      resourceAvailability: string;
    }[] = [];

    for (const item of data) {
      const encodedHospital = [
        labelEncode(item.division, divisionUnique),
        labelEncode(item.section, sectionUnique),
        labelEncode(item.nearest_gov_hospital, hospitalUnique),
        encodeEmergencyCases(
          item.emergency_cases as "Low" | "Moderate" | "High"
        ),
        encodeResourceAvailability(
          item.resource_availability as "Adequate" | "Limited" | "Critical"
        ),
      ];

      const inputTensor = tf.tensor2d(
        [encodedUserInput.concat(encodedHospital)],
        [1, 7]
      );
      const prediction = (await model.predict(inputTensor)) as tf.Tensor;
      const predictionData = await prediction.data();

      hospitalsWithScores.push({
        hospital: item.nearest_gov_hospital,
        score: predictionData[0],
        emergencyCases: item.emergency_cases,
        resourceAvailability: item.resource_availability,
      });
    }

    hospitalsWithScores = normalizeScores(hospitalsWithScores).map(
      (hospital, index) => ({
        ...hospitalsWithScores[index],
        score: hospital.score,
      })
    );
    hospitalsWithScores.sort((a, b) => b.score - a.score);

    const uniqueHospitals = new Map<string, boolean>();
    const topHospitals: typeof hospitalsWithScores = [];

    for (const hospital of hospitalsWithScores) {
      if (!uniqueHospitals.has(hospital.hospital)) {
        uniqueHospitals.set(hospital.hospital, true);
        topHospitals.push(hospital);
      }
      if (topHospitals.length === 3) break;
    }

    setHospitals(topHospitals);
    setLoading(false);
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            height={70}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>
        <p className="text-16-semibold">Integrated Referral System</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Find the Best Referral Hospitals</h1>
          <p className="text-dark-700">
            Select your division and section to get recommendations
          </p>
        </section>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end md:space-x-6 space-y-6 md:space-y-0">
            {/* Division Dropdown */}
            <div className="flex flex-col w-full md:w-1/3">
              <label className="text-lg font-medium mb-2">Division:</label>
              <select
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                required
                className="p-3 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
              >
                <option value="">Select a division</option>
                {divisions.map((div) => (
                  <option key={div} value={div}>
                    {div}
                  </option>
                ))}
              </select>
            </div>

            {/* Section Dropdown */}
            <div className="flex flex-col w-full md:w-1/3">
              <label className="text-lg font-medium mb-2">Section:</label>
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                required
                disabled={!sections.length}
                className={`p-3 border rounded-lg appearance-none ${
                  sections.length
                    ? "border-green-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    : "border-gray-300 bg-gray-100 cursor-not-allowed"
                }`}
              >
                <option value="">Select a section</option>
                {sections.map((sec) => (
                  <option key={sec} value={sec}>
                    {sec}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="w-full md:w-1/3 flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md"
              >
                {loading ? "Generating Referrals With Care..." : "Generate"}
              </button>
            </div>
          </div>
        </form>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Top 3 Referral Hospitals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {hospitals.map((hospital, index) => (
              <div
                key={index}
                className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-xl border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {hospital.hospital}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">Referral Score:</span>{" "}
                  {hospital.score.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">Emergency Cases:</span>{" "}
                  {hospital.emergencyCases}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">Resource Availability:</span>{" "}
                  {hospital.resourceAvailability}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ReferralPage;

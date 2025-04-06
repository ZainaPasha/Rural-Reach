export const GenderOptions = ["male", "female", "other"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Aadhaar Card",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Aadhaar Card",
  "Voter ID (EPIC Card)",
  "PAN Card",
  "Ration Card",
  "Driving License",
  "Passport",
  "Ayushman Bharat Health Account (ABHA) Card",
  "PM-JAY (Pradhan Mantri Jan Arogya Yojana) Card",
  "ESIC (Employees' State Insurance Corporation) Card",
  "CGHS (Central Government Health Scheme) Card",
  "State Health Insurance Scheme Card",
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "Anna Medical Hospital, Rajiv gandhi nearest PN Chathram Sriperumbudur",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Chengalpattu Govt. Medical College & Hospitals",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "Government Hospital, Pavunjur",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Government Hospital, Cheyyur",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Government Hospital, Madurantakam",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Government Hospital, Tambaram",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Government Hospital, Thiruvallore",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};

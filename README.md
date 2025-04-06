<div align="center">
  <br />
  <img src="https://raw.githubusercontent.com/ZainaPasha/Rural-Reach/refs/heads/main/public/assets/icons/logo-full.svg" alt="Rural Reach Banner" width="450px" style="margin-bottom: 20px;" />
  
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Appwrite-black?style=for-the-badge&logoColor=white&logo=appwrite&color=FD366E" alt="appwrite" />
  </div>

  <h3 align="center">Rural Reach: An AI-Powered Emergency Referral Management System</h3>
</div>

## 📋 Table of Contents

1. 🤖 [Introduction](#-introduction)
2. ⚙️ [Tech Stack](#-tech-stack)
3. 🔋 [Features](#-features)
4. 🚀 [Quick Start](#-quick-start)
5. 🛠️ [Configuration](#-configuration)

## 🤖 Introduction

**Rural Reach** is an AI-powered emergency referral system that connects rural healthcare centers to better-equipped government and private hospitals. The platform allows patient registration using Aadhaar/Phone/Health ID, intelligently recommends hospitals using a DNN model, and supports admin dashboards for hospital-side appointment scheduling and referral management.

## ⚙️ Tech Stack

- Next.js (Frontend)
- Tailwind CSS (Styling)
- Appwrite (Auth, DB, File Storage)
- TensorFlow.js (AI Inference)
- Node.js + Express (Backend APIs)
- TypeScript

## 🔋 Features

- ✅ **AI-Powered Hospital Recommendation**: Uses a trained DNN model to suggest the top 3 hospitals based on patient condition, emergency severity, and hospital resource availability.
- 👤 **Patient Registration**: Register using Aadhaar ID, phone number, or unique health ID.
- 🕙 **Real-Time Appointment Scheduling**: Hospital admins manage and confirm appointments from incoming referrals.
- 📢 **SMS Notifications**: Notifies patients when their referral is confirmed.
- 🏥 **Admin Dashboard**: Enables hospitals to monitor and manage incoming emergency referrals efficiently.
- ⭐ **Continuous Feedback Optimization**: Tracks outcomes and feedback to retrain the AI model.
- 🌐 **Responsive UI**: Seamless experience across all devices.

## 🤺 Quick Start

### Prerequisites

Ensure you have the following installed:

- Git
- Node.js
- npm

### Clone the Repository

```bash
git clone https://github.com/ZainaPasha/Referral-System.git
cd Referral-System
```

### Install Dependencies

```bash
npm install
```
## 🛠️ Configuration
### Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Appwrite Setup
NEXT_PUBLIC_ENDPOINT=https://cloud.appwrite.io/v1
PROJECT_ID=
API_KEY=
DATABASE_ID=
PATIENT_COLLECTION_ID=
APPOINTMENT_COLLECTION_ID=
NEXT_PUBLIC_BUCKET_ID=

NEXT_PUBLIC_ADMIN_PASSKEY=admin_pass_here
```

### Run the Development Server

```bash
npm run dev
```

Go to `http://localhost:3000` in your browser to view the app.

---

For more info or to contribute, feel free to raise issues or pull requests.


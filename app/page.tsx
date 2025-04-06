import Image from "next/image";
import Link from "next/link";
import { PasskeyModal } from "@/components/PasskeyModal";
import { PatientForm } from "@/components/forms/PatientForm";

const Home = ({ searchParams }: { searchParams?: { admin?: string } }) => {
  const isAdmin = searchParams?.admin === "true";

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      {isAdmin && <PasskeyModal />}

      <div className="flex flex-col md:flex-row w-full max-w-6xl  bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Left Side: Image */}
        <div className="relative w-full md:w-1/2 h-auto hidden md:block">
          <Image
            src="/assets/images/onboarding-img.png"
            alt="Onboarding"
            layout="fill"
            objectFit="cover"
            className="rounded-l-lg"
          />
        </div>

        {/* Right Side: Form & Links */}
        <div className="flex flex-col justify-center w-full md:w-1/2 px-8 py-6">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <Image
              src="/assets/icons/logo-full.svg"
              height={40}
              width={150}
              alt="RuralReach Logo"
            />
          </div>

          {/* Form */}
          <PatientForm />

          {/* Important Links */}
          <div className="text-sm text-gray-700 dark:text-gray-300 text-center mt-4 space-y-2">
            <p>
              Need a <strong>Referral Recommendation?</strong>{" "}
              <Link href="/referral" className="text-green-500 hover:underline">
                Click here
              </Link>
            </p>
            <p>
              Access <strong>Admin Panel</strong> for scheduling:{" "}
              <Link
                href="/?admin=true"
                className="text-green-500 hover:underline"
              >
                Click here
              </Link>
            </p>
          </div>

          {/* Footer */}
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
            © 2025 RuralReach
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

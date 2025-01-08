import AuthWrapper from "./components/auth/AuthWrapper";
import HomePage from "./components/home/HomePage";

export default function Home() {
  return (
    <div className="flex flex-grow bg-gradient-to-b from-yellow-100 via-pink-100 to-blue-100">
      <AuthWrapper className="flex-grow">
        <HomePage />
      </AuthWrapper>
    </div>
  );
}

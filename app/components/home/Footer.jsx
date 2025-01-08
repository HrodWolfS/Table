export const Footer = () => {
  return (
    <footer className="py-4 mt-auto bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
      <div className="flex items-center justify-center text-white">
        <p className="text-sm md:text-base">
          Powered by <span className="text-yellow-400 font-bold">Hrodwolf</span>
        </p>
        <img
          src="/wolf.jpg"
          alt="Hrodwolf Logo"
          className="w-8 h-8 ml-2 object-cover rounded-full border-2 border-yellow-400"
        />
      </div>
    </footer>
  );
};

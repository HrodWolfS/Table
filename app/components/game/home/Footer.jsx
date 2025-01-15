export const Footer = () => {
  return (
    <footer className="py-4 w-full mt-auto shadow-xl border-t border-white/20">
      <div className="flex items-center justify-center text-white">
        <p className="text-sm md:text-base">
          Powered by <span className="text-blue-500 font-bold">Hrodwolf</span>
        </p>
        <img
          src="/wolf.jpg"
          alt="Hrodwolf Logo"
          className="w-8 h-8 ml-2 object-cover rounded-full border-2 border-blue-500"
        />
      </div>
    </footer>
  );
};

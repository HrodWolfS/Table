export const Footer = () => {
  return (
    <footer className=" py-4 mt-auto">
      <div className="flex items-center justify-center text-gray-600 ">
        <p>
          Powered by <span className="text-sky-700 font-bold">Hrodwolf</span>
        </p>
        <img
          src="/wolf.jpg"
          alt="Hrodwolf Logo"
          className="w-8 h-8 ml-2 object-cover rounded-full border-2 border-sky-700"
        />
      </div>
    </footer>
  );
};

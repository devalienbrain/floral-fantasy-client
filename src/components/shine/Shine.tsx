import footerBg from "../../../public/assets/footerBg.jpg";
const Shine = () => {
  return (
    <>
      <div
        className="relative w-full h-screen bg-cover bg-center flex items-start justify-center opacity-75"
        style={{ backgroundImage: `url(${footerBg})` }}
      >
        <div className="mt-30 pt-30 text-center text-4xl font-black bg-gradient-to-r from-cyan-800 via-red-600 to-lime-700 bg-clip-text text-transparent">
          "SHINE LIKE A HOLY FLOWER!"
        </div>
      </div>
    </>
  );
};
export default Shine;

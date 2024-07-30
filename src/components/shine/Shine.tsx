import footerBg from "/assets/footerBg.jpg";
const Shine = () => {
  return (
    <>
      <div
        className="relative w-full h-screen bg-cover bg-center flex justify-center items-center opacity-75 bg-black"
        style={{ backgroundImage: `url(${footerBg})` }}
      >
        <div className="pt-30 text-center text-4xl font-black bg-gradient-to-r from-cyan-800 via-red-600 to-lime-700 bg-clip-text text-transparent">
          "SHINE LIKE A HOLY FLOWER!"
        </div>
      </div>
    </>
  );
};
export default Shine;

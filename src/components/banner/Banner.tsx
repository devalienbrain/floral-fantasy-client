import bannerImg from "../../../public/assets/flowerBanner.jpg"

const Banner = () => {
    const scrollToNextSection = () => {
        const nextSection = document.getElementById("next-section");
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <div
                className="relative rounded-md w-full h-screen bg-cover bg-center flex items-center justify-center opacity-75"
                style={{ backgroundImage: `url(${bannerImg})` }}
            >
                <div className="text-center text-green-900">
                    <h3 className="text-xl md:text-3xl mb-2">
                        Welcome to
                    </h3>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        ONE OF THE LEADING ONLINE FLOWER SHOP
                    </h1>
                    <h2 className="text-3xl md:text-5xl mb-4">
                        Floral Fantasy
                    </h2>
                    <button
                        onClick={scrollToNextSection}
                        className="px-6 py-3 mt-4 bg-lime-600 hover:bg-lime-500 text-white rounded-md transition duration-300"
                    >
                        Shop Now
                    </button>
                </div>
            </div>
            {/* Dummy next section for demonstration */}
            <div id="next-section" className="flex items-center justify-center">
            </div>
        </>
    );
};

export default Banner;

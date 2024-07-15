// import bannerImg from "../../../public/assets/flowerBanner.jpg"
// const Banner = () => {
// return(
//     <>
//     <div className="rouded-md"><img className="w-full h-full rounded-md" src={bannerImg} alt="Flower Banner" /></div>
//     </>
// )
// }
// export default Banner

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
                <div className="text-center text-black">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        ONE OF THE LEADING ONLINE FLOWER SHOP
                    </h1>
                    <button
                        onClick={scrollToNextSection}
                        className="px-6 py-3 mt-4 bg-pink-500 hover:bg-pink-600 text-white rounded-md transition duration-300"
                    >
                        Shop Now
                    </button>
                </div>
            </div>
            {/* Dummy next section for demonstration */}
            <div id="next-section" className="h-screen flex items-center justify-center bg-gray-200">
                <h2 className="text-2xl">Next Section Content</h2>
            </div>
        </>
    );
};

export default Banner;

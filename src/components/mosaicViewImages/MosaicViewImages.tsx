import image1 from "../../../public/assets/mosaicImages/mosaic1.jpg";
import image2 from "../../../public/assets/mosaicImages/mosaic2.jpg";
import image3 from "../../../public/assets/mosaicImages/mosaic3.jpg";
import image4 from "../../../public/assets/mosaicImages/mosaic4.jpg";
import image5 from "../../../public/assets/mosaicImages/mosaic5.jpg";
import image6 from "../../../public/assets/mosaicImages/mosaic6.jpg";
import image7 from "../../../public/assets/mosaicImages/mosaic7.jpg";
import image8 from "../../../public/assets/mosaicImages/mosaic8.jpg";
import image9 from "../../../public/assets/mosaicImages/mosaic9.jpg";

const MosaicViewImages = () => {
  return (
    <>
      <div className="bg-black rounded-xl p-5 grid grid-cols-1 md:grid-cols-3 gap-3 py-10 shadow-md">

        <img src={image8} className="rounded-xl" alt="Nursery Plant" />
        <img src={image6} className="rounded-xl" alt="Nursery Plant" />
        <img src={image2} className="rounded-xl" alt="Nursery Plant" />

        <img src={image4} className="rounded-xl" alt="Nursery Plant" />
        <img src={image5} className="rounded-xl" alt="Nursery Plant" />
        <img src={image3} className="rounded-xl" alt="Nursery Plant" />

        <img src={image9} className="rounded-xl" alt="Nursery Plant" />
        <img src={image1} className="rounded-xl" alt="Nursery Plant" />
        <img src={image7} className="rounded-xl" alt="Nursery Plant" />

      </div>
    </>
  );
};
export default MosaicViewImages;

import logoIcon from "../../../public/assets/flowerLogo.png"
const Navbar = () => {
    return (
        <>
            <div className="flex justify-between items-center pb-7">
                <div className="flex justify-start items-center gap-3">
                    <img className="w-10" src={logoIcon} />
                    <span className="text-xl font-bold">Floral Fantasy</span>
                </div>
                <div className="justify-end">xxx</div>
            </div>
        </>
    )
}
export default Navbar
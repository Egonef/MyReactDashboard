
export default function SideBar() {
    return (
        <div className="bg-[#DACEE4] w-15 my-4 mx-4 py-5 px-5 rounded-3xl shadow-md shadow-[#CCDF9F] ">
            <div className=" py-5 flex justify-center align-middle scale-150">
                <i className="fas fa-home text-[#bedf71] drop-shadow-[0px_-0px_4.2px_#9356ad] cursor-pointer"></i>
            </div>
            <div className=" h-2 box bg-[radial-gradient(100.40%_50.55%_at_50.76%_50.29%,rgba(255,255,255,255.90)_0%,rgba(255,255,255,0.00)_60%)]"></div>
            <div className=" py-5 flex justify-center align-middle scale-150">
                <i className="fa-solid fa-link text-[#b6d66c] -translate-x-1 drop-shadow-[0px_-0px_4.2px_#9356ad] cursor-pointer"></i>
            </div>
        </div>
    );
}
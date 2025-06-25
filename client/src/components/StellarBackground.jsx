const StellarBackground = () => (
  <div
    className="relative w-full h-screen bg-gradient-to-br from-[#000011] to-[#001122] flex items-center justify-center overflow-hidden"
    style={{ position: "fixed", inset: 0, zIndex: -1 }}
  >
    <div className="absolute top-[30%] left-[40%] w-[250px] h-[250px] bg-blue-400 rounded-full opacity-45 blur-3xl" />
    <div className="absolute bottom-[20%] right-[35%] w-[200px] h-[200px] bg-cyan-300 rounded-full opacity-50 blur-3xl" />
    <div className="absolute top-[15%] left-[15%] w-[180px] h-[180px] bg-teal-400 rounded-full opacity-40 blur-3xl" />
    <div className="absolute bottom-[60%] right-[15%] w-[160px] h-[160px] bg-sky-400 rounded-full opacity-35 blur-3xl" />
    <div className="absolute inset-0 bg-black/30 backdrop-blur-[8px]" />
  </div>
);

export default StellarBackground;


const Hero = ({ handleScroll }) => {
  return (
    <section className=" bg-gradient-to-r from-terracotta-200 h-[600px] pt-20">
      <div className="w-full h-[530px] bg-hero bg-no-repeat bg-cover bg-center flex py-[120px] pl-[150px]">
        <div className="flex flex-col basis-1/3">
          <div className=" w-[220px] h-[2px] bg-terracotta-700"></div>
          <p className="text-[48px] mb-2 font-extrabold uppercase">All</p>
          <p className="text-[48px] mb-10 font-extrabold uppercase">Snacks</p>

          <button
            onClick={handleScroll}
            className="text-[24px] font-semibold hover:bg-terracotta-400/50 hover:text-slate-200 py-2 px-4 rounded-2xl border bg-terracotta-400/30 shadow-md hover:scale-105 transition hover:-translate-y-[2px] active:-translate-y-[1px]"
          >
            Right here
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

export default function Features() {
  return (
    <section className="px-6 md:px-[8%] py-[120px]">
      <h2 className="text-4xl md:text-[2.8rem] font-bold mb-[15px]">
        Why Sylven OS?
      </h2>
      <p className="max-w-[700px] text-[var(--muted)] leading-[1.8] mb-[55px] text-base md:text-[1.1rem]">
        Every contribution strengthens the ecosystem. Whether you&apos;re writing code, documenting projects, designing interfaces, or helping others learn, you&apos;re helping grow a forest of knowledge.
      </p>

      {/* Grid boxes structure */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
        <div className="p-[35px] rounded-[18px] bg-[var(--glass)] border border-gray-500/12 transition-all duration-300 hover:-translate-y-2 hover:border-[var(--primary)] group">
          <h3 className="text-xl font-semibold mb-[15px]">Learn Together</h3>
          <p className="leading-[1.7] text-[var(--muted)]">Real-world learning through practical open-source development instead of isolated tutorials.</p>
        </div>

        <div className="p-[35px] rounded-[18px] bg-[var(--glass)] border border-gray-500/12 transition-all duration-300 hover:-translate-y-2 hover:border-[var(--primary)] group">
          <h3 className="text-xl font-semibold mb-[15px]">Build Together</h3>
          <p className="leading-[1.7] text-[var(--muted)]">Create production-quality projects that developers can use, improve, and showcase.</p>
        </div>

        <div className="p-[35px] rounded-[18px] bg-[var(--glass)] border border-gray-500/12 transition-all duration-300 hover:-translate-y-2 hover:border-[var(--primary)] group">
          <h3 className="text-xl font-semibold mb-[15px]">Grow Together</h3>
          <p className="leading-[1.7] text-[var(--muted)]">Build your portfolio, network with contributors, and make meaningful impact through collaboration.</p>
        </div>
      </div>
    </section>
  );
}
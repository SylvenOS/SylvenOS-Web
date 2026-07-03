export default function Features() {
  return (
    <section className="px-6 md:px-[8%] py-[120px]">
      {/* Section Introduction */}
      <div className="max-w-[800px] mb-[60px]">
        <h2 className="text-3xl md:text-[2.5rem] font-bold mb-[25px]">
          What is Sylven OS?
        </h2>
        <p className="text-lg md:text-[1.2rem] leading-[1.7] text-[var(--text)] mb-6">
          Sylven OS is an open-source community built around one simple idea:
        </p>
        <p className="text-xl md:text-[1.5rem] font-semibold text-[var(--primary)] mb-6">
          People learn faster when they build together.
        </p>
        <p className="text-base md:text-[1.1rem] leading-[1.8] text-[var(--muted)]">
          Instead of learning technologies in isolation, contributors collaborate 
          on production-ready projects, improve engineering skills, share 
          knowledge, and grow through real-world experience.
        </p>
      </div>

      {/* Grid boxes structure */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
        
        {/* Card 1: Learn */}
        <div className="p-[35px] rounded-[18px] bg-[var(--glass)] border border-gray-500/12 transition-all duration-300 hover:-translate-y-2 hover:border-[var(--primary)] group">
          <h3 className="text-xl font-bold mb-[15px] text-[var(--primary)]">Learn</h3>
          <p className="leading-[1.7] text-[var(--muted)]">
            Go beyond tutorials. Gain hands-on learning by tackling complex 
            engineering challenges in a collaborative, supportive environment.
          </p>
        </div>

        {/* Card 2: Build */}
        <div className="p-[35px] rounded-[18px] bg-[var(--glass)] border border-gray-500/12 transition-all duration-300 hover:-translate-y-2 hover:border-[var(--primary)] group">
          <h3 className="text-xl font-bold mb-[15px] text-[var(--primary)]">Build</h3>
          <p className="leading-[1.7] text-[var(--muted)]">
            Contribute to real production projects. Write code that solves actual 
            problems and ships to real users.
          </p>
        </div>

        {/* Card 3: Educate */}
        <div className="p-[35px] rounded-[18px] bg-[var(--glass)] border border-gray-500/12 transition-all duration-300 hover:-translate-y-2 hover:border-[var(--primary)] group">
          <h3 className="text-xl font-bold mb-[15px] text-[var(--primary)]">Educate</h3>
          <p className="leading-[1.7] text-[var(--muted)]">
            Give back to the ecosystem through technical documentation, 
            tutorials, and active mentorship of fellow developers.
          </p>
        </div>

      </div>
    </section>
  );
}
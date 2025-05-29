export default function About() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-2xl shadow-md relative isolate mt-30">
      <h2 className="text-4xl font-bold text-gray-600 mb-6 text-center">
        About <span className="text-pink-200">Latvala Maatila Oy</span>
      </h2>

      <p className="text-lg text-gray-700 mb-5 leading-relaxed">
        <strong className="text-gray-900">Latvala Farms</strong> officially
        registered as Latvalan Maatila Oy, is a family-owned farm located in
        Seinäjoki, Southern Ostrobothnia, Finland. Established in 2005, the farm
        combines crop cultivation and livestock farming, operating as a
        traditional mixed farm with modern practices. Latvala Farms specializes
        in pig farming, and over the years, the operation has expanded through
        strategic investments. In 2004, the farm launched Sikako Oy to focus on
        growing pigs for meat production. Later, in 2016, they established
        LatvaPork Oy, acquiring a piggery in Koskenkorva to further strengthen
        their operations.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div className="p-4 border-l-4 border-pink-500 bg-pink-50 rounded-md">
          <h3 className="text-xl font-semibold text-gray-800">
            📈 Financial Overview
          </h3>
          <p className="text-gray-700">
            Revenue in 2023 reached <strong>€2.15 million</strong>, with a{" "}
            <strong>12.9% decrease </strong>
            compared to the previous year. Operating profit was a modest{" "}
            <strong>0.2%</strong>.
          </p>
        </div>

        <div className="p-4 border-l-4 border-pink-500 bg-pink-50 rounded-md">
          <h3 className="text-xl font-semibold text-gray-800">👥 Team</h3>
          <p className="text-gray-700">
            The company currently employs{" "}
            <strong>12 dedicated professionals</strong>, maintaining the same
            headcount as the previous fiscal year.
          </p>
        </div>
      </div>

      <p className="text-gray-700 text-lg leading-relaxed">
        We are committed to the future of agriculture through innovation,
        responsibility, and a deep respect for the land and the people who
        cultivate it.
      </p>
    </section>
  );
}

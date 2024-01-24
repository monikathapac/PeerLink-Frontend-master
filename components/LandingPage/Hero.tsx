import React from "react";

export function Hero() {
  return (
    <section className="py-10 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full text-center md:max-w-2xl relative z-10">
          <div className="absolute inset-x-0 -top-4 -z-10 transform-gpu overflow-hidden blur-3xl md:-top-10">
            <svg
              className="relative left-1/2 -z-10 h-21.1875rem max-w-none -translate-x-1/2 rotate-30deg sm:left-[calc(50%-30rem)] sm:h-42.375rem transition-transform duration-500"
              viewBox="0 0 1155 678"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
                fillOpacity=".3"
                d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
              />
              <defs>
                <linearGradient
                  id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                  x1="1155.49"
                  x2="-78.208"
                  y1=".177"
                  y2="474.645"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#9089FC" />
                  <stop offset={1} stopColor="#FF80B5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl relative z-20">
            World First Co-Subcription{" "}
            <span className="line-through">Marketplace</span> Community!
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600 relative z-20">
            Access 200+ Services, Save Big, and Unlock Savings of up to Rs.
            10,000 per Year!
          </p>
        </div>
        <form
          action="#"
          method="POST"
          className="mx-auto mt-12 max-w-xl relative z-20"
        >
          <div className="flex flex-col items-center sm:flex-row sm:justify-center">
            <div className="flex w-full max-w-lg items-center space-x-2">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 relative z-20"
                type="text"
                placeholder="Search for OTTs, Credit Cards, and more..."
              />

              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black relative z-20"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

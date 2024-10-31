// "use client";
// import { useEffect } from "react";
// import { Ruda } from "next/font/google";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// const ruda = Ruda({
//   subsets: ["latin"],
//   weight: ["400"],
// });

// const rudaP = Ruda({
//   subsets: ["latin"],
//   weight: ["700"],
// });

// export default function Hero() {
//   return (
//     <>
//     <div className="flex justify-end">
//       <DotLottieReact src="https://lottie.host/2960faab-166a-4574-95ce-eb102949463e/xYcflZlKj8.json" loop autoplay className="opacity-0 lg:opacity-100 lg:w-2/3 lg:h-2/3 absolute" />
//     </div>  
//       <div className="hero flex flex-col justify-center items-center text-center mt-10 lg:ml-8 lg:max-w-[50em] lg:justify-start lg:items-start lg:text-left">
//         <h1 className={`${ruda.className} text-5xl lg:text-7xl`}>
//           Dove <span className="bg-green-300">l&apos;intuizione</span>
//           <br />
//           si fonde con la
//           <br />
//           <span className="bg-green-300">logica</span>
//         </h1>
//         <hr className="my-8 border-t border-gray-400 w-2/3" />
//         <div className={`${rudaP.className} max-w-96`}>
//         <p>Analisi avanzate, suggerimenti personalizzati e previsioni accurate. Scopri un nuovo modo di fare il fantacalcio.</p>
//       </div>
//       </div>
//     </>
//   );
// }

"use client";
import { useEffect } from "react";
import { Ruda } from "next/font/google";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ruda = Ruda({
  subsets: ["latin"],
  weight: ["400"],
});

const rudaP = Ruda({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Hero() {
  return (
    <>
    <div className="flex flex-row items-center justify-center">
      <div className="hero flex flex-col justify-center items-center text-center mt-10">
        <h1 className={`${ruda.className} text-5xl lg:text-7xl`}>
          Dove <span className="bg-green-300">l&apos;intuizione</span>
          <br />
          si fonde con la
          <br />
          <span className="bg-green-300">logica</span>
        </h1>
        <hr className="my-8 border-t border-gray-400 w-2/3" />
          <div className={`${rudaP.className} max-w-96 text-xl`}>
            <p>Analisi avanzate, suggerimenti personalizzati e previsioni accurate. Scopri un nuovo modo di fare il fantacalcio.</p>
        </div>
        </div>
        <div className="flex justify-end">
      <DotLottieReact src="https://lottie.host/e2fe143e-c6fe-4773-89ac-0f93ae9091b8/RiZOlT2Llc.json" loop autoplay className="opacity-0 hidden lg:opacity-100 lg:w-[30em] lg:h-[30em] lg:block" />
    </div>  
      </div>
    </>
  );
}

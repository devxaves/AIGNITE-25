import dynamic from "next/dynamic";
import { Suspense, lazy } from "react";
import { AnimationContainer, MaxWidthWrapper } from "@/components";
import { BentoCard, BentoGrid, CARDS } from "@/components/ui/bento-grid";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LampContainer } from "@/components/ui/lamp";
import MagicBadge from "@/components/ui/magic-badge";
import MagicCard from "@/components/ui/magic-card";
import { COMPANIES, PROCESS } from "@/_utils";
import { REVIEWS } from "@/_utils/constants/misc";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRightIcon, CreditCardIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SparklesText from "@/components/ui/sparkles-text";
// import dashboard from "@/public/health1.gif";
import { Testimonial } from "@/components/Testimonial";
import { SparklesCore } from "@/components/ui/sparkles";
import { LogoTicker } from "@/components/Logos";
import LampDemo from "@/components/ui/lamp";
import DynamicComponents from "@/components/DynamicComponents";
import CardHoverEffect from "@/components/Cards";
import Pricing from "@/components/pricingcards";

// Dynamically import heavy components
<DynamicComponents/>
const Homepage = async () => {
  const user = await currentUser();

  return (
    <div>
      {/* Hero Section */}
      <MaxWidthWrapper className="relative z-10">
        <div className="flex flex-col py-1 md:py-16 w-full text-center">
          <AnimationContainer className="flex flex-col justify-center items-center w-full text-center">
            <button className="relative grid shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] hover:shadow-[0_1000px_0_0_hsl(0_0%_30%)_inset] px-6 py-2 rounded-full transition-colors duration-300 overflow-hidden group">
              <span className="absolute before:absolute inset-0 before:content-[''] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] rounded-full w-[100%] before:w-[200%] h-[100%] before:[translate:-50%_-15%] animate-flip overflow-hidden mask-gradient spark [mask:linear-gradient(white,_transparent_50%)] before:aspect-square before:rotate-[-90deg] before:animate-rotate before:[inset:0_auto_auto_50%]" />
              <span className="group-hover:from-blue-800 group-hover:to-purple-800 absolute inset-[1px] bg-gradient-to-r from-blue-900 to-purple-900 backdrop-blur-sm rounded-full transition-colors duration-300" />
              <span className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 to-purple-500/30 blur-lg"></span>
              <span className="z-10 flex justify-center items-center gap-1 py-1 font-medium text-blue-100 text-sm">
                🧬 Revolutionizing Healthcare Research
                <ArrowRightIcon className="ml-1 transition-transform group-hover:translate-x-1 duration-300 ease-in-out size-3" />
              </span>
            </button>
            <h1 className="py-4 w-full font-bold font-heading text-5xl text-balance text-center text-foreground sm:text-6xl md:text-7xl lg:text-8xl !leading-[1.1] tracking-tight ">
              AI-Powered{" "}
              <span className="inline-block bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent">
                Healthcare
              </span>
            </h1>
            <SparklesText
              text="Research Platform"
              className="mb-8 font-bold text-4xl md:text-5xl lg:text-6xl"
            />
            <p className="mx-auto mb-12 max-w-3xl text-balance text-lg text-muted-foreground md:text-xl tracking-normal">
              Swasthya Darpan: Revolutionizing healthcare research with
              AI-driven insights for drug discovery, patient analysis, and
              clinical trials.
              <br className="md:block hidden" />
              <span className="md:block hidden">
                Unlock the power of data to transform patient care and
                accelerate medical breakthroughs.
              </span>
            </p>
            <div className="mb-8 z-50 flex sm:flex-row flex-col justify-center items-center gap-6 whitespace-nowrap">
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 hover:from-blue-700 to-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl px-8 py-8 rounded-full font-semibold text-lg text-white transition-all duration-300"
              >
                <Link
                  href={user ? "/dashboard" : "/auth/sign-in"}
                  className="flex items-center"
                >
                  Begin your research journey
                  <ArrowRightIcon className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-2 bg-transparent text-blue-500 hover:bg-blue-500 px-8 border-blue-500 rounded-full font-semibold py-8  text-lg hover:text-white transition-all duration-300"
              >
                <Link href="/medsearch">Find Generic Medicine</Link>
              </Button>
            </div>
            <div className="z-50 flex sm:flex-row flex-col justify-center items-center gap-6 whitespace-nowrap">
            <Button
                variant="outline"
                asChild
                className="border-2 bg-transparent hover:bg-blue-500 px-8 py-8 border-blue-500 rounded-full font-semibold text-blue-500 text-lg hover:text-white transition-all duration-300"
              >
                <Link href="/nearbycenters">Explore JanaAushadis near you</Link>
              </Button>
            </div>
          </AnimationContainer>

          <AnimationContainer
            delay={0.2}
            className="relative bg-transparent px-2 md:py-2 pt-20 pb-20 w-full overflow-hidden"
          >
            {/* <BorderBeam size={150} duration={12} delay={9} /> */}
            <LogoTicker />
            <Image
              src="/health1.gif"
              alt="AI Healthcare Dashboard"
              width={1200}
              height={1200}
              quality={100}
              className="bg-gradient-to-br mt-10 from-blue-600/10 to-purple-600/10 shadow-lg rounded-md lg:rounded-xl ring-1 ring-white/20  transition-transform duration-300"
            />
            <div className="bottom-0 absolute inset-x-0  to-transparent h-1/2"></div>
          </AnimationContainer>
        </div>
      </MaxWidthWrapper>


      {/* Companies Section */}
      <MaxWidthWrapper>
        <AnimationContainer delay={0.4}>
          <div className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 opacity-30 blur-3xl"></div>
            <div className="relative z-10 mx-auto px-4 md:px-8">
              <h2 className="bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-12 font-heading font-medium text-center text-sm text-transparent uppercase tracking-wider">
                Trusted by leading healthcare institutions
              </h2>
              <div className="mt-8">
                <ul className="flex flex-wrap justify-center items-center gap-x-8 gap-y-8 md:gap-x-16">
                  {COMPANIES.map((company) => (
                    <li
                      key={company.name}
                      className="transition-all duration-300 hover:scale-110"
                    >
                      <Image
                        src={company.logo}
                        alt={company.name}
                        width={100}
                        height={100}
                        quality={100}
                        className="drop-shadow-lg w-32 h-auto filter grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </AnimationContainer>
      </MaxWidthWrapper>

      <Suspense fallback={<div>Loading...</div>}>
        <CardHoverEffect />
      </Suspense>


      {/* Pricing Section */}
      <MaxWidthWrapper className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-transparent opacity-30 blur-3xl"></div>
        <AnimationContainer delay={0.2}>
          <Pricing />
        </AnimationContainer>

      </MaxWidthWrapper>

      {/* Reviews Section */}
      <MaxWidthWrapper className="relative py-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr  opacity-30 blur-3xl"></div>
        <AnimationContainer delay={0.1}>
          <div className="relative z-10 flex flex-col justify-center items-center lg:items-center mx-auto py-8 w-full">
            <MagicBadge title="Our Customers" />
            <h2 className="bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mt-6 font-bold font-heading text-4xl text-center text-transparent md:text-6xl lg:text-center p-12 tracking-tight">
              What our users are saying
            </h2>
            <p className="mt-4 max-w-lg text-3xl text-center text-gray-400 lg:text-center">
              Here&apos;s what some of our users have to say about{" "}
              <span className="bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-fuchsia-600 text-transparent">
                Swasthya Darpan
              </span>
            </p>
          </div>
        </AnimationContainer>
        <div className="relative z-10 place-items-start gap-4 md:gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10">
          <div className="flex flex-col items-start gap-6 h-min">
            {REVIEWS.slice(0, 3).map((review, index) => (
              <AnimationContainer delay={0.2 * index} key={index}>
                <MagicCard
                  key={index}
                  className="bg-gradient-to-br from-white/10 to-white/5 shadow-xl hover:shadow-2xl backdrop-blur-lg md:p-0 ring-1 ring-white/20 hover:scale-105 transition-all duration-300"
                >
                  <Card className="flex flex-col bg-transparent border-none w-full h-min">
                    <CardHeader className="space-y-0">
                      <CardTitle className="bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 font-bold text-lg text-transparent">
                        {review.name}
                      </CardTitle>
                      <CardDescription className="text-gray-500">
                        {review.username}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 pb-4">
                      <p className="text-gray-600">{review.review}</p>
                    </CardContent>
                    <CardFooter className="space-x-1 mt-auto w-full">
                      {Array.from({ length: review.rating }, (_, i) => (
                        <StarIcon
                          key={i}
                          className="drop-shadow-md fill-yellow-500 w-4 h-4 text-yellow-500"
                        />
                      ))}
                    </CardFooter>
                  </Card>
                </MagicCard>
              </AnimationContainer>
            ))}
          </div>
          <div className="flex flex-col items-start gap-6 h-min">
            {REVIEWS.slice(3, 6).map((review, index) => (
              <AnimationContainer delay={0.2 * index} key={index}>
                <MagicCard
                  key={index}
                  className="bg-gradient-to-br from-white/5 to-white/10 shadow-xl hover:shadow-2xl backdrop-blur-lg md:p-0 ring-1 ring-white/20 hover:scale-105 transition-all duration-300"
                >
                  <Card className="flex flex-col bg-transparent border-none w-full h-min">
                    <CardHeader className="space-y-0">
                      <CardTitle className="bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 font-bold text-lg text-transparent">
                        {review.name}
                      </CardTitle>
                      <CardDescription className="text-gray-500">
                        {review.username}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 pb-4">
                      <p className="text-gray-600">{review.review}</p>
                    </CardContent>
                    <CardFooter className="space-x-1 mt-auto w-full">
                      {Array.from({ length: review.rating }, (_, i) => (
                        <StarIcon
                          key={i}
                          className="fill-yellow-500 w-4 h-4 text-yellow-500"
                        />
                      ))}
                    </CardFooter>
                  </Card>
                </MagicCard>
              </AnimationContainer>
            ))}
          </div>
          <div className="flex flex-col items-start gap-6 h-min">
            {REVIEWS.slice(6, 9).map((review, index) => (
              <AnimationContainer delay={0.2 * index} key={index}>
                <MagicCard
                  key={index}
                  className="bg-gradient-to-br from-white/5 to-white/10 shadow-xl hover:shadow-2xl backdrop-blur-lg md:p-0 ring-1 ring-white/20 hover:scale-105 transition-all duration-300"
                >
                  <Card className="flex flex-col bg-transparent border-none w-full h-min">
                    <CardHeader className="space-y-0">
                      <CardTitle className="bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 font-bold text-lg text-transparent">
                        {review.name}
                      </CardTitle>
                      <CardDescription className="text-gray-500">
                        {review.username}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 pb-4">
                      <p className="text-gray-600">{review.review}</p>
                    </CardContent>
                    <CardFooter className="space-x-1 mt-auto w-full">
                      {Array.from({ length: review.rating }, (_, i) => (
                        <StarIcon
                          key={i}
                          className="fill-yellow-500 w-4 h-4 text-yellow-500"
                        />
                      ))}
                    </CardFooter>
                  </Card>
                </MagicCard>
              </AnimationContainer>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>

      <AnimationContainer
        delay={0.1}
        className="flex flex-col items-center justify-center"
      >
        <LampDemo />
      </AnimationContainer>
    </div>
  );
};

export default Homepage;
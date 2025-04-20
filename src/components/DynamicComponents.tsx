'use client';

import dynamic from 'next/dynamic';

const Pricing = dynamic(() => import('@/components/pricingcards'), { ssr: false });
// const Stats = dynamic(() => import('@/components/Stats'), { ssr: false });
const CardHoverEffect = dynamic(() => import('@/components/Cards'), { ssr: false });
const GridTabs = dynamic(() => import('@/components/girdtabs'), { ssr: false });
const Services = dynamic(() => import('@/components/Services'), { ssr: false });
const Offerings = dynamic(() => import('@/components/offerings'), { ssr: false });
const FAQS = dynamic(() => import('@/components/Faqs'), { ssr: false });

const DynamicComponents = () => {
  return (
    <>
      <Pricing />
      {/* <Stats /> */}
      <CardHoverEffect />
      <GridTabs />
      <Services />
      <Offerings />
      <FAQS />
    </>
  );
};

export default DynamicComponents;

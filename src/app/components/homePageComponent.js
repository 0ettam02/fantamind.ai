"use client";
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Ruda } from "next/font/google";
import Card from './cardHomepageComponent';

const ruda = Ruda({
  subsets: ["latin"],
  weight: ["400"],
});

export default function HomePage() {
  return (
    <>
      <div className="grid grid-row-1 gap-4 place-items-center items-center md:grid-cols-3 animate-fade-right animate-duration-1000 ">
        <Card link="https://lottie.host/d1c6e341-e895-4d83-9c4b-241a6b0b7e84/fl7GnlXO8k.json"/>
        <Card link="https://lottie.host/9042ee07-d5f1-4d2b-ae6b-ef845cd74b99/can1IgK5Zo.json"/>
        <Card link="https://lottie.host/58af4472-1b37-4216-8671-6d22510d103a/Svk93zL0hb.json"/>
      </div>
    </>
  );
}

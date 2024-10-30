"use client";

import React from "react";
import Image from "next/image";
import { MdArrowRight } from "react-icons/md";
import { Session } from "next-auth";
import { useGetUserProducts } from "@/services/product-service";
import Loading from "../loading";
import Link from "next/link";

function HomeModule({ session }: { session: Session | null }) {
  const userProductQueries = useGetUserProducts();

  const FavoriteItems = userProductQueries.data?.products;

  if (userProductQueries.isLoading) {
    return <Loading />;
  }

  return (
    <div className="z-20 text-center">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-[#4cab52]">
        Hello {session?.user?.name},
      </h1>
      <h3 className="text-base">Find, track and eat healthy food.</h3>

      {/* Article */}
      <div className="mt-5 flex w-full justify-between rounded-[2.5rem] bg-[#fff7ef] p-9">
        <div className="flex flex-col pr-10 text-left">
          <h1 className="font-semibold text-[#ff806e]">Article</h1>
          <h2 className="font-semibold">The pros and cons of fast food</h2>
          <div className="mt-5 flex w-fit items-center justify-center rounded-xl bg-[#ff8473] p-2 px-5">
            <p className="text-center text-xs font-semibold text-white">
              Read Now
            </p>
            <MdArrowRight className="h-[30px] w-[30px] text-white" />
          </div>
        </div>
        <div className="flex">
          <Image
            src="/assets/FoodCard.png"
            alt="Food Card"
            className="h-full w-[10rem]"
            width={300}
            height={300}
          />
        </div>
      </div>

      {/* Article switch */}
      <div className="pt-5">
        <p>ITEMS</p>
      </div>

      {/* Track your weekly progress */}
      <div className="mt-5 flex w-full items-center justify-between gap-2 rounded-[2rem] bg-[#9e9bc7] p-9">
        <p className="w-1/2 text-left text-lg font-semibold text-white">
          Track Your Weekly Progress
        </p>
        <div className="flex items-center justify-center bg-white p-2 text-[#9e9bc7]">
          <p className="text-sm font-semibold">View Now</p>
          <MdArrowRight className="text-xl text-[#9e9bc7]" />
        </div>
      </div>

      {/* Choose your favorite */}
      <h2 className="pt-7 text-left text-2xl">Choose Your Favorites</h2>
      <div className="overflow-x-scroll">
        <div className="flex w-max items-center gap-5 p-5 text-center">
          {FavoriteItems?.map((item) => (
            <Link
              href={`/product/${item.id}`}
              key={item.id}
              className="flex h-40 w-36 flex-col items-center justify-between gap-2 rounded-[2rem] bg-[#eff7ee] p-4 text-center transition-all duration-200 hover:cursor-pointer hover:bg-[#bcfab1]"
            >
              <Image
                src={item.image}
                alt={item.name}
                className="h-16 w-10 object-cover"
                width={150}
                height={150}
              />
              <div className="flex flex-col justify-start">
                <p className="text-xs font-bold">
                  {item.name.length > 25
                    ? `${item.name.slice(0, 25)}...`
                    : item.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeModule;

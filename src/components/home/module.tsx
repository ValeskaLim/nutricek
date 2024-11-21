"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Session } from "next-auth";
import { useGetUserProducts } from "@/services/product-service";
import LoadingSkeleton from "../skeleton/loading-skeleton";
import { ArticleSlider } from "./article-slider";
import { Button } from "@/components/ui/button";
import FavoriteSlider from "./favorite-slider";
import {
  useGetTrendingArticles,
  useGetUserArticles,
} from "@/services/article-service";
import ArticleList from "./article-list";

function HomeModule({ session }: { session: Session | null }) {
  const userProductsQuery = useGetUserProducts();
  const userArticlesQuery = useGetUserArticles();
  const trendingArticlesQuery = useGetTrendingArticles();

  const FavoriteItems = userProductsQuery.data?.products;
  const UserArticles = userArticlesQuery.data;
  const TrendingArticles = trendingArticlesQuery.data;

  if (
    userProductsQuery.isLoading ||
    userArticlesQuery.isLoading ||
    trendingArticlesQuery.isLoading
  ) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="z-20 text-center">
      {/* Header */}
      <h1 className="text-3xl font-semibold text-[#4cab52]">
        Hello {session?.user?.name}!
      </h1>
      <h3 className="text-base">Find, track and eat healthy food.</h3>

      {/* Article Slider */}
      <div className="my-4">
        <ArticleSlider TrendingArticles={TrendingArticles!} />
      </div>

      {/* Compose your article */}
      <div className="my-4 flex w-full items-center justify-between gap-2 rounded-2xl bg-[#9e9bc7] p-5">
        <p className="w-1/2 text-left text-lg font-semibold text-white">
          Compose your article
        </p>
        <Button
          variant="secondary"
          className="bg-white text-[#9e9bc7] hover:bg-gray-100"
        >
          Create Now
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Choose your favorite */}
      <FavoriteSlider FavoriteItems={FavoriteItems!} />

      {/* Your article */}
      <ArticleList
        UserArticles={
          UserArticles?.articles.map((article) => ({
            ...article,
            likes: UserArticles.likes.filter(
              (like) => like.articleId === article.id,
            ),
          })) || []
        }
      />
    </div>
  );
}

export default HomeModule;

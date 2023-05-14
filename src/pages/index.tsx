import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { getSession, signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import Header from "~/components/Header";
import PostEditor from "~/components/PostEditor";
import PostList from "~/components/PostList";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { Router, useRouter } from "next/router";
import { getServerSession } from "next-auth";

const Home: NextPage = () => {
  const { data: posts } = api.post.getAllPosts.useQuery();
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="mx-5 flex flex-col gap-2">
        <PostList posts={posts} />
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log("SESSION", session);
  const redirectUrl = "/posts";

  if (session) {
    return {
      redirect: {
        destination: redirectUrl,
        permanent: false, // Set this to true if the redirect is permanent
      },
    };
  }

  // If no redirect is necessary, continue with normal page rendering
  return {
    props: {},
  };
}

export default Home;

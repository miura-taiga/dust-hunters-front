import { GetServerSideProps } from "next";
import Head from "next/head";
import { BlackButton } from "@/components/layouts";
import { Setting } from "@/config";
import { XShareButtonProps } from "@/types";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const name = context.query.name || "Unknown";
  const imageUrl = `${Setting.FRONT_URL}/images/layouts/DustHunters_logo.jpg`;

  return {
    props: {
      name,
      imageUrl,
    },
  };
};

export default function XShareButton({ name, imageUrl }: XShareButtonProps) {
  const handleShare = () => {
    const appUrl = Setting.FRONT_URL;
    const text = `${name}を討伐完了！`;
    const hashtags = "DustHunters";
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(appUrl)}&hashtags=${encodeURIComponent(
      hashtags
    )}`;

    window.open(shareUrl, "_blank");
  };

  return (
    <>
      <Head>
        <title>{`${name}を討伐したよ！`}</title>
        <meta property="og:title" content={`${name}を討伐したよ！`} />
        <meta property="og:description" content="討伐完了！詳細はこちら。" />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={Setting.FRONT_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${name}を討伐したよ！`} />
        <meta name="twitter:description" content="討伐完了！詳細はこちら。" />
        <meta name="twitter:image" content={imageUrl} />
      </Head>
      <div>
        <BlackButton text={"Xに共有する"} onClick={handleShare} />
      </div>
    </>
  );
}

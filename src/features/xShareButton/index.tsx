import Head from "next/head";
import { BlackButton } from "@/components/layouts";

interface XShareButtonProps {
  imageUrl: string;
  name: string;
}

export default function XShareButton({ imageUrl, name }: XShareButtonProps) {
  const handleShare = () => {
    const appUrl = "https://dust-hunters-front.vercel.app";
    const text = `${name}を討伐したよ！`;
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
        <meta property="og:title" content={`${name}を討伐したよ！`} />
        <meta property="og:description" content="討伐完了！詳細はこちら。" />
        <meta
          property="og:image"
          content={`https://dust-hunters-front.vercel.app/${imageUrl}`}
        />
        <meta
          property="og:url"
          content="https://dust-hunters-front.vercel.app"
        />
      </Head>
      <div>
        <BlackButton text={"Xに共有する"} onClick={handleShare} />
      </div>
    </>
  );
}

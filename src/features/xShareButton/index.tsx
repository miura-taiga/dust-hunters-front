import { BlackButton } from "@/components/layouts";

interface XShareButtonProps {
  imageUrl: string;
  name: string;
}

export default function XShareButton({ imageUrl, name }: XShareButtonProps) {
  const handleShare = () => {
    console.log(`Shared Image URL: ${imageUrl}`);
    console.log(`Shared Monster Name: ${name}`);
  };

  return (
    <div>
      <BlackButton text={"Xに共有する"} onClick={handleShare} />
    </div>
  );
}

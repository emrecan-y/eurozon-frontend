import { useEffect, useState } from "react";
import { Image } from "lucide-react";

type ImageLoaderProps = {
  imageUrl: string | undefined;
};

function ImageLoader({ imageUrl }: ImageLoaderProps) {
  const [loadState, setLoadState] = useState<"LOADING" | "ERROR" | "SUCCESS">(
    "LOADING",
  );

  useEffect(() => {
    if (imageUrl) {
      const timeout = setTimeout(() => {
        setLoadState((prevState) => {
          if (prevState !== "SUCCESS") {
            return "ERROR";
          }
          return prevState;
        });
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [imageUrl]);

  return (
    <>
      <img
        src={imageUrl}
        className={`h-full w-full object-contain text-primary-text-2 ${loadState !== "SUCCESS" && "hidden"}`}
        onLoad={() => {
          setLoadState("SUCCESS");
        }}
        onError={() => {
          setLoadState("ERROR");
        }}
        onAbort={() => {
          setLoadState("ERROR");
        }}
      />
      {loadState === "ERROR" || imageUrl === undefined ? (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <Image className="text-primary-text-2" />
          <p>No image</p>
        </div>
      ) : (
        loadState === "LOADING" && (
          <div className="flex h-full w-full items-center justify-center">
            <span className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary-text-2 border-b-transparent"></span>
          </div>
        )
      )}
    </>
  );
}

export default ImageLoader;

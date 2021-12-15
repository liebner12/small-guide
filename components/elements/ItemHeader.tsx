import Image from 'next/image';
import Button from '../units/Button/Button';
import { useRouter } from 'next/router';
import {
  MdArrowBack,
  MdSearch,
  MdFavoriteBorder,
  MdFavorite,
  MdEdit,
} from 'react-icons/md';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

interface Props {
  text: string;
  imageSrc: string | StaticImageData;
  id: string;
  authorId: string;
  handleToFavorites: Function;
  isActive: boolean;
}

const ItemHeader = ({
  text,
  imageSrc,
  id,
  authorId,
  handleToFavorites,
  isActive,
}: Props) => {
  const [defaultHeight, setDefaultHeight] = useState(0);
  useEffect(() => {
    setDefaultHeight((window.innerHeight * 20) / 100);
  }, []);
  const router = useRouter();
  const { scrollY } = useViewportScroll();
  const height = useTransform(scrollY, [0, defaultHeight], [defaultHeight, 48]);
  const opacity = useTransform(scrollY, [0, defaultHeight], [0, 1]);
  const opacitySecond = useTransform(scrollY, [0, defaultHeight], [0, 0.5]);
  const offsetRight = useTransform(scrollY, [0, defaultHeight], [8, 42]);
  const { data: session } = useSession();

  return (
    <>
      <div className="w-full flex-shrink-0 fixed z-20 top-0">
        <motion.div
          className="w-full relative rounded-b-xl"
          layoutId={id}
          style={{ height: height }}
        >
          <Image
            src={imageSrc}
            alt={text}
            layout="fill"
            objectFit="cover"
            className="rounded-b-lg"
          />
          <motion.div
            className="w-full bg-gradient-to-b from-black to-transparent absolute top-0 left-0 z-10 h-full"
            style={{ opacity: opacitySecond }}
          ></motion.div>
          <div className="absolute z-20 top-0 left-0 px-2 text-white flex justify-between w-full items-center">
            <div className="flex items-center flex-1 mr-10 ">
              <Button
                size="round"
                onClick={() => router.back()}
                icon={<MdArrowBack className="h-6 w-6" />}
                type="icon"
                className="my-2"
              ></Button>
              <motion.h1
                className="font-bold text-white ml-2 flex-1 h-full"
                style={{ opacity: opacity }}
              >
                {text}
              </motion.h1>
            </div>
            <Button
              size="round"
              to="/search"
              icon={<MdSearch className="h-6 w-6" />}
              type="icon"
              className="my-2"
            ></Button>
          </div>
          {session?.user && (
            <motion.div
              className="absolute z-10 bottom-2 right-2"
              style={{ right: offsetRight }}
            >
              {(session.user as any).uid === authorId ? (
                <Button
                  size="round"
                  icon={<MdEdit className="h-6 w-6" />}
                  type="icon"
                  className="text-white"
                ></Button>
              ) : (
                <Button
                  size="round"
                  icon={
                    isActive ? (
                      <MdFavorite className="h-6 w-6" />
                    ) : (
                      <MdFavoriteBorder className="h-6 w-6" />
                    )
                  }
                  type="icon"
                  className="text-white"
                  onClick={() => handleToFavorites()}
                ></Button>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
      <div style={{ height: defaultHeight }} />
    </>
  );
};

export default ItemHeader;

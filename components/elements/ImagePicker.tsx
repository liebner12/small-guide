import { MdImage } from 'react-icons/md';
import Image from 'next/image';
import imageCompression from 'browser-image-compression';
import { RefObject } from 'react';
import { FaImage } from 'react-icons/fa';
type ImagePicker = {
  setSelectedImage: Function;
  selectedImage: string;
  className?: string;
  type?: 'primary' | 'wide';
  inputRef: RefObject<HTMLInputElement>;
};

const ImagePicker = ({
  setSelectedImage,
  selectedImage,
  className,
  type,
  inputRef,
}: ImagePicker) => {
  const handleImageUpload = async (event: any) => {
    const imageFile = event.target.files[0];

    const options = {
      maxSizeMB: 4,
      maxWidthOrHeight: type === 'primary' ? 128 : 720,
      useWebWorker: true,
    };

    await imageCompression(imageFile, options)
      .then((res) => setSelectedImage(URL.createObjectURL(res)))
      .catch((error) => console.log(error));
  };

  return (
    <div className={className}>
      <input
        ref={inputRef}
        hidden
        type="file"
        onChange={handleImageUpload}
        accept="image/*"
      />
      {type === 'primary' ? (
        <div onClick={() => inputRef.current && inputRef.current.click()}>
          {selectedImage ? (
            <Image
              src={selectedImage}
              width="80"
              height="80"
              objectFit="cover"
              className="rounded-md"
            />
          ) : (
            <MdImage className="text-white h-20 w-20" viewBox="3 3 18 18" />
          )}
        </div>
      ) : (
        <>
          <div onClick={() => inputRef.current && inputRef.current.click()}>
            {selectedImage ? (
              <div className="w-full h-44 relative rounded-xl">
                <Image
                  src={selectedImage}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                />
              </div>
            ) : (
              <FaImage className="text-white h-auto w-32" />
            )}
          </div>
        </>
      )}
    </div>
  );
};

const defaultValues = {
  type: 'primary',
};

ImagePicker.defaultProps = defaultValues;

export default ImagePicker;

import { CldImage, CldUploadButton} from "next-cloudinary";
import Image from "next/image";

export default function EditableImage({ link, setLink }) {
  return (
    <>
      {link && (
        <CldImage
          className="cldimage"
          src={link}
          width={100}
          height={100}
          alt={"avatar"}
        />
      )}
      {!link && (
        <div className="flex items-center justify-center mt-4">
          <Image src={'/No-Image.png'} alt="no image" width={100} height={100}/>
        </div>
      )}
      <label>
        <input type="file" name="image" id="image" className="hidden" />
        <CldUploadButton
          uploadPreset="Orderfood"
          onUpload={(result) => setLink(result.info.public_id)}
          className=" mt-4 block border rounded-lg p-2 py-1 bg-gray-100 shadow-gray-500 shadow-md border-gray-300 text-center max-w-[120px] mx-auto"
        >
          Edit
        </CldUploadButton>
      </label>
    </>
  );
}

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRef, useState } from 'react';
import Image from 'next/image';
import { AddImg } from '../../../public/images';

export default function FileUpload({ onSelectFile, imageUrl }) {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    onSelectFile(file);
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />
      <div
        className="relative overflow-hidden flex w-[58px] h-[58px] md:w-[76px] md:h-[76px] rounded-[6px] bg-[#F5F5F5] cursor-pointer"
        onClick={() => fileInputRef.current.click()}
      >
        {selectedFile ? (
          <Image fill src={URL.createObjectURL(selectedFile)} alt="Selected" />
        ) : (
          <Image fill src={imageUrl || AddImg} alt="add" />
        )}
      </div>
    </div>
  );
}

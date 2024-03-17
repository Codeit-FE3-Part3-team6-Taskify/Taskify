import React, { useState, useRef } from 'react';
import TagItem from './TagItem';

export default function TagInput({ setFormValues }) {
  const inputRef = useRef(null);
  const [tagList, setTagList] = useState([]);
  const [tagItem, setTagItem] = useState('');

  const addTagItem = () => {
    const updatedTagList = [...tagList];
    updatedTagList.push(tagItem);
    setTagList(updatedTagList);
    setTagItem('');
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      tags: updatedTagList,
    }));

    inputRef.current.focus();
  };

  const onKeyDown = (e) => {
    if (e.target.value.length !== 0 && e.key === 'Enter') {
      addTagItem();
    }
  };

  const deleteTagItem = (tagToDelete) => {
    const filteredTagList = tagList.filter((tag) => tag !== tagToDelete);
    setTagList(filteredTagList);
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      tags: filteredTagList,
    }));

    inputRef.current.focus();
  };

  return (
    <div className="sign-input-base">
      <div className="flex gap-[6px] ">
        {/* flex-wrap */}
        {tagList.map((tag, index) => {
          return (
            <TagItem
              key={index}
              tag={tag}
              onDelete={() => deleteTagItem(tag)}
            />
          );
        })}
        <input
          ref={inputRef}
          type="text"
          placeholder="입력 후 Enter"
          className="flex w-full bg-transparent focus:border-0 focus:outline-none cursor-text"
          value={tagItem}
          onChange={(e) => setTagItem(e.target.value)}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  );
}

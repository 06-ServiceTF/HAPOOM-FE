import React, { useState, useCallback } from 'react';

interface ContentAreaProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const ContentArea: React.FC<ContentAreaProps> = ({ content, setContent }) => {
  const maxLength = 140;

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (event.currentTarget.value.length <= maxLength) {
        setContent(event.currentTarget.value);
      }
    },
    [setContent]
  );

  const isMaxLength = content.length >= maxLength;
  const color = isMaxLength ? 'red' : 'black';

  return (
    <div style={{ position: 'relative', width: 600, height: 100 }}>
      <textarea
        style={{
          width: '100%',
          height: '100%',
          resize: 'none',
          padding: '5px',
        }}
        value={content}
        onChange={handleInputChange}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 5,
          right: 10,
          color: color,
        }}
      >
        {content.length}/{maxLength}
      </div>
    </div>
  );
};

export default ContentArea;
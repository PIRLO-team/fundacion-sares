// React
import React, { useState } from 'react';

// AWS
import AWS from 'aws-sdk';

// Hooks
import { useAuthStore } from '@/hooks';

const s3 = new AWS.S3({
  accessKeyId: 'AKIA2HNOOQJSOFVDMBHY',
  secretAccessKey: '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',
  region: 'us-west-1',
});

export const File = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { currentUser } = useAuthStore();

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }

    const fileName = selectedFile.name;

    const params = {
      Bucket: `pirlo/${currentUser?.uid}`,
      Key: fileName,
      Body: selectedFile,
      ContentType: selectedFile.type,
      ACL: 'public-read',
    };

    console.log('Uploading file to S3...');

    try {
      await s3.putObject(params).promise();
      alert('File uploaded successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to upload file');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileInput} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

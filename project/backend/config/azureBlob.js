require("../dotenv").config();

const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");
const { DefaultAzureCredential } = require('@azure/identity');
const fs = require('fs');

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
if (!accountName) return Error('Azure Storage accountName not found');

const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  new DefaultAzureCredential()
);

const containerName = 'orbital-limittest-posts';


const addImage = async (image) => {
  // Get a reference to a container
  const containerClient = blobServiceClient.getContainerClient(containerName);

  // Create a unique name for the blob
  const blobName = 'post' + uuidv1() + '.jpg';

  // Get a block blob client
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  // Display blob name and url
  console.log(
    `\nUploading to Azure storage as blob\n\tname: ${blobName}:\n\tURL: ${blockBlobClient.url}`
  );

  // Upload data to the blob
  const uploadBlobResponse = await blockBlobClient.upload(image.path);
  console.log(
    `Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`
  );

  // Remove the temporary file from the server
  fs.unlinkSync(image.path);

  return blobName;
}

const retrieveImage = async (blobName) => {
  // Get a reference to a container
  const containerClient = blobServiceClient.getContainerClient(containerName);

  // Get a reference to the blob
  const blobClient = containerClient.getBlockBlobClient(blobName);

  // Download the image as a buffer
  const imageBuffer = await blobClient.downloadToBuffer();

  return imageBuffer;
}



module.exports = {
  addImage,
  retrieveImage
};
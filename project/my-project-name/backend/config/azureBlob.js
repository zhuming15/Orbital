const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");
require("dotenv").config();
const { DefaultAzureCredential } = require('@azure/identity');

const addImage = async (image) => {
  const accountName = `limittest`;
  if (!accountName) return Error('Azure Storage accountName not found');
  
  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    new DefaultAzureCredential()
  );

  const containerName = 'orbital-limittest-posts';

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
  const data = image;
  const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
  console.log(
    `Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}:\n\tURL: ${uploadBlobResponse.url}`
  );

  return blobName;
}

const retrieveImage = async (blobName) => {
  const accountName = `limittest`;
    if (!accountName) return Error('Azure Storage accountName not found');
    
  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    new DefaultAzureCredential()
  );

  const containerName = 'orbital-limittest-posts';

  // Get a reference to a container
  const containerClient = blobServiceClient.getContainerClient(containerName);

  // Get a reference to the blob
  const blobClient = containerClient.getBlockBlobClient(blobName);

  // Download the blob content
  const downloadResponse = await blobClient.download();

  return downloadResponse;
}



export {
  addImage,
  retrieveImage
};
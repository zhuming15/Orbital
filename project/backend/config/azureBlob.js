require("dotenv").config();

const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");
const { DefaultAzureCredential } = require('@azure/identity');

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
if (!accountName) return Error('Azure Storage accountName not found');

const userAssignedUserID = process.env.USER_ASSIGNED_USER_ID;
const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  new DefaultAzureCredential({ ManagedIdentityClientID : userAssignedUserID })
);

const containerName = process.env.CONTAINER_NAME;


const addImage = async (image) => {
  //console.log(image);
  // Get a reference to a container
  const containerClient = blobServiceClient.getContainerClient(containerName);

  // Create a unique name for the blob
  const blobName = 'post' + uuidv1();

  // Get a block blob client
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  // Display blob name and url
  console.log(
    `\nUploading to Azure storage as blob\n\tname: ${blobName}:\n\tURL: ${blockBlobClient.url}`
  );

  // Upload data to the blob
  const options = { blobHTTPHeaders: { blobContentType: "image/jpeg" } }; // Set the content type if it's a JPEG image (change accordingly for other image formats)
  const uploadBlobResponse = await blockBlobClient.uploadData(image, options);  
  console.log(
    `Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`
  );

  return blobName;
}

const retrieveImage = async (blobName) => {
  // Get a reference to a container
  const containerClient = blobServiceClient.getContainerClient(containerName);

  // Get a reference to the blob
  const blobClient = containerClient.getBlockBlobClient(blobName);

  // Download the image as a buffer
  // const imageBuffer = await blobClient.downloadToBuffer();

  await blobClient.downloadToFile(`./image/${blobName}`);
  return ;
}



module.exports = {
  addImage,
  retrieveImage
};
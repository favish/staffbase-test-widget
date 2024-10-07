import dotenv from 'dotenv'
import FormData from 'form-data'
import fs from 'fs'
import fetch from 'node-fetch'
import * as path from 'node:path'

// Load environment variables from .env file
dotenv.config()

/**
 * Interface for the media upload response
 *
 * {string} id - The unique ID of the media resource.
 * {string} name - The name of the media resource.
 * {string} url - The URL of the media resource.
 * {string} created_at - The date and time when the media resource was created.
 * {object} resourceInfo - Information about the media resource.
 *   {string} type - The type of the media resource.
 *   {number} bytes - The size of the media resource in bytes.
 *   {string} url - The URL of the media resource.
 *   {string} format - The format of the media resource.
 *   {string} mimeType - The MIME type of the media resource.
 */
interface MediaUploadResponse {
  id: string
  name: string
  url: string
  created_at: string
  resourceInfo: {
    type: string
    bytes: number
    url: string
    format: string
    mimeType: string
  }
}

/**
 * Function to upload a file to Staffbase
 *
 * @param {string} apiUrl - The API URL
 * @param {string} token - The authorization token
 * @param {string} filePath - The path to the file to upload
 */
async function uploadFileToStaffbase(
  apiUrl: string,
  token: string,
  filePath: string,
): Promise<void> {
  // Create a form with the file and metadata
  const form = new FormData()
  form.append('file', fs.createReadStream(path.resolve(__dirname, filePath)))
  form.append(
    'metadata',
    JSON.stringify({ type: 'raw', fileName: `${process.env.REACT_APP_BUILD_FILE_NAME}.js` }),
  )

  // Send the form data to the API
  try {
    const response = await fetch(`${apiUrl}/media`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${token}`,
        ...form.getHeaders(),
      },
      body: form,
    })

    if (!response.ok) {
      throw new Error(`Error uploading file: ${response.statusText}`)
    }

    const data: MediaUploadResponse = await response.json() as MediaUploadResponse
    console.log('File uploaded successfully:', data)
    console.log('Resource URL:', data.resourceInfo.url)
  } catch (error) {
    console.error('Failed to upload file:', error)
  }
}

// Process the file upload
const filePath = `../dist/${process.env.REACT_APP_BUILD_FILE_NAME}.js`
const token = process.env.REACT_APP_AUTH_TOKEN as string
const apiUrl = process.env.REACT_APP_API_URL as string
uploadFileToStaffbase(apiUrl, token, filePath)

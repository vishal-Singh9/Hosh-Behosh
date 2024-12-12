import axios from "axios";

const cloud_name = "diuwaaom5"; // Your Cloudinary cloud name
const upload_preset = "hosh-behosh"; // Your upload preset

export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("cloud_name", cloud_name); // Cloudinary cloud name
  formData.append("upload_preset", upload_preset); // Cloudinary upload preset

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData
    );
    return response.data; // Returns uploaded image details
  } catch (error) {
    console.error("Error uploading image", error);
    throw new Error("Image upload failed");
  }
};

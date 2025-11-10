import CryptoJS from "crypto-js";

const secretKey = "U2FsdGVkX1-dinZ7Ibe-y3_jaMpoXc2C7oH1PJmenEw";

export const encryptData = (data: string | number): string => {
  const encrypted = CryptoJS.AES.encrypt(data.toString(), secretKey).toString();
  // URL-safe conversion
  const urlSafe = encrypted
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  return urlSafe;
};

export const decryptData = (encryptedData: string): string => {
  // Reverse URL-safe conversion
  const base64 = encryptedData.replace(/-/g, "+").replace(/_/g, "/");
  const bytes = CryptoJS.AES.decrypt(base64, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

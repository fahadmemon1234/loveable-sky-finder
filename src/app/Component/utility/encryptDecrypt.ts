import CryptoJS from "crypto-js";

const secretKey =
  "U2FsdGVkX1%2Fh6%2F3CgiZPxyLfJK1fog%2BHVzsxJRJO6NOABXNUG7rIWkDW5FHrnQl8";

export const encryptData = (data: string | number): string => {
  const encrypted = CryptoJS.AES.encrypt(data.toString(), secretKey).toString();
  return encrypted;
};

export const decryptData = (encryptedData: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
};

export default function convertImgToBase64(imageFile) {
  return new Promise(function (resolve, reject) {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(imageFile);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

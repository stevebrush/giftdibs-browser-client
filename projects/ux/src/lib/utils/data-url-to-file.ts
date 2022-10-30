// Convert data URL to Blob, to be uploaded as a File.
// https://stackoverflow.com/a/5100158
export function dataUrlToFile(dataUrl: string): Blob {
  // Convert base64/URLEncoded data component to raw binary data held in a string.
  let byteString;
  if (dataUrl.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(dataUrl.split(',')[1]);
  } else {
    byteString = unescape(dataUrl.split(',')[1]);
  }

  // Separate the mime component.
  const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];

  // Write the bytes of the string to a typed array.
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([ia], { type: mimeString });

  return blob;
}

// Convert URls to data URLS.
// https://stackoverflow.com/a/20285053/6178885
export function toDataUrl(url: string): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };

    xhr.onloadend = () => {
      if (xhr.status !== 200) {
        reject('Image not found');
      }
    };

    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  });
}

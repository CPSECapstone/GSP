import { Storage } from "@aws-amplify/storage";

function isValidUrl(url: string) {
  return fetch(url)
    .then((res) => {
      if (res.status === 404) {
        return false;
      }
      return true;
    })
    .catch(() => false);
}

async function getImage(S3key: string) {
  const url = await Storage.get(S3key);

  // Amplify storage returns a URL even if the file doesn't exist...
  // we only return the returned URL if its fetchable, otherwise return null
  return (await isValidUrl(url)) ? url : null;
}

class ImageCache {
  cache: object;

  constructor() {
    this.cache = {};
  }

  async checkCache(key: string) {
    const cachedObject = this.cache[key];
    if (cachedObject) {
      return cachedObject;
    }
    const imageUrl = await getImage(key);
    this.updateCache(key, imageUrl);
    return imageUrl;
  }

  updateCache(key: string, value: any) {
    this.cache[key] = value;
  }
}

export default new ImageCache();

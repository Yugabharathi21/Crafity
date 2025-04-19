interface UnsplashImage {
  urls: {
    regular: string;
    small: string;
  };
  user: {
    name: string;
    links: {
      html: string;
    };
  };
  links: {
    html: string;
  };
}

const UNSPLASH_API_URL = 'https://api.unsplash.com';
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export const searchUnsplashImages = async (query: string, page = 1, perPage = 10): Promise<UnsplashImage[]> => {
  try {
    const response = await fetch(
      `${UNSPLASH_API_URL}/search/photos?query=${encodeURIComponent(
        query
      )}&page=${page}&per_page=${perPage}`,
      {
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch images from Unsplash');
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching Unsplash images:', error);
    return [];
  }
};

export const getRandomUnsplashImage = async (query: string): Promise<UnsplashImage | null> => {
  try {
    const response = await fetch(
      `${UNSPLASH_API_URL}/photos/random?query=${encodeURIComponent(query)}`,
      {
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch random image from Unsplash');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching random Unsplash image:', error);
    return null;
  }
};

// Helper function to create attribution link
export const createUnsplashAttribution = (image: UnsplashImage): string => {
  return `Photo by <a href="${image.user.links.html}?utm_source=craftsman&utm_medium=referral">${
    image.user.name
  }</a> on <a href="https://unsplash.com/?utm_source=craftsman&utm_medium=referral">Unsplash</a>`;
}; 
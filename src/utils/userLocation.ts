import type { Coordinates, Nearby } from '@flights/types/flight';

export const getUserLocation = (): Promise<Coordinates> => {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('User Location:', latitude, longitude);
          resolve({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
          reject(error);
        }
      );
    } else {
      const error = new Error('Geolocation is not supported by this browser.');
      console.error(error.message);
      reject(error);
    }
  });
};

type TransformedLocation = Nearby & {
  skyId: string;
  entityId: string;
};

export function transformLocations(data: Array<Nearby>): TransformedLocation[] {
  if (!Array.isArray(data)) {
    return [];
  }

  const uniqueLocations = new Map<string, TransformedLocation>();

  for (const location of data) {
    if (
      !location.navigation ||
      !location.navigation.relevantHotelParams ||
      !location.navigation.relevantFlightParams
    ) {
      continue;
    }

    const skyId = location.navigation.relevantFlightParams.skyId || '';
    const entityId = location.navigation.entityId;
    const uniqueKey = `${skyId}_${entityId}`;

    if (!uniqueLocations.has(uniqueKey)) {
      uniqueLocations.set(uniqueKey, {
        skyId,
        entityId,
        presentation: location.presentation,
        navigation: location.navigation,
      });
    }
  }

  return Array.from(uniqueLocations.values());
}

export const getDefaultLocale = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    if ('language' in navigator) {
      const locale = navigator.language || navigator.languages[0] || 'en-US';
      resolve(locale);
    } else {
      const error = new Error('Language is not supported by this browser.');
      console.error(error.message);
      reject(error);
    }
  });
};

export const getDefaultCurrency = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    getDefaultLocale()
      .then((locale) => {
        const currency = new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: 'USD',
        }).resolvedOptions().currency;

        if (currency) {
          resolve(currency);
        } else {
          reject(new Error('Currency could not be determined.'));
        }
      })
      .catch((error) => {
        console.error('Error getting currency:', error);
        reject(error);
      });
  });
};

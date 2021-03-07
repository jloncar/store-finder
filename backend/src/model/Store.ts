import fetch from 'node-fetch';
import { RoutingAPIError } from '../error/RoutingAPIError';

export enum Vehicle {
  CAR = 'car',
  FOOT = 'foot',
  BIKE = 'bike',
}
export default class Store {
  city: string;
  postalCode: string;
  street: string;
  street2: string;
  street3: string;
  addressName: string;
  uuid: string;
  longitude: number;
  latitude: number;
  complexNumber: string;
  showWarningMessage: boolean;
  todayOpen: string;
  locationType: string;
  collectionPoint: boolean;
  sapStoreID: string;
  todayClose: string;

  // Distance, in meters
  distance?: number;

  // Destination info
  travelInfo?: {
    vehicle: Vehicle;
    distance: number;
    duration: number;
  };

  /**
   * Calculates crow distance between user and store.
   * This is straight line distance between two points.
   *
   * @see https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
   *
   * @param userLatitude User's latitude
   * @param userLongitude User's longitude
   */
  calculateCrowDistance(userLatitude: number, userLongitude: number): this {
    if (!userLatitude || !userLongitude) return this;
    const inRadians = (x) => (x * Math.PI) / 180;
    const R = 6371; // km
    const dLat = inRadians(this.latitude - userLatitude);
    const dLon = inRadians(this.longitude - userLongitude);
    const lat1 = inRadians(userLatitude);
    const lat2 = inRadians(this.latitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = parseFloat((R * c).toFixed(2));
    this.distance = d * 1000; // convert to meters
    return this;
  }

  async fetchTravelInfo(
    userLatitude: number,
    userLongitude: number,
    vehicle: Vehicle,
  ): Promise<this> {
    const endpoint = `${globalThis.routingServerHost}routed-${vehicle}/route/v1/driving/${userLongitude},${userLatitude};${this.longitude},${this.latitude}?overview=false&alternatives=false&steps=false`;
    const data: Record<string, unknown> = await (await fetch(endpoint)).json();

    if (!data?.routes) throw new RoutingAPIError(JSON.stringify(data));

    this.travelInfo = {
      vehicle,
      distance: data?.routes[0]?.distance,
      duration: data?.routes[0]?.duration,
    };

    return this;
  }
}

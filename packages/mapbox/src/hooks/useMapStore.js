import create from "zustand";

import { DEFAULT_VIEWPORT, DEFAULT_FLIGHT_PROPS } from "../constants";
import { getViewportForBounds, getViewportForFeature } from "../selectors";
import { getStateViewportByFips } from "../utils";

const [useMapStore] = create((set, get) => ({
  loaded: false,
  resetViewport: { ...DEFAULT_VIEWPORT },
  viewport: DEFAULT_VIEWPORT,
  hoveredFeature: null,
  setHoveredFeature: (hoveredFeature) => set({ hoveredFeature }),
  setViewport: (viewport) =>
    set((state) => {
      const newViewport = {
        ...state.viewport,
        ...viewport,
      };
      return {
        viewport: newViewport,
      };
    }),
  setResetViewport: (resetViewport) =>
    set((state) => ({
      resetViewport,
      viewport: { ...state.viewport, ...resetViewport },
    })),
  setLoaded: (loaded) => set({ loaded }),
  flyToFeature: (feature) => {
    const viewport = {
      ...getViewportForFeature(feature, get().viewport),
      ...DEFAULT_FLIGHT_PROPS,
    };
    set({ viewport });
  },
  flyToBounds: (bounds) => {
    set((state) => ({
      viewport: {
        ...getViewportForBounds(bounds, state.viewport),
        ...DEFAULT_FLIGHT_PROPS,
      },
    }));
  },
  flyToLatLon: (lat, lon, zoom) => {
    set((state) => ({
      viewport: {
        ...state.viewport,
        latitude: lat,
        longitude: lon,
        zoom: zoom,
        ...DEFAULT_FLIGHT_PROPS,
      },
    }));
  },
  flyToState: (stateId) => {
    set((state) => ({
      viewport: {
        ...state.viewport,
        ...getStateViewportByFips(stateId, state.viewport),
        ...DEFAULT_FLIGHT_PROPS,
      },
    }));
  },
  flyToReset: () => {
    set((state) => {
      const newViewport = {
        ...state.viewport,
        ...state.resetViewport,
        ...DEFAULT_FLIGHT_PROPS,
      };
      return { viewport: newViewport };
    });
  },
}));

export default useMapStore;

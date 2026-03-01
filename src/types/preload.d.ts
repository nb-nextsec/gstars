import type { Sponsor, Event, SiteImage } from './index';

interface PreloadedData {
  sponsors?: Sponsor[];
  events?: Event[];
  images?: SiteImage[];
}

declare global {
  interface Window {
    __PRELOADED_DATA__?: PreloadedData;
  }
}

export {};

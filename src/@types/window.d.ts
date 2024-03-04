/* eslint-disable @typescript-eslint/no-explicit-any */
interface Window {
  /** Debug plotly library. See patches also. */
  hasReady?: boolean;
  __onDebugReload?: function[];
  webkitRequestAnimationFrame?: any;
  mozRequestAnimationFrame?: any;
  oRequestAnimationFrame?: any;
  msRequestAnimationFrame?: any;
  WOW: any;
  addToCart: function;
  removeFromCart: function;
  buildHash: string;
  isDev: string;
  langRootUrl: string;
  onLoad: function;
  i18n: Record<string, Record<string, string>>;
  currencyId: string;
  currency: string;
  currencyAfter: string;
}

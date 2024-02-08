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
}

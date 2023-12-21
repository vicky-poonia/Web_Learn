const TEST_PATH = "whizlabs.com";

export const pageview = () => {
  if (window.location.host.includes(TEST_PATH) && window.fbq) {
    window.fbq("track", "PageView");
  }
};

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = ({ action, params }) => {
  if (window.location.host.includes(TEST_PATH) && window.fbq) {
    window.fbq("track", action, params);
  }
};

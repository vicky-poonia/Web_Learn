const TEST_PATH = "whizlabs.com";

export const event = ({ action, params }) => {
  if (window.location.host.includes(TEST_PATH) && window.uetq) {
    window.uetq = window.uetq || [];
    window.uetq.push("event", action, params);
  }
};

const TEST_PATH = "whizlabs.com";

export const pageview = (params) => {
  if (window.location.host.includes(TEST_PATH) && window.gtag) {
    window.gtag("config", "UA-320509-1", params);
  }
};

export const event = ({ action, params, ecommerce = false, ecaction = null }) => {
  if (!ecommerce && window.location.host.includes(TEST_PATH) && window.gtag) {
    window.gtag("event", action, params);
  }

  if (ecommerce && window.location.host.includes(TEST_PATH) && window.ga) {
    window.ga("require", "ecommerce");
    window.ga(ecaction, action, params);
    window.ga("ecommerce:send");
  }
};

export const ecommerceEvent = ({
  eventType,
  currency,
  productList,
  checkoutStep = 1,
  checkoutOption = "",
  purchaseDetails = null,
}) => {
  if (window.location.host.includes(TEST_PATH) && window.ga) {
    if (window.dataLayer) {
      // // Send transaction data with a pageview if available
      // when the page loads. Otherwise, use an event when the transaction
      // data becomes available.
      window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.

      switch (eventType) {
        case "addToCart":
          dataLayer.push({
            event: eventType,
            ecommerce: {
              currencyCode: currency,
              add: {
                products: productList,
              },
            },
          });
          break;

        case "removeFromCart":
          dataLayer.push({
            event: eventType,
            ecommerce: {
              currencyCode: currency,
              remove: {
                products: productList,
              },
            },
          });
          break;

        case "checkout":
          dataLayer.push({
            event: "checkout",
            ecommerce: {
              checkout: {
                actionField: { step: checkoutStep, option: checkoutOption },
                products: productList,
              },
            },
            eventCallback: function () {
              console.info("ga ecommerce event fired...");
            },
          });
          break;

        case "purchase":
          dataLayer.push({
            ecommerce: {
              purchase: {
                actionField: purchaseDetails,
                products: productList,
              },
            },
          });
          break;

        default:
          break;
      }
    }
  }
};

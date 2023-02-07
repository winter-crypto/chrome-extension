function addStyleForButton() {
  const style = document.createElement("style");
  style.textContent = `
  #winter-checkout:hover {
      color: rgb(255, 255, 255);
      background-color: rgb(46, 142, 238);
      border-color: rgb(46, 142, 238);
  }

  #winter-checkout {
      display: inline-flex; flex-direction: row; -webkit-box-align: center; align-items: center; border-radius: 12px; -webkit-box-pack: center; justify-content: center; font-size: 16px; font-weight: 600; line-height: 22px; letter-spacing: 0.01em; padding: 17px 24px; background-color: rgb(32, 129, 226); border: 2px solid rgb(32, 129, 226); color: rgb(255, 255, 255); margin-bottom: 6px; width: 100%;
  }
`;
  document.head.append(style);
}

function init() {
  let checkout = createCheckoutIFrame();
  const container = document.getElementsByClassName("TradeStation--main")[0];
  if (container) {
    const rightAfterElement = document.getElementsByClassName(
      "TradeStation--price-container"
    )[0].parentNode.parentNode;
    container.insertBefore(
      createButton(checkout),
      rightAfterElement.nextSibling
    );
  }

  function checkURLchange() {
    if (window.location.href != oldURL) {
      oldURL = window.location.href;
      setTimeout(function () {
        //put your code in here to be delayed by 2 seconds
        const container =
          document.getElementsByClassName("TradeStation--main")[0];
        const button = document.getElementById("winter-checkout");
        if (container && !button) {
          const rightAfterElement = document.getElementsByClassName(
            "TradeStation--price-container"
          )[0].parentNode.parentNode;
          container.insertBefore(
            createButton(checkout),
            rightAfterElement.nextSibling
          );
        }
      }, 2000);
    }
  }

  var oldURL = window.location.href;
  setInterval(() => checkURLchange(checkout), 1000);

  document.body.appendChild(checkout);

  window.addEventListener("message", (event) => {
    if (event.data === "closeWinterCheckoutModal") {
      checkout = document.getElementById("winter-checkout-iframe");
      // properly close the winter modal so it can be opened again
      checkout.style.visibility = "hidden";
      checkout.style.display = "none";
      checkout.remove();

      checkout = createCheckoutIFrame();
      document.body.appendChild(checkout);

      const button = document.getElementById("winter-checkout");
      button.addEventListener("click", (event) => {
        const url = window.location.href;
        const urlArray = url.split("/");
        const id = urlArray[urlArray.length - 1];
        const contractAddress = urlArray[urlArray.length - 2];
        checkout.setAttribute(
          "src",
          `https://checkout.usewinter.com/?contractAddress=${contractAddress}&tokenId=${id}&fillSource=winterChromeExtension.io`
        );
        checkout.style.visibility = "visible";
        checkout.style.display = "inline";
      });
    }
  });
}

init();

function createCheckoutIFrame() {
  const checkout = document.createElement("iframe");
  checkout.setAttribute("id", "winter-checkout-iframe");
  checkout.setAttribute(
    "style",
    "position: fixed; top: 0px; bottom: 0px; right: 0px;width: 100%; border: none; margin: 0; padding: 0; overflow: hidden; z-index: 999999; height: 100%; visibility: hidden; display: none;"
  );
  checkout.setAttribute("allowtransparency", "true");
  return checkout;
}

function createButton(checkout) {
  const div = document.createElement("div");
  div.setAttribute("style", "display: flex; max-width: 100%;");
  let button = document.createElement("button");
  //   button.setAttribute(
  //     "style",
  //     "display: inline-flex; flex-direction: row; -webkit-box-align: center; align-items: center; border-radius: 12px; -webkit-box-pack: center; justify-content: center; font-size: 16px; font-weight: 600; line-height: 22px; letter-spacing: 0.01em; padding: 17px 24px; background-color: rgb(32, 129, 226); border: 2px solid rgb(32, 129, 226); color: rgb(255, 255, 255); margin-bottom: 6px; width: 100%; "
  //   );
  button.setAttribute("id", "winter-checkout");
  addStyleForButton();
  button.innerHTML = "Buy with Credit Card";
  div.appendChild(button);
  button.addEventListener("click", (event) => {
    const url = window.location.href;
    const urlArray = url.split("/");
    const id = urlArray[urlArray.length - 1];
    const contractAddress = urlArray[urlArray.length - 2];
    checkout.setAttribute(
      "src",
      `https://checkout.usewinter.com/?contractAddress=${contractAddress}&tokenId=${id}&fillSource=winterChromeExtension.io`
    );
    checkout.style.visibility = "visible";
    checkout.style.display = "inline";
  });
  return div;
}

// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//   // read changeInfo data and do something with it
//   // like send the new url to contentscripts.js
//   console.log("WHAT WHAT");
//   if (changeInfo.url) {
//     chrome.tabs.sendMessage(tabId, {
//       message: "hello!",
//       url: changeInfo.url,
//     });
//   }
// });

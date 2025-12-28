chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    const url = changeInfo.url;

    if (url.includes('twitter.com/intent/tweet') || url.includes('x.com/intent/tweet')) {
      try {
        const urlObj = new URL(url);

        if (urlObj.searchParams.has('via')) {
          urlObj.searchParams.delete('via');
          chrome.tabs.update(tabId, { url: urlObj.toString() });
        }
      } catch (e) {
        // Ignore URL parsing errors
      }
    }
  }
});

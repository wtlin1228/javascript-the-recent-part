main();

async function main() {
  var resps = await fetchURLs(['file1', 'file2', 'file3']);
  console.log(resps);
}

async function fetchURLs(urls) {
  var results = [];

  for (let url of urls) {
    let resp = await getFile(url);
    if (resp.status == 200) {
      results.push(resp.text);
    } else {
      results.push(undefined);
    }
  }

  return results;
}

function getFile(file) {
  return new Promise(function(resolve) {
    fakeAjax(file, resolve);
  });
}

function fakeAjax(url, cb) {
  var fake_responses = {
    file1: { status: 200, text: 'The first text' },
    file2: { status: 200, text: 'The middle text' },
    file3: { status: 200, text: 'The last text' }
  };
  var randomDelay = (Math.round(Math.random() * 1e4) % 2000) + 500;

  console.log('Requesting: ' + url);

  setTimeout(function() {
    cb(fake_responses[url]);
  }, randomDelay);
}

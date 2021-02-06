main();

function main() {
  var it = asyncGenerator(['file1', 'file2', 'file3']);
  console.log('first iterator', it);
  asyncIteration(it);

  /**************************************************/
  console.log('second iterator', it);
  var it = asyncGenerator(['file1', 'file2', 'file3']);
  builtInAsyncIteration(it);
}

async function asyncIteration(it) {
  while (true) {
    let res = await it.next();
    if (res.done) break;
    let text = res.value;

    console.log('asyncIteration', text);
  }
}

async function builtInAsyncIteration(it) {
  for await (let text of it) {
    console.log('builtInAsyncIteration', text);
  }
}

async function* asyncGenerator(urls) {
  var prs = urls.map(getFile);

  for (let pr of prs) {
    let resp = await pr;
    if (resp.status == 200) {
      yield resp.text;
    } else {
      yield undefined;
    }
  }
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

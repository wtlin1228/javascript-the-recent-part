// The Power of a Smile
// by Tupac Shakur
var poem = `
The power of a gun can kill
and the power of fire can burn
the power of wind can chill
and the power of a mind can learn
the power of anger can rage
inside until it tears u apart
but the power of a smile
especially yours can heal a frozen heart`;

for (let power of powers(poem)) {
  console.log(power);
}

// a gun: kill
// fire: burn
// wind: chill
// a mind: learn
// anger: rage
// a smile: heal

function* powers(poem) {
  var re = /(?<=power of )(?<thing>(a )?\w+).*?(?<=can )(?<action>\w+)/gs;
  var match;

  while ((match = re.exec(poem))) {
    let { groups: { thing = '', action = '' } = {} } = match;
    yield `${thing}: ${action}`;
  }
}

// Hints:
//
// function *powers(poem) { .. }
//
// re = / .. /gs
//
// while (match = re.exec(poem)) { .. }
//

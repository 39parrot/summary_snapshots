const test = require('tape');

const f = require('./function');

test('case 1', assert => {
  const records = [
    {
      creditor: "dmitry",
      debitor: "Fastdev",
      sum: 1000
    }
  ];

  const summaries = f(records);

  assert.equal(summaries.length, 1);

  assert.deepEqual(summaries[0], {
    creditor: "dmitry",
    debitor: "Fastdev",
    sum: 1000
  });

  assert.end();
});

test('case 2', assert => {
  const records = [
    {
      split: [
        { name: "dmitry", sum: 400 },
        { name: "alex", sum: 200 },
        { name: "ivan", sum: 0 }
      ]
    }
  ];

  const summaries = f(records);

  assert.equal(summaries.length, 1);

  assert.deepEqual(summaries[0], {
    creditor: "dmitry",
    debitor: "ivan",
    sum: 200
  });

  assert.end();
});

test('case 3', assert => {
  const records = [
    {
      split: [
        { name: "dmitry", sum: 400 },
        { name: "alex", sum: 200 },
        { name: "ivan", sum: 0 }
      ]
    },
    {
      creditor: "ivan",
      debitor: "dmitry",
      sum: 200
    },
    {
      split: [
        { name: "ivan", sum: 500 },
        { name: "alex" }
      ]
    }
  ];

  const summaries = f(records);

  assert.equal(summaries.length, 1);

  assert.deepEqual(summaries[0], {
    creditor: "ivan",
    debitor: "alex",
    sum: 250
  });

  assert.end();
});

test('case 4', assert => {
  const records = [
    {
      split: [
        { name: "dmitry" },
        { name: "alex", sum: 900 },
        { name: "ivan", sum: 0 }
      ]
    },
    {
      creditor: "Fastdev",
      debitor: "ivan",
      sum: "700"
    }
  ];

  const summaries = f(records);

  assert.equal(summaries.length, 3);

  assert.deepEqual(summaries[0], {
    creditor: "alex",
    debitor: "dmitry",
    sum: 300
  });

  assert.deepEqual(summaries[1], {
    creditor: "alex",
    debitor: "ivan",
    sum: 300
  });

  assert.deepEqual(summaries[2], {
    creditor: "Fastdev",
    debitor: "ivan",
    sum: "700"
  });

  assert.end();
});

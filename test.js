const test = require('tape');

const f = require('./function');

test.skip('one yome record', t => {
  const records = [
    {
      creditor: "dmitry",
      debitor: "Fastdev",
      sum: 1000
    }
  ];

  const summaries = f(records);

  t.equal(summaries.length, 1);

  t.deepEqual(summaries[0], {
    creditor: "dmitry",
    debitor: "Fastdev",
    sum: 1000
  });

  t.end();
});

test.skip('one split record - 2/3 paid', t => {
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

  t.equal(summaries.length, 1);

  t.deepEqual(summaries[0], {
    creditor: "dmitry",
    debitor: "ivan",
    sum: 200
  });

  t.end();
});

test.skip('split records together with yome records', t => {
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

  t.equal(summaries.length, 1);

  t.deepEqual(summaries[0], {
    creditor: "ivan",
    debitor: "alex",
    sum: 250
  });

  t.end();
});

test.skip('one split record', t => {
  const records = [
    {
      split: [
        { name: "dmitry" },
        { name: "alex", sum: 900 },
        { name: "ivan", sum: 0 }
      ]
    }
  ];

  const summaries = f(records);

  t.equal(summaries.length, 2);

  t.deepEqual(summaries[0], {
    creditor: "alex",
    debitor: "dmitry",
    sum: 300
  });

  t.deepEqual(summaries[1], {
    creditor: "alex",
    debitor: "ivan",
    sum: 300
  });

  t.end();
});

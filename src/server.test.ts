import { describe, it } from 'mocha';
import { expect } from 'chai';

const test = 'test';

describe('server', () => {
  it('works', () => {
    expect(test).to.equal('test');
  });
});

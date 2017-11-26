import { expect } from 'chai';
import extend from '../src/extend';


describe('extend(base, extension) function', function () {
  const base = {
    id: 1,
    descri: 'good',
    custom: 'base',
  };
  const extension = {
    id: 2,
    error: 'error',
    custom: 'extension',
  };

  const extendBase = extend(base);
  const result = extendBase(extension);

  it('should be curry', function () {
    expect(extendBase).to.be.a('function');
  });

  it("return value should have both base and extension's property", function () {
    expect(result).to.deep.equal({ id: 1, descri: 'good', error: 'error', custom: 'extension' });
  });

  context('when base and extension have the same property', function () {
    it('id should not be covered by extension', function () {
      expect(result.id).to.equal(1);
    });

    it('custom propetry can be covered by extension', function () {
      expect(result.custom).to.be.equal('extension');
    })
  })
})

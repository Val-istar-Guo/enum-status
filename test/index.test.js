import util from 'util';
import { expect } from 'chai';
import enumStatus from '../src/index';


describe('paymentStatus', function () {
  const paymentStatus = enumStatus({
    UNPAID: { id: 1, descri: '待支付' },
    PAID: { id: 2, descri: '已支付' },
    REFUNDING: { id: 4, descri: '退款中' },
    REFUNDED: { id: 8, descri: '已退款' },
  });

  it('.enums get an array include all status', function () {
    expect(paymentStatus.enums)
      .to.have.deep.members([
        paymentStatus.UNPAID,
        paymentStatus.PAID,
        paymentStatus.REFUNDING,
        paymentStatus.REFUNDED,
      ]);
  })

  it('should thorw TypeError when id is not defined', function () {
    expect(() => enumStatus({ UNPAID: { id: 1 }, PAID: null })).to.throw(TypeError);
  });

  context('.default()', function () {
    it('should thorw TypeError when default value is be set a undefined state name', function () {
      expect(() => {
        enumStatus({ PAID: { id: 1 } })
          .default('ISSUE');
      }).to.throw(TypeError);
      expect(() => {
        enumStatus({ PAID: { id: 1 } })
          .default();
      }).to.throw(TypeError);
      expect(() => {
        enumStatus({ PAID: { id: 1 } })
          .default(0);
      }).to.throw(TypeError);
      expect(() => {
        enumStatus({ PAID: { id: 1 } })
          .default(null);
      }).to.throw(TypeError);
    });
  });

  const statusIds = [
    { id: 1, value: { id: 1, descri: '待支付' }, name: 'UNPAID' },
    { id: 2, value: { id: 2, descri: '已支付' }, name: 'PAID' },
    { id: 4, value: { id: 4, descri: '退款中' }, name: 'REFUNDING' },
    { id: 8, value: { id: 8, descri: '已退款' }, name: 'REFUNDED' },
  ];

  statusIds.forEach(function ({ id, value, name }) {
    context(`.getById(${id})`, function () {
      it(`should be equal paymentStatus.${name} and include ${util.inspect(value, false, null)}`, function () {
        expect(paymentStatus.getById(id))
          .to.include(value)
          .to.be.equal(paymentStatus[name]);
      });
    });
  });

  statusIds.forEach(function ({ value, name }) {
    const paymentState = paymentStatus[name];

    context(`.${name}`, function () {
      context('.is', function () {
        it(`.UNPAID should be ${name === 'UNPAID'}`, function () {
          expect(paymentState.is.UNPAID).to.be[name === 'UNPAID'];
        });
        it(`.PAID should be ${name === 'PAID'}`, function () {
          expect(paymentState.is.PAID).to.be[name === 'PAID'];
        });
        it(`.REFUNDING should be ${name === 'REFUNDING'}`, function () {
          expect(paymentState.is.REFUNDING).to.be[name === 'REFUNDING'];
        });
        it(`.REFUNDED should be ${name === 'REFUNDED'}`, function () {
          expect(paymentState.is.REFUNDED).to.be[name === 'REFUNDED'];
        });
      });

      context('.is.not', function () {
        it(`.UNPAID should be ${name !=='UNPAID'}`, function () {
          expect(paymentState.is.not.UNPAID).to.be[name !== 'UNPAID'];
        });
        it(`.PAID should be ${name !=='PAID'}`, function () {
          expect(paymentState.is.not.PAID).to.be[name !== 'PAID'];
        });
        it(`.REFUNDING should be ${name !=='REFUNDING'}`, function () {
          expect(paymentState.is.not.REFUNDING).to.be[name !== 'REFUNDING'];
        });
        it(`.REFUNDED should be ${name !=='REFUNDED'}`, function () {
          expect(paymentState.is.not.REFUNDED).to.be[name !== 'REFUNDED'];
        });
      });
    });
  });


  context('.getById(undfined_id)', function () {
    context('when default value is not be set', function () {
      const noDefaultStatus = enumStatus({ PAID: { id: 1 } });
      it('should return undefined when get a undefined status', function () {
        expect(noDefaultStatus.getById(2)).to.be.undefined;
      });
    })

    context('when default value is set', function () {
      const defaultValue = { id: null, descri: '' };

      const haveDefaultStatus = enumStatus({
        ISSUE: { id: -1, descri: '藏数据' },
        PAID: { id: 1, descri: '已支付' },
      }).default('ISSUE');

      it('should return default value', function () {
        expect(haveDefaultStatus.getById(2)).to.be.equal(haveDefaultStatus.ISSUE);
      });
    })
  })
});

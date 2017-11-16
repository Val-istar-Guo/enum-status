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
      it(`.is.UNPAID should be ${name === 'UNPAID'}`, function () {
        expect(paymentState.is.UNPAID).to.be[name === 'UNPAID'];
      });
      it(`.is.PAID should be ${name === 'PAID'}`, function () {
        expect(paymentState.is.PAID).to.be[name === 'PAID'];
      });
      it(`.is.REFUNDING should be ${name === 'REFUNDING'}`, function () {
        expect(paymentState.is.REFUNDING).to.be[name === 'REFUNDING'];
      });
      it(`.is.REFUNDED should be ${name === 'REFUNDED'}`, function () {
        expect(paymentState.is.REFUNDED).to.be[name === 'REFUNDED'];
      });
    });
  });

});

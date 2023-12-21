// @ts-check

const unknown = '—';

/** @type TOrder[] */
const ordersList = [
  {
    orderNo: 78392140,
    orderDate: 1703069935222,
    orderPrice: 155,
    tracking: 12345612789,
    orderStatus: 'confirmed',
    paymentMethod: 'robokassa',
    paymentState: 'paid',
    delivery: 'express',
  },
  {
    orderNo: 913021,
    orderDate: '2022-05-14T22:11:31.374Z',
    orderPrice: 740,
    // tracking: 9573849294017,
    orderStatus: 'cancelled',
    paymentMethod: 'yandexCard',
    paymentState: 'unpaid',
    delivery: 'russianPost',
  },
];

module.exports = ordersList;

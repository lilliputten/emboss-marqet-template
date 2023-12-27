// @ts-check

const unknown = '—';

/** @type TOrder[] */
const ordersList = [
  {
    orderNo: 739140,
    orderDate: 1703069935222,
    orderPrice: 155,
    tracking: 12345612789,
    orderStatus: 'confirmed',
    paymentMethod: 'robokassa',
    paymentState: 'paid',
    delivery: 'express',
  },
  {
    orderNo: 813021,
    orderDate: '2022-05-14T22:11:31.374Z',
    orderPrice: 740,
    // tracking: 9573849294017,
    orderStatus: 'cancelled',
    paymentMethod: 'yandexCard',
    paymentState: 'unpaid',
    delivery: 'russianPost',
  },
  {
    orderNo: 902430,
    orderDate: 1703698493780,
    orderPrice: 320,
    // tracking: 9573849294017,
    orderStatus: 'cancelled',
    paymentMethod: 'cashOnDelivery',
    paymentState: 'unknown',
    delivery: 'sdek',
  },
];

module.exports = ordersList;

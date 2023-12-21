// @ts-check

const unknown = '—';

/** @type TOrder[] */
const ordersList = [
  {
    orderNo: 78392140,
    orderDate: 1703069935222,
    orderPrice: 155,
    tracking: unknown,
    orderStatus: 'confirmed',
    paymentMethod: 'robokassa',
    paymentState: 'paid',
    delivery: 'express',
  },
  {
    orderNo: 913021,
    orderDate: '2022-05-14T22:11:31.374Z',
    orderPrice: 740,
    orderStatus: 'cancelled',
    paymentMethod: 'yandexCard',
    paymentState: 'unpaid',
    delivery: 'russianPost',
  },
];

module.exports = ordersList;

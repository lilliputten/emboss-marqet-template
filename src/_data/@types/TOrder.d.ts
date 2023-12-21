type TOrderStatus = 'cancelled' | 'confirmed';
type TOrderPaymentState = 'paid' | 'unpaid';
type TOrderPaymentMethod =
  | 'robokassa'
  | 'bankTransfer'
  | 'yandexCard'
  | 'cashOnDelivery'
  | 'cashPaymentToTheCourier';
type TOrderDelivery = 'express' | 'standard' | 'russianPost' | 'sdek' | 'lPost';

interface TOrder {
  orderNo: number;
  orderDate: number | string; // Date
  // orderDate: Date; // Date
  orderPrice: number;
  tracking?: number;
  orderStatus: TOrderStatus;
  paymentMethod: TOrderPaymentMethod;
  paymentState: TOrderPaymentState;
  delivery: TOrderDelivery;
}

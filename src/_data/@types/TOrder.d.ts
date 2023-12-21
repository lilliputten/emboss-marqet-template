type TOrderStatus = 'cancelled' | 'confirmed';
type TOrderPaymentState = 'paid' | 'unpaid';
interface TOrder {
  orderNo: number;
  orderDate: number | string; // Date
  // orderDate: Date; // Date
  orderPrice: number;
  tracking?: unknown;
  orderStatus: TOrderStatus;
  paymentMethod: string;
  paymentState: TOrderPaymentState;
  delivery: string;
}

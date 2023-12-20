type TOrderStatus = 'cancelled' | 'confirmed';
interface TOrder {
  orderNo: number;
  orderDate: number; // Date
  orderPrice: number;
  tracking?: unknown;
  orderStatus: TOrderStatus;
  paymentMethod: string;
  paymentState: string;
  delivery: string;
}

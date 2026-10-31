import React, { useState } from 'react';
import {
  ShoppingBag,
  Receipt,
  Search,
  Filter,
  Eye,
  Printer,
  X,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Orders() {
  const { orders, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All'); // 'All', 'online', 'pos'
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter(order => {
    const matchesType = typeFilter === 'All' || order.type === typeFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      order.id.toLowerCase().includes(q) ||
      (order.customer?.name && order.customer.name.toLowerCase().includes(q)) ||
      (order.customer?.phone && order.customer.phone.includes(q));
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-deepGreen">
            Order & Bill Management
          </h1>
          <p className="text-xs text-deepGreen/70 mt-1">
            Tracking fulfillment for online e-commerce shipments & offline cafe POS bills
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-3xl bg-white border border-lime/30 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {['All', 'online', 'pos'].map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                typeFilter === t ? 'bg-deepGreen text-cream shadow-soft' : 'text-deepGreen/70 hover:bg-cream-200'
              }`}
            >
              {t === 'All' ? 'All Transactions' : t === 'online' ? 'Online Deliveries' : 'Cafe POS Bills'}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-deepGreen/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search order ID, guest name..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-cream-100 border border-lime/30 text-xs font-semibold text-deepGreen focus:outline-none focus:border-deepGreen"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-3xl bg-white border border-lime/30 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-cream-100 text-deepGreen/70 border-b border-lime/20 uppercase font-bold text-[10px]">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Date / Time</th>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Customer Details</th>
                <th className="py-3 px-4">Items Count</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-lime/10">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-10 text-deepGreen/60 text-xs">
                    No orders found matching your search.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-cream-100/60 transition">
                    <td className="py-3 px-4 font-bold text-deepGreen font-mono">{order.id}</td>
                    <td className="py-3 px-4 text-deepGreen/70 text-[11px]">
                      {new Date(order.date).toLocaleDateString()} {new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        order.type === 'pos' ? 'bg-sky/30 text-deepGreen' : 'badge-lime'
                      }`}>
                        {order.type === 'pos' ? 'Cafe POS' : 'Online Store'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-deepGreen font-semibold">
                      {order.customer?.name || "Walk-in Guest"}
                      {order.customer?.phone && (
                        <span className="block text-[10px] text-deepGreen/60 font-normal">{order.customer.phone}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-deepGreen/80">
                      {order.items?.length || 0} items
                    </td>
                    <td className="py-3 px-4 font-display font-extrabold text-deepGreen">
                      ₹{order.total?.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-deepGreen/80">
                      <span className="px-2 py-0.5 rounded bg-cream-200 text-deepGreen text-[10px] font-bold">
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {order.orderStatus || 'Confirmed'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-1.5 rounded-lg bg-cream-200 text-deepGreen hover:bg-lime-electric transition"
                        title="View Order Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deepGreen/60 backdrop-blur-sm animate-in fade-in">
          <div className="rounded-3xl bg-white max-w-lg w-full p-6 sm:p-8 border border-lime/30 shadow-elevated space-y-5 relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-5 right-5 p-1.5 rounded-xl text-deepGreen/50 hover:bg-cream-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-between border-b border-lime/20 pb-4">
              <div>
                <span className="badge-lime text-[10px]">{selectedOrder.type === 'pos' ? 'POS RECEIPT' : 'ONLINE ORDER'}</span>
                <h3 className="font-display font-extrabold text-2xl text-deepGreen mt-1">
                  {selectedOrder.id}
                </h3>
              </div>
              <span className="font-display font-extrabold text-2xl text-deepGreen">
                ₹{selectedOrder.total?.toFixed(2)}
              </span>
            </div>

            <div className="text-xs text-deepGreen/80 space-y-1">
              <p><strong>Customer:</strong> {selectedOrder.customer?.name} ({selectedOrder.customer?.phone || 'No phone'})</p>
              {selectedOrder.customer?.address && (
                <p><strong>Address:</strong> {selectedOrder.customer.address}, {selectedOrder.customer.city}, {selectedOrder.customer.state} - {selectedOrder.customer.pincode}</p>
              )}
              <p><strong>Payment:</strong> {selectedOrder.paymentMethod} • Status: {selectedOrder.paymentStatus || 'Paid'}</p>
            </div>

            {/* Items */}
            <div className="space-y-2 border-t border-b border-lime/20 py-3">
              <span className="text-[10px] font-bold uppercase text-deepGreen/60 block">Ordered Items:</span>
              {selectedOrder.items?.map((it, idx) => (
                <div key={idx} className="flex justify-between text-xs py-0.5">
                  <span>{it.quantity}x {it.name}</span>
                  <span className="font-bold text-deepGreen">₹{(it.price * it.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-1 text-xs text-deepGreen/70">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{selectedOrder.subtotal?.toFixed(2)}</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div className="flex justify-between text-coral">
                  <span>Discount:</span>
                  <span>-₹{selectedOrder.discount?.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>GST (5%):</span>
                <span>₹{selectedOrder.tax?.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full py-3 rounded-full bg-deepGreen text-cream font-bold text-xs uppercase hover:bg-deepGreen/90"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

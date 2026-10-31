import React, { useState } from 'react';
import {
  TrendingUp,
  Receipt,
  ShoppingBag,
  Download,
  Calendar,
  Layers,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useApp } from '../../context/AppContext';

export default function Sales() {
  const { orders, showToast } = useApp();
  const [period, setPeriod] = useState('monthly');

  const totalSales = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalSubtotal = orders.reduce((sum, o) => sum + (o.subtotal || 0), 0);
  const totalDiscount = orders.reduce((sum, o) => sum + (o.discount || 0), 0);
  const totalTax = orders.reduce((sum, o) => sum + (o.tax || 0), 0);
  const avgOrderValue = orders.length > 0 ? totalSales / orders.length : 0;

  const onlineOrders = orders.filter(o => o.type === 'online');
  const posOrders = orders.filter(o => o.type === 'pos');

  const monthlySalesData = [
    { month: 'Jun', online: 34000, pos: 58000, total: 92000 },
    { month: 'Jul', online: 42000, pos: 64000, total: 106000 },
    { month: 'Aug', online: 48000, pos: 71000, total: 119000 },
    { month: 'Sep', online: 55000, pos: 82000, total: 137000 },
    { month: 'Oct', online: 68000, pos: 94000, total: 162000 }
  ];

  const hourlyTrendsData = [
    { hour: '8 AM', sales: 420 },
    { hour: '10 AM', sales: 980 },
    { hour: '12 PM', sales: 1450 },
    { hour: '2 PM', sales: 1120 },
    { hour: '4 PM', sales: 2300 },
    { hour: '6 PM', sales: 3600 },
    { hour: '8 PM', sales: 4100 },
    { hour: '10 PM', sales: 2900 }
  ];

  const bestSellingItems = [
    { name: "Teamood Special Kulhad Chai", category: "Classic Tea", units: 1420, revenue: 49700, share: 31 },
    { name: "Signature Chocolate Chai", category: "Special Tea", units: 890, revenue: 57850, share: 36 },
    { name: "Crispy Bun Maska with Jam", category: "Snacks", units: 710, revenue: 35500, share: 22 },
    { name: "Kota Shahi Masala Blend (250g)", category: "Packaged Tea", units: 280, revenue: 95200, share: 59 }
  ];

  const handleExportSales = () => {
    const headers = ["Order ID,Date,Type,Customer,Payment,Subtotal,Discount,Tax,Total\n"];
    const rows = orders.map(o =>
      `"${o.id}","${new Date(o.date).toLocaleDateString()}","${o.type}","${o.customer?.name || ''}","${o.paymentMethod || ''}","${o.subtotal}","${o.discount}","${o.tax}","${o.total}"\n`
    );
    const blob = new Blob([...headers, ...rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `teamood_sales_ledger_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Sales ledger downloaded as CSV');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-deepGreen">
            Sales & Revenue Analytics
          </h1>
          <p className="text-xs text-deepGreen/70 mt-1">
            Financial breakdown of online dispatch and Kota Flagship cafe counter bills
          </p>
        </div>

        <button
          onClick={handleExportSales}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-lime/30 text-deepGreen text-xs font-bold hover:bg-cream-200 transition shadow-soft self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export Ledger CSV</span>
        </button>
      </div>

      {/* 4 Financial Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-lime/30 shadow-soft space-y-1">
          <span className="text-[10px] font-bold uppercase text-deepGreen/60">Gross Volume</span>
          <p className="font-display font-extrabold text-2xl text-deepGreen">₹{totalSubtotal.toFixed(0)}</p>
          <span className="text-[10px] text-deepGreen/60">Before discounts & tax</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-lime/30 shadow-soft space-y-1">
          <span className="text-[10px] font-bold uppercase text-deepGreen/60">Net Collected</span>
          <p className="font-display font-extrabold text-2xl text-deepGreen">₹{totalSales.toFixed(0)}</p>
          <span className="text-[10px] text-emerald-800 font-bold">Paid & Settled</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-lime/30 shadow-soft space-y-1">
          <span className="text-[10px] font-bold uppercase text-deepGreen/60">Discounts Conceded</span>
          <p className="font-display font-extrabold text-2xl text-coral">₹{totalDiscount.toFixed(0)}</p>
          <span className="text-[10px] text-deepGreen/60">Promotions & staff coupons</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-lime/30 shadow-soft space-y-1">
          <span className="text-[10px] font-bold uppercase text-deepGreen/60">Avg Order Value (AOV)</span>
          <p className="font-display font-extrabold text-2xl text-deepGreen">₹{avgOrderValue.toFixed(0)}</p>
          <span className="text-[10px] text-deepGreen/60">Across {orders.length} orders</span>
        </div>
      </div>

      {/* Monthly Sales Chart & Hourly Peak Curve */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white border border-lime/30 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-base text-deepGreen">
              Monthly Sales Progression (Online vs Offline)
            </h2>
            <span className="badge-lime text-[10px]">2026 TRENDS</span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySalesData}>
                <XAxis dataKey="month" stroke="#183D32" opacity={0.6} fontSize={11} />
                <YAxis stroke="#183D32" opacity={0.6} fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFDF4',
                    border: '1px solid rgba(183, 227, 75, 0.4)',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="pos" name="Cafe POS (₹)" fill="#183D32" radius={[6, 6, 0, 0]} />
                <Bar dataKey="online" name="Online Shop (₹)" fill="#B7E34B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hourly Peak Rush */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-lime/30 shadow-soft space-y-4">
          <div>
            <h2 className="font-display font-bold text-base text-deepGreen">
              Hourly Cafe Rush Pattern
            </h2>
            <p className="text-xs text-deepGreen/60">
              Peak hours: 6:00 PM – 9:00 PM (Student study rush)
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyTrendsData}>
                <XAxis dataKey="hour" stroke="#183D32" opacity={0.6} fontSize={10} />
                <YAxis stroke="#183D32" opacity={0.6} fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFDF4',
                    border: '1px solid rgba(183, 227, 75, 0.4)',
                    borderRadius: '12px',
                    fontSize: '11px'
                  }}
                />
                <Area type="monotone" dataKey="sales" name="Volume (₹)" stroke="#FF8C83" fill="#FF8C83" fillOpacity={0.2} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Best-selling Items */}
      <div className="p-6 rounded-3xl bg-white border border-lime/30 shadow-soft space-y-4">
        <h2 className="font-display font-bold text-base text-deepGreen">
          Top Revenue Drivers (Cafe & Packaged)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-cream-100 text-deepGreen/70 border-b border-lime/20 uppercase font-bold text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Item Name</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Units Sold</th>
                <th className="py-2.5 px-3">Gross Revenue</th>
                <th className="py-2.5 px-3">Contribution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-lime/10">
              {bestSellingItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-cream-100/60 transition">
                  <td className="py-3 px-3 font-bold text-deepGreen">{item.name}</td>
                  <td className="py-3 px-3 text-deepGreen/80">{item.category}</td>
                  <td className="py-3 px-3 font-semibold">{item.units} units</td>
                  <td className="py-3 px-3 font-display font-bold text-deepGreen">₹{item.revenue.toLocaleString()}</td>
                  <td className="py-3 px-3">
                    <span className="badge-lime text-[10px]">{item.share}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

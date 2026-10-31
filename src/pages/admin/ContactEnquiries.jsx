import React, { useState } from 'react';
import {
  Mail,
  Search,
  Filter,
  Download,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ContactEnquiries() {
  const { contactEnquiries, updateContactStatus, deleteContactEnquiry, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [editingNotes, setEditingNotes] = useState('');
  const [editingStatus, setEditingStatus] = useState('');

  const statuses = ['All', 'New', 'Read', 'Replied', 'Closed'];

  const filteredEnquiries = contactEnquiries.filter((enq) => {
    const matchesStatus = statusFilter === 'All' || enq.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      enq.name.toLowerCase().includes(q) ||
      enq.email.toLowerCase().includes(q) ||
      (enq.subject && enq.subject.toLowerCase().includes(q));
    return matchesStatus && matchesSearch;
  });

  const handleOpenDetails = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setEditingNotes(enquiry.notes || '');
    setEditingStatus(enquiry.status || 'New');
  };

  const handleSaveDetails = () => {
    if (selectedEnquiry) {
      updateContactStatus(selectedEnquiry.id, editingStatus, editingNotes);
      setSelectedEnquiry(null);
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete enquiry from ${name}?`)) {
      deleteContactEnquiry(id);
      if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
    }
  };

  const handleExportCSV = () => {
    const headers = ["ID,Date,Name,Email,Phone,Subject,Message,Status\n"];
    const rows = filteredEnquiries.map(e =>
      `"${e.id}","${new Date(e.date).toLocaleDateString()}","${e.name}","${e.email}","${e.phone || ''}","${e.subject || ''}","${(e.message || '').replace(/"/g, '""')}","${e.status}"\n`
    );
    const blob = new Blob([...headers, ...rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `teamood_contact_messages_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported contact messages to CSV!');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#83B579] block">
            Customer Communications
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-[#1D3D2C]">
            Contact Enquiries ({contactEnquiries.length})
          </h1>
          <p className="text-xs text-[#1D3D2C]/70 mt-1">
            Review guest messages, bulk orders, event inquiries and feedback
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-[#1D3D2C]/15 text-[#1D3D2C] text-xs font-mono font-bold hover:bg-[#FAFAF2] transition shadow-soft self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-[#83B579]" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filters */}
      <div className="p-4 rounded-3xl bg-white border border-[#1D3D2C]/10 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1D3D2C]/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sender, email, subject..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAFAF2] border border-[#1D3D2C]/15 text-xs font-semibold text-[#1D3D2C] focus:outline-none focus:border-[#1D3D2C]"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none font-mono">
          <span className="text-[11px] font-bold text-[#1D3D2C]/70 shrink-0">Status:</span>
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                statusFilter === st
                  ? 'bg-[#1D3D2C] text-[#FAFAF2] shadow-soft'
                  : 'bg-[#FAFAF2] text-[#1D3D2C]/70 hover:bg-[#CFE9C5]/40'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Table */}
      <div className="rounded-3xl bg-white border border-[#1D3D2C]/10 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#FAFAF2] text-[#1D3D2C]/70 border-b border-[#1D3D2C]/10 uppercase font-bold text-[10px]">
              <tr>
                <th className="py-3 px-4">Sender</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Message Snippet</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1D3D2C]/5">
              {filteredEnquiries.map((enq) => (
                <tr key={enq.id} className="hover:bg-[#FAFAF2] transition">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-[#1D3D2C] block font-sans">{enq.name}</span>
                    <span className="text-[10px] text-[#1D3D2C]/60">{enq.email}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-[#CFE9C5] text-[#1D3D2C] text-[10px] font-bold">
                      {enq.subject || 'General'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs truncate text-[#1D3D2C]/80 font-sans">
                    {enq.message}
                  </td>
                  <td className="py-3.5 px-4 text-[#1D3D2C]/60 text-[10px]">
                    {new Date(enq.date).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#F5D36F] text-[#1D3D2C]">
                      {enq.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenDetails(enq)}
                        className="px-3 py-1.5 rounded-xl bg-[#FAFAF2] hover:bg-[#1D3D2C] hover:text-[#FAFAF2] text-[#1D3D2C] font-bold text-xs transition flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Read</span>
                      </button>
                      <button
                        onClick={() => handleDelete(enq.id, enq.name)}
                        className="p-1.5 rounded-xl bg-[#FAFAF2] hover:bg-red-50 text-red-600 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Message Reader Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#1D3D2C]/10 shadow-elevated relative">
            <button
              onClick={() => setSelectedEnquiry(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#FAFAF2] text-[#1D3D2C] hover:bg-black/5"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-display font-black text-[#1D3D2C] mb-4">
              Customer Message
            </h2>

            <div className="space-y-4 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-[#FAFAF2] border border-[#1D3D2C]/10 space-y-1.5">
                <div>From: <strong>{selectedEnquiry.name}</strong> ({selectedEnquiry.email})</div>
                {selectedEnquiry.phone && <div>Phone: {selectedEnquiry.phone}</div>}
                <div>Subject: <strong className="text-[#83B579]">{selectedEnquiry.subject}</strong></div>
              </div>

              <div>
                <span className="text-[#1D3D2C] font-bold block mb-1">Message:</span>
                <p className="p-4 rounded-2xl bg-[#FAFAF2] text-[#1D3D2C] leading-relaxed border border-[#1D3D2C]/10 font-sans text-xs">
                  {selectedEnquiry.message}
                </p>
              </div>

              <div>
                <label className="block text-[#1D3D2C] font-bold mb-1">Status</label>
                <select
                  value={editingStatus}
                  onChange={(e) => setEditingStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF2] border border-[#1D3D2C]/15 focus:outline-none focus:border-[#1D3D2C]"
                >
                  <option value="New">New</option>
                  <option value="Read">Read</option>
                  <option value="Replied">Replied</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="pt-4 border-t border-[#1D3D2C]/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedEnquiry(null)}
                  className="px-5 py-2.5 rounded-xl bg-[#FAFAF2] text-[#1D3D2C]"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleSaveDetails}
                  className="px-6 py-2.5 rounded-xl bg-[#1D3D2C] text-[#FAFAF2] font-bold"
                >
                  Save Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

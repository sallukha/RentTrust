import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ShieldCheck,
  Video,
  Phone,
  MoreVertical,
  Paperclip,
  Send,
  FileText,
  CheckCircle2,
  Calendar,
  Sparkles,
  Key,
  Download,
  PenTool,
  X,
  Building,
  Check,

} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ConversationDetailView: React.FC = () => {
  const {
    chatMessages,
    sendChatMessage,
    setCurrentScreen,
    rentalApplication,
    signRentalAgreement,
    activeRole,
  } = useAuth();

  const [inputMessage, setInputMessage] = useState('');
  const [showSignModal, setShowSignModal] = useState(false);
  const [signatureText, setSignatureText] = useState('Alex Chen');
  const [hasAgreedClauses, setHasAgreedClauses] = useState(true);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim()) return;
    sendChatMessage(inputMessage);
    setInputMessage('');
  };

  const handleConfirmSignature = () => {
    signRentalAgreement();
    setShowSignModal(false);
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col justify-between pb-6">

      {/* Message Thread */}
      <div className="flex-1 p-4 space-y-4 w-full">
        <div className="text-center">
          <span className="px-3 py-1 rounded-full bg-slate-200/70 dark:bg-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Today
          </span>
        </div>

        {chatMessages.map((msg) => {
          const isMe =
            (activeRole === 'tenant' && msg.sender === 'tenant') ||
            (activeRole === 'landlord' && msg.sender === 'landlord');

          if (msg.sender === 'system') {
            return (
              <div
                key={msg.id}
                className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-center space-y-1"
              >
                <div className="inline-flex items-center gap-1 text-[11px] font-black text-teal-800 dark:text-teal-200">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Escrow & Lease Verified</span>
                </div>
                <p className="text-xs text-teal-700 dark:text-teal-300">{msg.text}</p>
                <button
                  type="button"
                  onClick={() => setCurrentScreen('move-in-confirmed')}
                  className="mt-1 px-3 py-1 rounded-lg bg-teal-600 text-white text-[11px] font-bold shadow-sm inline-flex items-center gap-1"
                >
                  <Key className="w-3 h-3" />
                  <span>Open Key Foyer & Move-in Screen &rarr;</span>
                </button>
              </div>
            );
          }

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} space-y-1`}
            >
              <div
                className={`max-w-[85%] rounded-3xl p-3.5 space-y-2 text-xs leading-relaxed shadow-sm ${
                  isMe
                    ? 'bg-teal-600 text-white rounded-br-none'
                    : 'bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-800 rounded-bl-none'
                }`}
              >
                <p>{msg.text}</p>

                {/* PDF Agreement Card (Screen 11) */}
                {msg.attachment && msg.attachment.type === 'pdf_agreement' && (
                  <div className="p-3 rounded-2xl bg-slate-900 text-white space-y-2 border border-slate-700 shadow-md">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold truncate">
                          {msg.attachment.title}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {msg.attachment.size} &bull; Legally Binding DocuTrust
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      {rentalApplication.isLeaseSigned ? (
                        <div className="w-full py-2 rounded-xl bg-emerald-500 text-white text-xs font-extrabold flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Signed & Executed ✓</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setShowSignModal(true)}
                          className="w-full py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-extrabold transition-all flex items-center justify-center gap-1 shadow-sm"
                        >
                          <PenTool className="w-3.5 h-3.5" />
                          <span>Review & Sign Agreement</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <span className="text-[10px] font-bold text-slate-400 px-1">
                {msg.timestamp}
              </span>
            </div>
          );
        })}
      </div>

      {/* Action Chips & Input Composer */}
      <div className="bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 p-3 space-y-2 max-w-lg mx-auto w-full">
        {/* Quick action chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {!rentalApplication.isLeaseSigned ? (
            <button
              type="button"
              onClick={() => setShowSignModal(true)}
              className="px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-300 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-[11px] font-bold whitespace-nowrap flex items-center gap-1"
            >
              <PenTool className="w-3 h-3" />
              <span>Sign Agreement</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCurrentScreen('move-in-confirmed')}
              className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 border border-emerald-300 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold whitespace-nowrap flex items-center gap-1"
            >
              <Key className="w-3 h-3" />
              <span>View Move-in Keys</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => sendChatMessage("When would be the best time for a property viewing this week?")}
            className="px-3 py-1 rounded-full bg-sky-50 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-bold whitespace-nowrap"
          >
            Schedule Visit
          </button>

          <button
            type="button"
            onClick={() => sendChatMessage("Are parking spots included in the monthly rent?")}
            className="px-3 py-1 rounded-full bg-sky-50 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-bold whitespace-nowrap"
          >
            Ask Question
          </button>
        </div>

        {/* Composer Form */}
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => sendChatMessage("Uploaded new verification document.", { type: 'pdf_agreement', title: 'Income_Proof_Oct2024.pdf', size: '1.8 MB' })}
            className="p-2.5 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            type="text"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 py-2.5 px-4 rounded-2xl bg-sky-50/70 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="p-2.5 rounded-full bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white transition-all shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Review & Sign Agreement Modal */}
      <AnimatePresence>
        {showSignModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-5 space-y-4 border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 flex items-center justify-center">
                    <PenTool className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-slate-900 dark:text-white">
                      Rental Agreement
                    </h3>
                    <p className="text-[10px] text-slate-400">The Skylark Loft &bull; Unit 402</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSignModal(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="p-3 rounded-2xl bg-sky-50 dark:bg-slate-850 border border-sky-100 dark:border-slate-800 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Landlord:</span>
                    <span className="font-bold text-slate-900 dark:text-white">Marcus Sterling</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tenant:</span>
                    <span className="font-bold text-slate-900 dark:text-white">Alex Chen</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Monthly Rent:</span>
                    <span className="font-bold text-teal-600">$2,450.00 / month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Security Deposit:</span>
                    <span className="font-bold text-slate-900 dark:text-white">$2,450.00 (Escrowed)</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 space-y-1.5 text-[11px] leading-relaxed">
                  <p className="font-bold text-slate-900 dark:text-white">Standard Clauses:</p>
                  <p>1. Term: 12-month fixed term beginning Nov 1, 2024.</p>
                  <p>2. Quiet hours: 10:00 PM to 7:00 AM.</p>
                  <p>3. Maintenance requests handled through the verified portal within 24 hours.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-900 dark:text-white block">
                    Electronic Signature:
                  </label>
                  <div className="p-3 rounded-2xl border border-teal-500 bg-teal-50/30 dark:bg-teal-950/20 text-center font-serif text-lg text-teal-700 dark:text-teal-300 italic">
                    {signatureText}
                  </div>
                </div>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasAgreedClauses}
                    onChange={(e) => setHasAgreedClauses(e.target.checked)}
                    className="mt-0.5 rounded text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-[11px]">
                    I confirm that I have read and agree to all terms of this lease agreement.
                  </span>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSignModal(false)}
                  className="py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmSignature}
                  disabled={!hasAgreedClauses}
                  className="py-2.5 rounded-xl bg-slate-950 dark:bg-teal-500 text-white dark:text-slate-950 font-black text-xs shadow-md disabled:opacity-40"
                >
                  Sign & Execute
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

'use client';

import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Lock, Unlock, Key, KeyRound, User, Plus, Check, AlertCircle, X, Trash2 } from 'lucide-react';

export default function AuthorPrivacyModal({ isOpen, onClose }) {
  const {
    authors,
    activeAuthorId,
    getActiveAuthor,
    createAuthorProfile,
    switchAuthorProfile,
    setAuthorPin,
    deleteAuthorProfile,
  } = useStore();

  const activeAuthor = getActiveAuthor();
  const [activeTab, setActiveTab] = useState('switch'); // 'switch', 'new', 'pin'
  
  // Switch Profile State
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);
  const [pinInput, setPinInput] = useState('');
  const [switchError, setSwitchError] = useState('');

  // New Author State
  const [newAuthorName, setNewAuthorName] = useState('');
  const [newAuthorPin, setNewAuthorPin] = useState('');
  const [createError, setCreateError] = useState('');

  // Set PIN State
  const [setPinValue, setSetPinValue] = useState(activeAuthor?.pin || '');
  const [pinSuccessMsg, setPinSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSwitchSubmit = (authorId, hasPin) => {
    if (authorId === activeAuthorId) {
      onClose();
      return;
    }

    const targetAuthor = authors.find((a) => a.id === authorId);

    if (targetAuthor?.pin) {
      if (selectedAuthorId !== authorId) {
        setSelectedAuthorId(authorId);
        setPinInput('');
        setSwitchError('');
        return;
      }

      if (!pinInput) {
        setSwitchError('Please enter 4-digit passcode PIN');
        return;
      }

      const res = switchAuthorProfile(authorId, pinInput);
      if (res.success) {
        setPinInput('');
        setSelectedAuthorId(null);
        setSwitchError('');
        onClose();
      } else {
        setSwitchError(res.error || 'Incorrect PIN');
      }
    } else {
      switchAuthorProfile(authorId, null);
      setSelectedAuthorId(null);
      onClose();
    }
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newAuthorName.trim()) {
      setCreateError('Please enter an Author Name');
      return;
    }

    if (newAuthorPin && !/^\d{4}$/.test(newAuthorPin)) {
      setCreateError('PIN must be exactly 4 digits');
      return;
    }

    createAuthorProfile({ name: newAuthorName, pin: newAuthorPin || null });
    setNewAuthorName('');
    setNewAuthorPin('');
    setCreateError('');
    onClose();
  };

  const handleSavePin = (e) => {
    e.preventDefault();
    if (setPinValue && !/^\d{4}$/.test(setPinValue)) {
      setPinSuccessMsg('PIN must be exactly 4 digits or empty to remove.');
      return;
    }

    setAuthorPin(activeAuthorId, setPinValue || null);
    setPinSuccessMsg(setPinValue ? '🔒 Passcode PIN saved successfully!' : '🔓 Passcode lock removed.');
    setTimeout(() => setPinSuccessMsg(''), 3000);
  };

  const handleDelete = (authorId, name) => {
    if (window.confirm(`Are you sure you want to remove author profile "${name}" and delete its private vault?`)) {
      deleteAuthorProfile(authorId);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all animate-fadeIn">
      <div className="w-full max-w-lg bg-surface rounded-2xl border-2 border-brass/50 shadow-2xl overflow-hidden flex flex-col texture-bg">
        {/* Header */}
        <div className="bg-[#400a0c] text-white p-5 border-b border-brass/40 flex justify-between items-center relative">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-brass/20 text-amber-200 border border-brass/40">
              <KeyRound size={24} />
            </div>
            <div>
              <h2 className="font-display-md text-2xl font-bold">Author Privacy & Vault</h2>
              <p className="font-writing-surface text-sm text-amber-100/80">
                Private file isolation & passcode protection for your writings.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-amber-100 transition-colors"
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Current Active Badge */}
        <div className="bg-surface-container-low px-6 py-3 border-b border-outline-variant/20 flex items-center justify-between text-xs font-label-sm">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-on-surface-variant">Active Private Vault:</span>
            <strong className="text-[#400a0c] font-bold text-sm">{activeAuthor?.name}</strong>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-brass/10 border border-brass/30 text-[#400a0c] font-bold flex items-center gap-1">
            {activeAuthor?.pin ? <Lock size={12} /> : <Unlock size={12} />}
            {activeAuthor?.pin ? 'PIN Protected' : 'Private Unlocked'}
          </span>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-outline-variant/30 bg-surface-container/40 p-1">
          <button
            onClick={() => { setActiveTab('switch'); setSelectedAuthorId(null); setSwitchError(''); }}
            className={`flex-1 py-2 text-xs font-label-sm font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'switch'
                ? 'bg-[#400a0c] text-white shadow-sm'
                : 'text-on-surface-variant hover:text-[#400a0c] hover:bg-surface-variant/30'
            }`}
          >
            <User size={14} />
            <span>Switch Profile</span>
          </button>

          <button
            onClick={() => { setActiveTab('new'); setCreateError(''); }}
            className={`flex-1 py-2 text-xs font-label-sm font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'new'
                ? 'bg-[#400a0c] text-white shadow-sm'
                : 'text-on-surface-variant hover:text-[#400a0c] hover:bg-surface-variant/30'
            }`}
          >
            <Plus size={14} />
            <span>New Author</span>
          </button>

          <button
            onClick={() => setActiveTab('pin')}
            className={`flex-1 py-2 text-xs font-label-sm font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'pin'
                ? 'bg-[#400a0c] text-white shadow-sm'
                : 'text-on-surface-variant hover:text-[#400a0c] hover:bg-surface-variant/30'
            }`}
          >
            <Key size={14} />
            <span>Set Passcode</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 flex-1 overflow-y-auto max-h-[60vh]">
          {/* TAB 1: SWITCH PROFILE */}
          {activeTab === 'switch' && (
            <div className="space-y-4">
              <p className="text-xs font-body-md text-on-surface-variant italic">
                Select an author profile to load their private writings, manuscripts, and sealed journal entries. Each author's vault is strictly private.
              </p>

              <div className="space-y-2.5">
                {(authors || []).map((author) => {
                  const isActive = author.id === activeAuthorId;
                  const isPromptingPin = selectedAuthorId === author.id && author.pin;

                  return (
                    <div
                      key={author.id}
                      className={`p-3.5 rounded-xl border transition-all flex flex-col gap-2 ${
                        isActive
                          ? 'border-[#400a0c] bg-[#400a0c]/5 shadow-sm'
                          : 'border-outline-variant/30 bg-surface hover:border-brass/50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full border border-brass/60 overflow-hidden bg-primary-container p-0.5 flex items-center justify-center text-[#400a0c] font-bold font-display-md text-base">
                            {author.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-display-md text-base font-bold text-[#400a0c] flex items-center gap-1.5">
                              {author.name}
                              {isActive && (
                                <span className="text-[10px] bg-[#400a0c] text-white px-2 py-0.5 rounded-full font-label-sm font-bold">
                                  Current
                                </span>
                              )}
                            </h4>
                            <span className="text-[11px] font-label-sm text-on-surface-variant/70 flex items-center gap-1">
                              {author.pin ? <Lock size={10} className="text-[#400a0c]" /> : <Unlock size={10} />}
                              {author.pin ? 'Protected by 4-digit PIN' : 'Unprotected Vault'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {!isActive && (
                            <button
                              onClick={() => handleSwitchSubmit(author.id, !!author.pin)}
                              className="px-3 py-1.5 bg-[#400a0c] text-white rounded-full text-xs font-bold font-label-sm hover:bg-primary-container transition-all flex items-center gap-1 shadow-sm"
                            >
                              <span>{author.pin && selectedAuthorId !== author.id ? 'Unlock Vault' : 'Switch'}</span>
                            </button>
                          )}

                          {authors.length > 1 && !isActive && (
                            <button
                              onClick={() => handleDelete(author.id, author.name)}
                              className="p-1.5 text-on-surface-variant/60 hover:text-red-700 transition-colors"
                              title="Delete Profile & Vault"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* PIN Prompt Section */}
                      {isPromptingPin && (
                        <div className="mt-2 p-3 bg-surface-container-low rounded-lg border border-brass/40 flex flex-col gap-2">
                          <label className="text-xs font-label-sm font-bold text-[#400a0c] flex items-center gap-1">
                            <Key size={12} />
                            Enter 4-Digit Passcode PIN for {author.name}:
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="password"
                              maxLength={4}
                              placeholder="••••"
                              value={pinInput}
                              onChange={(e) => setPinInput(e.target.value)}
                              className="flex-1 px-3 py-1.5 bg-surface border border-brass/50 rounded-md text-center text-sm font-mono tracking-widest text-[#400a0c] focus:outline-none focus:ring-1 focus:ring-[#400a0c]"
                              autoFocus
                            />
                            <button
                              onClick={() => handleSwitchSubmit(author.id, true)}
                              className="px-4 py-1.5 bg-[#400a0c] text-white rounded-md text-xs font-bold hover:bg-primary-container transition-all"
                            >
                              Verify & Enter
                            </button>
                          </div>
                          {switchError && (
                            <span className="text-xs text-red-700 flex items-center gap-1 font-bold">
                              <AlertCircle size={12} />
                              {switchError}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: CREATE NEW AUTHOR */}
          {activeTab === 'new' && (
            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <p className="text-xs font-body-md text-on-surface-variant italic">
                Create a dedicated private vault for a new writer or persona. Their writings and journal reflections will be completely isolated from other authors.
              </p>

              <div className="space-y-1.5">
                <label className="text-xs font-label-sm font-bold text-[#400a0c]">
                  Author Name / Pen Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Virginia Woolf, Arthur Pendelton"
                  value={newAuthorName}
                  onChange={(e) => setNewAuthorName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-surface border border-brass/50 rounded-lg text-sm text-[#400a0c] font-writing-surface placeholder:text-outline-variant focus:outline-none focus:ring-1 focus:ring-[#400a0c]"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-label-sm font-bold text-[#400a0c] flex justify-between">
                  <span>Optional Passcode PIN (4 Digits)</span>
                  <span className="text-on-surface-variant/70 text-[11px] font-normal">Leave blank for open access</span>
                </label>
                <input
                  type="password"
                  maxLength={4}
                  placeholder="e.g., 1234"
                  value={newAuthorPin}
                  onChange={(e) => setNewAuthorPin(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-3.5 py-2 bg-surface border border-brass/50 rounded-lg text-sm font-mono tracking-widest text-[#400a0c] focus:outline-none focus:ring-1 focus:ring-[#400a0c]"
                />
              </div>

              {createError && (
                <div className="p-2.5 bg-red-900/10 border border-red-900/30 rounded-lg text-xs text-red-900 font-bold flex items-center gap-1.5">
                  <AlertCircle size={14} />
                  <span>{createError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-[#400a0c] text-white rounded-full text-xs font-bold font-label-sm shadow-md hover:bg-primary-container transition-all flex items-center justify-center gap-2"
              >
                <Plus size={16} />
                <span>Create & Switch to New Private Vault</span>
              </button>
            </form>
          )}

          {/* TAB 3: SET PASSCODE PIN */}
          {activeTab === 'pin' && (
            <form onSubmit={handleSavePin} className="space-y-4">
              <p className="text-xs font-body-md text-on-surface-variant italic">
                Set a 4-digit passcode PIN to protect <strong>{activeAuthor?.name}</strong>'s private vault. Anyone trying to switch into this profile will be required to enter this PIN.
              </p>

              <div className="p-4 bg-surface-container-low rounded-xl border border-brass/40 space-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-label-sm font-bold text-[#400a0c] flex items-center gap-1.5">
                    <Key size={14} />
                    <span>4-Digit Passcode PIN</span>
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    placeholder="Enter 4 numbers (e.g. 8842)"
                    value={setPinValue}
                    onChange={(e) => setSetPinValue(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3.5 py-2 bg-surface border border-brass/50 rounded-lg text-sm font-mono tracking-widest text-[#400a0c] focus:outline-none focus:ring-1 focus:ring-[#400a0c]"
                  />
                  <p className="text-[11px] font-label-sm text-on-surface-variant/70">
                    Clear input and save to remove passcode protection.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-[#400a0c] text-white rounded-full text-xs font-bold font-label-sm hover:bg-primary-container transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Check size={14} />
                  <span>Save Security Passcode</span>
                </button>

                {pinSuccessMsg && (
                  <div className="p-2.5 bg-emerald-900/10 border border-emerald-900/30 rounded-lg text-xs text-emerald-900 font-bold flex items-center gap-1.5">
                    <Check size={14} />
                    <span>{pinSuccessMsg}</span>
                  </div>
                )}
              </div>
            </form>
          )}
        </div>

        {/* Footer info */}
        <div className="bg-surface-container-low p-3 text-center border-t border-outline-variant/20 text-[11px] font-label-sm text-on-surface-variant/70">
          🔒 Private Ambient Writing Sanctuary • Scoped Data Isolation Enabled
        </div>
      </div>
    </div>
  );
}

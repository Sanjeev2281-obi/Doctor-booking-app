import React, { useEffect, useState } from 'react';

// Razorpay-style Payment Modal
function PaymentModal({ appointment, onClose, onSuccess }) {

  const [tab, setTab] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [upi, setUpi] = useState('');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const formatCard = (val) => {
    return val
      .replace(/\D/g, '')
      .slice(0, 16)
      .replace(/(.{4})/g, '$1 ')
      .trim();
  };

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) {
      return digits.slice(0, 2) + '/' + digits.slice(2);
    }
    return digits;
  };

  const handlePay = async () => {
    setProcessing(true);

    // fake payment delay
    await new Promise((r) => setTimeout(r, 2000));

    setProcessing(false);
    setSuccess(true);

    // success animation delay
    await new Promise((r) => setTimeout(r, 1500));

    // call parent function
    onSuccess();
  };

  const displayCard = cardNumber || '•••• •••• •••• ••••';
  const displayName = name || 'YOUR NAME';
  const displayExpiry = expiry || 'MM/YY';
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 999,
      background: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif",
      padding: '16px'
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <div style={{
        background: '#fff',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '420px',
        overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
        animation: 'slideUp 0.3s ease'
      }}>
        <style>{`
          @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          @keyframes spin { to { transform: rotate(360deg); } }
          @keyframes checkPop { 0% { transform: scale(0); } 70% { transform: scale(1.2); } 100% { transform: scale(1); } }
          .pay-tab { border: none; background: none; padding: 10px 18px; font-size: 13px; font-weight: 500; cursor: pointer; color: #888; border-bottom: 2px solid transparent; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
          .pay-tab.active { color: #2563eb; border-bottom: 2px solid #2563eb; }
          .pay-input { width: 100%; border: 1.5px solid #e5e7eb; border-radius: 8px; padding: 11px 14px; font-size: 14px; font-family: 'DM Mono', monospace; color: #111; outline: none; transition: border 0.2s; box-sizing: border-box; }
          .pay-input:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.08); }
          .pay-input::placeholder { color: #bbb; font-family: 'DM Sans', sans-serif; }
        `}</style>

        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1a1f36 0%, #2563eb 100%)',
          padding: '20px 24px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>Secure Payment</div>
            <div style={{ color: '#fff', fontSize: '22px', fontWeight: '600', marginTop: '2px' }}>₹500.00</div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', marginTop: '2px' }}>Dr. {appointment?.doctorName}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
            <div style={{
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '6px', padding: '4px 10px',
              color: '#fff', fontSize: '11px', fontWeight: '500',
              display: 'flex', alignItems: 'center', gap: '5px'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }}></span>
              Secure
            </div>
            <button onClick={onClose} style={{
              background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '6px',
              color: '#fff', cursor: 'pointer', padding: '4px 10px', fontSize: '11px'
            }}>✕ Close</button>
          </div>
        </div>

        {success ? (
          <div style={{ padding: '48px 24px', textAlign: 'center' }}>
            <div style={{
              width: '64px', height: '64px', background: '#dcfce7', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px', animation: 'checkPop 0.4s ease',
              fontSize: '28px'
            }}>✅</div>
            <div style={{ fontSize: '18px', fontWeight: '600', color: '#111' }}>Payment Successful!</div>
            <div style={{ fontSize: '13px', color: '#888', marginTop: '6px' }}>Your appointment is confirmed</div>
          </div>
        ) : (
          <div style={{ padding: '0 24px 24px' }}>

            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #f0f0f0', marginBottom: '20px', marginTop: '4px' }}>
              {['card', 'upi', 'netbanking'].map(t => (
                <button key={t} className={`pay-tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
                  {t === 'card' ? '💳 Card' : t === 'upi' ? '📱 UPI' : '🏦 Netbanking'}
                </button>
              ))}
            </div>

            {/* Card Tab */}
            {tab === 'card' && (
              <div>
                {/* Card Preview */}
                <div style={{
                  background: 'linear-gradient(135deg, #1a1f36, #2563eb)',
                  borderRadius: '12px', padding: '20px',
                  marginBottom: '20px', position: 'relative', overflow: 'hidden',
                  minHeight: '120px'
                }}>
                  <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
                  <div style={{ position: 'absolute', bottom: '-30px', left: '30px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', letterSpacing: '2px', marginBottom: '12px' }}>DEBIT / CREDIT</div>
                  <div style={{ color: '#fff', fontSize: '16px', fontFamily: 'DM Mono', letterSpacing: '2px', marginBottom: '14px' }}>{displayCard}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '9px', letterSpacing: '1px' }}>CARD HOLDER</div>
                      <div style={{ color: '#fff', fontSize: '12px', fontWeight: '500', marginTop: '2px' }}>{displayName}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '9px', letterSpacing: '1px' }}>EXPIRES</div>
                      <div style={{ color: '#fff', fontSize: '12px', fontFamily: 'DM Mono', marginTop: '2px' }}>{displayExpiry}</div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '11px', color: '#666', fontWeight: '500', display: 'block', marginBottom: '5px', letterSpacing: '0.5px' }}>CARD NUMBER</label>
                    <input className="pay-input" placeholder="1234 5678 9012 3456" value={cardNumber}
                      onChange={e => setCardNumber(formatCard(e.target.value))} />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', color: '#666', fontWeight: '500', display: 'block', marginBottom: '5px', letterSpacing: '0.5px' }}>NAME ON CARD</label>
                    <input className="pay-input" placeholder="John Doe" value={name}
                      onChange={e => setName(e.target.value.toUpperCase())} style={{ fontFamily: 'DM Sans' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: '11px', color: '#666', fontWeight: '500', display: 'block', marginBottom: '5px', letterSpacing: '0.5px' }}>EXPIRY</label>
                      <input className="pay-input" placeholder="MM/YY" value={expiry}
                        onChange={e => setExpiry(formatExpiry(e.target.value))} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: '11px', color: '#666', fontWeight: '500', display: 'block', marginBottom: '5px', letterSpacing: '0.5px' }}>CVV</label>
                      <input className="pay-input" placeholder="•••" type="password" maxLength={3}
                        onFocus={() => setFlipped(true)} onBlur={() => setFlipped(false)}
                        value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* UPI Tab */}
            {tab === 'upi' && (
              <div>
                <div style={{
                  background: '#f8faff', border: '1.5px dashed #c7d7f9',
                  borderRadius: '12px', padding: '24px', textAlign: 'center', marginBottom: '20px'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>📱</div>
                  <div style={{ fontSize: '13px', color: '#555', fontWeight: '500' }}>Enter your UPI ID</div>
                  <div style={{ fontSize: '11px', color: '#aaa', marginTop: '4px' }}>e.g. yourname@paytm</div>
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: '#666', fontWeight: '500', display: 'block', marginBottom: '5px', letterSpacing: '0.5px' }}>UPI ID</label>
                  <input className="pay-input" placeholder="yourname@upi" value={upi}
                    onChange={e => setUpi(e.target.value)} style={{ fontFamily: 'DM Sans' }} />
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
                  {['@paytm', '@gpay', '@phonepe', '@okaxis'].map(suffix => (
                    <button key={suffix} onClick={() => setUpi(prev => prev.split('@')[0] + suffix)}
                      style={{
                        border: '1.5px solid #e5e7eb', borderRadius: '20px', padding: '5px 12px',
                        fontSize: '11px', color: '#555', cursor: 'pointer', background: '#fff',
                        fontFamily: 'DM Sans', transition: 'all 0.15s'
                      }}>{suffix}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Netbanking Tab */}
            {tab === 'netbanking' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                  {[
                    { name: 'SBI', color: '#1e3a8a' },
                    { name: 'HDFC', color: '#dc2626' },
                    { name: 'ICICI', color: '#ea580c' },
                    { name: 'Axis', color: '#7c3aed' },
                  ].map(bank => (
                    <div key={bank.name} style={{
                      border: '1.5px solid #e5e7eb', borderRadius: '10px', padding: '14px',
                      display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = '#2563eb'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = '#e5e7eb'}
                    >
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '8px',
                        background: bank.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontSize: '10px', fontWeight: '700'
                      }}>{bank.name[0]}</div>
                      <span style={{ fontSize: '13px', fontWeight: '500', color: '#333' }}>{bank.name} Bank</span>
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: '#666', fontWeight: '500', display: 'block', marginBottom: '5px', letterSpacing: '0.5px' }}>OTHER BANKS</label>
                  <select className="pay-input" style={{ fontFamily: 'DM Sans', cursor: 'pointer' }}>
                    <option>Select your bank</option>
                    <option>Bank of Baroda</option>
                    <option>Canara Bank</option>
                    <option>Punjab National Bank</option>
                    <option>Kotak Mahindra</option>
                    <option>Yes Bank</option>
                  </select>
                </div>
              </div>
            )}

            {/* Pay Button */}
            <button onClick={handlePay} disabled={processing} style={{
              width: '100%', marginTop: '20px',
              background: processing ? '#93c5fd' : 'linear-gradient(135deg, #1d4ed8, #2563eb)',
              color: '#fff', border: 'none', borderRadius: '10px',
              padding: '14px', fontSize: '15px', fontWeight: '600',
              cursor: processing ? 'not-allowed' : 'pointer',
              fontFamily: 'DM Sans', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '8px', transition: 'all 0.2s',
              boxShadow: processing ? 'none' : '0 4px 14px rgba(37,99,235,0.35)'
            }}>
              {processing ? (
                <>
                  <div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                  Processing...
                </>
              ) : `Pay ₹500 Securely`}
            </button>

            {/* Trust badges */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '14px' }}>
              <span style={{ fontSize: '10px', color: '#bbb', display: 'flex', alignItems: 'center', gap: '3px' }}>🔒 256-bit SSL</span>
              <span style={{ fontSize: '10px', color: '#bbb' }}>|</span>
              <span style={{ fontSize: '10px', color: '#bbb', display: 'flex', alignItems: 'center', gap: '3px' }}>🛡️ PCI DSS</span>
              <span style={{ fontSize: '10px', color: '#bbb' }}>|</span>
              <span style={{ fontSize: '10px', color: '#bbb', display: 'flex', alignItems: 'center', gap: '3px' }}>✓ RBI Compliant</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MyAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
 
  const getLocalAppointments = () => JSON.parse(localStorage.getItem("appointments") || "[]");
  const saveLocalAppointments = (appointments) => localStorage.setItem("appointments", JSON.stringify(appointments));

  const fetchAppointments = async () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user || !user.email) { setAppointments([]); return; }
    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments/${user.email}`, {
        method: "GET", headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setAppointments(data);
      const localAppointments = getLocalAppointments();
      const updatedLocal = localAppointments.filter(a => a.userEmail !== user.email).concat(data);
      saveLocalAppointments(updatedLocal);
    } catch {
      console.warn("Backend failed, loading local appointments");
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      const localAppointments = getLocalAppointments().filter((a) => a.userEmail === user?.email);
      setAppointments(localAppointments);
    }
  };

  const handleCancel = async (id) => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments/${id}`, {
        method: "DELETE", headers: { "Content-Type": "application/json" },
      });
      if (res.ok) { alert("Appointment cancelled!"); fetchAppointments(); }
      else throw new Error(await res.text());
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      const localAppointments = getLocalAppointments().filter((a) => a.id !== id);
      saveLocalAppointments(localAppointments);
      setAppointments(localAppointments);
      alert("Appointment cancelled locally (server offline)");
    }
  };

  const handlePaymentSuccess = async () => {
  if (!selectedAppointment) return;

  try {
    await fetch(`${API_BASE_URL}/api/appointments/pay/${selectedAppointment.id}`, {
      method: "PUT"
    });
  // eslint-disable-next-line no-unused-vars
  } catch (e) {
    console.warn("Pay API failed");
  }

  // ✅ Update UI instantly
  setAppointments(prev =>
    prev.map(app =>
      app.id === selectedAppointment.id
        ? { ...app, paymentStatus: "PAID" }
        : app
    )
  );

  // close modal
  setShowPayment(false);
  setSelectedAppointment(null);
};

  useEffect(() => { fetchAppointments(); }, []);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b border-gray-300">My Appointment</p>

      {appointments.length === 0 ? (
        <p className="text-sm text-gray-600 mt-4">No appointments booked yet.</p>
      ) : (
        appointments.map((item) => {
          const isPaid = item.paymentStatus?.toUpperCase() === "PAID";

          return (
            <div key={item.id} className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-gray-300">
              <div>
                <img className="bg-indigo-50 w-32" src={item.doctorImage} alt="" />
              </div>
              <div className="flex-1 text-sm text-zinc-700">
                <p className="text-neutral-800 font-semibold">{item.doctorName}</p>
                <p className="text-sm">Appointment Booked</p>
                <p className="text-neutral-800 font-semibold mt-1">Date & Time:</p>
                <p className="text-xs mt-1">{item.date} | {item.time}</p>
              </div>
              <div className="flex flex-col justify-end">
                <button
                  style={{
                    background: isPaid ? "#16a34a" : "#2563eb",
                    color: "white",
                    padding: "8px 14px",
                    borderRadius: "6px",
                    border: "none"
                  }}
                  onClick={() => {
                    setSelectedAppointment(item);
                    setShowPayment(true);
                  }}
                  disabled={isPaid}
                >
                  {isPaid ? "Paid ✅" : "Pay Online"}
                </button>
                <button
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border mt-1 border-gray-400 hover:bg-red-600 hover:text-white transition-all duration-300"
                  onClick={() => handleCancel(item.id)}
                >
                  Cancel appointment
                </button>
              </div>
            </div>
          );
        })
      )}

      {showPayment && selectedAppointment && (
        <PaymentModal
          appointment={selectedAppointment}
          onClose={() => {
            setShowPayment(false);
            setSelectedAppointment(null);
          }}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}

export default MyAppointment;
import { useState } from "react";

const STORES = ["マラケッシュ", "アジアン", "ターザン", "カリヴィアン", "サンシルク", "ダイヤモンド", "ニューポート", "イエスタデイ", "パームヴィラ"];
const STATUSES = ["未対応", "検討中", "対応済み"];
const ST = {
  "未対応":  { dot: "#c05040", bg: "#fdf5f3", color: "#a03828", border: "#e8c0b8" },
  "検討中":  { dot: "#4878b8", bg: "#f0f4fb", color: "#2858a0", border: "#b8ccec" },
  "対応済み":{ dot: "#4a8860", bg: "#f0f8f3", color: "#2a6840", border: "#a8d8b8" },
};
const SAMPLE = [
  { id: 1, store: "マラケッシュ", content: "休憩室にコーヒーメーカーを追加してほしいです。長時間のシフトで疲れたときに助かります。", date: "2026-03-20", status: "未対応" },
  { id: 2, store: "アジアン",     content: "シフト表を1週間前に確定してもらえると予定が立てやすいです。", date: "2026-03-19", status: "対応済み" },
  { id: 3, store: "ターザン",     content: "制服のサイズバリエーションを増やしてもらいたいです。", date: "2026-03-18", status: "検討中" },
];

let _password = "admin1234";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Cormorant+Garamond:wght@400;600&family=DM+Mono:wght@400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#f4f2ed;font-family:'Noto Sans JP',sans-serif}

.nav{background:#1e3a6e;padding:0 28px;display:flex;align-items:center;height:54px;position:sticky;top:0;z-index:20;border-bottom:1px solid rgba(200,160,80,.25)}
.nav-logo{display:flex;align-items:center;gap:10px;margin-right:36px}
.nav-ico{width:30px;height:30px;background:#c8a050;border-radius:6px;display:flex;align-items:center;justify-content:center}
.nav-name{font-size:13px;font-weight:700;color:#e8d8b8;letter-spacing:.5px;font-family:'Cormorant Garamond',serif}
.nav-tab{padding:0 16px;height:54px;display:flex;align-items:center;font-size:13px;color:#8899bb;cursor:pointer;border-bottom:2px solid transparent;transition:all .18s;font-weight:500;letter-spacing:.3px}
.nav-tab:hover{color:#c8b890}
.nav-tab.on{color:#c8a050;border-bottom-color:#c8a050}
.logout-btn{display:flex;align-items:center;gap:6px;padding:7px 13px;border:1px solid rgba(200,160,80,.4);background:rgba(200,160,80,.08);border-radius:3px;color:#c8b070;font-family:'Noto Sans JP',sans-serif;font-size:12px;font-weight:500;cursor:pointer;transition:all .15s;margin-left:auto}
.logout-btn:hover{background:rgba(200,160,80,.2);color:#c8a050}

.sp{min-height:calc(100vh - 54px);display:flex;align-items:flex-start;justify-content:center;padding:48px 20px;background:#f4f2ed}
.sp-card{background:#fff;border-radius:4px;box-shadow:0 2px 24px rgba(14,27,53,.08);width:100%;max-width:480px;overflow:hidden;border:1px solid #d8d0c0}
.sp-head{background:#1e3a6e;padding:28px 32px 24px;position:relative}
.sp-head::after{content:'';position:absolute;bottom:0;left:32px;right:32px;height:1px;background:linear-gradient(90deg,transparent,rgba(200,160,80,.5),transparent)}
.sp-head-row{display:flex;align-items:center;gap:12px;margin-bottom:7px}
.sp-ico{width:38px;height:38px;background:#c8a050;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.sp-htitle{font-size:18px;font-weight:600;color:#e8d8b8;letter-spacing:.5px;font-family:'Cormorant Garamond',serif}
.sp-hsub{font-size:12px;color:#6678a0;padding-left:50px;line-height:1.65}
.sp-body{padding:28px 32px}
.lbl{font-size:10px;font-weight:600;color:#c8a050;text-transform:uppercase;letter-spacing:1.4px;font-family:'DM Mono',monospace;display:block;margin-bottom:9px}
.sgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-bottom:24px}
.sbtn{padding:9px 4px;border:1px solid #d8d0c0;background:#faf9f6;border-radius:3px;color:#8899aa;font-family:'Noto Sans JP',sans-serif;font-size:13px;cursor:pointer;transition:all .15s;text-align:center}
.sbtn:hover{border-color:#c8a050;color:#1e3a6e;background:#fdf9f0}
.sbtn.on{border-color:#c8a050;background:#1e3a6e;color:#c8a050;font-weight:600}
.ta{width:100%;border:1px solid #d8d0c0;border-radius:3px;padding:12px 14px;color:#1a2035;font-family:'Noto Sans JP',sans-serif;font-size:14px;line-height:1.75;resize:vertical;min-height:120px;outline:none;transition:border-color .2s;background:#faf9f6}
.ta:focus{border-color:#c8a050;background:#fff}
.ta::placeholder{color:#c4bfb4}
.cc{font-size:11px;color:#b8b0a4;text-align:right;font-family:'DM Mono',monospace;margin-top:4px;margin-bottom:18px}
.err{font-size:12px;color:#b04040;background:#fdf5f5;border:1px solid #e8c0c0;border-radius:3px;padding:9px 13px;margin-bottom:14px}
.sub-btn{display:flex;align-items:center;justify-content:center;gap:9px;width:100%;padding:13px;background:#1e3a6e;color:#c8a050;border:none;border-radius:3px;font-family:'Noto Sans JP',sans-serif;font-size:14px;font-weight:600;cursor:pointer;transition:all .2s;letter-spacing:.5px}
.sub-btn:hover{background:#2a4a80;transform:translateY(-1px);box-shadow:0 4px 16px rgba(14,27,53,.18)}
.anon-note{display:flex;align-items:center;justify-content:center;gap:5px;font-size:11px;color:#b0a898;margin-top:10px}
.ok{display:flex;flex-direction:column;align-items:center;gap:14px;padding:16px 0;text-align:center}
.ok-i{width:58px;height:58px;background:#c8a050;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:26px;color:#1e3a6e;animation:pop .4s cubic-bezier(.175,.885,.32,1.275)}
@keyframes pop{0%{transform:scale(0);opacity:0}100%{transform:scale(1);opacity:1}}
.ok-t{font-size:17px;font-weight:700;color:#1e3a6e;font-family:'Cormorant Garamond',serif;letter-spacing:.5px}
.ok-s{font-size:13px;color:#8899aa;line-height:1.65}
.ok-again{margin-top:4px;padding:9px 22px;border:1px solid #d8d0c0;background:#fff;border-radius:3px;font-family:'Noto Sans JP',sans-serif;font-size:13px;color:#6678a0;cursor:pointer;transition:all .15s}
.ok-again:hover{border-color:#c8a050;color:#1e3a6e}

.lp{min-height:calc(100vh - 54px);display:flex;align-items:center;justify-content:center;padding:40px 20px;background:#f4f2ed}
.lp-card{background:#fff;border:1px solid #d8d0c0;border-radius:4px;box-shadow:0 2px 24px rgba(14,27,53,.08);width:100%;max-width:400px;overflow:hidden}
.lp-head{background:#1e3a6e;padding:28px 32px 24px;text-align:center;position:relative}
.lp-head::after{content:'';position:absolute;bottom:0;left:32px;right:32px;height:1px;background:linear-gradient(90deg,transparent,rgba(200,160,80,.5),transparent)}
.lp-ico{width:44px;height:44px;background:#c8a050;border-radius:4px;display:flex;align-items:center;justify-content:center;margin:0 auto 12px}
.lp-title{font-size:17px;font-weight:600;color:#e8d8b8;font-family:'Cormorant Garamond',serif;letter-spacing:.5px}
.lp-sub{font-size:12px;color:#6678a0;margin-top:4px}
.lp-body{padding:28px 32px}
.lp-input{width:100%;border:1px solid #d8d0c0;border-radius:3px;padding:11px 14px;color:#1a2035;font-family:'Noto Sans JP',sans-serif;font-size:14px;outline:none;transition:border-color .2s;background:#faf9f6;margin-bottom:14px;display:block}
.lp-input:focus{border-color:#c8a050;background:#fff}
.lp-input::placeholder{color:#c4bfb4}
.lp-btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:12px;background:#1e3a6e;color:#c8a050;border:none;border-radius:3px;font-family:'Noto Sans JP',sans-serif;font-size:14px;font-weight:600;cursor:pointer;transition:all .2s;letter-spacing:.5px}
.lp-btn:hover{background:#2a4a80;transform:translateY(-1px)}
.lp-err{font-size:12px;color:#a03828;background:#fdf5f3;border:1px solid #e8c0b8;border-radius:3px;padding:9px 13px;margin-bottom:14px;text-align:center}

.ap{min-height:calc(100vh - 54px);padding:28px 26px 60px;background:#f4f2ed}
.ap-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:22px;flex-wrap:wrap;gap:12px}
.ap-title{font-size:18px;font-weight:600;color:#1e3a6e;font-family:'Cormorant Garamond',serif;letter-spacing:.5px}
.ap-sub{font-size:12px;color:#8899aa;margin-top:2px}
.ap-btns{display:flex;gap:8px;flex-wrap:wrap}
.dl-btn{display:flex;align-items:center;gap:7px;padding:9px 15px;background:#1e3a6e;color:#c8a050;border:none;border-radius:3px;font-family:'Noto Sans JP',sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:all .18s;letter-spacing:.3px}
.dl-btn:hover{background:#2a4a80;transform:translateY(-1px)}
.pw-btn-outline{display:flex;align-items:center;gap:7px;padding:9px 15px;background:transparent;color:#c8a050;border:1px solid rgba(200,160,80,.5);border-radius:3px;font-family:'Noto Sans JP',sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:all .18s}
.pw-btn-outline:hover{background:rgba(200,160,80,.1)}
.toolbar{display:flex;align-items:center;gap:6px;flex-wrap:wrap;background:#fff;padding:12px 16px;border-radius:3px;border:1px solid #d8d0c0;margin-bottom:14px}
.tlbl{font-size:10px;color:#c8a050;font-family:'DM Mono',monospace;flex-shrink:0;font-weight:600;letter-spacing:.8px}
.fb{padding:4px 12px;border:1px solid #d8d0c0;background:#faf9f6;border-radius:20px;color:#8899aa;font-family:'Noto Sans JP',sans-serif;font-size:12px;cursor:pointer;transition:all .14s}
.fb:hover{border-color:#c8a050;color:#1e3a6e}
.fb.on{border-color:#1e3a6e;background:#1e3a6e;color:#c8a050}
.fsep{width:1px;height:14px;background:#d8d0c0;margin:0 4px;flex-shrink:0}
.cnt{font-size:11px;color:#b0a898;margin-bottom:8px;font-family:'DM Mono',monospace;padding:0 2px}
.tbl{background:#fff;border-radius:3px;border:1px solid #d8d0c0;overflow:hidden}
.thead{display:grid;grid-template-columns:110px 1fr 100px 150px;background:#f8f6f0;border-bottom:1px solid #d8d0c0;padding:10px 18px}
.thc{font-size:10px;font-weight:600;color:#c8a050;font-family:'DM Mono',monospace;text-transform:uppercase;letter-spacing:.9px}
.trow{display:grid;grid-template-columns:110px 1fr 100px 150px;padding:14px 18px;border-bottom:1px solid #ede8e0;align-items:center;transition:background .15s;cursor:pointer}
.trow:last-child{border-bottom:none}
.trow:hover{background:#fdf9f2}
.stag{font-size:11px;font-weight:600;background:#f0ece2;color:#6a5a40;padding:3px 9px;border-radius:3px;display:inline-block;letter-spacing:.3px}
.tcont{font-size:13px;color:#3a4060;line-height:1.5;padding:0 14px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.tdate{font-size:11px;color:#b0a898;font-family:'DM Mono',monospace}
.badge{display:inline-flex;align-items:center;gap:5px;font-size:12px;font-weight:600;padding:4px 4px 4px 9px;border-radius:20px;border:1px solid transparent}
.badge select{appearance:none;border:none;background:transparent;font-family:'Noto Sans JP',sans-serif;font-size:12px;font-weight:600;cursor:pointer;outline:none;padding-right:3px}
.dot{width:6px;height:6px;border-radius:50%;display:inline-block;flex-shrink:0}
.new-badge{display:inline-block;background:#c8a050;color:#1e3a6e;font-size:9px;font-weight:700;padding:2px 6px;border-radius:3px;margin-left:6px;vertical-align:middle;font-family:'DM Mono',monospace;letter-spacing:.5px}
.empty{text-align:center;padding:52px;color:#b0a898;font-size:13px}
.toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#1e3a6e;color:#c8a050;padding:10px 20px;border-radius:3px;font-size:13px;font-weight:600;font-family:'Noto Sans JP',sans-serif;box-shadow:0 4px 20px rgba(14,27,53,.25);border:1px solid rgba(200,160,80,.3);animation:fup .25s ease;z-index:100;white-space:nowrap}
@keyframes fup{from{opacity:0;transform:translateX(-50%) translateY(8px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}

.overlay{position:fixed;inset:0;background:rgba(8,16,32,.55);z-index:50;display:flex;align-items:center;justify-content:center;padding:20px;animation:fadein .2s ease}
@keyframes fadein{from{opacity:0}to{opacity:1}}
.modal{background:#fff;border-radius:4px;width:100%;max-width:520px;box-shadow:0 16px 56px rgba(14,27,53,.22);border:1px solid #d8d0c0;animation:slideup .22s cubic-bezier(.22,.68,0,1.2);overflow:hidden}
@keyframes slideup{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
.modal-head{background:#1e3a6e;padding:20px 24px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(200,160,80,.25)}
.modal-head-left{display:flex;align-items:center;gap:10px}
.modal-head-title{color:#e8d8b8;font-size:14px;font-weight:600;letter-spacing:.3px}
.modal-close{width:28px;height:28px;border:1px solid rgba(200,160,80,.3);background:rgba(200,160,80,.1);border-radius:3px;color:#8899bb;font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s;flex-shrink:0}
.modal-close:hover{background:rgba(200,160,80,.25);color:#c8a050}
.modal-body{padding:26px}
.modal-field{margin-bottom:20px}
.modal-field:last-child{margin-bottom:0}
.modal-flbl{font-size:10px;font-weight:600;color:#c8a050;text-transform:uppercase;letter-spacing:1.2px;font-family:'DM Mono',monospace;margin-bottom:7px}
.modal-content-box{background:#faf9f6;border-radius:3px;padding:14px 16px;font-size:14px;color:#1a2035;line-height:1.8;border:1px solid #d8d0c0}
.modal-row{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:20px}
.modal-status-wrap{display:flex;align-items:center;gap:8px}
.modal-sta-select{appearance:none;border:1px solid;border-radius:20px;font-family:'Noto Sans JP',sans-serif;font-size:13px;font-weight:600;cursor:pointer;outline:none;padding:5px 12px 5px 10px}
.modal-fval{font-size:14px;color:#1a2035;font-family:'DM Mono',monospace}

.pw-section{}
.pw-input{width:100%;border:1px solid #d8d0c0;border-radius:3px;padding:10px 13px;color:#1a2035;font-family:'Noto Sans JP',sans-serif;font-size:13px;outline:none;transition:border-color .2s;background:#faf9f6;margin-bottom:10px;display:block}
.pw-input:focus{border-color:#c8a050;background:#fff}
.pw-input::placeholder{color:#c4bfb4}
.pw-submit{display:flex;align-items:center;justify-content:center;gap:7px;width:100%;padding:11px;background:#1e3a6e;color:#c8a050;border:none;border-radius:3px;font-family:'Noto Sans JP',sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:all .18s;margin-top:4px}
.pw-submit:hover{background:#2a4a80}
.pw-ok{font-size:12px;color:#2a6840;background:#f0f8f3;border:1px solid #a8d8b8;border-radius:3px;padding:8px 12px;margin-bottom:10px;text-align:center}
.pw-err{font-size:12px;color:#a03828;background:#fdf5f3;border:1px solid #e8c0b8;border-radius:3px;padding:8px 12px;margin-bottom:10px;text-align:center}
`;

// ── Login Page ──
function LoginPage({ onLogin }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  const handle = () => {
    if (pw === _password) { setErr(""); onLogin(); }
    else setErr("パスワードが正しくありません");
  };

  return (
    <div className="lp">
      <div className="lp-card">
        <div className="lp-head">
          <div className="lp-ico">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e3a6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <div className="lp-title">管理画面 ログイン</div>
          <div className="lp-sub">管理者パスワードを入力してください</div>
        </div>
        <div className="lp-body">
          {err && <div className="lp-err">⚠ {err}</div>}
          <input
            className="lp-input"
            type="password"
            placeholder="パスワード"
            value={pw}
            onChange={e => setPw(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handle()}
            autoFocus
          />
          <button className="lp-btn" onClick={handle}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10 17 15 12 10 7"/>
              <line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
            ログイン
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Password Change Modal ──
function PasswordChangeModal({ onClose }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState("");
  const [ok, setOk] = useState(false);

  const handle = () => {
    setErr(""); setOk(false);
    if (current !== _password) { setErr("現在のパスワードが正しくありません"); return; }
    if (next.length < 6) { setErr("新しいパスワードは6文字以上で入力してください"); return; }
    if (next !== confirm) { setErr("新しいパスワードが一致しません"); return; }
    _password = next;
    setOk(true);
    setCurrent(""); setNext(""); setConfirm("");
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" style={{maxWidth:420}} onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div className="modal-head-left">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8a050" strokeWidth="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span className="modal-head-title">パスワード変更</span>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {ok && <div className="pw-ok">✓ パスワードを変更しました</div>}
          {err && <div className="pw-err">⚠ {err}</div>}
          <div className="modal-field">
            <div className="modal-flbl">現在のパスワード</div>
            <input className="pw-input" type="password" placeholder="現在のパスワード" value={current} onChange={e => setCurrent(e.target.value)} />
          </div>
          <div className="modal-field">
            <div className="modal-flbl">新しいパスワード</div>
            <input className="pw-input" type="password" placeholder="6文字以上" value={next} onChange={e => setNext(e.target.value)} />
          </div>
          <div className="modal-field">
            <div className="modal-flbl">新しいパスワード（確認）</div>
            <input className="pw-input" type="password" placeholder="もう一度入力" value={confirm} onChange={e => setConfirm(e.target.value)} />
          </div>
          <button className="pw-submit" onClick={handle}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v14a2 2 0 0 1-2 2z"/>
              <polyline points="17 21 17 13 7 13 7 21"/>
              <polyline points="7 3 7 8 15 8"/>
            </svg>
            パスワードを変更する
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Submit Page ──
function SubmitPage({ onSubmit }) {
  const [store, setStore] = useState("");
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handle = () => {
    if (!store) { setError("店舗を選択してください"); return; }
    if (content.trim().length < 10) { setError("10文字以上で入力してください"); return; }
    setError("");
    onSubmit({ store, content: content.trim() });
    setSubmitted(true);
  };

  const reset = () => { setSubmitted(false); setStore(""); setContent(""); };

  return (
    <div className="sp">
      <div className="sp-card">
        <div className="sp-head">
          <div className="sp-head-row">
            <div className="sp-ico">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e3a6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </div>
            <div className="sp-htitle">意見を投稿する</div>
          </div>
          <p className="sp-hsub">ご意見・ご提案をお気軽にお寄せください。すべて匿名で送信されます。</p>
        </div>
        <div className="sp-body">
          {submitted ? (
            <div className="ok">
              <div className="ok-i">✓</div>
              <div className="ok-t">送信しました！</div>
              <p className="ok-s">管理者が確認し、改善に活かします。</p>
              <button className="ok-again" onClick={reset}>続けて投稿する</button>
            </div>
          ) : (
            <>
              <span className="lbl">店舗を選択</span>
              <div className="sgrid">
                {STORES.map(s => (
                  <button key={s} className={"sbtn" + (store === s ? " on" : "")} onClick={() => setStore(s)}>{s}</button>
                ))}
              </div>
              <span className="lbl">意見・提案</span>
              <textarea className="ta" placeholder="職場環境、業務改善、設備など何でもどうぞ。" value={content} onChange={e => setContent(e.target.value)} maxLength={500} />
              <div className="cc">{content.length} / 500</div>
              {error && <div className="err">⚠ {error}</div>}
              <button className="sub-btn" onClick={handle}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
                匿名で送信する
              </button>
              <div className="anon-note">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                投稿者の情報は一切記録されません
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Detail Modal ──
function DetailModal({ item, onClose, onUpdateStatus }) {
  const st = ST[item.status];
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div className="modal-head-left">
            <span className="stag" style={{background:"#162e58",color:"#c8a050"}}>{item.store}</span>
            {item.isNew && <span className="new-badge">NEW</span>}
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="modal-row">
            <div className="modal-field">
              <div className="modal-flbl">投稿日</div>
              <div className="modal-fval">{item.date}</div>
            </div>
            <div className="modal-field">
              <div className="modal-flbl">ステータス</div>
              <div className="modal-status-wrap">
                <span className="dot" style={{background: st.dot}}/>
                <select
                  className="modal-sta-select"
                  style={{background: st.bg, borderColor: st.border, color: st.color}}
                  value={item.status}
                  onChange={e => onUpdateStatus(item.id, e.target.value)}
                >
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="modal-field">
            <div className="modal-flbl">投稿内容</div>
            <div className="modal-content-box">{item.content}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Admin Page ──
function AdminPage({ data, onUpdateStatus, onClearNew }) {
  const [fStore, setFStore] = useState("すべて");
  const [fStatus, setFStatus] = useState("すべて");
  const [toast, setToast] = useState("");
  const [selected, setSelected] = useState(null);
  const [showPw, setShowPw] = useState(false);

  const filtered = data.filter(s =>
    (fStore === "すべて" || s.store === fStore) &&
    (fStatus === "すべて" || s.status === fStatus)
  );

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  const downloadCSV = () => {
    if (!filtered.length) { showToast("⚠ データがありません"); return; }
    const rows = [["ID","店舗","内容","日付","ステータス"], ...filtered.map(s => [s.id, s.store, `"${s.content.replace(/"/g,'""')}"`, s.date, s.status])];
    const blob = new Blob(["\uFEFF" + rows.map(r => r.join(",")).join("\n")], { type: "text/csv;charset=utf-8;" });
    const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: `意見箱_${new Date().toISOString().split("T")[0]}.csv` });
    a.click();
    showToast("✓ CSVをダウンロードしました");
  };

  const handleUpdateStatus = (id, status) => {
    onUpdateStatus(id, status);
    if (selected && selected.id === id) setSelected(prev => ({ ...prev, status }));
  };

  const openDetail = s => {
    setSelected(s);
    onClearNew(s.id);
  };

  return (
    <div className="ap">
      <div className="ap-header">
        <div>
          <div className="ap-title">意見管理 — {data.length} 件</div>
          <div className="ap-sub">行をクリックすると詳細を確認できます</div>
        </div>
        <div className="ap-btns">
          <button className="pw-btn-outline" onClick={() => setShowPw(true)}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            パスワード変更
          </button>
          <button className="dl-btn" onClick={downloadCSV}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            CSVダウンロード
          </button>
        </div>
      </div>

      <div className="toolbar">
        <span className="tlbl">店舗：</span>
        {["すべて", ...STORES].map(s => (
          <button key={s} className={"fb" + (fStore === s ? " on" : "")} onClick={() => setFStore(s)}>{s}</button>
        ))}
        <div className="fsep"/>
        <span className="tlbl">状況：</span>
        {["すべて", ...STATUSES].map(s => (
          <button key={s} className={"fb" + (fStatus === s ? " on" : "")} onClick={() => setFStatus(s)}>{s}</button>
        ))}
      </div>

      <div className="cnt">{filtered.length} 件表示中</div>

      <div className="tbl">
        <div className="thead">
          <div className="thc">店舗</div>
          <div className="thc">内容</div>
          <div className="thc">日付</div>
          <div className="thc">ステータス</div>
        </div>
        {filtered.length === 0 ? (
          <div className="empty">投稿された意見はまだありません</div>
        ) : filtered.map(s => {
          const st = ST[s.status];
          return (
            <div key={s.id} className="trow" onClick={() => openDetail(s)}>
              <div><span className="stag">{s.store}</span></div>
              <div className="tcont">{s.content}</div>
              <div className="tdate">{s.date}</div>
              <div onClick={e => e.stopPropagation()} style={{display:"flex",alignItems:"center",gap:6}}>
                <span className="badge" style={{background:st.bg,borderColor:st.border,color:st.color}}>
                  <span className="dot" style={{background:st.dot}}/>
                  <select style={{color:st.color}} value={s.status} onChange={e => handleUpdateStatus(s.id, e.target.value)}>
                    {STATUSES.map(st => <option key={st} value={st}>{st}</option>)}
                  </select>
                </span>
                {s.isNew && <span className="new-badge">NEW</span>}
              </div>
            </div>
          );
        })}
      </div>

      {selected && (
        <DetailModal
          item={data.find(s => s.id === selected.id) || selected}
          onClose={() => setSelected(null)}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
      {showPw && <PasswordChangeModal onClose={() => setShowPw(false)} />}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

// ── App Root ──
export default function App() {
  const [page, setPage] = useState("submit");
  const [data, setData] = useState(SAMPLE);
  const [newCount, setNewCount] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = ({ store, content }) => {
    const item = { id: Date.now(), store, content, date: new Date().toISOString().split("T")[0], status: "未対応", isNew: true };
    setData(prev => [item, ...prev]);
    setNewCount(n => n + 1);
  };

  const handleUpdateStatus = (id, status) => {
    setData(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  const handleClearNew = id => {
    setData(prev => prev.map(s => s.id === id ? { ...s, isNew: false } : s));
    setNewCount(prev => Math.max(0, prev - 1));
  };

  const handleLogout = () => { setLoggedIn(false); setPage("submit"); };

  return (
    <>
      <style>{css}</style>
      <nav className="nav">
        <div className="nav-logo">
          <div className="nav-ico">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e3a6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </div>
          <div className="nav-name">社内意見箱</div>
        </div>
        <div className={"nav-tab" + (page === "submit" ? " on" : "")} onClick={() => setPage("submit")}>投稿ページ</div>
        <div className={"nav-tab" + (page === "admin" ? " on" : "")} onClick={() => setPage("admin")}>
          管理画面
          {newCount > 0 && (
            <span style={{marginLeft:6,background:"#c8a050",color:"#1e3a6e",fontSize:10,fontWeight:700,padding:"1px 7px",borderRadius:3,fontFamily:"'DM Mono',monospace"}}>
              {newCount}
            </span>
          )}
        </div>
        {loggedIn && (
          <button className="logout-btn" onClick={handleLogout}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            ログアウト
          </button>
        )}
      </nav>
      {page === "submit"
        ? <SubmitPage onSubmit={handleSubmit} />
        : loggedIn
          ? <AdminPage data={data} onUpdateStatus={handleUpdateStatus} onClearNew={handleClearNew} />
          : <LoginPage onLogin={() => setLoggedIn(true)} />
      }
    </>
  );
}

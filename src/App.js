import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Button.css";

const TEMPLATE_SRC = "/template/card.jpg";
const LOGO_SRC = "/template/rawaa-logo.jpg";
const IMAGE_SRC = "/template/decor.jpg";
const FONT_FAMILY = '"Tajawal", "Noto Kufi Arabic", system-ui, sans-serif';
const CARD_IMAGES = {
  none: "/template/card_none.jpg",
  sender: "/template/card_sender.jpg",
  recipient: "/template/card_recipient.jpg",
  both: "/template/card_both.jpg",
};
const FONT_SENDER = '"TS Kufidia","Tajawal", system-ui, sans-serif';


function fitTextSize(ctx, text, maxWidth, startSize, minSize) {
  let size = startSize;
  while (size >= minSize) {
    ctx.font = `${size}px ${FONT_FAMILY}`;
    if (ctx.measureText(text).width <= maxWidth) return size;
    size -= 2;
  }
  return minSize;
}

function getSelectedCardImage(senderChecked, recipientChecked) {
  if (senderChecked && recipientChecked) return CARD_IMAGES.both;
  if (senderChecked) return CARD_IMAGES.sender;
  if (recipientChecked) return CARD_IMAGES.recipient;
  return CARD_IMAGES.none;
}



export default function App() {
  const [showSenderInput, setShowSenderInput] = useState(false);
  const [showRecipientInput, setShowRecipientInput] = useState(false);
  const canvasRef = useRef(null);
  const [senderName, setSenderName] = useState("");
  const [recipientName, setRecipientName] = useState("");
const senderLayout = {
  x: 885,
  y: 1670,
};

const recipientLayout = {
  x: 830,
  y: 865,
};


  const selectedImage = getSelectedCardImage(
  showSenderInput,
  showRecipientInput
);

  // Change these numbers to match your template
  const layout = useMemo(() => ({
    x: 370,
    y: 1110,
    maxWidth: 2,
    startSize: 40,
    minSize: 36,
    color: "#6b4f99",
    align: "center",
  }), []);

useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.src = selectedImage;

  img.onload = () => {
    
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.direction = "rtl";
    ctx.fillStyle = "#7f6380";

    // اسم المرسل
    if (showSenderInput && senderName.trim()) {
      const size = fitTextSize(
        ctx,
        senderName,
        1000,
        100,
        50
      );
      ctx.font = `${size}px ${FONT_SENDER}`;
      ctx.fillText(senderName, senderLayout.x, senderLayout.y);
    }

    // اسم المُرسل إليه
    if (showRecipientInput && recipientName.trim()) {
      const size = fitTextSize(
        ctx,
        recipientName,
        1000,
        135,
        50
      );
      ctx.font = `${size}px ${FONT_SENDER}`;
      ctx.textAlign = "right";
        ctx.shadowColor = "#e1b160";
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;
      ctx.fillText(recipientName, recipientLayout.x, recipientLayout.y);
    }

    ctx.restore();
  };
}, [
  senderName,
  recipientName,
  showSenderInput,
  showRecipientInput,
  selectedImage,
]);


  const downloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `Ramadan-card"}.png`;
    a.click();
  };

  const shareImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) return;

    const file = new File([blob], `Ramadan-card"}.png`, { type: "image/png" });

    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      await navigator.share({
        title: "مبارك عليك الشهر",
        text: "مبارك عليك الشهر🤍",
        files: [file],
      });
    } else {
      downloadPng(); // fallback
    }
  };

  return (
<>

<header className="responsive-header">
  <div dir="rtl" className="header-container">
    <div className="header-content">
      <img src="/template/rawaa-logo.png" alt="شعار" className="logo" />
      <h1 className="title">بطاقات رمضانية</h1>
      <img src="/template/decor.png" alt="زخرفة" className="decor" />
    </div>
  </div>
</header>

    <div dir="rtl"  className="page-content" style={{ maxWidth: 700, padding: 16, fontFamily: "Tajawal", textAlign: "right" }}>
      <h2>أهلًا بك في مُصمم البطاقات الرمضانية</h2>

      <form>
  <input
    type="checkbox"
    id="recipient"
    name="recipient"
    value="recipient"
    onChange={(e) => setShowRecipientInput(e.target.checked)}
    
  />
  <label htmlFor="recipient"> أود إضافة اسم المُرسل إليه</label>
  <br />

  <input
    type="checkbox"
    id="sender"
    name="sender"
    value="sender"
    onChange={(e) => setShowSenderInput(e.target.checked)}
    
  />
  <label htmlFor="sender"> أود إضافة اسمي</label>
  <br />   
</form>


<div
  style={{
    width: "98%",
    display: "flex",
    flexWrap: "wrap", // يسمح بالانتقال لسطر جديد
    gap: 12,
    marginBottom: 16,
  }}
>
  {showRecipientInput && (
    <div style={{ flex: "1 1 100%", minWidth: 200 }}> 
      <label style={{ display: "block", marginBottom: 8 }}>
        فضلًا، أدخل اسم المُرسل إليه
      </label>
      <input
        value={recipientName}
        onChange={(e) => setRecipientName(e.target.value)}
        placeholder="مثال: سارة"
        style={{ width: "98%", padding: 12, borderRadius: 8 }}
      />
    </div>
  )}

  {showSenderInput && (
    <div style={{ flex: "1 1 100%", minWidth: 200 }}>
      <label style={{ display: "block", marginBottom: 8 }}>
        فضلًا، أدخل اسمك
      </label>
      <input
        value={senderName}
        onChange={(e) => setSenderName(e.target.value)}
        placeholder="مثال: ألين"
        style={{ width: "98%", padding: 12, borderRadius: 8 }}
      />
    </div>
  )}
</div>
    

      <div style={{ border: "1px solid #ddd", borderRadius: 12, overflow: "hidden" }}>
        <canvas ref={canvasRef} style={{ width: "100%", display: "block" }} />
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 16, justifyContent: "center", alignItems: "center",}}>
        <button onClick={shareImage} class="button" style={{ padding: "10px 14px", borderRadius: "8px"}}>
          <span class="button__text" style={{transform: "translateX(-43px)"}}>مشاركة</span>
          <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" class="svg"><path d="M26.25 23.625a3.125 3.125 0 0 0-2.57 1.36l-11.01-5.505a3.158 3.158 0 0 0 0-3.966l11.01-5.505A3.125 3.125 0 1 0 22.5 7.5c0 .33.055.645.15.94L11.64 13.945a3.125 3.125 0 1 0 0 7.11l11.01 5.505c-.095.295-.15.61-.15.94a3.125 3.125 0 1 0 3.75-3.875z"></path></svg></span>
        </button>
        <button class="button" type="button" onClick={downloadPng} style={{ borderRadius: "8px"}}>
          <span class="button__text" >تنزيل</span>
          <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" id="bdd05811-e15d-428c-bb53-8661459f9307" data-name="Layer 2" class="svg"><path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path><path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path><path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path></svg></span>
        </button>
      </div>
    </div>
    </>
  );
}


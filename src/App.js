import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Button.css";

const TEMPLATE_SRC = "/template/card.jpg";
const LOGO_SRC = "/template/rawaa-logo.jpg";
const IMAGE_SRC = "/template/decor.jpg";
const FONT_FAMILY = '"Tajawal", "Noto Kufi Arabic", system-ui, sans-serif';

function fitTextSize(ctx, text, maxWidth, startSize, minSize) {
  let size = startSize;
  while (size >= minSize) {
    ctx.font = `${size}px ${FONT_FAMILY}`;
    if (ctx.measureText(text).width <= maxWidth) return size;
    size -= 2;
  }
  return minSize;
}

export default function App() {
  const canvasRef = useRef(null);
  const [name, setName] = useState("");

  // Change these numbers to match your template
  const layout = useMemo(() => ({
    x: 370,
    y: 1110,
    maxWidth: 2,
    startSize: 40,
    minSize: 36,
    color: "#4c5b6e",
    align: "center",
  }), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = TEMPLATE_SRC;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      const text = name.trim();
      if (text) {
        ctx.save();

        ctx.textAlign = layout.align;
        ctx.textBaseline = "alphabetic";

        // If you want better Arabic behavior, uncomment:
        ctx.direction = "rtl";

        ctx.shadowColor = layout.shadowColor;
        ctx.shadowBlur = layout.shadowBlur;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 2;

        const fontSize = fitTextSize(ctx, text, layout.maxWidth, layout.startSize, layout.minSize);
        ctx.font = `${fontSize}px ${FONT_FAMILY}`;
        ctx.fillStyle = layout.color;

        ctx.fillText(text, layout.x, layout.y);

        ctx.restore();
      }
    };
  }, [name, layout]);

  const downloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `Ramadan-${name.trim() || "card"}.png`;
    a.click();
  };

  const shareImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) return;

    const file = new File([blob], `Ramadan-${name.trim() || "card"}.png`, { type: "image/png" });

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

    <header style={{ 
      backgroundColor: "#6b4f99", 
      color: "white", 
      padding: "20px 40px", 
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      position: "relative",
      overflow: "visible"
    }}>
      <div dir="rtl" style={{ 
        maxWidth: 700, 
        margin: "0 auto", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between",
        width: "100%"        
      }}>
        {/* Logo/Image on the right (for RTL) */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" , marginRight: "-30%"}}>
          <img 
            src="/template/rawaa-logo.png"
            alt="شعار" 
            style={{ width: "20%", height: "30%" }}
          />
          <h1 style={{ margin: 0, fontSize: "24px", fontFamily: "Tajawal" }}>
            بطاقات رمضانية
          </h1>
        </div>
        <img 
          src="/template/decor.png"
          alt="زخرفة" 
          style={{ width: "8%", height: "140%", position: "absolute", top: "-8px" ,left: "130px" }}
        />
      
      </div>
    </header>




    <div dir="rtl" style={{ maxWidth: 700, margin: "40px auto", padding: 16, fontFamily: "Tajawal", textAlign: "right" }}>
      <h2>أهلًا بك في مُصمم البطاقات الرمضانية</h2>

      <label style={{ display: "block", marginBottom: 8 }}>فضلًا، أدخل اسمك</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="مثال: ألين"
        style={{ width: "100%", padding: 12, fontSize: 16, marginBottom: 16 }}
      />

      <div style={{ border: "1px solid #ddd", borderRadius: 12, overflow: "hidden" }}>
        <canvas ref={canvasRef} style={{ width: "100%", display: "block" }} />
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 16, justifyContent: "center", alignItems: "center",}}>
        <button onClick={shareImage} class="button" style={{ padding: "10px 14px", borderRadius: "8px"}}><span class="button__text" style={{transform: "translateX(-43px)"}}>مشاركة</span></button>
        <button class="button" type="button" onClick={downloadPng} style={{ borderRadius: "8px"}}>
  <span class="button__text" >تنزيل</span>
  <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" id="bdd05811-e15d-428c-bb53-8661459f9307" data-name="Layer 2" class="svg"><path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path><path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path><path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path></svg></span>
</button>
      </div>
    </div>
    </>
  );
}


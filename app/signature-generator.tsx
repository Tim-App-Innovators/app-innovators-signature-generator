import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Copy,
  Mail,
  Phone,
  User,
  Briefcase,
  CheckCircle2,
  Info,
} from "lucide-react";

const BRAND_PRIMARY = "#4134e2";
const BRAND_TEXT = "#352f5b";
const githubBase = "https://tim-app-innovators.github.io/app-innovators-signature-generator/assets";
const logoSrc = `${githubBase}/Logo_primary_clean.png`;
const whatsappIconSrc = `${githubBase}/icon_awesome_whatsapp.png`;
const phoneIconSrc = `${githubBase}/icon_feather_phone.png`;
const mailIconSrc = `${githubBase}/icon_feather_mail.png`;
const globeIconSrc = `${githubBase}/icon_feather_globe.png`;
const linkedinIconSrc = `${githubBase}/Linkedin.png`;
const instagramIconSrc = `${githubBase}/Instagram.png`;
const linkedinHref = "https://www.linkedin.com/company/appinnovators/";
const instagramHref = "https://www.instagram.com/appinnovators.de/";
const websiteHref = "https://app-innovators.de";

const DEFAULT_NAME = "Max Mustermann";
const DEFAULT_POSITION = "Projektmanager";
const DEFAULT_PHONE = "+49 151 23456789";
const DEFAULT_EMAIL = "max.mustermann@app-innovators.de";

function formatDisplayNumber(value: string) {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";

  let normalized = digits;
  if (normalized.startsWith("00")) normalized = normalized.slice(2);
  if (normalized.startsWith("0")) normalized = `49${normalized.slice(1)}`;
  if (!normalized.startsWith("49")) normalized = `49${normalized}`;

  const local = normalized.slice(2);
  if (local.length <= 3) return `+49 ${local}`;
  if (local.length <= 7) return `+49 ${local.slice(0, 3)} ${local.slice(3)}`;
  return `+49 ${local.slice(0, 3)} ${local.slice(3, 7)} ${local.slice(7)}`.trim();
}

function normalizePhoneLink(value: string) {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";

  let normalized = digits;
  if (normalized.startsWith("00")) normalized = normalized.slice(2);
  if (normalized.startsWith("0")) normalized = `49${normalized.slice(1)}`;
  if (!normalized.startsWith("49")) normalized = `49${normalized}`;
  return `+${normalized}`;
}

function normalizeWhatsappLink(value: string) {
  return normalizePhoneLink(value).replace(/^\+/, "");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildSignatureHtml({
  name,
  position,
  phone,
  email,
}: {
  name: string;
  position: string;
  phone: string;
  email: string;
}) {
  const safeName = escapeHtml(name || DEFAULT_NAME);
  const safePosition = escapeHtml(position || DEFAULT_POSITION);
  const safeEmail = escapeHtml(email || DEFAULT_EMAIL);
  const phoneDisplay = escapeHtml(formatDisplayNumber(phone) || DEFAULT_PHONE);
  const phoneHref = normalizePhoneLink(phone) || normalizePhoneLink(DEFAULT_PHONE);
  const whatsappHref = normalizeWhatsappLink(phone) || normalizeWhatsappLink(DEFAULT_PHONE);

  return `
<table cellpadding="0" cellspacing="0" border="0" style="vertical-align: -webkit-baseline-middle; font-family: Arial;">
  <tbody>
    <tr>
      <td>
        <table cellpadding="0" cellspacing="0" border="0" style="vertical-align: -webkit-baseline-middle; font-family: Arial;">
          <tbody>
            <tr>
              <td width="5">
                <table cellpadding="0" cellspacing="0" border="0" style="width:100%"><tbody><tr><td height="310"></td></tr></tbody></table>
              </td>
              <td style="padding:0; vertical-align:middle;">
                <img src="${logoSrc}" alt="App Innovators" width="230" style="display:block; border:0;">
                <table cellpadding="0" cellspacing="0" border="0" style="width:100%"><tbody><tr><td height="20"></td></tr></tbody></table>
                <div style="margin:0; font-size:20px; color:#4134e2; font-family:Arial, sans-serif; font-weight:700; line-height:24px;">${safeName}</div>
                <div style="margin:0; color:#352f5b; font-size:15px; line-height:22px; font-family:Arial, sans-serif; font-weight:400;">${safePosition}</div>
                <table cellpadding="0" cellspacing="0" border="0" style="width:100%"><tbody><tr><td height="20"></td></tr></tbody></table>
                <table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial; margin-left:-5px;">
                  <tbody>
                    <tr height="25" style="vertical-align:middle;"><td width="20" style="vertical-align:middle;"><img src="${whatsappIconSrc}" alt="Whatsapp" height="13" style="display:inline-block; border:0;"></td><td><a href="https://wa.me/${whatsappHref}" style="text-decoration:none !important; color:#352f5b; font-size:13px; line-height:25px; font-family:Arial, sans-serif;">${phoneDisplay}</a></td></tr>
                    <tr height="25" style="vertical-align:middle;"><td width="20" style="vertical-align:middle;"><img src="${phoneIconSrc}" alt="Telefon" height="13" style="display:inline-block; border:0;"></td><td><a href="tel:${phoneHref}" style="text-decoration:none !important; color:#352f5b; font-size:13px; line-height:25px; font-family:Arial, sans-serif;">${phoneDisplay}</a></td></tr>
                    <tr height="25" style="vertical-align:middle;"><td width="30" style="vertical-align:middle;"><img src="${mailIconSrc}" alt="Mail" height="10" style="display:inline-block; border:0;"></td><td><a href="mailto:${safeEmail}" style="text-decoration:none !important; color:#352f5b; font-size:13px; line-height:25px; font-family:Arial, sans-serif;">${safeEmail}</a></td></tr>
                    <tr height="25" style="vertical-align:middle;"><td width="30" style="vertical-align:middle;"><img src="${globeIconSrc}" alt="Webseite" height="13" style="display:inline-block; border:0;"></td><td><a href="${websiteHref}" style="text-decoration:none !important; color:#352f5b; font-size:13px; line-height:25px; font-family:Arial, sans-serif;">app-innovators.de</a></td></tr>
                  </tbody>
                </table>
                <table cellpadding="0" cellspacing="0" border="0" style="width:100%"><tbody><tr><td height="10"></td></tr></tbody></table>
                <table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial; margin-left:-5px;">
                  <tbody>
                    <tr height="55">
                      <td width="40" style="vertical-align:middle;"><a href="${linkedinHref}" target="_blank"><img src="${linkedinIconSrc}" alt="LinkedIn" height="25" style="display:inline-block; border:0;"></a></td>
                      <td style="vertical-align:middle;"><a href="${instagramHref}" target="_blank"><img src="${instagramIconSrc}" alt="Instagram" height="25" style="display:inline-block; border:0;"></a></td>
                    </tr>
                  </tbody>
                </table>
                <table cellpadding="0" cellspacing="0" border="0" style="display:block; margin-top:15px;">
                  <tbody>
                    <tr>
                      <td style="vertical-align:bottom;">
                        <span style="display:block; text-decoration:none !important; color:#352f5b; font-size:11px; line-height:16px; font-family:Arial, sans-serif; font-weight:400;">
                          <span style="opacity:1 !important;">App Innovators Solutions GmbH<br></span>
                          <span style="opacity:.5;">Friedrichstrasse 13, 70174 Stuttgart | Amtsgericht Stuttgart | HRB 783408<br></span>
                          <span style="opacity:.5;">Geschäftsführer: Tim König</span><br><br>
                          <span style="opacity:.75;">For international clients:</span><br>
                          <span style="opacity:1 !important;">App Innovators International Ventures OÜ</span><br>
                          <span style="opacity:.5;">Keemia tn 4, 10616 Tallinn, Estonia</span><br>
                          <span style="opacity:.5;">Management board member: David Forster</span>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`.trim();
}

function runSelfTests() {
  const formatted = formatDisplayNumber("017630173308");
  const tel = normalizePhoneLink("0176 30173308");
  const wa = normalizeWhatsappLink("+49 176 30173308");
  const escaped = escapeHtml(`Max & <Mia> \"Test\" 'User'`);
  const html = buildSignatureHtml({
    name: DEFAULT_NAME,
    position: DEFAULT_POSITION,
    phone: DEFAULT_PHONE,
    email: DEFAULT_EMAIL,
  });

  console.assert(formatted === "+49 176 3017 3308", "formatDisplayNumber should format DE numbers consistently");
  console.assert(tel === "+4917630173308", "normalizePhoneLink should create tel link format");
  console.assert(wa === "4917630173308", "normalizeWhatsappLink should remove the leading plus");
  console.assert(escaped === "Max &amp; &lt;Mia&gt; &quot;Test&quot; &#39;User&#39;", "escapeHtml should escape HTML-sensitive characters");
  console.assert(html.includes(DEFAULT_EMAIL), "HTML should include example email");
  console.assert(html.includes("https://wa.me/4915123456789"), "HTML should include WhatsApp link");
  console.assert(html.includes("App Innovators Solutions GmbH"), "HTML should include company footer");
  console.assert(html.includes("github.io/app-innovators-signature-generator/assets/icon_feather_phone.png"), "HTML should include GitHub asset URLs");
  console.assert(logoSrc.endsWith("Logo_primary_clean.png"), "Logo should use the GitHub-hosted PNG asset");
  console.assert(whatsappIconSrc.endsWith("icon_awesome_whatsapp.png"), "Preview should use the GitHub-hosted WhatsApp icon asset");
}

async function copyHtmlToClipboard(html: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard && typeof ClipboardItem !== "undefined") {
    try {
      const blobHtml = new Blob([html], { type: "text/html" });
      const blobText = new Blob([html], { type: "text/plain" });
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": blobHtml,
          "text/plain": blobText,
        }),
      ]);
      return true;
    } catch {
      // continue to fallback
    }
  }

  return new Promise<boolean>((resolve) => {
    const listener = (event: ClipboardEvent) => {
      event.preventDefault();
      event.clipboardData?.setData("text/html", html);
      event.clipboardData?.setData("text/plain", html);
    };
    document.addEventListener("copy", listener);
    const success = document.execCommand("copy");
    document.removeEventListener("copy", listener);
    resolve(success);
  });
}

function PreviewRow({
  iconSrc,
  alt,
  href,
  text,
  iconHeight = 13,
}: {
  iconSrc: string;
  alt: string;
  href: string;
  text: string;
  iconHeight?: number;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, minHeight: 25 }}>
      <div style={{ width: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={iconSrc} alt={alt} style={{ height: iconHeight, width: "auto", display: "block", border: 0 }} />
      </div>
      <a
        href={href}
        style={{
          color: BRAND_TEXT,
          fontSize: 13,
          lineHeight: "25px",
          textDecoration: "none",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {text}
      </a>
    </div>
  );
}

function SignaturePreview({
  name,
  position,
  phone,
  email,
}: {
  name: string;
  position: string;
  phone: string;
  email: string;
}) {
  const effectiveName = name || DEFAULT_NAME;
  const effectivePosition = position || DEFAULT_POSITION;
  const effectiveEmail = email || DEFAULT_EMAIL;
  const effectivePhone = phone || DEFAULT_PHONE;

  const phoneDisplay = formatDisplayNumber(effectivePhone) || DEFAULT_PHONE;
  const phoneHref = `tel:${normalizePhoneLink(effectivePhone) || normalizePhoneLink(DEFAULT_PHONE)}`;
  const whatsappHref = `https://wa.me/${normalizeWhatsappLink(effectivePhone) || normalizeWhatsappLink(DEFAULT_PHONE)}`;
  const mailHref = `mailto:${effectiveEmail}`;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: BRAND_TEXT }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ width: 5, minHeight: 310 }} />
        <div>
          <img src={logoSrc} alt="App Innovators" style={{ width: 230, display: "block", border: 0 }} />
          <div style={{ height: 20 }} />
          <div style={{ margin: 0, fontSize: 20, color: BRAND_PRIMARY, fontFamily: "Arial, sans-serif", fontWeight: 700, lineHeight: "24px" }}>
            {effectiveName}
          </div>
          <div style={{ margin: 0, color: BRAND_TEXT, fontSize: 15, lineHeight: "22px", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
            {effectivePosition}
          </div>
          <div style={{ height: 20 }} />
          <div style={{ marginLeft: -5 }}>
            <PreviewRow iconSrc={whatsappIconSrc} alt="Whatsapp" href={whatsappHref} text={phoneDisplay} iconHeight={13} />
            <PreviewRow iconSrc={phoneIconSrc} alt="Telefon" href={phoneHref} text={phoneDisplay} iconHeight={13} />
            <PreviewRow iconSrc={mailIconSrc} alt="Mail" href={mailHref} text={effectiveEmail} iconHeight={10} />
            <PreviewRow iconSrc={globeIconSrc} alt="Webseite" href={websiteHref} text="app-innovators.de" iconHeight={13} />
          </div>
          <div style={{ height: 10 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: -2, minHeight: 55 }}>
            <a href={linkedinHref} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <img src={linkedinIconSrc} alt="LinkedIn" style={{ height: 25, width: 25, display: "block", border: 0 }} />
            </a>
            <a href={instagramHref} target="_blank" rel="noreferrer" aria-label="Instagram">
              <img src={instagramIconSrc} alt="Instagram" style={{ height: 25, width: 25, display: "block", border: 0 }} />
            </a>
          </div>
          <div style={{ marginTop: 15, display: "block", fontSize: 11, lineHeight: "16px", color: BRAND_TEXT, fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
            <span style={{ opacity: 1 }}>App Innovators Solutions GmbH<br /></span>
            <span style={{ opacity: 0.5 }}>Friedrichstrasse 13, 70174 Stuttgart | Amtsgericht Stuttgart | HRB 783408<br /></span>
            <span style={{ opacity: 0.5 }}>Geschäftsführer: Tim König</span><br /><br />
            <span style={{ opacity: 0.75 }}>For international clients:</span><br />
            <span style={{ opacity: 1 }}>App Innovators International Ventures OÜ</span><br />
            <span style={{ opacity: 0.5 }}>Keemia tn 4, 10616 Tallinn, Estonia</span><br />
            <span style={{ opacity: 0.5 }}>Management board member: David Forster</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AppInnovatorsSignatureGenerator() {
  const [name, setName] = useState(DEFAULT_NAME);
  const [position, setPosition] = useState(DEFAULT_POSITION);
  const [phone, setPhone] = useState(DEFAULT_PHONE);
  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [copied, setCopied] = useState(false);
  const [copyMessage, setCopyMessage] = useState("Bereit zum Kopieren.");

  const html = useMemo(() => buildSignatureHtml({ name, position, phone, email }), [name, position, phone, email]);

  useEffect(() => {
    runSelfTests();
  }, []);

  const copyHtml = async () => {
    const success = await copyHtmlToClipboard(html);
    setCopied(success);
    setCopyMessage(success ? "Signatur kopiert. Jetzt in Dein Mailprogramm einfügen." : "Kopieren hat nicht geklappt. Bitte die Vorschau markieren und manuell kopieren.");
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[420px_minmax(0,1fr)]">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Signatur-Generator</CardTitle>
            <CardDescription>Erstelle Deine CI-konforme Signatur.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-xl border bg-slate-50 p-3 text-sm text-slate-600 flex items-start gap-2">
              <Info className="h-4 w-4 mt-0.5 shrink-0" />
              <span>Die Vorschau startet mit Beispieldaten.</span>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input id="name" className="pl-9" value={name} onChange={(e) => setName(e.target.value)} placeholder={DEFAULT_NAME} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <div className="relative">
                <Briefcase className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input id="position" className="pl-9" value={position} onChange={(e) => setPosition(e.target.value)} placeholder={DEFAULT_POSITION} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Mobilnummer</Label>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input id="phone" className="pl-9" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={DEFAULT_PHONE} />
              </div>
              <p className="text-sm text-slate-500">Wird für Telefon- und WhatsApp-Link formatiert.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-Mail</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input id="email" className="pl-9" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={DEFAULT_EMAIL} />
              </div>
            </div>

            <Button className="w-full rounded-xl text-white" style={{ backgroundColor: BRAND_PRIMARY }} onClick={copyHtml}>
              <Copy className="mr-2 h-4 w-4" />
              {copied ? "✓ Kopiert" : "Signatur kopieren"}
            </Button>

            <div className={`flex items-center gap-2 text-sm ${copied ? "text-emerald-600" : "text-slate-500"}`}>
              <CheckCircle2 className="h-4 w-4" />
              <span>{copyMessage}</span>
            </div>

            
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
            <CardDescription>Die Vorschau zeigt Deine Signatur mit den echten Bild-Assets.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto rounded-2xl border bg-white p-8">
              <SignaturePreview name={name} position={position} phone={phone} email={email} />
            </div>
            <div className="mt-4 rounded-xl border bg-slate-50 p-4 text-sm text-slate-600">
              Daten anpassen → Signatur kopieren → in Dein Mailprogramm einfügen.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

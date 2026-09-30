"use client";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function CookieBanner(){const [open,setOpen]=useState(false);useEffect(()=>{if(!localStorage.getItem("cerest-cookie-choice"))setOpen(true)},[]);function choose(value:"accepted"|"essential"){localStorage.setItem("cerest-cookie-choice",value);window.dispatchEvent(new Event("cerest-consent"));setOpen(false)}if(!open)return null;return <aside className="cookie-banner" role="dialog" aria-modal="false" aria-labelledby="cookie-title" aria-describedby="cookie-description"><div className="cookie-copy"><b id="cookie-title">Sua privacidade importa</b><p id="cookie-description">Usamos cookies essenciais para o funcionamento do site. Com sua autorização, também usamos métricas anônimas para melhorar nossos conteúdos e serviços.</p><div className="cookie-links"><a href="/politica-de-privacidade">Política de Privacidade</a><a href="/termos-de-uso">Termos de Uso</a></div></div><div className="cookie-actions"><button type="button" onClick={()=>choose("essential")}>Recusar</button><button type="button" className="accept" onClick={()=>choose("accepted")}>Aceitar</button></div></aside>}

export function Analytics(){useEffect(()=>{const id=process.env.NEXT_PUBLIC_GA_ID;if(!id)return;const activate=()=>{if(localStorage.getItem("cerest-cookie-choice")!=="accepted"||document.getElementById("ga-script"))return;(window as Window & {dataLayer?:unknown[]}).dataLayer=[];const s=document.createElement("script");s.id="ga-script";s.async=true;s.src=`https://www.googletagmanager.com/gtag/js?id=${id}`;document.head.appendChild(s);const w=window as Window & {dataLayer?:unknown[]};w.dataLayer?.push(["js",new Date()],["config",id,{anonymize_ip:true}])};activate();window.addEventListener("cerest-consent",activate);return()=>window.removeEventListener("cerest-consent",activate)},[]);return null}

export function MobileCta(){return <a className="mobile-fixed-cta" href="https://wa.me/5588993112313" aria-label="Falar com o CEREST Tianguá pelo WhatsApp">Falar no WhatsApp</a>}

export function ContactForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    setError("");
    const element = e.currentTarget;
    const form = new FormData(element);
    const name = String(form.get("name") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const subject = String(form.get("subject") || "").trim();
    const message = String(form.get("message") || "").trim();
    if (name.length < 2) { setError("Informe seu nome."); return; }
    if (phone.replace(/\D/g, "").length < 10) { setError("Informe um telefone válido com DDD."); return; }
    if (!subject) { setError("Informe o assunto da sua solicitação."); return; }
    if (message.length < 10) { setError("Descreva sua solicitação com pelo menos 10 caracteres."); return; }
    if (!form.get("privacy")) { setError("Você precisa concordar com a Política de Privacidade."); return; }
    form.set("name", name);
    form.set("phone", phone);
    form.set("subject", subject);
    form.set("message", message);
    form.set("access_key", "72cc149a-87b1-404e-af58-9f44a16afcbc");
    form.set("from_name", "Site CEREST Tianguá");
    setSending(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form,
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error("Submission failed");
      element.reset();
      router.push("/obrigado");
    } catch {
      setError("Não foi possível enviar sua mensagem. Tente novamente ou entre em contato pelo telefone ou WhatsApp.");
    } finally {
      setSending(false);
    }
  }

  return <form className="contact-form" onSubmit={submit} noValidate aria-busy={sending}>
    <div><label htmlFor="name">Nome</label><input id="name" name="name" autoComplete="name" required/></div>
    <div><label htmlFor="phone">Telefone com DDD</label><input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required/></div>
    <div><label htmlFor="subject">Assunto</label><input id="subject" name="subject" type="text" required/></div>
    <div><label htmlFor="message">Como podemos orientar?</label><textarea id="message" name="message" rows={5} required/></div>
    <input type="checkbox" name="botcheck" hidden tabIndex={-1} aria-hidden="true"/>
    <label className="privacy-check"><input type="checkbox" name="privacy" required/> Li e concordo com a <a href="/politica-de-privacidade">Política de Privacidade</a>.</label>
    {error && <p className="form-error" role="alert">{error}</p>}
    <button className="button primary" type="submit" disabled={sending}>{sending ? "Enviando..." : "Enviar mensagem"}</button>
  </form>;
}

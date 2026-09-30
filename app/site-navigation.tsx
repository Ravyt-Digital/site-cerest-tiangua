"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const links = [
  ["/sobre", "O CEREST"],
  ["/servicos", "Áreas de atuação"],
  ["/educacao", "Educação em saúde"],
  ["/downloads", "Downloads"],
  ["/blog", "Blog"],
  ["/contato", "Contato"],
];

export default function SiteNavigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    function keydown(event: KeyboardEvent) {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
    }
    function outside(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    const desktop = window.matchMedia("(min-width: 901px)");
    function resize() { if (desktop.matches) setOpen(false); }
    document.addEventListener("keydown", keydown);
    document.addEventListener("pointerdown", outside);
    desktop.addEventListener("change", resize);
    return () => {
      document.removeEventListener("keydown", keydown);
      document.removeEventListener("pointerdown", outside);
      desktop.removeEventListener("change", resize);
    };
  }, [open]);

  return <div className="navigation-controls" ref={root}>
    <button ref={toggle} className="mobile-menu-toggle" type="button" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(!open)}>
      <span className={open ? "menu-icon is-open" : "menu-icon"} aria-hidden="true"><span/><span/><span/></span>
      <span>Menu</span>
    </button>
    <nav id="site-menu" className={open ? "site-menu is-open" : "site-menu"} aria-label="Navegação principal">
      {links.map(([href, label]) => <Link key={href} href={href} aria-current={pathname === href || pathname?.startsWith(href + "/") ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>)}
      <a className="mobile-menu-whatsapp" href="https://wa.me/5588993112313" onClick={() => setOpen(false)}>WhatsApp</a>
    </nav>
  </div>;
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Soru Sor" },
    { href: "/hakkinda", label: "Hakkında" },
  ];

  return (
    <>
      <nav style={s.nav}>
        <div style={s.inner}>
          {/* Logo */}
          <Link href="/" style={s.logo}>
           <Image src="/hocayasor_logo_no_background.png" alt="Hocaya Sor" width={30} height={30}/>
            <div style={s.logoText}>
              <span style={s.logoMain}>Hocaya Sor</span>
              <span style={s.logoSub}>İslami Soru & Cevap</span>
            </div>
          </Link>

          {/* Desktop links */}
          <div style={s.desktopLinks}>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  ...s.navLink,
                  ...(pathname === l.href ? s.navLinkActive : {}),
                }}
              >
                {l.label}
                {pathname === l.href && <span style={s.activeDot} />}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            style={s.hamburger}
            onClick={() => setOpen((v) => !v)}
            aria-label="Menüyü aç/kapat"
          >
            <span style={{ ...s.bar, ...(open ? s.barTop : {}) }} />
            <span style={{ ...s.bar, opacity: open ? 0 : 1 }} />
            <span style={{ ...s.bar, ...(open ? s.barBottom : {}) }} />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div style={s.mobileMenu}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                ...s.mobileLink,
                ...(pathname === l.href ? s.mobileLinkActive : {}),
              }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

const s = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "#1B2A4A",
    borderBottom: "1px solid rgba(201,168,76,0.25)",
    boxShadow: "0 2px 16px rgba(27,42,74,0.25)",
  },
  inner: {
    maxWidth: 900,
    margin: "0 auto",
    padding: "0 20px",
    height: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
  },
  logoText: {
    display: "flex",
    flexDirection: "column",
    lineHeight: 1.2,
  },
  logoMain: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 18,
    fontWeight: 700,
    color: "#FFFFFF",
    letterSpacing: "0.01em",
  },
  logoSub: {
    fontSize: 11,
    color: "#C9A84C",
    fontWeight: 400,
    letterSpacing: "0.05em",
  },
  desktopLinks: {
    display: "flex",
    gap: 4,
    "@media(maxWidth:600px)": { display: "none" },
  },
  navLink: {
    position: "relative",
    padding: "8px 16px",
    borderRadius: 8,
    color: "rgba(255,255,255,0.75)",
    fontSize: 14,
    fontWeight: 500,
    transition: "all 0.2s",
    textDecoration: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
  },
  navLinkActive: {
    color: "#C9A84C",
    background: "rgba(201,168,76,0.1)",
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: "50%",
    background: "#C9A84C",
    display: "block",
  },
  hamburger: {
    display: "none",
    flexDirection: "column",
    gap: 5,
    padding: 8,
    background: "none",
    border: "none",
    cursor: "pointer",
    // JS ile toggle yapacağız, CSS media query yerine
  },
  bar: {
    display: "block",
    width: 22,
    height: 2,
    background: "#FFFFFF",
    borderRadius: 2,
    transition: "all 0.25s",
    transformOrigin: "center",
  },
  barTop: {
    transform: "translateY(7px) rotate(45deg)",
  },
  barBottom: {
    transform: "translateY(-7px) rotate(-45deg)",
  },
  mobileMenu: {
    position: "fixed",
    top: 64,
    left: 0,
    right: 0,
    background: "#1B2A4A",
    borderBottom: "1px solid rgba(201,168,76,0.2)",
    zIndex: 99,
    padding: "8px 0",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
  },
  mobileLink: {
    display: "block",
    padding: "14px 24px",
    color: "rgba(255,255,255,0.8)",
    fontSize: 16,
    fontWeight: 500,
    textDecoration: "none",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    transition: "background 0.15s",
  },
  mobileLinkActive: {
    color: "#C9A84C",
    background: "rgba(201,168,76,0.08)",
  },
};
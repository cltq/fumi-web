"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { socialIcons } from "@/app/lib/social-icons";
import { socialLinks, type SocialLink } from "@/app/lib/social-links";
import { glassmorphism, glassmorphismBorderTop } from "@/app/lib/styles";

export default function Footer() {
  const year = new Date().getFullYear();
  const [links, setLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    const fetchLinks = async () => {
      const responses = await Promise.all(
        socialLinks.map((link) => fetch(link.href))
      );
      const data = await Promise.all(responses.map((res) => res.json()));
      setLinks(data.map((item, i) => ({
        label: socialLinks[i].label,
        href: item.url,
      })));
    };
    fetchLinks();
  }, []);

  return (
    <footer
      className="w-full mt-auto py-[10px] sm:py-[14px] px-[10px] sm:px-[22px]"
      style={{ ...glassmorphism, ...glassmorphismBorderTop }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
        <div className="flex flex-col items-center sm:items-start gap-1">
          <p
            className="text-xs sm:text-sm font-[family-name:var(--font-geist-pixel-square)]"
            style={{ color: "rgba(255, 255, 255, 0.6)" }}
          >
            &copy; {year} Fumi. All rights reserved.
          </p>
          <Link
            href="/technologies"
            className="text-[10px] sm:text-xs font-[family-name:var(--font-geist-mono)] transition-all duration-200 hover:opacity-80"
            style={{ color: "rgba(255, 255, 255, 0.4)" }}
          >
            View all technologies
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {links.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full transition-all duration-200 hover:scale-110"
              style={{ color: "rgba(255, 255, 255, 0.6)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.95)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)";
              }}
            >
              {socialIcons[social.label.toLowerCase()]}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

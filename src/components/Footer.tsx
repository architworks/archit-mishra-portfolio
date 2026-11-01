import Link from "next/link";
import { Brand } from "@/components/Navbar";
import { ArrowUpRight } from "@/components/icons";
import { contact, navLeft, navRight } from "@/data/site";

export default function Footer() {
  return (
    <footer className="am-footer">
      <div className="am-wrap">
        <div className="am-footer__cta">
          <p>Let’s Connect There</p>
          <a className="am-btn am-btn--primary" href={`mailto:${contact.email}?subject=Working%20with%20Archit`}>
            Hire Me <ArrowUpRight />
          </a>
        </div>
        <div className="am-footer__cols">
          <div className="am-footer__brand">
            <Brand />
            <p>Data scientist building audit-grade GenAI at AB InBev, and a photographer when the light is good.</p>
          </div>
          <div>
            <h4>Navigation</h4>
            <ul>
              {[...navLeft, ...navRight.slice(0, 2)].map((item) => (
                <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href={contact.phoneHref}>{contact.phone}</a></li>
              <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
              <li><a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
            </ul>
          </div>
          <div>
            <h4>Resume</h4>
            <ul>
              <li><a href={contact.resume} target="_blank" rel="noreferrer">Download PDF</a></li>
            </ul>
          </div>
        </div>
        <div className="am-footer__legal">
          <span>© {new Date().getFullYear()} Archit Mishra. All rights reserved.</span>
          <span>Bengaluru, India</span>
        </div>
      </div>
    </footer>
  );
}

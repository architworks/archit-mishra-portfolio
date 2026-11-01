"use client";
import { useRef, useState, type FormEvent } from "react";
import { Briefcase, Globe, Mail, Pin } from "@/components/icons";
import { contact } from "@/data/site";

type Status = "idle" | "error" | "sent";

export default function Discuss() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = inputRef.current?.value.trim() ?? "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      inputRef.current?.focus();
      return;
    }
    const subject = encodeURIComponent("Project idea for Archit");
    const body = encodeURIComponent(`Hi Archit,\n\nI have a project idea I’d like to discuss. You can reach me at ${email}.\n\n`);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
  };

  return (
    <section className="am-section" id="contact">
      <div className="am-wrap am-discuss">
        <h2 className="am-h2">Have a Project Idea?<br /><em className="am-accent">Let’s Discuss</em></h2>
        <form className="am-email" data-state={status === "error" ? "error" : undefined} onSubmit={onSubmit} noValidate>
          <span className="am-email__icon"><Mail /></span>
          <label className="am-sr" htmlFor="discuss-email">Your email address</label>
          <input
            ref={inputRef}
            id="discuss-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            placeholder="you@company.com…"
            aria-invalid={status === "error"}
            aria-describedby="discuss-status"
            onChange={() => {
              if (status !== "idle") setStatus("idle");
            }}
          />
          <button className="am-btn am-btn--primary" type="submit">Send</button>
        </form>
        <p
          id="discuss-status"
          className="am-field-msg"
          data-tone={status === "error" ? "error" : "success"}
          aria-live="polite"
          hidden={status === "idle"}
        >
          {status === "error" && "That address looks incomplete. Include the part before and after the @."}
          {status === "sent" && "Your email app should be open with a note to Archit. If it isn’t, write to " + contact.email + "."}
        </p>
        <ul className="am-trust">
          <li><Pin />Bengaluru, India</li>
          <li><Briefcase />Senior AI Engineer at Oracle</li>
          <li><Globe />IIT Kanpur alum</li>
        </ul>
      </div>
    </section>
  );
}

import { ArrowUpRight } from "@/components/icons";
import { contact } from "@/data/site";

export default function GetInTouch() {
  return (
    <a className="am-btn am-btn--touch" href={`mailto:${contact.email}?subject=Hello%20Archit`}>
      Get in Touch
      <span className="am-btn__dot"><ArrowUpRight /></span>
    </a>
  );
}

import { ArrowUpRight } from "@/components/icons";
import { contact } from "@/data/site";
import { isDriveFilePublic } from "@/lib/google-drive";

export const metadata = { title: "Resume" };
export const revalidate = 300;

const docUrl = `https://docs.google.com/document/d/${contact.resumeDocId}`;

export default async function ResumePage() {
  const available = await isDriveFilePublic(contact.resumeDocId);

  return (
    <div className="am-wrap am-page">
      <div className="am-gallery-head">
        <h1 className="am-h2">My <em className="am-accent">Resume</em></h1>
      </div>
      {available ? (
        <>
          <div className="am-project-head__actions" style={{ margin: "0 0 24px" }}>
            <a className="am-btn am-btn--primary am-btn--sm" href={`${docUrl}/export?format=pdf`}>
              Download PDF
            </a>
            <a className="am-btn am-btn--ghost am-btn--sm" href={`${docUrl}/view`} target="_blank" rel="noreferrer">
              Open in Google Docs <ArrowUpRight />
            </a>
          </div>
          <iframe className="am-resume-frame" src={`${docUrl}/preview`} title="Archit Mishra’s resume" />
        </>
      ) : (
        <div className="am-notice">
          <h3>The Resume Viewer Isn’t Available Right Now</h3>
          <p>Email me and I’ll send you a copy directly.</p>
          <a className="am-btn am-btn--ghost am-btn--sm" href={`mailto:${contact.email}?subject=Resume%20request`}>
            Email Archit
          </a>
        </div>
      )}
    </div>
  );
}

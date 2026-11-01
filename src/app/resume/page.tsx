import { ArrowUpRight } from "@/components/icons";
import { contact } from "@/data/site";
import { getLatestDriveDocument } from "@/lib/google-drive";

export const metadata = { title: "Resume" };
export const revalidate = 60;

export default async function ResumePage() {
  const resume = await getLatestDriveDocument(contact.resumeFolderId);

  return (
    <div className="am-wrap am-page">
      <div className="am-gallery-head">
        <h1 className="am-h2">My <em className="am-accent">Resume</em></h1>
      </div>
      {resume ? (
        <>
          <div className="am-project-head__actions" style={{ margin: "0 0 24px" }}>
            <a className="am-btn am-btn--primary am-btn--sm" href={resume.downloadUrl}>
              Download
            </a>
            <a className="am-btn am-btn--ghost am-btn--sm" href={resume.openUrl} target="_blank" rel="noreferrer">
              Open in Google Drive <ArrowUpRight />
            </a>
          </div>
          <iframe className="am-resume-frame" src={resume.previewUrl} title="Archit Mishra’s resume" />
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

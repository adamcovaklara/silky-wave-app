import { PageWrapper } from "../App";
import { privacyPolicy } from "../content/privacy-policy";
import ReactMarkdown from "react-markdown";

export default function PrivacyPolicy({ language }) {
  return (
    <PageWrapper>
      <ReactMarkdown>{privacyPolicy[language]}</ReactMarkdown>
    </PageWrapper>
  );
}

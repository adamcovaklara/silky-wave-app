import { PageWrapper } from "../App";
import { termsAndConditions } from "../content/terms-and-conditions";
import ReactMarkdown from "react-markdown";

export default function Terms({ language }) {
  return (
    <PageWrapper>
      <ReactMarkdown>{termsAndConditions[language]}</ReactMarkdown>
    </PageWrapper>
  );
}

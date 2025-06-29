import React from "react";
import { PageWrapper } from "../App";
import { termsOfService } from "../content/terms-of-service";
import ReactMarkdown from "react-markdown";

export default function TermsOfService({ language }) {
  return (
    <PageWrapper>
      <ReactMarkdown>{termsOfService}</ReactMarkdown>
    </PageWrapper>
  );
}

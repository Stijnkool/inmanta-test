import React from "react";

interface Props {
  error: string;
}

export const Failed: React.FC<Props> = ({ error }) => (
  <div data-test-id="Failed">{error}</div>
);

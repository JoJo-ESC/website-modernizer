"use client";
import { useEffect, useRef } from "react";

export default function HtmlPreview({ html }: { html: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // If srcDoc is supported, prefer it — it's simpler and more reliable than
  // manually writing into the iframe document. We still keep a small
  // fallback that writes into the iframe for environments where srcDoc may
  // not work as expected.
  useEffect(() => {
    if (!iframeRef.current) return;
    const iframe = iframeRef.current;
    // If browser doesn't respect srcDoc for some reason, try a manual write.
    try {
      if (iframe && iframe.contentDocument && html && html.trim().startsWith("<")) {
        const doc = iframe.contentDocument;
        doc.open();
        doc.write(html);
        doc.close();
      }
    } catch {
      // ignore any cross-origin/sandbox restrictions
    }
  }, [html]);

  return (
    <iframe
      ref={iframeRef}
      // Use srcDoc so content is rendered directly; fallback above will
      // attempt a manual document.write when needed.
      srcDoc={html || undefined}
      sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals"
      className="w-full h-96 bg-white rounded-xl border border-zinc-700"
    />
  );
}

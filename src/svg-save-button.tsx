import * as React from 'react';

const SVG_PREFIX: string = '<?xml version="1.0" encoding="UTF-8"?>\n';

interface Props {
  svgId: string;
  filename: string;
  children: React.ReactFragment;
}

export default function SvgSaveButton({ svgId, filename, children }: Props) {
  // Build a `download` link to a blob and click it.
  function handleSaveButtonClick(): void {
    const svg = document.getElementById(svgId);

    const blob = new Blob([SVG_PREFIX, svg.outerHTML], {
      type: 'image/svg+xml;charset=utf-8'
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  return (
    <button
      type="button"
      onClick={handleSaveButtonClick}
    >
      {children}
    </button>
  );
}

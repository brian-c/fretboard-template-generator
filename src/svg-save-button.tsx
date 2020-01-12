import * as React from 'react';
import { SVG_PREFIX } from './constants';

interface Props {
  svgId: string;
  filename: string;
  children: React.ReactFragment;
}

export default function SvgSaveButton({
  svgId,
  filename,
  children
}: Props) {
  // Build a `download` link to a blob and click it.
  function handleClick(): void {
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
    <button type="button" onClick={handleClick}>
      {children}
    </button>
  );
}

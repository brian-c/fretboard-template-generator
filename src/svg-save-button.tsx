import * as React from 'react';

const svgPrefix: string = '<?xml version="1.0" encoding="UTF-8"?>\n';

export default function SvgSaveButton({
  svgId,
  filename,
  children,
}: {
  svgId: string;
  filename: string;
  children?: React.ReactFragment;
} & HTMLButtonElement): React.ReactElement {
  function handleSaveButtonClick(): void {
    const svg = document.getElementById(svgId);
    const blob = new Blob([svgPrefix, svg.outerHTML], {
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

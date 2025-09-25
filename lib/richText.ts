// Helper function to render Sanity rich text blocks
export function renderRichText(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) {
    return '';
  }

  return blocks
    .map((block) => {
      if (block._type === 'block' && block.children) {
        return block.children
          .map((child: any) => {
            if (child._type === 'span' && child.text) {
              let text = child.text;
              
              // Apply marks (bold, italic, etc.)
              if (child.marks) {
                child.marks.forEach((mark: string) => {
                  if (mark === 'strong') {
                    text = `<strong>${text}</strong>`;
                  } else if (mark === 'em') {
                    text = `<em>${text}</em>`;
                  }
                });
              }
              
              return text;
            }
            return '';
          })
          .join('');
      }
      return '';
    })
    .join('\n\n')
    .trim();
}

// Helper function to get plain text from rich text blocks (for simple display)
export function getPlainText(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) {
    return '';
  }

  return blocks
    .map((block) => {
      if (block._type === 'block' && block.children) {
        return block.children
          .map((child: any) => child.text || '')
          .join('');
      }
      return '';
    })
    .join(' ')
    .trim();
}

import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <span>© {currentYear} Arpit Umrao · Built with care</span>
      <span>📍 Kanpur, India · Open to Remote</span>
    </footer>
  );
}

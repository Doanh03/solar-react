'use client';

import { trackEvent } from '@/app/lib/analytics';

const CONTACTS = {
  phone: '0372352242',
  messenger: 'https://www.facebook.com/tran.oanh.759761',
};

export function ContactConversion() {
  return (
    <div className="contact-conversion" aria-label="Liên hệ nhanh">
      <a
        className="contact-action contact-call"
        href={`tel:${CONTACTS.phone}`}
        onClick={() => trackEvent('contact_call_clicked', { destination: CONTACTS.phone })}
        aria-label="Gọi 0372352242"
      >
        <span className="contact-action-icon" aria-hidden="true">☎</span>
        <span>Gọi ngay</span>
      </a>
      <a
        className="contact-action contact-zalo"
        href={`https://zalo.me/${CONTACTS.phone}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('contact_zalo_clicked', { destination: CONTACTS.phone })}
        aria-label="Chat Zalo 0372352242"
      >
        <span className="contact-action-icon contact-zalo-mark" aria-hidden="true">Z</span>
        <span>Zalo</span>
      </a>
      <a
        className="contact-action contact-messenger"
        href={CONTACTS.messenger}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('contact_messenger_clicked', { destination: 'facebook_profile' })}
        aria-label="Nhắn Messenger"
      >
        <span className="contact-action-icon" aria-hidden="true">⌁</span>
        <span>Messenger</span>
      </a>
    </div>
  );
}

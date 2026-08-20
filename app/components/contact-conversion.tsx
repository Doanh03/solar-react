'use client';

import { trackEvent } from '@/app/lib/analytics';
import './contact-conversion.css';

const CONTACTS = {
  phone: '0372352242',
  messenger: 'https://www.facebook.com/tran.oanh.759761',
};

function ZaloIcon() {
  return <svg viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="9" fill="currentColor"/><path d="M8 10.5h12.5L9.5 22h12.8" fill="none" stroke="white" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round"/><circle cx="22.5" cy="9.5" r="2" fill="white"/></svg>;
}

function MessengerIcon() {
  return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 4C9.2 4 4 8.9 4 15c0 3.5 1.7 6.6 4.5 8.7V28l4.4-2.4c1 .3 2 .4 3.1.4 6.8 0 12-4.9 12-11S22.8 4 16 4Z" fill="currentColor"/><path d="m9.5 17.3 4.1-4.3 2.8 2.2 4.3-2.2-4.1 4.4-2.8-2.1-4.3 2Z" fill="white"/></svg>;
}

function PhoneIcon() {
  return <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="15" fill="currentColor"/><path d="M11.2 9.7c.5-.5 1.3-.6 1.9-.2l2.2 1.5c.6.4.8 1.2.5 1.8l-.9 1.7c1 1.8 2.5 3.3 4.3 4.3l1.7-.9c.6-.3 1.4-.1 1.8.5l1.5 2.2c.4.6.3 1.4-.2 1.9l-1.2 1.2c-.6.6-1.5.8-2.3.5-3.2-1.1-6-2.9-8.3-5.2s-4.1-5.1-5.2-8.3c-.3-.8-.1-1.7.5-2.3l1.2-1.2Z" fill="white"/></svg>;
}

export function ContactConversion() {
  return (
    <div className="contact-conversion" aria-label="Liên hệ nhanh">
      <a className="contact-action contact-call" href={`tel:${CONTACTS.phone}`} onClick={() => trackEvent('contact_call_clicked', { destination: CONTACTS.phone })} aria-label="Gọi 0372352242">
        <span className="contact-action-icon"><PhoneIcon /></span><span>Gọi ngay</span>
      </a>
      <a className="contact-action contact-zalo" href={`https://zalo.me/${CONTACTS.phone}`} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('contact_zalo_clicked', { destination: CONTACTS.phone })} aria-label="Chat Zalo 0372352242">
        <span className="contact-action-icon"><ZaloIcon /></span><span>Zalo</span>
      </a>
      <a className="contact-action contact-messenger" href={CONTACTS.messenger} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('contact_messenger_clicked', { destination: 'facebook_profile' })} aria-label="Nhắn Messenger">
        <span className="contact-action-icon"><MessengerIcon /></span><span>Messenger</span>
      </a>
    </div>
  );
}

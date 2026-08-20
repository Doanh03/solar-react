'use client';

import { useEffect, useState } from 'react';
import { trackEvent } from '@/app/lib/analytics';
import './contact-conversion.css';

const CONTACTS = {
  phone: '0372352242',
  messenger: 'https://www.facebook.com/tran.oanh.759761',
};

function ZaloMark() {
  return <span className="brand-mark brand-mark-zalo" aria-hidden="true">Z</span>;
}

function MessengerMark() {
  return <span className="brand-mark brand-mark-messenger" aria-hidden="true"><svg viewBox="0 0 32 32"><path d="M16 4C9.2 4 4 8.9 4 15c0 3.5 1.7 6.6 4.5 8.7V28l4.4-2.4c1 .3 2 .4 3.1.4 6.8 0 12-4.9 12-11S22.8 4 16 4Z" fill="currentColor"/><path d="m9.5 17.3 4.1-4.3 2.8 2.2 4.3-2.2-4.1 4.4-2.8-2.1-4.3 2Z" fill="white"/></svg></span>;
}

function PhoneMark() {
  return <span className="brand-mark brand-mark-phone" aria-hidden="true"><svg viewBox="0 0 32 32"><path d="M10.2 6.8c.6-.6 1.6-.7 2.3-.2l3 2c.7.5 1 1.4.6 2.2l-1.2 2.4c1.1 2.2 2.8 3.9 5 5l2.4-1.2c.8-.4 1.7-.1 2.2.6l2 3c.5.7.4 1.7-.2 2.3l-1.5 1.5c-.8.8-2 1.1-3.1.7-4-1.3-7.4-3.5-10.3-6.4S6.2 12.9 4.9 8.9c-.4-1.1-.1-2.3.7-3.1l1.5-1.5Z" fill="currentColor"/></svg></span>;
}

export function ContactConversion() {
  const [open, setOpen] = useState(false);
  const [leadFormVisible, setLeadFormVisible] = useState(false);
  const toggle = () => setOpen(value => !value);

  useEffect(() => {
    const leadForm = document.getElementById('lead-form');
    if (!leadForm || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setLeadFormVisible(entry.isIntersecting);
        if (entry.isIntersecting) setOpen(false);
      },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(leadForm);
    return () => observer.disconnect();
  }, []);

  const visibilityClass = leadFormVisible ? ' is-suppressed' : '';

  return (
    <>
      <div className={`contact-conversion${open ? ' is-open' : ''}${visibilityClass}`} aria-label="Liên hệ nhanh">
        <div className="contact-panel" aria-hidden={!open}>
          <a className="contact-action contact-zalo" href={`https://zalo.me/${CONTACTS.phone}`} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('contact_zalo_clicked', { destination: CONTACTS.phone })} aria-label="Chat Zalo 0372352242">
            <span className="contact-action-icon"><ZaloMark /></span><span className="contact-copy"><strong>Zalo</strong><small>Chat trực tiếp</small></span>
          </a>
          <a className="contact-action contact-messenger" href={CONTACTS.messenger} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('contact_messenger_clicked', { destination: 'facebook_profile' })} aria-label="Nhắn Messenger">
            <span className="contact-action-icon"><MessengerMark /></span><span className="contact-copy"><strong>Messenger</strong><small>Nhắn tin ngay</small></span>
          </a>
          <a className="contact-action contact-call" href={`tel:${CONTACTS.phone}`} onClick={() => trackEvent('contact_call_clicked', { destination: CONTACTS.phone })} aria-label="Gọi 0372352242">
            <span className="contact-action-icon"><PhoneMark /></span><span className="contact-copy"><strong>Gọi ngay</strong><small>{CONTACTS.phone}</small></span>
          </a>
        </div>
        <button className="contact-orb" type="button" onClick={toggle} aria-expanded={open} aria-label={open ? 'Đóng liên hệ nhanh' : 'Mở liên hệ nhanh'}>
          <span className="contact-orb-core">{open ? '×' : '✦'}</span>
          <span className="contact-orb-ring" />
        </button>
      </div>
      <div className={`contact-mobile-bar${visibilityClass}`} aria-label="Liên hệ nhanh trên điện thoại">
        <a href={`https://zalo.me/${CONTACTS.phone}`} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('contact_zalo_clicked', { destination: CONTACTS.phone })}>
          <ZaloMark /><span>Zalo</span>
        </a>
        <a href={CONTACTS.messenger} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('contact_messenger_clicked', { destination: 'facebook_profile' })}>
          <MessengerMark /><span>Messenger</span>
        </a>
        <a href={`tel:${CONTACTS.phone}`} onClick={() => trackEvent('contact_call_clicked', { destination: CONTACTS.phone })}>
          <PhoneMark /><span>Gọi ngay</span>
        </a>
      </div>
    </>
  );
}

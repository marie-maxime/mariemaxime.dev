import '../styles/styles.scss';

const email = (document.querySelector('#email') as HTMLAnchorElement)
email.addEventListener('click', () => {
  const contact = atob((email).dataset.contact);
  const subject = atob(email.dataset.subj);
  email.href = `mailto:${contact}?subject=${subject}`;
})
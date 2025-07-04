chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      const ticket = location.pathname.split('/').pop();
      const mentionEl = [...document.querySelectorAll('.link-content')]
        .find(el => el.textContent.match(/[A-Z]+-\d+/));
      const mention = mentionEl
        ? mentionEl.textContent.match(/[A-Z]+-\d+/)[0]
        : 'Not found';
      return { ticket, mention };
    }
  }).then(([{ result }]) => {
    const ticketEl = document.getElementById('ticket');
    const mentionEl = document.getElementById('mentions');
    ticketEl.textContent = result.ticket;
    mentionEl.textContent = result.mention;

    [ticketEl, mentionEl].forEach(el => {
      el.addEventListener('click', () => {
        navigator.clipboard.writeText(el.textContent).then(() => {
          el.style.backgroundColor = '#d4edda'; // temporary feedback
          setTimeout(() => el.style.backgroundColor = '', 800);
        });
      });
    });
  }).catch(err => {
    document.getElementById('ticket').textContent = 'Error';
    document.getElementById('mentions').textContent = err.message;
    console.error('Error fetching Jira data:', err);
  });
});

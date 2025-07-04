(function () {
  const interval = setInterval(() => {
    const ticketId = window.location.pathname.split('/').pop();
    const mentionLink = [...document.querySelectorAll('a')]
      .find(a => a.closest('[data-test-id*="issue.links"]') && a.textContent.match(/ABC-\d+/));

    if (mentionLink) {
      const mentionId = mentionLink.textContent.trim();

      console.log("Ticket ID:", ticketId);
      console.log("Mentioned ID:", mentionId);

      clearInterval(interval);
    }
  }, 1000); 
})();

function toggleRecent() {
  const x = document.getElementById('recentMore');
  if (x.innerHTML === 'View More...') {
    x.innerHTML = 'View Fewer...';
  } else {
    x.innerHTML = 'View More...';
  }
}

function toggleDraft() {
  const x = document.getElementById('draftMore');
  if (x.innerHTML === 'View More...') {
    x.innerHTML = 'Hide';
  } else {
    x.innerHTML = 'View More...';
  }
}

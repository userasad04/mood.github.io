// Save the mood with note and timestamp
const saveMood = (mood, note) => {
  const now = new Date();
  const timestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  const moodData = { mood, note, timestamp };

  let moods = JSON.parse(localStorage.getItem('moods')) || [];
  moods.push(moodData);
  localStorage.setItem('moods', JSON.stringify(moods));

  displayMoodHistory();
  analyzeMoods();
};

// Display mood history
const displayMoodHistory = () => {
  const historyList = document.getElementById('history-list');
  historyList.innerHTML = '';

  const moods = JSON.parse(localStorage.getItem('moods')) || [];
  moods.forEach(({ mood, note, timestamp }) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${mood}</strong> (${timestamp}) - ${note || 'No note added'}`;
    historyList.appendChild(li);
  });
};

// Analyze moods
const analyzeMoods = () => {
  const moods = JSON.parse(localStorage.getItem('moods')) || [];
  if (moods.length === 0) return;

  const moodCounts = moods.reduce((acc, { mood }) => {
    acc[mood] = (acc[mood] || 0) + 1;
    return acc;
  }, {});

  const mostFrequentMood = Object.keys(moodCounts).reduce((a, b) =>
    moodCounts[a] > moodCounts[b] ? a : b
  );

  const analysisText = document.getElementById('analysis-text');
  analysisText.textContent = `Most common mood: ${mostFrequentMood} (${moodCounts[mostFrequentMood]} times)`;
};

// Add event listeners to mood buttons
document.querySelectorAll('.mood-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const mood = button.dataset.mood;
    const note = document.getElementById('mood-note').value;
    saveMood(mood, note);
    document.getElementById('mood-note').value = ''; // Clear note
  });
});

// Initialize
window.onload = () => {
  displayMoodHistory();
  analyzeMoods();
};

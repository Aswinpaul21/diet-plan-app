document.getElementById('dietForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const weight = parseFloat(document.getElementById('weight').value);
  const age = parseInt(document.getElementById('age').value);
  const gender = document.getElementById('gender').value;
  const activity = document.getElementById('activity').value;

  if (!weight || !age || !gender || !activity) {
    alert('Please fill out all fields');
    return;
  }

  let bmr;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * 170 - 5 * age + 5; // assuming 170cm height
  } else {
    bmr = 10 * weight + 6.25 * 160 - 5 * age - 161; // assuming 160cm height
  }

  let activityFactor = {
    low: 1.2,
    medium: 1.55,
    high: 1.9
  }[activity];

  const calories = Math.round(bmr * activityFactor);

  document.getElementById('result').classList.remove('hidden');
  document.getElementById('caloriesInfo').innerHTML = `Your suggested daily intake: <strong>${calories} kcal</strong>`;

  let plan = [];

  if (calories < 1800) {
    plan = [
      "🍳 Breakfast: Oats + Banana + Milk",
      "🥗 Lunch: 1 cup rice, dal, boiled veggies",
      "🍎 Snack: Fruit or yogurt",
      "🍲 Dinner: Chapati + Vegetable Curry"
    ];
  } else if (calories < 2400) {
    plan = [
      "🍳 Breakfast: Eggs + Toast + Fruit",
      "🥗 Lunch: Rice + Paneer/Chicken + Salad",
      "🥜 Snack: Nuts + Tea/Coffee",
      "🍲 Dinner: 2 Rotis + Veg or Chicken Curry"
    ];
  } else {
    plan = [
      "🍳 Breakfast: Paratha + Curd + Fruit",
      "🍗 Lunch: Biryani or full meal + Veg",
      "🥤 Snack: Peanut Butter Sandwich + Milkshake",
      "🍲 Dinner: Rice + Dal + Egg/Veg Curry"
    ];
  }

  const ul = document.getElementById('dietPlanList');
  ul.innerHTML = "";
  plan.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });
});

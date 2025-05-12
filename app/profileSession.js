// app/profileSession.js
let profileData = {
  username: '',
  weight: '',
  weightGoal: '',
  calorieIntake: '',
  preferredDiet: '',
};

export const setProfileSession = (data) => {
  profileData = { ...data };
};

export const getProfileSession = () => profileData;

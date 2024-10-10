import { BASE_URL } from '../config/urls';

export const checkUsernameExists = async (username) => {
  const response = await fetch(`${BASE_URL}users/register/check-username/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
};

export const checkEmailExists = async (email) => {
  const response = await fetch(`${BASE_URL}users/register/check-email/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
};

export const checkFirstNameExists = async (firstName) => {
  const response = await fetch(`${BASE_URL}users/register/check-first-name/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ first_name: firstName }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
};

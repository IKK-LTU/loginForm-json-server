
const fakeFetch = ({ email, password }) =>
  fetch("http://localhost:8000/user")
    .then((res) => res.json())
    .then(
      (result) => {
        if (email === result[0].email && password === result[0].password) {
          return {
            user: {
              email: result[0].email,
              password: result[0].password,
            },
          };
        } else {
          throw Error("Incorrect email or password");
        }
      },
      (error) => {
        throw Error("Fetch error");
      }
    );

const login = async ({ email, password }) => {
  const response = await fakeFetch({ email, password });
  return response;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { login };
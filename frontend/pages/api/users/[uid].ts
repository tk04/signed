export const getData = async (token: string, user) => {
  //   console.log(user);
  if (user) {
    const response = await fetch(
      `https://signed-be.herokuapp.com/api1/users/${user}`
    );
    // console.log(response);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  }
};

const handler = async (req, res) => {
  // const token = req.cookies.token ? `Bearer ${req.cookies.token}` : null;
  // console.log(req.headers);
  // const response = await fetch(
  //   `http://localhost:3000/api1/users/${req.query.uid}`,
  //   {
  //     headers: {
  //       Authorization: token,
  //     },
  //   }
  // );
  // if (response.ok) {
  //   const data = await response.json();
  //   console.log(data);
  //   res.send({ data });
  // }

  res.status(200).send({ msg: "hello from handler" });
};

export default handler;

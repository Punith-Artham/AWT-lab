const id = Symbol("id");
const user = {
  name: "punith",
  [id]: 101
};

console.log(user[id]);

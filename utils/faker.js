const { faker } = require("@faker-js/faker");

function GenerateFakeData(noOfRecords = 10, forEachRecord = 3) {
  const users = [],
    posts = [];
  let counter = 1;
  for (let i = 1; i <= noOfRecords; i++) {
    let temp = 0;
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email(firstName, lastName);
    const password = faker.internet.password();
    const avatar = faker.internet.avatar();
    users.push({
      id: i,
      email,
      password,
      firstName,
      lastName,
      avatar,
    });
    for (let j = counter; j <= counter + forEachRecord; j++) {
      const title = faker.random.words(3);
      const body = faker.lorem.paragraph();
      posts.push({ id: j, title, body, userId: i });
      temp = j;
    }
    counter = temp + 1;
  }
  return { users, posts };
}

module.exports = GenerateFakeData;

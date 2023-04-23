const db = { users: [] };

export const signIn = async (username, password) => {
  try {
    await getData();
    return new Promise((resolve, reject) => {
      let foundUser = db.users.find((user) => user.username == username);

      if (foundUser != undefined) {
        if (foundUser.password == password) {
          resolve({ msg: "Success", data: foundUser });
          sessionStorage.setItem("userSession", JSON.stringify(foundUser));
        } else {
          reject({ msg: "Incorrect Password" });
        }
      } else {
        reject({ msg: "User not found" });
      }
    });
  } catch (e) {
    console(e.msg);
  }
};

const getData = async () => {
  try {
    let res = await fetch(
      "https://api.jsonbin.io/v3/b/6444dbadb89b1e22998fcb85",
      {
        method: "GET",
        headers: {
          "X-ACCESS-KEY":
            "$2b$10$i3Vn9FP..ooifcRShouNxui9GKXqjTVsX1lYSieQTuo0x6pKLsu2m",
        },
      }
    );
    let resJson = await res.json();
    if (res.ok) {
      db.users = resJson.record.users;
    } else {
      throw "Error";
    }
  } catch (e) {
    console.log(e.msg);
  }
};

export const updateData = async (info) => {
  try {
    db.users = db.users.map((user) => {
      return user.id == info.id ? info : user;
    });
    let res = await fetch(
      "https://api.jsonbin.io/v3/b/6444dbadb89b1e22998fcb85",
      {
        method: "PUT",
        headers: {
          "X-ACCESS-KEY":
            "$2b$10$i3Vn9FP..ooifcRShouNxui9GKXqjTVsX1lYSieQTuo0x6pKLsu2m",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(db),
      }
    );
  } catch (e) {
    console.log(e.msg);
  }
};

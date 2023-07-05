const C = require("./dist");

(async () => {
  console.log("q");
  try {
    const q = await C.create();
    console.log(q);
  } catch (e) {
    console.log(e);
  }
})();
